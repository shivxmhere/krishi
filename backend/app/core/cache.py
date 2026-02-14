"""
Simple in-memory caching layer.
Falls back gracefully when Redis is unavailable.
"""
import logging
import time
from typing import Any, Optional

logger = logging.getLogger(__name__)

_cache: dict[str, tuple[Any, float]] = {}


def cache_get(key: str) -> Optional[Any]:
    entry = _cache.get(key)
    if entry is None:
        return None
    value, expires_at = entry
    if time.time() > expires_at:
        _cache.pop(key, None)
        return None
    return value


def cache_set(key: str, value: Any, ttl: int = 300) -> None:
    _cache[key] = (value, time.time() + ttl)


def cache_delete(key: str) -> None:
    _cache.pop(key, None)


def cache_clear() -> None:
    _cache.clear()
