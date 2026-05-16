# GlucoGuard AI - Medical SaaS Platform

A professional, monolithic Flask-based AI healthcare platform designed for synchronized clinical monitoring and patient recovery tracking.

---

## 🛠 Project Architecture
- **Backend**: Flask (Python)
- **Database**: SQLite (SQLAlchemy ORM)
- **ML Services**: Scikit-learn / XGBoost based risk scoring
- **Deployment**: Dockerized, optimized for Render/Heroku

---

## 🚀 Local Development

### 1. Prerequisites
- Python 3.11+
- Docker (optional)

### 2. Manual Setup
```bash
# Clone the repository
git clone <repo-url>
cd Hospital-Read-Mission-Risk-Scorer

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run the app
python app.py
```

### 3. Docker Setup (Recommended)
```bash
# Build the image
docker build -t hospital-risk-app .

# Run the container
docker run -p 8000:8000 --env-file .env hospital-risk-app
```

---

## 🌐 Deployment Guide (Render)

This project is pre-configured for one-click deployment on **Render**.

### Step-by-Step Instructions
1. **Push to GitHub**: Ensure your code is in a public or private GitHub repository.
2. **Create New Web Service**:
   - Log in to [Render](https://render.com).
   - Click **New +** > **Web Service**.
   - Connect your GitHub repository.
3. **Configure Service**:
   - **Environment**: `Docker`
   - **Region**: Choose the closest region.
   - **Plan**: Free (or Starter for persistence).
4. **Environment Variables**:
   - Add `SECRET_KEY`: A long random string.
   - (Optional) `DATABASE_URL`: If using an external database.
5. **Deploy**: Render will automatically build the Docker image and deploy your service.

> [!IMPORTANT]
> **Persistence Note**: On Render's Free tier, the SQLite database (`healthcare.db`) is ephemeral. Data will reset on every restart. For production use, attach a **Render Disk** or use a managed **PostgreSQL** instance.

---

## 🧠 MLOps & Reproducibility
This project implements key MLOps principles to ensure it is "Hackathon Ready":

- **Reproducibility**: By using Docker, we guarantee the app runs identically in development, staging, and production. No more "it works on my machine."
- **Portability**: The containerized structure allows the backend to be moved to AWS, Google Cloud, or Azure with zero code changes.
- **Dependency Management**: Strict versioning in `requirements.txt` prevents "breaking changes" during deployment.
- **Environment Isolation**: Secrets and configurations are managed via environment variables, adhering to **Twelve-Factor App** best practices.

---

## 📁 Project Structure
- `app.py`: Main Flask entry point and API routes.
- `backend/models/`: SQLAlchemy database models.
- `backend/services/`: ML logic and monitoring services.
- `templates/`: Frontend UI (HTML/CSS/JS).
- `Dockerfile`: Production container definition.
- `.env.example`: Template for environment secrets.

---

## 🛡 License
Distributed under the MIT License. See `LICENSE` for more information.
