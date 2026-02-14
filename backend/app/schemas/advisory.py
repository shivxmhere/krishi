"""Advisory schemas."""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class AdvisoryRequest(BaseModel):
    query: str
    crop_name: Optional[str] = None
    location: Optional[str] = None


class AdvisoryResponse(BaseModel):
    id: int
    query: str
    response: str
    agent_used: Optional[str] = None
    sources: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
