"""Semantic retriever wrapping the vector store."""
import logging
from typing import List, Dict, Any
from app.ai.rag.vector_store import VectorStore

logger = logging.getLogger(__name__)


class Retriever:
    def __init__(self, vector_store: VectorStore = None):
        self.store = vector_store or VectorStore()

    def retrieve(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        return self.store.search(query, n_results=top_k)

    def get_context_string(self, query: str, top_k: int = 5) -> str:
        docs = self.retrieve(query, top_k)
        if not docs:
            return "No relevant knowledge found."
        return "\n\n---\n\n".join(d["document"] for d in docs)
