import os
import sys
import datetime
from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

# Import our modular components
from backend.db.database import engine, SessionLocal
from backend.models import models
from backend.services.ml_service import ml_service
from backend.services.monitoring_service import MonitoringService

# Initialize Database - Ensure tables exist
try:
    models.Base.metadata.create_all(bind=engine)
    print("DEBUG: Database tables initialized successfully.", file=sys.stderr)
    
    # Create default admin if not exists
    db = SessionLocal()
    if not db.query(models.Admin).filter(models.Admin.username == "admin").first():
        default_admin = models.Admin(
            username="admin",
            hashed_password=generate_password_hash("admin123")
        )
        db.add(default_admin)
        db.commit()
        print("DEBUG: Default admin created.", file=sys.stderr)
    db.close()
except Exception as e:
    print(f"ERROR: Database initialization failed: {e}", file=sys.stderr)

app = Flask(__name__, template_folder='templates')
app.secret_key = "glucometer_secret_key_v1"
CORS(app) 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    role = data.get("role")
    identifier = data.get("identifier")
    password = data.get("password")

    db = SessionLocal()
    try:
        if role == "admin":
            admin = db.query(models.Admin).filter(models.Admin.username == identifier).first()
            if admin and check_password_hash(admin.hashed_password, password):
                session["user"] = {"role": "admin", "username": admin.username}
                return jsonify({"status": "success", "role": "admin"})
            return jsonify({"status": "error", "message": "Invalid admin credentials"}), 401
        
        elif role == "patient":
            patient = db.query(models.Patient).filter(models.Patient.patient_id == identifier).first()
            if patient:
                session["user"] = {"role": "patient", "patient_id": patient.patient_id}
                return jsonify({"status": "success", "role": "patient", "patient_id": patient.patient_id})
            # For demo, if patient doesn't exist yet, we might want to allow it or tell them to register.
            # However, the patient ID is usually given by the clinical staff.
            return jsonify({"status": "error", "message": "Patient ID not found"}), 404
            
        return jsonify({"status": "error", "message": "Invalid role"}), 400
    finally:
        db.close()

@app.route("/logout")
def logout():
    session.pop("user", None)
    return jsonify({"status": "success"})

@app.route("/patients/ids", methods=["GET"])
def list_patient_ids():
    db = SessionLocal()
    try:
        patients = db.query(models.Patient.patient_id).all()
        return jsonify([p[0] for p in patients])
    finally:
        db.close()

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "GlucoGuard AI Backend is running"})

from functools import wraps

