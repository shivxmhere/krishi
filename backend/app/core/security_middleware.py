from fastapi import Request, HTTPException
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.cors import CORSMiddleware
import re
import os

class SecurityHeadersMiddleware:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        
        async def send_with_headers(message):
            if message["type"] == "http.response.start":
                headers = message.get("headers", [])
                security_headers = [
                    (b"strict-transport-security", b"max-age=31536000; includeSubDomains"),
                    (b"x-content-type-options", b"nosniff"),
                    (b"x-frame-options", b"DENY"),
                    (b"referrer-policy", b"strict-origin-when-cross-origin"),
                ]
                headers.extend(security_headers)
                message["headers"] = headers
            await send(message)
        
        await self.app(scope, receive, send_with_headers)

def setup_security(app):
    """Configure all security middleware"""
    app.add_middleware(SecurityHeadersMiddleware)
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # In prod, restrict this to specific domains
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["localhost", "*.onrender.com", "*.vercel.app"]
    )
