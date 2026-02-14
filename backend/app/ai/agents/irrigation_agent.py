"""Irrigation scheduling agent."""
from typing import Dict, Any
from app.ai.agents.base_agent import BaseAgent


class IrrigationAgent(BaseAgent):
    name = "irrigation"
    description = "Smart irrigation scheduling based on soil moisture and weather."

    async def process(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {"agent": self.name,
                "response": "Irrigate in early morning or late evening. Target soil moisture 40-60%.",
                "schedule": {"frequency": "every_2_days", "duration_minutes": 30, "best_time": "6:00 AM"}}
