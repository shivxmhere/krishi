"""External API caller tool."""
import logging
import httpx

logger = logging.getLogger(__name__)


async def call_external_api(url: str, params: dict = None, headers: dict = None) -> dict:
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.get(url, params=params, headers=headers)
            resp.raise_for_status()
            return resp.json()
    except Exception as exc:
        logger.error("External API call failed: %s", exc)
        return {"error": str(exc)}
