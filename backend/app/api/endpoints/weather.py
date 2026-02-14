"""Weather endpoints."""
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from app.services.weather_service import WeatherService
from app.models.user import User

router = APIRouter()
weather_service = WeatherService()


@router.get("/")
async def get_weather(
    location: str,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Get current weather for a location."""
    return await weather_service.get_current_weather(location)
