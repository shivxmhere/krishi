"""Ensemble Model – combines multiple ML models for comprehensive analysis."""
import logging
from typing import Dict, Any
import numpy as np

from app.ml.models.disease_cnn import DiseaseCNN
from app.ml.models.pest_detector import PestDetector
from app.ml.models.plant_segmentation import PlantSegmentation
from app.ml.models.nutrient_deficiency import NutrientDeficiency
from app.ml.models.growth_stage_classifier import GrowthStageClassifier

logger = logging.getLogger(__name__)


class EnsemblePredictor:
    """Runs all available models and produces a comprehensive analysis."""

    def __init__(self):
        self.disease_model = DiseaseCNN()
        self.pest_model = PestDetector()
        self.segmentation_model = PlantSegmentation()
        self.nutrient_model = NutrientDeficiency()
        self.growth_model = GrowthStageClassifier()

    def predict_comprehensive(self, image: np.ndarray) -> Dict[str, Any]:
        disease = self.disease_model.predict_with_confidence(image)
        pests = self.pest_model.predict(image)
        segmentation = self.segmentation_model.predict(image)
        nutrients = self.nutrient_model.predict(image)
        growth = self.growth_model.predict(image)

        health_score = self._calculate_health_score(disease, pests, segmentation, nutrients)

        return {
            "disease": disease,
            "pests": pests,
            "affected_area": segmentation,
            "nutrient_status": nutrients,
            "growth_stage": growth,
            "overall_health_score": health_score,
            "recommended_actions": self._generate_actions(disease, pests, nutrients),
        }

    @staticmethod
    def _calculate_health_score(disease, pests, seg, nutrients) -> float:
        score = 100.0
        top_conf = disease.get("top_prediction", {}).get("confidence", 0)
        top_class = disease.get("top_prediction", {}).get("class", "")
        if "healthy" not in top_class.lower():
            score -= top_conf * 30
        score -= len(pests) * 5
        score -= seg.get("diseased_pct", 0) * 0.5
        score -= len(nutrients.get("deficiencies", [])) * 5
        return round(max(0, min(100, score)), 1)

    @staticmethod
    def _generate_actions(disease, pests, nutrients) -> list:
        actions = []
        top_class = disease.get("top_prediction", {}).get("class", "")
        if "healthy" not in top_class.lower():
            actions.append(f"Investigate detected condition: {top_class}")
        if pests:
            actions.append(f"Pest management needed for: {', '.join(p['pest'] for p in pests)}")
        for d in nutrients.get("deficiencies", []):
            actions.append(f"Address {d['nutrient']} deficiency ({d['severity']})")
        if not actions:
            actions.append("Plant appears healthy – continue current practices.")
        return actions