def login_required(role=None):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if "user" not in session:
                return jsonify({"detail": "Authentication required"}), 401
            if role and session["user"]["role"] != role:
                return jsonify({"detail": "Unauthorized access"}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@app.route("/patients/", methods=["POST"])
@login_required("admin")
def create_patient():
    db = SessionLocal()
    try:
        data = request.get_json(silent=True) or {}
        pid = data.get('patient_id')
        if not pid:
            return jsonify({"detail": "Patient ID is required"}), 400
            
        print(f"DEBUG: Syncing patient: {pid}", file=sys.stderr)
        
        db_patient = db.query(models.Patient).filter(models.Patient.patient_id == pid).first()
        if not db_patient:
            db_patient = models.Patient(
                name=data.get('name', 'Unknown'),
                age=data.get('age', '[50-60)'),
                gender=data.get('gender', 'Female'),
                patient_id=pid
            )
            db.add(db_patient)
            db.commit()
            db.refresh(db_patient)
            print(f"DEBUG: Created new patient record for {pid}", file=sys.stderr)
        
        return jsonify({"id": db_patient.id, "patient_id": db_patient.patient_id}), 201
    except Exception as e:
        db.rollback()
        print(f"ERROR in create_patient: {e}", file=sys.stderr)
        return jsonify({"detail": str(e)}), 500
    finally:
        db.close()

@app.route("/predict/", methods=["POST"])
@login_required("admin")
def predict_readmission():
    db = SessionLocal()
    try:
        data = request.get_json(silent=True) or {}
        patient_id = data.get('patient_id')
        features = data.get('features', {})
        
        print(f"DEBUG: Received prediction request for PID: {patient_id}", file=sys.stderr)

        patient = db.query(models.Patient).filter(models.Patient.patient_id == patient_id).first()
        if not patient:
            return jsonify({"detail": f"Patient {patient_id} not found. Register them first."}), 404
        
        # Run ML model (or fallback mock)
        result = ml_service.predict(features)
        
        # Save prediction record
        db_prediction = models.Prediction(
            patient_id=patient.id,
            risk_score=result['probability'],
            risk_level=result['risk_level'],
            recommendation=result['clinical_recommendation'], # Admin sees clinical tone
            features=features,
            is_initial_discharge=True
        )
        db.add(db_prediction)
        db.commit()
        
        print(f"DEBUG: Prediction saved. Risk: {result['risk_level']}", file=sys.stderr)
        return jsonify(result)
    except Exception as e:
        db.rollback()
        print(f"ERROR in predict_readmission: {e}", file=sys.stderr)
        return jsonify({"detail": str(e)}), 500
    finally:
        db.close()

@app.route("/daily-report/", methods=["POST"])
@login_required("patient")
def submit_daily_report():
    db = SessionLocal()
    try:
        data = request.get_json(silent=True) or {}
        patient = db.query(models.Patient).filter(models.Patient.patient_id == data.get('patient_id')).first()
        
        if not patient:
            return jsonify({"detail": "Patient not found"}), 404
        
        db_report = models.DailyReport(
            patient_id=patient.id,
            sugar_level=float(data.get('sugar_level', 0)),
            fatigue_level=int(data.get('fatigue_level', 5)),
            medicine_taken=bool(data.get('medicine_taken', True)),
            dizziness=bool(data.get('dizziness', False)),
            symptoms=data.get('symptoms', ""),
            condition_description=data.get('condition_description', ""),
            created_at=datetime.datetime.utcnow() # Ensure fresh timestamp
        )
        db.add(db_report)
        db.commit()
        db.refresh(db_report)
        
        alerts = MonitoringService.analyze_report(db, db_report, patient)
        return jsonify({"status": "success", "alerts_triggered": len(alerts)})
    except Exception as e:
        db.rollback()
        print(f"ERROR in daily_report: {e}", file=sys.stderr)
        return jsonify({"detail": str(e)}), 500
    finally:
        db.close()

@app.route("/patients/", methods=["GET"])
@login_required("admin")
def list_patients():
    db = SessionLocal()
    patients = db.query(models.Patient).all()
    result = [{"name": p.name, "patient_id": p.patient_id, "age": p.age} for p in patients]
    db.close()
    return jsonify(result)

@app.route("/dashboard/alerts", methods=["GET"])
@login_required("admin")
def get_alerts():
    db = SessionLocal()
    alerts = db.query(models.Alert).order_by(models.Alert.created_at.desc()).all()
    res = []
    for a in alerts:
        res.append({
            "id": a.id,
            "patient_name": a.patient.name if a.patient else "Unknown",
            "type": a.alert_type,
            "severity": a.severity,
            "message": a.message,
            "timestamp": a.created_at.isoformat()
        })
    db.close()
    return jsonify(res)

@app.route("/patient/<patient_id>/history", methods=["GET"])
@login_required()
def get_patient_history(patient_id):
    if session["user"]["role"] == "patient" and session["user"]["patient_id"] != patient_id:
        return jsonify({"detail": "Unauthorized access to other patient data"}), 403

    db = SessionLocal()
    try:
        patient = db.query(models.Patient).filter(models.Patient.patient_id == patient_id).first()
        if not patient:
            return jsonify({"detail": "Patient not found"}), 404
        
        predictions = db.query(models.Prediction).filter(models.Prediction.patient_id == patient.id).order_by(models.Prediction.created_at.desc()).all()
        reports = db.query(models.DailyReport).filter(models.DailyReport.patient_id == patient.id).order_by(models.DailyReport.created_at.desc()).all()
        alerts = db.query(models.Alert).filter(models.Alert.patient_id == patient.id).order_by(models.Alert.created_at.desc()).all()
        
        preds_list = []
        is_admin = session["user"]["role"] == "admin"
        
        for p in predictions:
            display_rec = p.recommendation
            if not is_admin:
                temp_res = ml_service.format_result(p.risk_score)
                display_rec = temp_res['recommendation']

            preds_list.append({
                "id": p.id,
                "risk_score": p.risk_score,
                "risk_level": p.risk_level,
                "recommendation": display_rec,
                "is_initial_discharge": p.is_initial_discharge,
                "created_at": p.created_at.isoformat() + "Z"
            })
            
        reports_list = []
        for r in reports:
            reports_list.append({
                "id": r.id,
                "sugar_level": r.sugar_level,
                "fatigue_level": r.fatigue_level,
                "medicine_taken": r.medicine_taken,
                "dizziness": r.dizziness,
                "symptoms": r.symptoms,
                "condition_description": r.condition_description,
                "created_at": r.created_at.isoformat() + "Z"
            })

        alerts_list = []
        for a in alerts:
            alerts_list.append({
                "id": a.id,
                "alert_type": a.alert_type,
                "severity": a.severity,
                "message": a.message,
                "created_at": a.created_at.isoformat() + "Z"
            })

        return jsonify({
            "patient": {
                "name": patient.name,
                "patient_id": patient.patient_id
            },
            "predictions": preds_list,
            "reports": reports_list,
            "alerts": alerts_list
        })
    finally:
        db.close()

if __name__ == "__main__":
    print("\n" + "="*50)
    print("  GLUCOGUARD AI SYSTEM STARTING...")
    print("  FRONTEND: http://127.0.0.1:8000")
    print("  BACKEND API: http://127.0.0.1:8000/health")
    print("="*50 + "\n")
    app.run(host="0.0.0.0", port=8000, debug=True)
