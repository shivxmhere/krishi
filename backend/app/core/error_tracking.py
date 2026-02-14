import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from sentry_sdk.integrations.redis import RedisIntegration
import os

def init_sentry(app):
    """Initialize Sentry error tracking"""
    dsn = os.getenv("SENTRY_DSN", "https://placeholder@sentry.io/0")
    
    sentry_sdk.init(
        dsn=dsn,
        environment=os.getenv("ENVIRONMENT", "production"),
        release="krishi@1.0.0",
        integrations=[
            FastApiIntegration(),
            SqlalchemyIntegration(),
            RedisIntegration(),
        ],
        traces_sample_rate=0.1,  # 10% of requests
        profiles_sample_rate=0.1,
    )

def capture_exception(error, context=None):
    """Capture exception with additional context"""
    with sentry_sdk.push_scope() as scope:
        if context:
            for key, value in context.items():
                scope.set_extra(key, value)
        sentry_sdk.capture_exception(error)
