"""Models package – import all models so Base.metadata knows about them."""
from app.models.user import User  # noqa
from app.models.disease import Disease  # noqa
from app.models.scan import Scan  # noqa
from app.models.crop import Crop  # noqa
from app.models.advisory import Advisory  # noqa
from app.models.ml_model_version import MLModelVersion  # noqa
from app.models.training_job import TrainingJob  # noqa
from app.models.inference_log import InferenceLog  # noqa
from app.models.model_performance import ModelPerformance  # noqa
from app.models.knowledge_base import KnowledgeBase  # noqa
from app.models.notification import Notification  # noqa
