"""AI tools – web search stub."""
import logging
logger = logging.getLogger(__name__)

async def search_agriculture(query: str):
    return {"results": [{"title": f"Agricultural info: {query}", "snippet": "..."}]}
