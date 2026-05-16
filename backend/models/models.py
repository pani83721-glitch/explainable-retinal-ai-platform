from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
from backend.db.database import Base
import datetime

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(String)
    gender = Column(String)
    patient_id = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    predictions = relationship("Prediction", back_populates="patient")
    daily_reports = relationship("DailyReport", back_populates="patient")
    alerts = relationship("Alert", back_populates="patient")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    risk_score = Column(Float)
    risk_level = Column(String) # Green, Yellow, Red
    recommendation = Column(String)
    features = Column(JSON) # Store the input features used for prediction
    is_initial_discharge = Column(Boolean, default=True) # True for discharge, False for reassessment
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="predictions")

class DailyReport(Base):
    __tablename__ = "daily_reports"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    sugar_level = Column(Float)
    fatigue_level = Column(Integer) # 1-10
    medicine_taken = Column(Boolean)
    dizziness = Column(Boolean)
    symptoms = Column(String)
    condition_description = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="daily_reports")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    alert_type = Column(String) # e.g., "Worsening Condition", "High Glucose"
    severity = Column(String) # Green, Yellow, Red
    message = Column(String)
    is_resolved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="alerts")

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
