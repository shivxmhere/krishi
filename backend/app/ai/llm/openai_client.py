"""OpenAI client wrapper."""
import logging
from typing import Optional, List, Dict, Any
from app.config import settings

logger = logging.getLogger(__name__)


class OpenAIClient:
    def __init__(self):
        self.client = None
        if settings.OPENAI_API_KEY:
            try:
                from openai import OpenAI
                self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
            except ImportError:
                pass

    async def chat(self, messages: List[Dict[str, str]], max_tokens: int = None) -> str:
        if not self.client:
            return "[Mock] OpenAI unavailable – returning mock response."
        resp = self.client.chat.completions.create(
            model=settings.OPENAI_MODEL, messages=messages, max_tokens=max_tokens or settings.OPENAI_MAX_TOKENS,
        )
        return resp.choices[0].message.content
