import logging
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

# --- 데이터베이스 및 컨트롤러 임포트 ---
# 경로 수정: database.py의 새 경로에서 get_db를 임포트
from app.common.database.model.database import get_db

# 답변 저장을 위한 컨트롤러
from app.domain.controller.answer_controller import AnswerController
# AI 생성을 위한 컨트롤러 (기존 코드 기반)
from app.domain.controller.model_loader_controller import ModelLoaderController

# 스키마 임포트
from app.domain.schema.answer_schema import AnswerBulkCreateRequest, BulkUpsertResponse


# --- 기본 설정 ---
logger = logging.getLogger(__name__)
router = APIRouter(prefix="/gri", tags=["GRI Service (Answers & AI Generation)"])

# --- AI 생성을 위한 Pydantic 모델 ---
class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    answer: str

# --- 컨트롤러 인스턴스 생성 ---
answer_controller = AnswerController()
model_loader_controller = ModelLoaderController()


# === 엔드포인트 1: 답변 저장 ===
@router.post("/answers", response_model=BulkUpsertResponse)
async def save_user_answers(
    request: AnswerBulkCreateRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    사용자가 입력한 여러 개의 답변을 데이터베이스에 저장(UPSERT)합니다.
    """
    logger.info(f"🎯 [GRI-Router] /answers 엔드포인트 호출됨. 처리할 답변 수: {len(request.answers)}")
    try:
        response = await answer_controller.save_answers(db, request)
        logger.info(f"✅ [GRI-Router] /answers 요청 처리 완료.")
        return response
    except HTTPException as e:
        # 컨트롤러에서 발생시킨 HTTP 예외는 그대로 전달
        raise e
    except Exception as e:
        # 예상치 못한 기타 예외 처리
        logger.error(f"❌ [GRI-Router] API 계층에서 예상치 못한 오류 발생: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다.")


# === 엔드포인트 2: AI 텍스트 생성 (누락되었던 코드 추가) ===
@router.post("/generate", response_model=GenerateResponse)
async def generate_text(request: GenerateRequest = Body(...)):
    """
    AI 모델을 사용하여 프롬프트 기반으로 텍스트를 생성합니다.
    """
    logger.info("🎯 [GRI-Router] /generate 엔드포인트 호출됨")
    logger.info(f"🎯 [GRI-Router] 받은 프롬프트: {request.prompt[:100]}...")
    try:
        logger.info("🎯 [GRI-Router] 컨트롤러에 요청 전달 중...")
        answer = model_loader_controller.generate_text_from_prompt(request.prompt)
        logger.info("✅ [GRI-Router] 응답 생성 완료")
        return GenerateResponse(answer=answer)
    except ValueError as e:
        logger.error(f"❌ [GRI-Router] 유효성 검사 오류: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"❌ [GRI-Router] API 계층에서 오류 발생: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다.")