# Security Architecture

## Authentication
- **Protocol:** OAuth2 with Password Flow (Bearer Token).
- **Token:** JWT (JSON Web Token) signed with HS256.
- **Hashing:** BCrypt for password storage.

## Input Validation
- All inputs are validated using **Pydantic** schemas.
- Extra fields are ignored/stripped.
- Types are strictly enforced.

## Rate Limiting
- Implemented using `slowapi`.
- Protects against brute-force and DoS.

## Best Practices
- **No Hardcoded Secrets:** All secrets via `.env`.
- **CORS:** Restricted to known origins in production.
- **SQL Injection:** Prevented by SQLAlchemy ORM.
- **Docker:** Non-root user (recommended for prod Dockerfile).
