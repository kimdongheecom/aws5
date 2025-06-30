from fastapi import APIRouter
from fastapi.responses import JSONResponse
import logging
from app.domain.controller.stock_controller import StockController

router = APIRouter()
logger = logging.getLogger("stock_main")
stock_controller = StockController()

@router.get("/search")
async def stock(company_name: str):
    controller = StockController()
    return JSONResponse(content=controller.get_report(company_name))

