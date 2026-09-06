from fastapi import APIRouter, File, Request, UploadFile

from src.schemas.prediction import PredictionResponse
from src.services.inference import predict_image
from src.services.preprocessing import preprocess_image


router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)


@router.post("", response_model=PredictionResponse)
async def predict(
    request: Request,
    file: UploadFile = File(...),
):
    image_bytes = await file.read()

    image_array = preprocess_image(image_bytes)

    model = request.app.state.model

    predicted_class, confidence = predict_image(
        model,
        image_array,
    )

    return PredictionResponse(
        predicted_class=predicted_class,
        confidence=confidence,
    )
