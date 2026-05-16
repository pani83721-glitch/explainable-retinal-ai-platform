import joblib
import pandas as pd
import numpy as np
import os

class MLService:
    def __init__(self):
        self.model_path = os.path.join('backend', 'ml', 'saved_models')
        self.model = None
        self.scaler = None
        self.encoders = None
        self.feature_names = None
        self.load_model()

    def load_model(self):
        try:
            self.model = joblib.load(os.path.join(self.model_path, 'best_model.joblib'))
            self.scaler = joblib.load(os.path.join(self.model_path, 'scaler.joblib'))
            self.encoders = joblib.load(os.path.join(self.model_path, 'encoders.joblib'))
            self.feature_names = joblib.load(os.path.join(self.model_path, 'feature_names.joblib'))
        except:
            print("Model files not found. Please run training script first.")

    def predict(self, patient_data):
        if self.model is None:
            # Fallback or Mock for initial setup if model not trained
            return self.mock_predict(patient_data)
        
        df = pd.DataFrame([patient_data])
        
        # Preprocess features (matching training logic)
        for col, le in self.encoders.items():
            if col in df.columns:
                try:
                    df[col] = le.transform(df[col].astype(str))
                except:
                    df[col] = 0 # Default for unseen labels
        
        # Ensure all features exist
        for col in self.feature_names:
            if col not in df.columns:
                df[col] = 0
        
        X = df[self.feature_names]
        X_scaled = self.scaler.transform(X)
        
        prob = self.model.predict_proba(X_scaled)[0][1]
        return self.format_result(prob)

    def mock_predict(self, data):
        # Basic heuristic-based fallback if model is missing
        try:
            score = 0.1
            inpatient = int(data.get('number_inpatient', 0) or 0)
            if inpatient > 1: score += 0.3
            
            insulin = data.get('insulin', 'No')
            if insulin == 'Up': score += 0.2
            
            hospital_time = int(data.get('time_in_hospital', 0) or 0)
            if hospital_time > 5: score += 0.2
            
            age = str(data.get('age', ''))
            if '[70' in age or '[80' in age: score += 0.1
            
            return self.format_result(min(score, 0.95))
        except Exception as e:
            print(f"Mock predict error: {e}")
            return self.format_result(0.5) # Default medium risk on error

    def format_result(self, prob):
        if prob < 0.35:
            level = "Green"
            rec_patient = "Fantastic news! Your health progress is looking wonderful today. Your dedication to your recovery is clearly paying off. Keep up the excellent work, stay positive, and have a beautiful day!"
            rec_admin = "Low clinical risk (30-day readmission < 35%). Standard post-discharge follow-up recommended."
        elif prob < 0.65:
            level = "Yellow"
            rec_patient = "You're doing a great job keeping track of your health! There are a few areas that need a bit more attention, so it's a good idea to schedule a check-up soon. Keep going—you're on the right path!"
            rec_admin = "Moderate clinical risk. Patient demonstrates markers consistent with potential relapse. Recommend prioritized nurse outreach."
        else:
            level = "Red"
            rec_patient = "We've noticed some concerning trends in your data. Please don't worry, but we strongly recommend visiting the hospital today so our medical team can ensure you're getting the best care possible. Your safety is our priority."
            rec_admin = "HIGH CLINICAL RISK. Immediate intervention recommended. Risk factors include acute symptom spikes or negative medication compliance trends."
        
        return {
            "probability": round(float(prob), 4),
            "risk_level": level,
            "recommendation": rec_patient,
            "clinical_recommendation": rec_admin
        }

ml_service = MLService()
