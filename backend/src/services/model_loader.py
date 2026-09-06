from pathlib import Path

import tensorflow as tf


def load_model(model_path: Path) -> tf.keras.Model:

    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")

    model = tf.keras.models.load_model(model_path)

    return model
