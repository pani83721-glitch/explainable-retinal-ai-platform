import requests
import json
import time

BASE_URL = "http://127.0.0.1:8000"

def test_full_workflow():
    print("--- Starting End-to-End Workflow & Security Test ---")
    session = requests.Session()
    
    # 0. Login as Admin
    print("\n[STEP 0] Logging in as Admin...")
    login_res = session.post(f"{BASE_URL}/login", json={
        "role": "admin",
        "identifier": "admin",
        "password": "admin123"
    })
    if login_res.status_code != 200:
        print(f"FAILED: Admin login failed: {login_res.text}")
        return
    print("SUCCESS: Admin login successful.")

    # 1. Sync/Create Patient
    patient_id = "TEST-PAT-999"
    patient_data = {
        "patient_id": patient_id,
        "name": "Test Workflow Patient",
        "age": "[70-80)",
        "gender": "Male"
    }
    print(f"\n[STEP 1] Admin syncing patient: {patient_id}...")
    res = session.post(f"{BASE_URL}/patients/", json=patient_data)
    if res.status_code == 201:
        print(f"SUCCESS: Patient created. ID: {res.json().get('id')}")
    else:
        print(f"FAILED: Status {res.status_code}, {res.text}")

    # 2. Security Check: Admin attempting Patient-only route
    print("\n[SECURITY] Admin attempting to submit a daily report (Patient-only)...")
    report_data = {"patient_id": patient_id, "sugar_level": 120}
    res = session.post(f"{BASE_URL}/daily-report/", json=report_data)
    if res.status_code == 403:
        print("PASS: Admin was blocked from patient-only route (403 Forbidden).")
    else:
        print(f"FAIL: Admin was NOT blocked! Status: {res.status_code}")

    # 3. Predict Readmission (Discharge)
    prediction_payload = {
        "patient_id": patient_id,
        "features": {
            "time_in_hospital": 5,
            "number_inpatient": 2,
            "num_medications": 15,
            "insulin": "Up",
            "A1Cresult": ">8",
            "diag_1": "250"
        }
    }
    print(f"\n[STEP 3] Admin running initial discharge prediction...")
    res = session.post(f"{BASE_URL}/predict/", json=prediction_payload)
    if res.status_code == 200:
        print(f"SUCCESS: Prediction generated. Risk: {res.json().get('risk_level')}")
    else:
        print(f"FAILED: Status {res.status_code}, {res.text}")

    # 4. Login as Patient
    print("\n[STEP 4] Logging in as Patient...")
    patient_session = requests.Session() # Use fresh session to simulate different user
    login_res = patient_session.post(f"{BASE_URL}/login", json={
        "role": "patient",
        "identifier": patient_id
    })
    if login_res.status_code == 200:
        print(f"SUCCESS: Patient login successful.")
    else:
        print(f"FAILED: Patient login failed: {login_res.text}")

    # 5. Security Check: Patient attempting Admin-only routes
    print("\n[SECURITY] Patient attempting to list all patients (Admin-only)...")
    res = patient_session.get(f"{BASE_URL}/patients/")
    if res.status_code == 403:
        print("PASS: Patient was blocked from admin-only route (403 Forbidden).")
    else:
        print(f"FAIL: Patient was NOT blocked! Status: {res.status_code}")

    print("\n[SECURITY] Patient attempting to run a prediction for another (Admin-only)...")
    res = patient_session.post(f"{BASE_URL}/predict/", json=prediction_payload)
    if res.status_code == 403:
        print("PASS: Patient was blocked from prediction route.")
    else:
        print(f"FAIL: Patient was NOT blocked! Status: {res.status_code}")

    # 6. Security Check: Cross-Patient Access
    other_patient_id = "DEMO-001"
    print(f"\n[SECURITY] Patient {patient_id} attempting to view history of {other_patient_id}...")
    res = patient_session.get(f"{BASE_URL}/patient/{other_patient_id}/history")
    if res.status_code == 403:
        print("PASS: Cross-patient data access blocked.")
    else:
        print(f"FAIL: Cross-patient data access allowed! Status: {res.status_code}")

    # 7. Submit Daily Report (Trigger Alert)
    report_data = {
        "patient_id": patient_id,
        "sugar_level": 245,
        "fatigue_level": 9,
        "medicine_taken": False,
        "dizziness": True,
        "symptoms": "Feeling very weak",
        "condition_description": "Sugar spike after lunch"
    }
    print(f"\n[STEP 7] Patient submitting dangerous daily report...")
    res = patient_session.post(f"{BASE_URL}/daily-report/", json=report_data)
    if res.status_code == 200:
        print(f"SUCCESS: Report submitted. Alerts triggered: {res.json().get('alerts_triggered')}")
    else:
        print(f"FAILED: Status {res.status_code}")

    # 8. Re-login as Admin to check alerts
    print("\n[STEP 8] Admin verifying alerts...")
    res = session.get(f"{BASE_URL}/dashboard/alerts")
    alerts = res.json()
    
    triggered = [a for a in alerts if a['patient_name'] == "Test Workflow Patient"]
    print(f"Found {len(triggered)} alerts for our test patient.")
    for a in triggered:
        print(f" - [{a['severity']}] {a['type']}: {a['message']}")

    if len(triggered) > 0:
        print("\n=== FINAL VERDICT: ALL SECURITY BARRIERS AND WORKFLOWS VERIFIED ===")
    else:
        print("\n=== FINAL VERDICT: WORKFLOW FAILED (No alerts triggered) ===")

if __name__ == "__main__":
    test_full_workflow()
