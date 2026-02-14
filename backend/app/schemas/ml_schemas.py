"""ML-specific schemas for model management and inference."""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel


class ModelVersionOut(BaseModel):
    id: int
    model_type: str
    version: str
    file_path: str
    accuracy: Optional[float] = None
    precision_score: Optional[float] = None
    recall_score: Optional[float] = None
    f1_score: Optional[float] = None
    is_active: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ModelDeployRequest(BaseModel):
    environment: str = "production"


class ModelPerformanceOut(BaseModel):
    model_type: str
    model_version: str
    accuracy: Optional[float] = None
    precision_score: Optional[float] = None
    recall_score: Optional[float] = None
    f1_score: Optional[float] = None
    prediction_count: Optional[int] = None
    drift_score: Optional[float] = None

    class Config:
        from_attributes = True


class ComprehensiveAnalysis(BaseModel):
    disease: Dict[str, Any] = {}
    pests: List[Dict[str, Any]] = []
    affected_area_percentage: Optional[float] = None
    nutrient_status: Dict[str, Any] = {}
    overall_health_score: Optional[float] = None
    recommended_actions: List[str] = []
    explanations: Dict[str, Any] = {}
