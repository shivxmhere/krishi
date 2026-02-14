import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_detect_endpoint_structure():
    # Smoke test for endpoint existence
    response = client.get("/api/detect/")
    assert response.status_code in [405, 401] # Method not allowed or Unauthorized
