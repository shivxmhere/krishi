"""Inference log ORM model – tracks every prediction for monitoring."""
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class InferenceLog(Base):
    __tablename__ = "inference_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    model_type = Column(String, index=True)
    model_version = Column(String)
    prediction = Column(String)
    confidence = Column(Float)
    ground_truth = Column(String)  # filled later for feedback
    processing_time_ms = Column(Float)
    input_metadata = Column(Text)  # JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())
