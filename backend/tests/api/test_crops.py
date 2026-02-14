from fastapi.testclient import TestClient
from app.core.config import settings

def test_create_crop(client: TestClient):
    # First login
    login_res = client.post(
        f"{settings.API_V1_STR}/auth/login/access-token",
        data={"username": "test@example.com", "password": "password123"},
    )
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.post(
        f"{settings.API_V1_STR}/crops/",
        headers=headers,
        json={"name": "Wheat", "description": "Winter crop"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Wheat"
    assert response.json()["owner_id"] is not None

def test_read_crops(client: TestClient):
    # Login
    login_res = client.post(
        f"{settings.API_V1_STR}/auth/login/access-token",
        data={"username": "test@example.com", "password": "password123"},
    )
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get(f"{settings.API_V1_STR}/crops/", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)
