"""Knowledge base indexer – indexes documents into vector store."""
import logging
from app.ai.rag.vector_store import VectorStore
from app.ai.rag.document_processor import DocumentProcessor

logger = logging.getLogger(__name__)


class KnowledgeIndexer:
    def __init__(self):
        self.store = VectorStore()
        self.processor = DocumentProcessor()

    def index_directory(self, dir_path: str) -> int:
        chunks = self.processor.process_directory(dir_path)
        if not chunks:
            return 0
        docs = [c["text"] for c in chunks]
        metas = [{"source": c["source"], "chunk": c["chunk_index"]} for c in chunks]
        self.store.add_documents(docs, metas)
        logger.info("Indexed %d chunks from %s", len(docs), dir_path)
        return len(docs)

    def index_text(self, text: str, source: str = "manual") -> int:
        chunks = self.processor._split_text(text)
        metas = [{"source": source, "chunk": i} for i in range(len(chunks))]
        self.store.add_documents(chunks, metas)
        return len(chunks)
