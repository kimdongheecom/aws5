from fastapi import APIRouter,Request
from fastapi.responses import JSONResponse
import logging
from app.domain.controller.issuepool_controller import IssuepoolController
from app.domain.model.issuepool_schema import IssuepoolRequest

router = APIRouter()
logger = logging.getLogger("issuepool_main")
issuepool_controller = IssuepoolController()

@router.post("/search")
async def issuepool(req: IssuepoolRequest):
    logger.info(f"🔍 기업명 수신: {req.company_name}")
    return JSONResponse(content=issuepool_controller.get_issuepool(req.company_name))
    