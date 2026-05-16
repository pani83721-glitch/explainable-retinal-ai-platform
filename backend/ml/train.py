import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import recall_score, f1_score, roc_auc_score, classification_report
import os

def load_and_filter_data(filepath):
    df = pd.read_csv(filepath)
    
    # 1. Diabetes as primary diagnosis (ICD-9 250.xx)
    df = df[df['diag_1'].str.startswith('250', na=False)]
    
    # 2. Adults aged 50 years and older
    target_ages = ['[50-60)', '[60-70)', '[70-80)', '[80-90)', '[90-100)']
    df = df[df['age'].isin(target_ages)]
    
    # 3. Active diabetes medication usage
    df = df[df['diabetesMed'] == 'Yes']
    
    # 4. Insulin treatment OR medication changes
    df = df[(df['insulin'] != 'No') | (df['change'] == 'Ch')]
    
    # 5. Hospital stay duration at least 3 days
    df = df[df['time_in_hospital'] >= 3]
    
    # 6. At least one previous inpatient visit
    df = df[df['number_inpatient'] >= 1]
    
    # 7. Exclude death/hospice discharge patients
    # Common IDs for death/hospice: 11, 13, 14, 19, 20, 21
    excluded_disposition = [11, 13, 14, 19, 20, 21]
    df = df[~df['discharge_disposition_id'].isin(excluded_disposition)]
    
    return df

def preprocess_data(df):
    # Target: readmitted. Convert to binary (readmitted within 30 days or >30 days vs No)
    # The prompt asks for readmission prediction.
    df['target'] = df['readmitted'].apply(lambda x: 1 if x != 'NO' else 0)
    
    # Selected features based on clinical relevance and prompt requirements
    features = [
        'age', 'time_in_hospital', 'num_lab_procedures', 'num_procedures',
        'num_medications', 'number_outpatient', 'number_emergency', 
        'number_inpatient', 'diag_1', 'number_diagnoses', 'max_glu_serum', 
        'A1Cresult', 'metformin', 'repaglinide', 'nateglinide', 'chlorpropamide',
        'glimepiride', 'acetohexamide', 'glipizide', 'glyburide', 'tolbutamide',
        'pioglitazone', 'rosiglitazone', 'acarbose', 'miglitol', 'troglitazone',
        'tolazamide', 'examide', 'citoglipton', 'insulin',
        'glyburide-metformin', 'glipizide-metformin', 'glimepiride-pioglitazone',
        'metformin-rosiglitazone', 'metformin-pioglitazone', 'change', 'diabetesMed'
    ]
    
    X = df[features].copy()
    y = df['target']
    
    # Handle categorical variables
    le_dict = {}
    for col in X.select_dtypes(include=['object']).columns:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        le_dict[col] = le
        
    return X, y, le_dict

def train_and_evaluate():
    data_path = os.path.join('dataset', 'diabetic_data.csv')
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found.")
        return

    df = load_and_filter_data(data_path)
    X, y, encoders = preprocess_data(df)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, class_weight='balanced'),
        "Random Forest": RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42),
        "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    }
    
    best_model = None
    best_score = -1
    best_name = ""
    
    for name, model in models.items():
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        y_prob = model.predict_proba(X_test_scaled)[:, 1]
        
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        auc = roc_auc_score(y_test, y_prob)
        
        print(f"\n--- {name} ---")
        print(f"Recall: {recall:.4f}")
        print(f"F1-Score: {f1:.4f}")
        print(f"ROC-AUC: {auc:.4f}")
        
        # We prioritize Recall and AUC for healthcare
        score = (recall + auc) / 2
        if score > best_score:
            best_score = score
            best_model = model
            best_name = name

    print(f"\nBest Model Selected: {best_name}")
    
    # Save model and metadata
    save_path = os.path.join('backend', 'ml', 'saved_models')
    os.makedirs(save_path, exist_ok=True)
    
    joblib.dump(best_model, os.path.join(save_path, 'best_model.joblib'))
    joblib.dump(scaler, os.path.join(save_path, 'scaler.joblib'))
    joblib.dump(encoders, os.path.join(save_path, 'encoders.joblib'))
    joblib.dump(X.columns.tolist(), os.path.join(save_path, 'feature_names.joblib'))
    
    print("Model and preprocessing artifacts saved.")

if __name__ == "__main__":
    train_and_evaluate()
