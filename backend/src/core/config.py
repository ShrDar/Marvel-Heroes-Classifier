from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    APP_NAME: str = "Marvel Heroes Classifier API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    MODEL_PATH: Path = (
        BASE_DIR / "assets" / "models" / "marvel_heroes_classifier_transfer_model.keras"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
