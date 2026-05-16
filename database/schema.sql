-- SQLite Database Schema for AI Healthcare System

-- Patients Table: Stores basic demographic information
CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age TEXT NOT NULL,
    gender TEXT NOT NULL,
    patient_id TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Predictions Table: Stores ML risk assessments (Discharge & Reassessment)
CREATE TABLE predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    risk_score FLOAT NOT NULL,
    risk_level TEXT NOT NULL, -- Green, Yellow, Red
    recommendation TEXT NOT NULL,
    features JSON NOT NULL, -- Store full input feature set
    is_initial_discharge BOOLEAN DEFAULT 1, -- 1 for Discharge, 0 for Reassessment
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
);

-- Daily Reports Table: Stores patient-submitted health vitals
CREATE TABLE daily_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    sugar_level FLOAT NOT NULL,
    fatigue_level INTEGER NOT NULL, -- Scale 1-10
    medicine_taken BOOLEAN NOT NULL,
    dizziness BOOLEAN NOT NULL,
    symptoms TEXT,
    condition_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
);

-- Alerts Table: Stores system-generated safety alerts
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    alert_type TEXT NOT NULL, -- e.g., "High Glucose", "Worsening Trend"
    severity TEXT NOT NULL, -- Green, Yellow, Red
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
);

-- Admins Table: Stores system administrator credentials
CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);
