"""Celery worker configuration."""
from celery import Celery
from app.config import settings

celery_app = Celery(
    "krishi_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.task_routes = {
    "app.worker.tasks.train_model_task": "training-queue",
    "app.worker.tasks.generate_report_task": "reporting-queue",
}

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)
