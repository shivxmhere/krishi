"""Scan / detection record ORM model."""
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_path = Column(String)
    detected_disease = Column(String)
    confidence = Column(Float)
    model_version = Column(String)
    processing_time_ms = Column(Float)
    explanation_path = Column(String)  # path to Grad-CAM image
    raw_predictions = Column(Text)  # JSON of top-k predictions
    created_at = Column(DateTime(timezone=True), server_default=func.now())
