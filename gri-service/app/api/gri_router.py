# gri-service/app/api/gri_router.py
import logging
from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from app.domain.controller.gri_controller import gri_controller

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/gri", tags=["GRI Model"])

class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    answer: str

@router.post("/generate", response_model=GenerateResponse)
async def generate_text(request: GenerateRequest = Body(...)):
    """모델 로딩 테스트를 위한 간단한 텍스트 생성 API"""
    try:
        answer = gri_controller.generate_text_from_prompt(request.prompt)
        return GenerateResponse(answer=answer)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"❌ API 계층에서 오류 발생: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다.")