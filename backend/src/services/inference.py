import numpy as np
import tensorflow as tf


CLASS_NAMES = [
    "black widow",
    "captain america",
    "doctor strange",
    "hulk",
    "ironman",
    "loki",
    "spider-man",
    "thanos",
]


def predict_image(
    model: tf.keras.Model,
    image_array: np.ndarray,
) -> tuple[str, float]:

    predictions = model.predict(image_array, verbose=0)

    probabilities = predictions[0]

    predicted_index = int(np.argmax(probabilities))

    confidence = float(probabilities[predicted_index])

    predicted_class = CLASS_NAMES[predicted_index]

    return predicted_class, confidence
