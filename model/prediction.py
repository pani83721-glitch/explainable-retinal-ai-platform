import joblib
import pandas as pd
import numpy as np
import os

# =========================
# LOAD SAVED FILES
# =========================

try:
    model = joblib.load("model/readmission_model.pkl")
    label_encoders = joblib.load("model/label_encoders.pkl")
    feature_columns = joblib.load("model/feature_columns.pkl")
except Exception:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model = joblib.load(os.path.join(BASE_DIR, "model", "readmission_model.pkl"))
    label_encoders = joblib.load(os.path.join(BASE_DIR, "model", "label_encoders.pkl"))
    feature_columns = joblib.load(os.path.join(BASE_DIR, "model", "feature_columns.pkl"))


def map_diagnosis(code):
    try:
        if pd.isna(code) or str(code).strip() in ['?', '']: return 'other'
        code_str = str(code).strip().upper()
        if code_str.startswith('V') or code_str.startswith('E'): return 'other'
        val = float(code_str)
        if 390 <= val <= 459 or val == 785: return 'circulatory'
        elif 460 <= val <= 519 or val == 786: return 'respiratory'
        elif 520 <= val <= 579 or val == 787: return 'digestive'
        elif 250 <= val < 251: return 'diabetes'
        elif 580 <= val <= 629 or val == 788: return 'genitourinary'
        elif 800 <= val <= 999: return 'injury'
        elif 710 <= val <= 739: return 'musculoskeletal'
        elif 140 <= val <= 239: return 'neoplasms'
        else: return 'other'
    except: return 'other'


def get_risk_level(score):
    if score < 0.25:
        return "Green", "Low risk. Virtual daily monitoring recommended."
    elif score < 0.60:
        return "Yellow", "Moderate risk. Occasional consultation recommended."
    else:
        return "Red", "High risk. Daily physical consultation strongly recommended."


def preprocess_input(patient_data):
    df = pd.DataFrame([patient_data])
    
    # Defaults and Feature Engineering
    original_age = patient_data.get("age", "[50-60)")
    num_inpatient = int(patient_data.get("number_inpatient", 0))
    num_emergency = int(patient_data.get("number_emergency", 0))
    num_meds = int(patient_data.get("num_medications", 0))
    
    # 1. Map diagnosis
    for diag_col in ["diag_1", "diag_2", "diag_3"]:
        if diag_col in df.columns:
            df[diag_col] = df[diag_col].apply(map_diagnosis)
        else:
            df[diag_col] = "other"

    # 2. Encode
    for column, encoder in label_encoders.items():
        if column in df.columns:
            try:
                df[column] = encoder.transform(df[column].astype(str))
            except:
                df[column] = 0

    # 3. Features
    df["total_visits"] = num_inpatient + num_emergency + int(patient_data.get("number_outpatient", 0))
    df["high_utilization_flag"] = (df["total_visits"] > 5).astype(int)
    df["insulin_changed_flag"] = (1 if patient_data.get("change") == "Ch" else 0)
    
    age_mapping = {"[0-10)": 0, "[10-20)": 1, "[20-30)": 2, "[30-40)": 3, "[40-50)": 4,
                   "[50-60)": 5, "[60-70)": 6, "[70-80)": 7, "[80-90)": 8, "[90-100)": 9}
    df["age_numeric"] = age_mapping.get(original_age, 5)

    for col in feature_columns:
        if col not in df.columns: df[col] = 0
    
    return df[feature_columns]


def predict_patient(patient_data):
    processed_data = preprocess_input(patient_data)
    
    # Model Score (20% weight)
    try:
        model_prob = model.predict_proba(processed_data)[0][1]
    except:
        model_prob = 0
    
    # Clinical Heuristics (80% weight - Explainable logic)
    clinical_score = 0
    
    # History indicators
    num_inpatient = int(patient_data.get("number_inpatient", 0))
    if num_inpatient >= 3: clinical_score += 0.5
    elif num_inpatient >= 1: clinical_score += 0.2
    
    if int(patient_data.get("number_emergency", 0)) > 0: clinical_score += 0.15
    
    # Complexity indicators
    if int(patient_data.get("num_medications", 0)) > 20: clinical_score += 0.15
    if int(patient_data.get("number_diagnoses", 0)) > 8: clinical_score += 0.1
    
    # Lab/Meds indicators
    if patient_data.get("A1Cresult") in [">8", ">7"]: clinical_score += 0.15
    if patient_data.get("insulin") == "Up": clinical_score += 0.1
    
    # Combine
    final_prob = (model_prob * 0.2) + min(clinical_score, 0.95)
    
    risk_level, recommendation = get_risk_level(final_prob)
    
    return {
        "prediction": 1 if final_prob > 0.4 else 0,
        "probability": round(float(final_prob), 4),
        "risk_level": risk_level,
        "recommendation": recommendation,
        "clinical_indicators": {
            "high_utilization": num_inpatient > 2,
            "polypharmacy": int(patient_data.get("num_medications", 0)) > 20,
            "poor_glycemic_control": patient_data.get("A1Cresult") in [">8", ">7"]
        }
    }
