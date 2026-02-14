"""Weather planning agent."""
from typing import Dict, Any
from app.ai.agents.base_agent import BaseAgent


class WeatherAgent(BaseAgent):
    name = "weather"
    description = "Agricultural weather planning and risk assessment."

    async def process(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        location = (context or {}).get("location", "unknown")
        return {"agent": self.name, "response": f"Weather advisory for {location}: Monitor forecast for next 7 days."}
