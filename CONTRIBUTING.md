# Contributing to Krishi

Thank you for your interest in contributing to Krishi! We are building the future of AI-powered agriculture and welcome help from developers, agronomists, and data scientists.

## 🛠️ Development Workflow

1.  **Fork** the repository to your own account.
2.  **Clone** your fork:
    ```bash
    git clone https://github.com/yourusername/krishi.git
    ```
3.  **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```
4.  **Implement** your changes.
5.  **Test** your changes:
    ```bash
    # Backend
    pytest
    # Frontend/Mobile
    npm test
    ```
6.  **Commit** your changes using conventional commits:
    ```bash
    git commit -m "feat(api): add new weather recommendation layer"
    ```
7.  **Push** to your fork:
    ```bash
    git push origin feature/amazing-feature
    ```
8.  **Open a Pull Request** against the `develop` branch.

## 📜 Code Standards

### Python (Backend)
- Follow **PEP 8** style guide.
- Use **Type Hints** for all function signatures.
- Write **Docstrings** (Google format) for public modules and functions.
- Maintain **90%+ test coverage**.

### JavaScript/TypeScript (Frontend & Mobile)
- Use **TypeScript** for all new code.
- Follow the **Airbnb JavaScript Style Guide**.
- Ensure all components are responsive and accessible.
- Use **Zustand** for state management.

## 💬 Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc (no code changes)
- `refactor`: Refactoring production code
- `test`: Adding tests, refactoring tests
- `chore`: Updating build tasks, package manager configs, etc.

---
*By contributing to Krishi, you agree that your contributions will be licensed under its MIT License.*
