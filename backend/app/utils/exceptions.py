"""Custom application exceptions."""


class KrishiException(Exception):
    """Base exception for Krishi."""
    def __init__(self, message: str = "An error occurred", status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class ModelNotFoundError(KrishiException):
    def __init__(self, model_path: str):
        super().__init__(f"ML model not found at: {model_path}", 404)


class ModelLoadError(KrishiException):
    def __init__(self, model_name: str, detail: str = ""):
        super().__init__(f"Failed to load model '{model_name}': {detail}", 500)


class PredictionError(KrishiException):
    def __init__(self, detail: str = ""):
        super().__init__(f"Prediction failed: {detail}", 500)


class TrainingError(KrishiException):
    def __init__(self, detail: str = ""):
        super().__init__(f"Training failed: {detail}", 500)


class RAGError(KrishiException):
    def __init__(self, detail: str = ""):
        super().__init__(f"RAG pipeline error: {detail}", 500)


class ExternalAPIError(KrishiException):
    def __init__(self, service: str, detail: str = ""):
        super().__init__(f"External API error ({service}): {detail}", 502)
