"""Advisory ORM model."""
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class Advisory(Base):
    __tablename__ = "advisories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    query = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    agent_used = Column(String)  # which AI agent handled it
    sources = Column(Text)  # JSON list of RAG sources
    created_at = Column(DateTime(timezone=True), server_default=func.now())
