from fastapi import APIRouter
from fastapi.responses import JSONResponse
import logging
from app.domain.controller.report_controller import ReportController

router = APIRouter()
logger = logging.getLogger("report_main")
report_controller = ReportController()

@router.get("/search")
async def report(company_name: str):
    controller = ReportController()
    return JSONResponse(content=controller.get_report(company_name))

