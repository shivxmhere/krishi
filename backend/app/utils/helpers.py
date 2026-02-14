"""General helper utilities."""
import uuid
from datetime import datetime


def generate_id() -> str:
    return str(uuid.uuid4())


def utc_now() -> datetime:
    return datetime.utcnow()
