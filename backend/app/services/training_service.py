"""Training Service – manages training jobs."""
from sqlalchemy.orm import Session
from typing import Dict, Any, Optional

from app.models.training_job import TrainingJob
from app.ml.training.trainer import ModelTrainer
from app.schemas.training_schemas import TrainingRequest


class TrainingService:
    def start_training(self, db: Session, request: TrainingRequest) -> TrainingJob:
        # Create trainer instance
        trainer = ModelTrainer(request.model_type)
        
        # Create DB record
        job = TrainingJob(
            job_id=trainer.job_id,
            model_type=request.model_type,
            status="queued",
            total_epochs=request.epochs,
            hyperparameters=str(request.hyperparameters) if request.hyperparameters else None
        )
        db.add(job)
        db.commit()
        db.refresh(job)

        # In a real app, offload to Celery here.
        # For now, we will just return the job info. 
        # actual training triggering would happen in the worker.
        return job

    def get_job_status(self, db: Session, job_id: str) -> Optional[TrainingJob]:
        return db.query(TrainingJob).filter(TrainingJob.job_id == job_id).first()

    def update_job_status(self, db: Session, job_id: str, status: str, metrics: Dict[str, Any] = None):
        job = self.get_job_status(db, job_id)
        if job:
            job.status = status
            if metrics:
                job.current_epoch = metrics.get("epoch", job.current_epoch)
                job.current_accuracy = metrics.get("accuracy", job.current_accuracy)
                job.current_loss = metrics.get("loss", job.current_loss)
            db.commit()
