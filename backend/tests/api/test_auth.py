from fastapi.testclient import TestClient
from app.core.config import settings

def test_create_user(client: TestClient):
    response = client.post(
        f"{settings.API_V1_STR}/users/",
        json={"email": "test@example.com", "password": "password123", "full_name": "Test User"},
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"

def test_get_access_token(client: TestClient):
    response = client.post(
        f"{settings.API_V1_STR}/auth/login/access-token",
        data={"username": "test@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
