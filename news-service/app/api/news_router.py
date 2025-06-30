from fastapi import APIRouter,Request
from fastapi.responses import JSONResponse
import logging
from app.domain.controlloer.news_controller import NewsController
from app.domain.model.news_schema import NewsRequest

router = APIRouter()
logger = logging.getLogger("news_main")
news_controller = NewsController()

@router.post("/search")
async def news(req: NewsRequest):
    logger.info(f"🔍 기업명 수신: {req.company_name}")
    result = news_controller.get_news(req.company_name)
    return JSONResponse(content=result)
    