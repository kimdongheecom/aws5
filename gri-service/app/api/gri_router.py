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
    logger.info("🎯 [GRI-Router] /generate 엔드포인트 호출됨")
    logger.info(f"🎯 [GRI-Router] 받은 프롬프트: {request.prompt[:100]}...")
    try:
        logger.info("🎯 [GRI-Router] 컨트롤러에 요청 전달 중...")
        answer = gri_controller.generate_text_from_prompt(request.prompt)
        logger.info("✅ [GRI-Router] 응답 생성 완료")
        return GenerateResponse(answer=answer)
    except ValueError as e:
        logger.error(f"❌ [GRI-Router] 유효성 검사 오류: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"❌ [GRI-Router] API 계층에서 오류 발생: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다.")