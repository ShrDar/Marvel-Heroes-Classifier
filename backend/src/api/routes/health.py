from fastapi import APIRouter, Request

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("")
async def health_check(request: Request):
    return {
        "status": "healthy",
        "frontend_url": request.app.state.settings.FRONTEND_URL,
    }
