from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Marvel Heroes Classifier API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    MODEL_PATH: Path = Path("assets/models/marvel_classifier.keras")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
