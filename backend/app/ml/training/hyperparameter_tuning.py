"""Hyperparameter tuning with Optuna integration."""
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)


def optimize_hyperparameters(
    model_type: str,
    train_data_path: str,
    val_data_path: str,
    n_trials: int = 20,
) -> Dict[str, Any]:
    """Run Optuna study to find optimal hyper-parameters."""
    try:
        import optuna

        def objective(trial):
            lr = trial.suggest_float("lr", 1e-5, 1e-2, log=True)
            batch_size = trial.suggest_categorical("batch_size", [16, 32, 64])
            dropout = trial.suggest_float("dropout", 0.1, 0.5)

            # Simplified training run for HPO
            from app.ml.training.trainer import ModelTrainer
            trainer = ModelTrainer(model_type)
            result = trainer.train(
                train_data_path, val_data_path, epochs=10,
                batch_size=batch_size, learning_rate=lr,
            )
            return result.get("best_accuracy", 0.0)

        study = optuna.create_study(direction="maximize")
        study.optimize(objective, n_trials=n_trials, show_progress_bar=False)

        return {
            "best_params": study.best_params,
            "best_accuracy": study.best_value,
            "n_trials": n_trials,
        }
    except ImportError:
        logger.warning("Optuna not installed – HPO unavailable.")
        return {"error": "Optuna not installed"}
