from fastapi import APIRouter
from fastapi.responses import JSONResponse
import logging
from app.domain.controller.sasb_controller import SasbController

router = APIRouter()
logger = logging.getLogger("sasb_main")
sasb_controller = SasbController()

@router.get("/search")
async def sasb():
    controller = SasbController()
    return JSONResponse(content=controller.get_sasb())
    