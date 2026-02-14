"""Crop schemas."""
from typing import Optional
from pydantic import BaseModel


class CropCreate(BaseModel):
    name: str
    description: Optional[str] = None
    optimal_temp_min: Optional[float] = None
    optimal_temp_max: Optional[float] = None
    optimal_humidity: Optional[float] = None
    water_requirements: Optional[str] = None
    growth_duration_days: Optional[int] = None


class CropUpdate(CropCreate):
    name: Optional[str] = None


class CropOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    optimal_temp_min: Optional[float] = None
    optimal_temp_max: Optional[float] = None
    optimal_humidity: Optional[float] = None
    water_requirements: Optional[str] = None
    growth_duration_days: Optional[int] = None
    owner_id: Optional[int] = None

    class Config:
        from_attributes = True
