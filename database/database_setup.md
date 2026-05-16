# Database Documentation: AI Healthcare Safety System

This document explains the SQLite database setup, schema, and integration for the AI Readmission Prediction and Continuous Patient Safety Monitoring System.

## 1. Overview
The system uses **SQLite** for data persistence. It stores patient demographics, machine learning risk predictions, daily health reports, and system-generated alerts.

## 2. Database Schema Explanation

### Tables:

1.  **`patients`**: Stores core patient identification.
    *   `patient_id`: Unique identifier (e.g., Hospital ID).
    *   `name`, `age`, `gender`: Basic demographics used in ML features.

2.  **`predictions`**: Stores outcomes from the Machine Learning model.
    *   `risk_score`: Probability (0.0 to 1.0).
    *   `risk_level`: Green (Low), Yellow (Medium), Red (High).
    *   `is_initial_discharge`: Flag to distinguish between the first prediction at discharge and subsequent reassessments triggered by monitoring.
    *   `features`: JSON blob of all input parameters used for that specific prediction.

3.  **`daily_reports`**: Stores daily vitals submitted by patients.
    *   `sugar_level`, `fatigue_level`, `medicine_taken`, `dizziness`: Fields used by the rule-based monitoring logic.

4.  **`alerts`**: Stores safety notifications.
    *   Triggered whenever the Monitoring Logic detects a dangerous trend or a "Red" risk escalation.

5.  **`admins`**: Stores credentials for system administrators.
    *   `username`: Unique login identifier.
    *   `hashed_password`: Securely stored password.

## 3. Relationships
*   A **Patient** has many **Predictions**.
*   A **Patient** has many **DailyReports**.
*   A **Patient** has many **Alerts**.
*   All tables link back to `patients.id` via Foreign Keys.

## 4. Initialization and Setup

### Automatic Initialization
The backend is configured to automatically create the database file (`healthcare.db`) and all required tables when it starts.

**Step-by-step to run:**
1.  Navigate to the project root.
2.  Install requirements: `pip install -r requirements.txt`
3.  Run the application: `python app.py`
4.  The system will check for `healthcare.db`. If it doesn't exist, it will create it using the SQLAlchemy models defined in `backend/models/models.py`.

### Manual Schema Creation
If you wish to create the database manually using SQL:
1.  Open your terminal or a SQLite browser.
2.  Execute the commands provided in `database/schema.sql`.

## 5. API-Database Workflow
1.  **Discharge**: User submits the Prediction Form -> API (in `app.py`) saves a `Patient` -> ML runs -> API saves a `Prediction`.
2.  **Monitoring**: Patient submits a Daily Report -> API saves a `DailyReport` -> Monitoring Service runs logic -> If rules match, API saves an `Alert` and triggers the ML model again for a new `Prediction`.
3.  **Dashboard**: Admin Dashboard fetches data from `/dashboard/alerts` and `/patients/` endpoints to show real-time safety status.

## 6. Testing the Workflow
A test script `test_workflow.py` is provided in the root directory to automate the verification of the integrated system.

### Running the Test:
1.  **Start the Server**: `python app.py`
2.  **Execute Test**: Open a separate terminal and run `python test_workflow.py`.

### What the test verifies:
*   **Patient Sync**: Creation of a new patient record and verification of demographic storage.
*   **Initial Prediction**: Execution of the ML model at discharge and storage of the risk score/recommendation.
*   **Monitoring Trigger**: Submission of a high-risk daily report (e.g., sugar > 200 mg/dL, missed medication).
*   **Alert Generation**: Verification that the system identifies dangerous trends and populates the dashboard with appropriate alerts.
*   **Risk Escalation**: Verification that a reassessment prediction is triggered automatically when patient vitals deteriorate.
