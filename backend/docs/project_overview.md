# Krishi Backend Project Overview

## Introduction
Krishi is an enterprise-grade AI agricultural intelligence platform designed to provide real-time advisory, disease detection, and crop management services.

## Architecture
The backend follows a layered architecture:
- **API Layer**: FastAPI routers handling HTTP requests (`app/api`).
- **Service Layer**: Business logic implementation (`app/services`).
- **ML Layer**: Machine Learning models and inference pipelines (`app/ml`).
- **AI Layer**: RAG system and AI Agents (`app/ai`).
- **Data Layer**: SQLAlchemy ORM models (`app/models`) and Pydantic schemas (`app/schemas`).
- **Worker Layer**: Celery for async tasks (`app/worker`).

## Key Components

### 1. ML Engine
- **Models**: Disease CNN, Pest Detection, Yield Prediction, etc.
- **Inference**: UnifiedPredictor with batch and streaming support.
- **Optimization**: Quantization and Pruning end-to-end.

### 2. AI System
- **RAG**: ChromaDB vector store + OpenAI embeddings.
- **Agents**: Specialized agents for Weather, Market, Fertilizer, etc.
- **Orchestrator**: Intelligently routes user queries to the right agent.

### 3. Infrastructure
- **Database**: PostgreSQL (Production) / SQLite (Dev).
- **Cache**: Redis for rate limiting and data caching.
- **Containerization**: Docker and Docker Compose support.

## Getting Started
Refer to the `README.md` in the root directory for setup instructions.
