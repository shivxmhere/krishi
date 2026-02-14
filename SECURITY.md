# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| 0.9.x   | :x:                |

## Reporting a Vulnerability

We take the security of our platform and the data of our farmers very seriously. If you find a security vulnerability, please report it to us immediately.

**Please DO NOT open a public GitHub issue for security vulnerabilities.**

Reporting methods:
- 📧 Email: [security@krishi.ai](mailto:security@krishi.ai)
- 🎫 Private Security Advisory: Open via GitHub's "Security" tab.

We will acknowledge your report within 24 hours and aim to provide a fix within 72 hours for critical issues.

## Security Measures

- **Data Encryption**: All data is encrypted at rest using AES-256 and in transit via TLS 1.3.
- **Authentication**: Secure JWT-based auth with automatic token rotation.
- **Isolation**: Multi-tenant architecture ensuring database-level data isolation.
- **Audits**: Monthly automated security scans and quarterly manual penetration tests.
- **Validation**: Strict input validation using Pydantic and sanitized UI inputs.
