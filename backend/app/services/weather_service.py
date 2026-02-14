"""Weather Service Integration."""
import httpx
import logging
from typing import Dict, Any
from app.config import settings
from app.core.cache import cache_get, cache_set

logger = logging.getLogger(__name__)


class WeatherService:
    async def get_current_weather(self, location: str) -> Dict[str, Any]:
        cache_key = f"weather:{location}"
        cached = cache_get(cache_key)
        if cached:
            return cached

        if not settings.WEATHER_API_KEY:
            return self._mock_weather(location)

        try:
            url = f"{settings.WEATHER_API_URL}/weather"
            params = {"q": location, "appid": settings.WEATHER_API_KEY, "units": "metric"}
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, params=params)
                resp.raise_for_status()
                data = resp.json()
                
            result = {
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "condition": data["weather"][0]["description"],
                "location": data["name"]
            }
            cache_set(cache_key, result, ttl=settings.WEATHER_CACHE_TTL_SECONDS)
            return result
        except Exception as exc:
            logger.error(f"Weather API error: {exc}")
            return self._mock_weather(location)

    def _mock_weather(self, location: str) -> Dict[str, Any]:
        return {
            "temperature": 28.5,
            "humidity": 65,
            "condition": "partly cloudy (mock)",
            "location": location
        }
