# GlucoGuard AI - Medical SaaS Platform

A professional, monolithic Flask-based AI healthcare platform designed for synchronized clinical monitoring and patient recovery tracking.

## 🚀 Quick Start for Developers

### 1. Prerequisites
Ensure you have **Python 3.8+** installed on your system.

### 2. Installation
Clone the repository and install the required dependencies:
```bash
# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup
The platform uses **SQLite** for simplicity. You do **not** need to manually create the database.
- **Auto-Initialization**: When you run `app.py` for the first time, it automatically creates `healthcare.db` and all necessary tables.
- **Default Credentials**: An admin account is automatically seeded:
  - **Username**: `admin`
  - **Password**: `admin123`

### 4. Running the App
Start the Flask server:
```bash
python app.py
```
The app will be available at `http://127.0.0.1:5000`.

---

## 🛠 Database Management & Inspection

To help you verify that the data is being stored correctly (patients, reports, AI alerts), use the built-in inspection script:

```bash
python db_check.py
```
This will print a summary of all tables, columns, and the last 5 entries in each table directly to your console.

---

## 🛡 Features
- **Dual-Portal Access**: Secure role-based login for Admins and Patients.
- **AI Risk Engine**: Real-time analysis of patient daily reports.
- **Synchronized Timeline**: A unified activity stream merging reports, AI assessments, and clinical alerts.
- **Medical SaaS UI**: High-fidelity dashboard using Tailwind CSS and modern typography.

## 📁 Project Structure
- `app.py`: Main entry point and API routes.
- `backend/models/`: SQLAlchemy database models.
- `backend/services/`: ML logic and monitoring services.
- `templates/`: Frontend UI (HTML/CSS/JS).
- `healthcare.db`: The SQLite database file (generated on first run).
