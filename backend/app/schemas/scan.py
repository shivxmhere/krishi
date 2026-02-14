"""Scan schemas."""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel


class ScanResult(BaseModel):
    detected_disease: str
    confidence: float
    model_version: str
    processing_time_ms: float
    top_predictions: List[Dict[str, Any]] = []
    explanation_url: Optional[str] = None


class ScanOut(BaseModel):
    id: int
    user_id: int
    image_path: Optional[str] = None
    detected_disease: Optional[str] = None
    confidence: Optional[float] = None
    model_version: Optional[str] = None
    processing_time_ms: Optional[float] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
