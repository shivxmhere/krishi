"""Training pipeline schemas."""
from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel


class TrainingRequest(BaseModel):
    model_type: str
    epochs: int = 100
    batch_size: int = 32
    learning_rate: float = 0.001
    dataset_path: Optional[str] = None
    hyperparameters: Optional[Dict[str, Any]] = None


class TrainingStatusOut(BaseModel):
    job_id: str
    model_type: str
    status: str
    progress: float = 0.0
    current_epoch: int = 0
    total_epochs: Optional[int] = None
    current_accuracy: Optional[float] = None
    current_loss: Optional[float] = None
    error_message: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TrainingResultOut(BaseModel):
    job_id: str
    status: str
    final_accuracy: Optional[float] = None
    final_loss: Optional[float] = None
    model_path: Optional[str] = None
    result_metrics: Optional[Dict[str, Any]] = None
