"""Market endpoints."""
from typing import Any
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.services.market_service import MarketService
from app.models.user import User

router = APIRouter()
market_service = MarketService()


@router.get("/prices")
async def get_market_prices(
    state: str,
    commodity: str,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Get market prices for a commodity."""
    return await market_service.get_prices(commodity, state)
