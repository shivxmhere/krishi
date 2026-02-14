# API Documentation

Base URL: `http://localhost:8000/api/v1`

## Authentication

### Login
`POST /auth/login/access-token`
- **Request:** `form-data`
  - `username`: Email
  - `password`: Password
- **Response:**
  ```json
  {
    "access_token": "eyJhbG...",
    "token_type": "bearer"
  }
  ```

### Register (Users)
`POST /users/`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "strongpassword",
    "full_name": "John Doe"
  }
  ```

## Crops

### Get All Crops
`GET /crops/`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** List of crops.

### Create Crop
`POST /crops/`
- **Body:**
  ```json
  {
    "name": "Wheat",
    "description": "Winter season",
    "optimal_temp": 20.5,
    "optimal_humidity": 60.0
  }
  ```

## Disease Detection

### Detect Disease
`POST /disease/detect`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `multipart/form-data`
  - `file`: (Image file)
- **Response:**
  ```json
  {
    "detected_disease": "Early Blight",
    "confidence": 0.95,
    "image_path": "uploaded_file.jpg",
    "id": 1
  }
  ```

## AI Advisory

### Get Advice
`POST /advisory/`
- **Body:**
  ```json
  {
    "query": "How to treat potato blight?"
  }
  ```
- **Response:**
  ```json
  {
    "query": "How to treat potato blight?",
    "response": "Use fungicides containing...",
    "id": 1
  }
  ```

## Error Codes
- `400 Bad Request`: Invalid input or inactive user.
- `401 Unauthorized`: Missing or invalid token.
- `403 Forbidden`: Not enough privileges.
- `404 Not Found`: Resource not found.
- `429 Too Many Requests`: Rate limit exceeded.
