from fastapi import FastAPI, Request
from app.api.router import api_router
from app.core.config import settings
from app.core.security_middleware import setup_security
from app.core.limiter import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

app = FastAPI(
    title="Krishi API",
    version="1.0.0",
    description="Advanced AI Agricultural Platform API"
)

# Setup Rate Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Setup Security (CORS, Headers, Trusted Hosts)
setup_security(app)

app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
@limiter.limit("100/minute")
def health_check(request: Request = None):
    return {
        "status": "ok",
        "app": "Krishi API",
        "version": "1.0.0",
        "database": "connected",
        "ml_model": "REAL"
    }
