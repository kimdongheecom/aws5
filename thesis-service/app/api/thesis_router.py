from fastapi import APIRouter
from fastapi.responses import JSONResponse
import logging
from app.domain.controller.thesis_controller import ThesisController

router = APIRouter()
logger = logging.getLogger("thesis_main")
thesis_controller = ThesisController()

@router.get("/search")
async def stock():
    controller = ThesisController()
    return JSONResponse(content=controller.get_thesis())

