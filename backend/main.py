from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy.orm import Session
import os

from backend.db.database import engine, SessionLocal, Base
from backend.models import models
from backend.services.ml_service import ml_service
from backend.services.monitoring_service import MonitoringService

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app) # Enable CORS for frontend integration

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

@app.route("/patients/", methods=["POST"])
def create_patient():
    data = request.json
    db = SessionLocal()
    db_patient = models.Patient(
        name=data.get('name'),
        age=data.get('age'),
        gender=data.get('gender'),
        patient_id=data.get('patient_id')
    )
    db.add(db_patient)
    try:
        db.commit()
        db.refresh(db_patient)
        return jsonify({
            "id": db_patient.id,
            "name": db_patient.name,
            "patient_id": db_patient.patient_id
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"detail": "Patient ID already exists or database error"}), 400
    finally:
        db.close()

@app.route("/patients/", methods=["GET"])
def list_patients():
    db = SessionLocal()
    patients = db.query(models.Patient).all()
    result = []
    for p in patients:
        result.append({
            "id": p.id,
            "name": p.name,
            "age": p.age,
            "gender": p.gender,
            "patient_id": p.patient_id
        })
    db.close()
    return jsonify(result)

@app.route("/predict/", methods=["POST"])
def predict_readmission():
    data = request.json
    patient_id = data.get('patient_id')
    features = data.get('features')
    
    db = SessionLocal()
    patient = db.query(models.Patient).filter(models.Patient.patient_id == patient_id).first()
    if not patient:
        db.close()
        return jsonify({"detail": "Patient not found"}), 404
    
    result = ml_service.predict(features)
    
    db_prediction = models.Prediction(
        patient_id=patient.id,
        risk_score=result['probability'],
        risk_level=result['risk_level'],
        recommendation=result['recommendation'],
        features=features,
        is_initial_discharge=True
    )
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    
    res = {
        "prediction_id": db_prediction.id,
        "risk_level": result['risk_level'],
        "probability": result['probability'],
        "recommendation": result['recommendation']
    }
    db.close()
    return jsonify(res)

@app.route("/daily-report/", methods=["POST"])
def submit_daily_report():
    data = request.json
    patient_id = data.get('patient_id')
    
    db = SessionLocal()
    patient = db.query(models.Patient).filter(models.Patient.patient_id == patient_id).first()
    if not patient:
        db.close()
        return jsonify({"detail": "Patient not found"}), 404
    
    db_report = models.DailyReport(
        patient_id=patient.id,
        sugar_level=data.get('sugar_level'),
        fatigue_level=data.get('fatigue_level'),
        medicine_taken=data.get('medicine_taken'),
        dizziness=data.get('dizziness'),
        symptoms=data.get('symptoms'),
        condition_description=data.get('condition_description')
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    # Run Monitoring Logic
    alerts = MonitoringService.analyze_report(db, db_report, patient)
    
    res = {
        "status": "success",
        "report_id": db_report.id,
        "alerts_triggered": len(alerts)
    }
    db.close()
    return jsonify(res)

@app.route("/dashboard/alerts", methods=["GET"])
def get_alerts():
    db = SessionLocal()
    alerts = db.query(models.Alert).order_by(models.Alert.created_at.desc()).all()
    result = []
    for alert in alerts:
        patient = db.query(models.Patient).filter(models.Patient.id == alert.patient_id).first()
        result.append({
            "id": alert.id,
            "patient_name": patient.name if patient else "Unknown",
            "type": alert.alert_type,
            "severity": alert.severity,
            "message": alert.message,
            "timestamp": alert.created_at.isoformat(),
            "resolved": alert.is_resolved
        })
    db.close()
    return jsonify(result)

@app.route("/patient/<patient_id>/history", methods=["GET"])
def get_patient_history(patient_id):
    db = SessionLocal()
    patient = db.query(models.Patient).filter(models.Patient.patient_id == patient_id).first()
    if not patient:
        db.close()
        return jsonify({"detail": "Patient not found"}), 404
    
    predictions = db.query(models.Prediction).filter(models.Prediction.patient_id == patient.id).all()
    reports = db.query(models.DailyReport).filter(models.DailyReport.patient_id == patient.id).all()
    
    preds_list = []
    for p in predictions:
        preds_list.append({
            "id": p.id,
            "risk_score": p.risk_score,
            "risk_level": p.risk_level,
            "recommendation": p.recommendation,
            "created_at": p.created_at.isoformat()
        })
        
    reports_list = []
    for r in reports:
        reports_list.append({
            "id": r.id,
            "sugar_level": r.sugar_level,
            "fatigue_level": r.fatigue_level,
            "medicine_taken": r.medicine_taken,
            "created_at": r.created_at.isoformat()
        })

    res = {
        "patient": {
            "name": patient.name,
            "patient_id": patient.patient_id,
            "age": patient.age,
            "gender": patient.gender
        },
        "predictions": preds_list,
        "reports": reports_list
    }
    db.close()
    return jsonify(res)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
