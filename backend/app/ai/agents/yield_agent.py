"""Yield prediction agent."""
from typing import Dict, Any
from app.ai.agents.base_agent import BaseAgent
from app.ml.models.yield_predictor import YieldPredictor


class YieldAgent(BaseAgent):
    name = "yield"
    description = "Crop yield prediction and optimization."

    def __init__(self):
        self.predictor = YieldPredictor()

    async def process(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        features = (context or {}).get("features", {})
        prediction = self.predictor.predict(features)
        return {"agent": self.name, "prediction": prediction}
