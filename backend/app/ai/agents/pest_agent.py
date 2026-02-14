"""Pest management agent."""
from typing import Dict, Any
from app.ai.agents.base_agent import BaseAgent


class PestAgent(BaseAgent):
    name = "pest"
    description = "Integrated pest management recommendations."

    async def process(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {"agent": self.name,
                "response": "Use integrated pest management: biological controls first, chemical only if needed.",
                "methods": ["biological_control", "cultural_practices", "chemical_last_resort"]}
