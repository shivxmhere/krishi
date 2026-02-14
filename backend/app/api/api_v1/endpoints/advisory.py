from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.Advisory)
def create_advisory(
    *,
    db: Session = Depends(deps.get_db),
    advisory_in: schemas.AdvisoryCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get AI advisory.
    """
    # Mock AI response logic
    # In production, this would call OpenAI or a local LLM
    query_lower = advisory_in.query.lower()
    response = "I am an AI assistant. I can help you with crop management. "
    
    if "tomato" in query_lower:
        response += "For tomatoes, ensure consistent watering to prevent blossom end rot."
    elif "potato" in query_lower:
        response += "Watch out for late blight in potatoes during humid weather."
    else:
        response += "Could you please provide more details about your crop?"

    advisory = models.Advisory(
        query=advisory_in.query,
        response=response, # Use the generated response
        user_id=current_user.id
    )
    db.add(advisory)
    db.commit()
    db.refresh(advisory)
    return advisory

@router.get("/", response_model=List[schemas.Advisory])
def read_advisories(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve advisory history.
    """
    advisories = db.query(models.Advisory).filter(
        models.Advisory.user_id == current_user.id
    ).order_by(models.Advisory.created_at.desc()).offset(skip).limit(limit).all()
    return advisories
