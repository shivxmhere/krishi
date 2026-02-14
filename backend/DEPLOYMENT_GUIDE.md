# Deployment Guide for Krishi Backend

## Prerequisites
- Docker & Docker Compose
- Render Account (for production)
- PostgreSQL (if not using SQLite)

## Local Deployment
1. **Navigate to backend:**
   ```powershell
   cd backend
   ```
2. **Create .env:**
   Copy `.env.example` to `.env`.
3. **Build & Run:**
   ```powershell
   docker-compose up --build
   ```
   Access at `http://localhost:8000/docs`.

## Database Migration
We use Alembic for migrations.
```powershell
# Inside the container
docker-compose exec backend alembic revision --autogenerate -m "Initial migration"
docker-compose exec backend alembic upgrade head
```

## Render Deployment
1. **Create Web Service** on Render.
2. **Connect Repo**.
3. **Environment:** `Python 3`.
4. **Build Command:** `pip install -r requirements.txt`.
5. **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
6. **Environment Variables:**
   - `PYTHON_VERSION`: `3.11.0`
   - `DATABASE_URL`: (Your connection string)
   - `SECRET_KEY`: (Secure random string)

## Health Check
Endpoint: `/health`
Returns: `{"status": "healthy"}`
