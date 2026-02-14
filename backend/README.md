# Krishi Backend

Enterprise-grade AI Agricultural Intelligence Platform Backend.

## Features
- **Multi-Model ML**: Disease detection, pest identification, yield prediction.
- **AI Agents**: RAG-powered advisory, weather, market, fertilizer agents.
- **Secure API**: JWT auth, rate limiting, role-based access.
- **Production Ready**: Docker, Celery workers, PostgreSQL, Redis.

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and fill in API keys.

3. **Run Locally**:
   ```bash
   uvicorn app.main:app --reload
   ```

4. **Run with Docker**:
   ```bash
   docker-compose up --build
   ```

## Documentation
- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure
- `app/api`: API endpoints
- `app/ml`: Machine Learning models & pipelines
- `app/ai`: AI Agents & RAG system
- `app/services`: Business logic
- `app/models`: Database ORM
- `app/schemas`: Pydantic schemas
