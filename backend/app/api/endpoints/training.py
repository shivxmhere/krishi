"""Training job management."""
from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_admin_user
from app.schemas.training_schemas import TrainingRequest, TrainingStatusOut
from app.services.training_service import TrainingService
from app.models.user import User

router = APIRouter()
training_service = TrainingService()


@router.post("/start", response_model=TrainingStatusOut)
def start_training_job(
    *,
    db: Session = Depends(get_db),
    request: TrainingRequest,
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """Start a new model training job (Admin only)."""
    job = training_service.start_training(db, request)
    return job


@router.get("/{job_id}", response_model=TrainingStatusOut)
def get_training_status(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """Get status of a training job."""
    job = training_service.get_job_status(db, job_id)
    if not job:
        return {"status": "not_found", "job_id": job_id}
    return job
