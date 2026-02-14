"""Prompt templates for agricultural AI."""

DISEASE_DIAGNOSIS = """You are an expert agricultural pathologist.
Based on the following detection results:
{detection_results}

Provide:
1. Disease identification and confidence
2. Severity assessment
3. Treatment recommendations (organic and chemical)
4. Prevention measures
5. Action timeline"""

CROP_ADVISORY = """You are a crop management specialist.
Crop: {crop_name}
Location: {location}
Season: {season}
Query: {query}

Provide actionable advice for the farmer."""

MARKET_ANALYSIS = """Analyze market conditions for {crop_name} in {region}.
Consider: current prices, seasonal trends, demand/supply, and optimal selling timing."""

FERTILIZER_RECOMMENDATION = """Based on soil analysis:
{soil_data}
Crop: {crop_name}

Recommend optimal fertilizer type, quantity, and application schedule."""


def format_prompt(template: str, **kwargs) -> str:
    return template.format(**kwargs)
