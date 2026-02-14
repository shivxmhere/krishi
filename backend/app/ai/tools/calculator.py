"""Agricultural calculator tool."""

def calculate_seed_rate(area_hectares: float, seed_per_hectare_kg: float) -> float:
    return area_hectares * seed_per_hectare_kg

def calculate_water_requirement(area_hectares: float, crop_water_mm: float) -> float:
    return area_hectares * crop_water_mm * 10  # cubic meters

def calculate_roi(cost: float, revenue: float) -> float:
    return ((revenue - cost) / cost) * 100 if cost > 0 else 0
