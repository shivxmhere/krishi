"""ML model version tracking ORM."""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class MLModelVersion(Base):
    __tablename__ = "ml_model_versions"

    id = Column(Integer, primary_key=True, index=True)
    model_type = Column(String, index=True, nullable=False)  # disease, pest, etc.
    version = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    accuracy = Column(Float)
    precision_score = Column(Float)
    recall_score = Column(Float)
    f1_score = Column(Float)
    is_active = Column(Boolean, default=False)
    parameters = Column(Text)  # JSON of training hyper-params
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
