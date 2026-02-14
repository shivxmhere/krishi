"""Structured output parsing for LLM responses."""
import json, re, logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)


def parse_json_response(text: str) -> Optional[Dict[str, Any]]:
    """Extract JSON from LLM text that may contain markdown code blocks."""
    # Try direct parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    # Extract from markdown code block
    match = re.search(r"```(?:json)?\s*\n(.*?)\n```", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass
    return None


def extract_key_values(text: str) -> Dict[str, str]:
    """Extract key: value pairs from semi-structured text."""
    result = {}
    for line in text.split("\n"):
        if ":" in line:
            parts = line.split(":", 1)
            key = parts[0].strip().strip("-•* ").lower().replace(" ", "_")
            val = parts[1].strip()
            if key and val:
                result[key] = val
    return result
