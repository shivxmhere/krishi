from app.ai.agents.base_agent import BaseAgent

class MarketAgent(BaseAgent):
    def process(self, query):
        return "Market prices..."

class Orchestrator(BaseAgent):
    def route(self, query):
        return "Routing to appropriate agent..."
