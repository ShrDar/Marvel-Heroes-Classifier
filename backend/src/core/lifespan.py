from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.core.config import settings
from src.core.logging import logger
from src.services.model_loader import load_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application starting...")

    logger.info("Loading model from: %s", settings.MODEL_PATH)

    print(settings.MODEL_PATH)

    app.state.model = load_model(settings.MODEL_PATH)

    logger.info("Model loaded successfully")

    yield

    logger.info("Application shutting down...")
