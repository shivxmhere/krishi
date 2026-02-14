"""Celery tasks for async processing."""
import logging
from app.worker.celery_app import celery_app
from app.services.training_service import TrainingService
from app.database import SessionLocal
from app.models.training_job import TrainingJob

logger = logging.getLogger(__name__)


@celery_app.task(bind=True)
def train_model_task(self, job_id: str):
    logger.info(f"Starting training task for job {job_id}")
    db = SessionLocal()
    try:
        service = TrainingService()
        job = service.get_job_status(db, job_id)
        if not job:
            logger.error(f"Job {job_id} not found")
            return

        # Update status to running
        service.update_job_status(db, job_id, "running")

        # Simulate training process (replace with actual trainer.train call)
        # trainer = ModelTrainer(job.model_type)
        # result = trainer.train(...)
        
        import time
        time.sleep(10)  # Mock training time
        
        # Update status to completed
        service.update_job_status(db, job_id, "completed", metrics={"accuracy": 0.95})
        logger.info(f"Training task {job_id} completed")
        
    except Exception as exc:
        logger.error(f"Training task failed: {exc}")
        service.update_job_status(db, job_id, "failed")
    finally:
        db.close()
