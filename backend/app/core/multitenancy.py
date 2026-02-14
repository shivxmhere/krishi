from fastapi import Request, HTTPException
from contextvars import ContextVar
import jwt

# Context variable for current tenant
tenant_ctx: ContextVar[str] = ContextVar('tenant', default='default')

class MultiTenantMiddleware:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        
        request = Request(scope, receive)
        
        # Identity tenant from subdomain or header
        host = request.headers.get('host', '')
        subdomain = host.split('.')[0]
        
        # Default or fallback to header
        tenant_id = request.headers.get('x-tenant-id', subdomain)
        
        # Set tenant in context
        token = tenant_ctx.set(tenant_id or 'default')
        
        try:
            await self.app(scope, receive, send)
        finally:
            tenant_ctx.reset(token)

def get_current_tenant() -> str:
    return tenant_ctx.get()
