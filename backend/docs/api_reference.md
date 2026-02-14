# API Reference

## Authentication
- `POST /api/v1/auth/login`: Get access token.
- `POST /api/v1/auth/signup`: Register new user.
- `GET /api/v1/auth/me`: Get current user profile.

## Detection
- `POST /api/v1/detect/`: Upload image for analysis (Disease, Pest, etc.).
- `GET /api/v1/detect/history`: Get user's scan history.
- `GET /api/v1/detect/{id}`: Get specific scan details.

## Crops
- `GET /api/v1/crops/`: List all crops.
- `POST /api/v1/crops/`: Add new crop (Admin).
- `PUT /api/v1/crops/{id}`: Update crop details (Admin).

## Advisory
- `POST /api/v1/advisory/chat`: Chat with AI agents (RAG-enabled).

## Utilities
- `GET /api/v1/weather/?location={loc}`: Get current weather.
- `GET /api/v1/market/prices?state={state}&commodity={comm}`: Get market prices.

## Training
- `POST /api/v1/training/start`: Trigger new training job (Admin).
- `GET /api/v1/training/{job_id}`: Check job status.
