"""RAG knowledge-base document reference."""
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class KnowledgeBase(Base):
    __tablename__ = "knowledge_base"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    source = Column(String)  # file path or URL
    content_hash = Column(String, unique=True)
    chunk_count = Column(Integer)
    doc_type = Column(String)  # pdf / txt / web
    metadata_json = Column(Text)
    indexed_at = Column(DateTime(timezone=True), server_default=func.now())
