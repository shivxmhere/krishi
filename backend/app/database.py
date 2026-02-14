"""
SQLAlchemy database engine, session factory, and Base class.
Supports SQLite (dev) and PostgreSQL (prod) via DATABASE_URL.
"""
from typing import AsyncGenerator, Generator
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import sessionmaker, Session

from app.config import settings

# ── Engine ───────────────────────────────────────────────────────────
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ── Declarative Base ─────────────────────────────────────────────────
@as_declarative()
class Base:
    """Auto-generate __tablename__ from class name."""
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()


# ── Dependency ───────────────────────────────────────────────────────
def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a DB session and closes it after."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
