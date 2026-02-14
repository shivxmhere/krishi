from locust import HttpUser, task, between
import random
import io
from PIL import Image

class KrishiUser(HttpUser):
    wait_time = between(1, 5)
    
    def on_start(self):
        """Login and get token"""
        try:
            response = self.client.post("/api/v1/auth/login", json={
                "email": "loadtest@example.com",
                "password": "testpassword123"
            })
            if response.status_code == 200:
                self.token = response.json().get("access_token")
            else:
                # Register if doesn't exist
                self.client.post("/api/v1/auth/register", json={
                    "email": "loadtest@example.com",
                    "password": "testpassword123",
                    "full_name": "Load Test User"
                })
                response = self.client.post("/api/v1/auth/login", json={
                    "email": "loadtest@example.com",
                    "password": "testpassword123"
                })
                self.token = response.json().get("access_token")
        except:
            self.token = "mock-token"
    
    @task(3)
    def detect_disease(self):
        """Simulate disease detection"""
        img = Image.new('RGB', (256, 256), 
                       color=(random.randint(0, 255), 
                              random.randint(0, 255), 
                              random.randint(0, 255)))
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='JPEG')
        img_bytes.seek(0)
        
        self.client.post(
            "/api/v1/predict/disease",
            files={"image": ("test.jpg", img_bytes, "image/jpeg")},
            headers={"Authorization": f"Bearer {self.token}"}
        )
    
    @task(2)
    def get_weather(self):
        """Simulate weather check"""
        self.client.get(
            "/api/v1/weather/current?lat=28.6139&lon=77.2090",
            headers={"Authorization": f"Bearer {self.token}"}
        )
    
    @task(2)
    def get_history(self):
        """Simulate viewing scan history"""
        self.client.get(
            "/api/v1/user/scans?limit=20",
            headers={"Authorization": f"Bearer {self.token}"}
        )
