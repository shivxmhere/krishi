"""Prometheus-style metrics stubs (activate via ENABLE_PROMETHEUS)."""
import time
import logging
from typing import Dict

logger = logging.getLogger(__name__)

_counters: Dict[str, int] = {}
_histograms: Dict[str, list] = {}


def increment(name: str, value: int = 1) -> None:
    _counters[name] = _counters.get(name, 0) + value


def observe(name: str, value: float) -> None:
    _histograms.setdefault(name, []).append(value)


def get_metrics() -> dict:
    return {"counters": dict(_counters), "histograms": {k: len(v) for k, v in _histograms.items()}}


class Timer:
    """Context manager that records duration to a histogram metric."""
    def __init__(self, metric_name: str):
        self.metric_name = metric_name
        self._start: float = 0

    def __enter__(self):
        self._start = time.perf_counter()
        return self

    def __exit__(self, *args):
        duration = time.perf_counter() - self._start
        observe(self.metric_name, duration)
