"""Periodic model performance snapshot."""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class ModelPerformance(Base):
    __tablename__ = "model_performance"

    id = Column(Integer, primary_key=True, index=True)
    model_type = Column(String, index=True)
    model_version = Column(String)
    accuracy = Column(Float)
    precision_score = Column(Float)
    recall_score = Column(Float)
    f1_score = Column(Float)
    prediction_count = Column(Integer)
    drift_score = Column(Float)
    period_start = Column(DateTime(timezone=True))
    period_end = Column(DateTime(timezone=True))
    details = Column(Text)  # JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())
