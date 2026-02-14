"""Training job ORM model."""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class TrainingJob(Base):
    __tablename__ = "training_jobs"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, unique=True, index=True, nullable=False)
    model_type = Column(String, nullable=False)
    status = Column(String, default="queued")  # queued/training/completed/failed/stopped
    progress = Column(Float, default=0.0)
    current_epoch = Column(Integer, default=0)
    total_epochs = Column(Integer)
    current_accuracy = Column(Float)
    current_loss = Column(Float)
    hyperparameters = Column(Text)  # JSON
    result_metrics = Column(Text)  # JSON
    model_path = Column(String)
    error_message = Column(Text)
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
