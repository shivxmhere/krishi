"""Market intelligence agent."""
from typing import Dict, Any
from app.ai.agents.base_agent import BaseAgent


class MarketAgent(BaseAgent):
    name = "market"
    description = "Crop market price analysis and selling recommendations."

    async def process(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        crop = (context or {}).get("crop", "rice")
        return {"agent": self.name,
                "response": f"Current {crop} market: prices trending upward. Consider selling in next 2 weeks.",
                "analysis": {"trend": "bullish", "recommended_action": "sell", "timeframe": "2_weeks"}}
