# System Architecture

## Overview
Krishi follows a microservices-ready layered architecture.

## Backend (FastAPI)
- **API Layer**: Routers and endpoints.
- **Service Layer**: Business logic (Auth, ML, Weather).
- **Core Layer**: Security, Config, Logging.
- **Data Layer**: SQLAlchemy models, PostgreSQL.

## Mobile (React Native)
- **UI Layer**: Reanimated components, Screens.
- **State Layer**: Zustand store.
- **Service Layer**: API Client, Sync Manager.

## AI Engine
- **Orchestrator**: Routes queries to specific agents.
- **RAG System**: Retrieves context from ChromaDB.
- **ML Inference**: TensorFlow/ONNX models.
