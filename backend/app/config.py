"""
Advanced application configuration using pydantic-settings.
All values sourced from environment variables with sensible defaults.
"""
from typing import List, Optional, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────────────
    APP_NAME: str = "Krishi"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    API_V1_STR: str = "/api/v1"

    # ── Security ─────────────────────────────────────────────────────
    SECRET_KEY: str = "CHANGE-THIS-IN-PRODUCTION-MIN-32-CHARS"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    # ── Database ─────────────────────────────────────────────────────
    DATABASE_URL: str = "sqlite:///./krishi.db"

    # ── CORS ─────────────────────────────────────────────────────────
    CORS_ORIGINS: List[str] = ["http://localhost:19006", "http://localhost:8081", "*"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        if isinstance(v, str):
            import json
            return json.loads(v)
        return v

    # ── ML Model Paths ───────────────────────────────────────────────
    DISEASE_MODEL_PATH: str = "ai-models/trained_models/disease_model.h5"
    DISEASE_MODEL_VERSION: str = "2.0.0"
    ML_CONFIDENCE_THRESHOLD: float = 0.6

    PEST_MODEL_PATH: str = "ai-models/trained_models/pest_detector.h5"
    PEST_MODEL_VERSION: str = "1.0.0"
    SEGMENTATION_MODEL_PATH: str = "ai-models/trained_models/plant_segmentation.h5"
    GROWTH_STAGE_MODEL_PATH: str = "ai-models/trained_models/growth_stage.h5"
    YIELD_MODEL_PATH: str = "ai-models/trained_models/yield_predictor.pkl"
    SOIL_MODEL_PATH: str = "ai-models/trained_models/soil_analyzer.h5"
    WEED_MODEL_PATH: str = "ai-models/trained_models/weed_detector.h5"
    NUTRIENT_MODEL_PATH: str = "ai-models/trained_models/nutrient_deficiency.h5"

    USE_ENSEMBLE: bool = True
    ENABLE_XAI: bool = True
    USE_ONNX_RUNTIME: bool = False

    # ── OpenAI ───────────────────────────────────────────────────────
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4-turbo-preview"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    OPENAI_MAX_TOKENS: int = 4000

    # ── Anthropic (optional) ─────────────────────────────────────────
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-3-opus-20240229"

    # ── ChromaDB / RAG ───────────────────────────────────────────────
    CHROMA_PERSIST_DIRECTORY: str = "./knowledge_base/vectorstore"
    CHROMA_COLLECTION_NAME: str = "agricultural_knowledge"

    # ── Weather ──────────────────────────────────────────────────────
    WEATHER_API_KEY: str = ""
    WEATHER_API_URL: str = "https://api.openweathermap.org/data/2.5"
    WEATHER_CACHE_TTL_SECONDS: int = 300

    # ── Market ───────────────────────────────────────────────────────
    MARKET_API_KEY: str = ""
    MARKET_API_URL: str = "https://api.agmarknet.gov.in"
    MARKET_CACHE_TTL_SECONDS: int = 600

    # ── Redis ────────────────────────────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_MAX_CONNECTIONS: int = 50
    CACHE_DEFAULT_TTL: int = 300

    # ── Rate Limiting ────────────────────────────────────────────────
    RATE_LIMIT_DETECT: str = "10/minute"
    RATE_LIMIT_GENERAL: str = "100/minute"
    RATE_LIMIT_TRAINING: str = "1/hour"

    # ── Monitoring ───────────────────────────────────────────────────
    ENABLE_PROMETHEUS: bool = False
    LOG_LEVEL: str = "INFO"

    # ── Training ─────────────────────────────────────────────────────
    TRAINING_DATA_PATH: str = "./data/training"
    VALIDATION_DATA_PATH: str = "./data/validation"
    TEST_DATA_PATH: str = "./data/test"
    MODEL_SAVE_PATH: str = "./ai-models/trained_models"
    TENSORBOARD_LOG_DIR: str = "./logs/tensorboard"
    DEFAULT_BATCH_SIZE: int = 32
    DEFAULT_EPOCHS: int = 100
    DEFAULT_LEARNING_RATE: float = 0.001
    USE_GPU: bool = False
    GPU_MEMORY_FRACTION: float = 0.8

    # ── A/B Testing ──────────────────────────────────────────────────
    ENABLE_AB_TESTING: bool = True
    DEFAULT_EXPERIMENT_SPLIT: float = 0.5

    # ── Drift Detection ──────────────────────────────────────────────
    ENABLE_DRIFT_DETECTION: bool = True
    DRIFT_CHECK_INTERVAL_HOURS: int = 24
    DRIFT_THRESHOLD: float = 0.05
    AUTO_RETRAIN_ON_DRIFT: bool = False

    # ── Server ───────────────────────────────────────────────────────
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True, extra="ignore"
    )


settings = Settings()
