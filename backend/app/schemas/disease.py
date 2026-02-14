"""Disease schemas."""
from typing import Optional
from pydantic import BaseModel


class DiseaseOut(BaseModel):
    id: int
    name: str
    scientific_name: Optional[str] = None
    description: Optional[str] = None
    symptoms: Optional[str] = None
    treatment: Optional[str] = None
    prevention: Optional[str] = None
    severity: Optional[str] = None

    class Config:
        from_attributes = True
