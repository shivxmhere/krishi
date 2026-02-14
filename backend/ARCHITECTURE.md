# System Architecture

## Overview
Krishi Backend is a FastAPI-based microservice typically deployed in a containerized environment.

## Components
1. **API Layer (FastAPI):** Handles HTTP requests, validation (Pydantic), and routing.
2. **Service Layer:** Contains business logic (e.g., Disease Detection using TensorFlow).
3. **Data Access Layer (SQLAlchemy):** ORM for Database interactions.
4. **Database:** SQLite (Dev) / PostgreSQL (Prod).

## Data Flow
1. **Request:** Client -> API Endpoint -> Middleware (CORS/RateLimit)
2. **Process:** Endpoint -> Service -> DB/Model
3. **Response:** Pydantic Schema -> JSON -> Client

## Scalability
- **Stateless:** The backend is stateless (except for DB and File storage).
- **Horizontal Scaling:** Can run multiple replicas of the container behind a load balancer.
- **Async:** Uses Python's `asyncio` for non-blocking I/O.
