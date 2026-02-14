"""Advisory and RAG chat endpoints."""
from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.schemas.advisory import AdvisoryRequest, AdvisoryResponse
from app.ai.agents.orchestrator import AgentOrchestrator
from app.models.user import User
from app.models.advisory import Advisory

router = APIRouter()
orchestrator = AgentOrchestrator()


@router.post("/chat", response_model=AdvisoryResponse)
async def chat_advisory(
    *,
    db: Session = Depends(get_db),
    request: AdvisoryRequest,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Chat with the agricultural AI advisor."""
    context = {"location": request.location, "crop": request.crop_name}
    
    # Process via orchestrator
    result = await orchestrator.route_query(request.query, context)
    
    # Save interaction
    advisory = Advisory(
        user_id=current_user.id,
        crop_name=request.crop_name,
        query=request.query,
        response=str(result),
        sources=str(result.get("sources", []))
    )
    db.add(advisory)
    db.commit()
    
    return {
        "query": request.query,
        "response": str(result.get("response") or result),
        "sources": result.get("sources", []),
        "recommended_actions": result.get("recommendations", [])
    }
