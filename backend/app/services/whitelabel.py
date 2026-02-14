from pydantic import BaseModel
from typing import Optional, Dict
import json

class WhiteLabelConfig(BaseModel):
    tenant_id: str
    brand_name: str
    primary_color: str
    logo_url: str
    features: Dict[str, bool] = {
        "ai_chat": True,
        "weather": True,
        "market_prices": True
    }

class WhiteLabelService:
    def __init__(self):
        # Mocking configurations for demonstration
        self.configs: Dict[str, WhiteLabelConfig] = {
            "default": WhiteLabelConfig(
                tenant_id="default",
                brand_name="Krishi AI",
                primary_color="#22C55E",
                logo_url="/logo.png"
            ),
            "state_agri_dept": WhiteLabelConfig(
                tenant_id="state_agri_dept",
                brand_name="AgriLink Government",
                primary_color="#0369A1",
                logo_url="/govt-logo.png",
                features={"ai_chat": True, "weather": True, "market_prices": False}
            )
        }
    
    def get_config(self, tenant_id: str) -> WhiteLabelConfig:
        return self.configs.get(tenant_id, self.configs["default"])

whitelabel_service = WhiteLabelService()
