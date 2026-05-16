from sqlalchemy.orm import Session
from backend.models.models import DailyReport, Alert, Patient, Prediction
from backend.services.ml_service import ml_service
import datetime

class MonitoringService:
    @staticmethod
    def analyze_report(db: Session, report: DailyReport, patient: Patient):
        # 1. Fetch recent reports for trend analysis
        recent_reports = db.query(DailyReport)\
            .filter(DailyReport.patient_id == patient.id)\
            .order_by(DailyReport.created_at.desc())\
            .limit(5).all()

        alerts = []
        worsening = False

        # Rule 1: Sudden Glucose Increase (> 200 or 20% increase)
        if report.sugar_level > 200:
            alerts.append(Alert(
                patient_id=patient.id,
                alert_type="High Glucose",
                severity="Red",
                message=f"Critical sugar level detected: {report.sugar_level} mg/dL."
            ))
            worsening = True
        
        if len(recent_reports) > 1:
            prev_sugar = recent_reports[1].sugar_level
            if report.sugar_level > prev_sugar * 1.2:
                alerts.append(Alert(
                    patient_id=patient.id,
                    alert_type="Sugar Spike",
                    severity="Yellow",
                    message="Sudden 20% increase in blood sugar detected."
                ))
                worsening = True

        # Rule 2: Repeated Missed Medication
        missed_count = sum(1 for r in recent_reports if not r.medicine_taken)
        if not report.medicine_taken:
            if missed_count >= 2:
                alerts.append(Alert(
                    patient_id=patient.id,
                    alert_type="Medication Non-compliance",
                    severity="Red",
                    message=f"Patient has missed medication {missed_count} times recently."
                ))
                worsening = True

        # Rule 3: Dizziness + High Glucose
        if report.dizziness and report.sugar_level > 180:
            alerts.append(Alert(
                patient_id=patient.id,
                alert_type="Dangerous Symptom Combo",
                severity="Red",
                message="Dizziness combined with high glucose level reported."
            ))
            worsening = True

        # Rule 4: Worsening Fatigue
        if report.fatigue_level >= 8:
            alerts.append(Alert(
                patient_id=patient.id,
                alert_type="Severe Fatigue",
                severity="Yellow",
                message=f"High fatigue level reported: {report.fatigue_level}/10."
            ))
            worsening = True

        # If condition is worsening, trigger REASSESSMENT with the same ML model
        if worsening or report.fatigue_level > 7 or not report.medicine_taken:
            # We need the original features from the last prediction to re-run the model,
            # or we construct a new feature set based on current status.
            # For simplicity, we'll re-run prediction using the most recent feature record 
            # but we could potentially update some features (like lab results are not available but symptoms are)
            
            last_pred = db.query(Prediction)\
                .filter(Prediction.patient_id == patient.id)\
                .order_by(Prediction.created_at.desc()).first()
            
            if last_pred:
                features = last_pred.features.copy()
                # Update features that might change (though model doesn't take 'sugar_level' directly from daily report usually)
                # but we can simulate the impact or just re-run with original + clinical flag for 'worsening'
                
                result = ml_service.predict(features)
                
                # Create a new prediction record (reassessment)
                new_pred = Prediction(
                    patient_id=patient.id,
                    risk_score=result['probability'],
                    risk_level=result['risk_level'],
                    recommendation=result['clinical_recommendation'],
                    features=features,
                    is_initial_discharge=False,
                    created_at=datetime.datetime.utcnow() + datetime.timedelta(seconds=1) # Ensure it appears after the report
                )
                db.add(new_pred)
                
                # If risk increased to Red, add a critical alert
                if result['risk_level'] == 'Red':
                    alerts.append(Alert(
                        patient_id=patient.id,
                        alert_type="Dynamic Risk Escalation",
                        severity="Red",
                        message="ML reassessment identifies patient as HIGH RISK due to worsening trends."
                    ))

        for alert in alerts:
            db.add(alert)
        
        db.commit()
        return alerts
