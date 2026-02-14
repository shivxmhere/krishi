from fastapi import APIRouter
from app.api.endpoints import auth, detect, crops, advisory, weather, market, training

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(detect.router, prefix="/detect", tags=["detect"])
api_router.include_router(crops.router, prefix="/crops", tags=["crops"])
api_router.include_router(advisory.router, prefix="/advisory", tags=["advisory"])
api_router.include_router(weather.router, prefix="/weather", tags=["weather"])
api_router.include_router(market.router, prefix="/market", tags=["market"])
api_router.include_router(training.router, prefix="/training", tags=["training"])
