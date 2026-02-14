"""Function calling definitions for OpenAI integration."""

FUNCTIONS = [
    {
        "name": "get_weather_forecast",
        "description": "Get weather forecast for agricultural planning",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "Location name or coordinates"},
                "days": {"type": "integer", "description": "Forecast days (1-14)", "default": 7},
            },
            "required": ["location"],
        },
    },
    {
        "name": "calculate_fertilizer",
        "description": "Calculate optimal fertilizer amounts",
        "parameters": {
            "type": "object",
            "properties": {
                "crop": {"type": "string"},
                "area_hectares": {"type": "number"},
                "soil_type": {"type": "string"},
            },
            "required": ["crop", "area_hectares"],
        },
    },
    {
        "name": "query_market_prices",
        "description": "Get current crop market prices",
        "parameters": {
            "type": "object",
            "properties": {
                "crop": {"type": "string"},
                "region": {"type": "string"},
            },
            "required": ["crop"],
        },
    },
]


def call_function(name: str, arguments: dict):
    """Dispatch function calls from LLM."""
    dispatch = {
        "get_weather_forecast": lambda **kw: {"forecast": "Sunny, 28°C", **kw},
        "calculate_fertilizer": lambda **kw: {"recommendation": "NPK 50kg/ha", **kw},
        "query_market_prices": lambda **kw: {"price": "₹2500/quintal", **kw},
    }
    fn = dispatch.get(name)
    return fn(**arguments) if fn else {"error": f"Unknown function: {name}"}
