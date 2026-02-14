# backend/tests/e2e/test_full_workflow.py
import pytest
from fastapi.testclient import TestClient
from app.main import app
import io
from PIL import Image
import jwt

client = TestClient(app)

class TestFullWorkflow:
    """End-to-end test covering complete user journey"""
    
    @pytest.fixture
    def auth_token(self):
        """Create and return auth token for test user"""
        # Register
        register_response = client.post("/api/auth/register", json={
            "email": "farmer@test.com",
            "password": "SecurePass123!",
            "full_name": "Test Farmer",
            "phone": "+1234567890"
        })
        
        # Login
        login_response = client.post("/api/auth/login", json={
            "email": "farmer@test.com",
            "password": "SecurePass123!"
        })
        return login_response.json().get("access_token")
    
    def test_complete_disease_detection_workflow(self, auth_token):
        """Test: Register → Login → Upload Image → Get Prediction → View History"""
        if not auth_token:
            pytest.skip("No auth token available")
            
        # 1. Upload image for detection
        img = Image.new('RGB', (256, 256), color='green')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='JPEG')
        img_bytes.seek(0)
        
        detect_response = client.post(
            "/api/detect",
            files={"image": ("test_leaf.jpg", img_bytes, "image/jpeg")},
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert detect_response.status_code == 200
        result = detect_response.json()
        assert "disease" in result
        assert "confidence" in result
        assert "treatment" in result
        scan_id = result.get("scan_id")
        
        # 2. Get scan history
        history_response = client.get(
            "/api/detect/history",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert history_response.status_code == 200
        history = history_response.json()
        assert any(s["id"] == scan_id for s in history.get("scans", []))
        
        # 3. Get specific scan details
        detail_response = client.get(
            f"/api/detect/{scan_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert detail_response.status_code == 200
        assert detail_response.json()["id"] == scan_id
        
        # 4. Get AI advisory
        advisory_response = client.post(
            "/api/advisory/ask",
            json={
                "query": "How to treat tomato blight?",
                "agent_type": "disease"
            },
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert advisory_response.status_code == 200
        advisory = advisory_response.json()
        assert "response" in advisory
