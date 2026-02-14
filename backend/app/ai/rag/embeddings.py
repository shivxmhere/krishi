"""Text embeddings via OpenAI API."""
import logging
from typing import List
from app.config import settings

logger = logging.getLogger(__name__)


class EmbeddingService:
    def __init__(self):
        self.client = None
        if settings.OPENAI_API_KEY:
            try:
                from openai import OpenAI
                self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
            except ImportError:
                logger.warning("OpenAI not installed.")

    def embed_text(self, text: str) -> List[float]:
        if not self.client:
            return [0.0] * 1536
        resp = self.client.embeddings.create(model=settings.OPENAI_EMBEDDING_MODEL, input=text)
        return resp.data[0].embedding

    def embed_batch(self, texts: List[str]) -> List[List[float]]:
        if not self.client:
            return [[0.0] * 1536 for _ in texts]
        resp = self.client.embeddings.create(model=settings.OPENAI_EMBEDDING_MODEL, input=texts)
        return [item.embedding for item in resp.data]
