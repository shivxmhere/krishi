import json
from datetime import datetime
from typing import Dict

class IoTDeviceManager:
    def __init__(self):
        self.devices: Dict[str, dict] = {}
    
    def register_device(self, device_id: str, device_type: str, user_id: str):
        device = {
            "id": device_id,
            "type": device_type,
            "user_id": user_id,
            "status": "active",
            "registered_at": datetime.utcnow().isoformat()
        }
        self.devices[device_id] = device
        return device
    
    def ingest_data(self, device_id: str, data: dict):
        if device_id in self.devices:
            # Store in time-series logic would go here
            print(f"Ingested data from {device_id}: {data}")
            return True
        return False

iot_manager = IoTDeviceManager()
