from app.ai.agents.base_agent import BaseAgent

class DiseaseAgent(BaseAgent):
    def process(self, query):
        return "Disease analysis..."

class WeatherAgent(BaseAgent):
    def process(self, query):
        return "Weather forecast..."
