# ML & AI Architecture

## 1. Machine Learning Models
We deploy 9 specialized models:
1. **Disease CNN**: EfficientNetB4-based classifier for 38 plant diseases.
2. **Pest Detector**: MobileNetV3 for detecting common pests.
3. **Plant Segmentation**: U-Net for separating plant from background.
4. **Growth Stage**: Classifier for phenological stages.
5. **Yield Predictor**: Random Forest/XGBoost on tabular data.
6. **Soil Analyzer**: Regression model from images.
7. **Weed Detector**: Semantic segmentation.
8. **Nutrient Deficiency**: Multi-label classifier.
9. **Ensemble**: Voting regressor/classifier combining outputs.

## 2. RAG System (Retrieval Augmented Generation)
- **Vector DB**: ChromaDB
- **Embeddings**: OpenAI `text-embedding-3-small`
- **Retrieval**: Semantic similarity search with top-k filtering.
- **Generation**: GPT-4-turbo via OpenAI API.

## 3. Training Pipeline
- **Orchestrator**: `ModelTrainer` class manages the loop.
- **Augmentation**: Albumentations pipeline.
- **Tracking**: DB-based logging of training jobs and metrics.
- **Async**: Training jobs are offloaded to Celery workers.

## 4. XAI (Explainable AI)
- **Grad-CAM**: Heatmaps for CNN decisions.
- **LIME**: Local interpretable model-agnostic explanations.
- **SHAP**: Feature importance for tabular models.
