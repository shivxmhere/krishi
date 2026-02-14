from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from datetime import datetime
import tensorflow as tf
import os

from app.database import get_db

router = APIRouter()

@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """Comprehensive health check endpoint"""
    checks = {
        "timestamp": datetime.utcnow().isoformat(),
        "status": "healthy",
        "services": {}
    }
    
    # Database
    try:
        db.execute(text("SELECT 1"))
        checks["services"]["database"] = "healthy"
    except Exception as e:
        checks["services"]["database"] = f"unhealthy: {str(e)}"
        checks["status"] = "degraded"
    
    # ML Model
    model_path = os.getenv("DISEASE_MODEL_PATH", "disease_model.h5")
    if os.path.exists(model_path):
        checks["services"]["ml_model"] = "healthy"
    else:
        checks["services"]["ml_model"] = "unhealthy: model file missing"
        checks["status"] = "degraded"
        
    return checks

@router.get("/health/ready")
async def readiness_check():
    return {"status": "ready"}
