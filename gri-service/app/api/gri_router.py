import logging
from fastapi import APIRouter, Depends, HTTPException, Body, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

# --- 데이터베이스 및 컨트롤러 임포트 ---
from app.common.database.model.database import get_db
from app.domain.controller.answer_controller import AnswerController
from app.domain.controller.model_loader_controller import ModelLoaderController


# ✅ [신규] Sample 관련 컨트롤러 및 스키마 임포트
from app.domain.controller.sample_controller import sample_controller
from app.domain.schema.sample_schema import SampleRequest, SampleResponse
from app.domain.schema.answer_schema import AnswerBulkCreateRequest, BulkUpsertResponse

# --- 기본 설정 ---
logger = logging.getLogger(__name__)
router = APIRouter(tags=["GRI Service (Answers & AI Generation)"])

# --- AI 생성을 위한 Pydantic 모델 ---
class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    answer: str

# --- 컨트롤러 인터페이스 생성 ---
answer_controller = AnswerController()
model_loader_controller = ModelLoaderController()

# === 엔드포인트 1: 답변 저장 ===
@router.post("/answers", response_model=BulkUpsertResponse)
async def save_user_answers(
    request: AnswerBulkCreateRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    ✅ [수정] 사용자가 입력한 여러 개의 답변을 데이터베이스에 새로 추가합니다.
    """
    # ✅ [수정] 로그 메시지를 '추가'에 맞게 변경
    logger.info(f"🎯 [GRI-Router] /answers (답변 추가) 엔드포인트 호출됨. 처리할 답변 수: {len(request.answers)}")
    try:
        response = await answer_controller.save_answers(db, request)
        # ✅ [수정] 로그 메시지를 '추가'에 맞게 변경
        logger.info(f"✅ [GRI-Router] /answers (답변 추가) 요청 처리 완료.")
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"❌ [GRI-Router] API 계층에서 예상치 못한 오류 발생: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다.")


# === 엔드포인트 2: AI 텍스트 생성 (이 부분은 변경 없음) ===
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


# === ✅ [신규] 엔드포인트 3: 최종 승인 문장 저장 ===
@router.post(
    "/samples/approve",
    response_model=SampleResponse,
    status_code=status.HTTP_201_CREATED,
    summary="최종 승인된 문장 저장",
    description="프론트엔드에서 '최종 승인'된 문장을 Supabase의 'sample' 테이블에 저장하고, 관계 정보를 포함하여 반환합니다."
)
async def approve_and_save_sample_endpoint(
    sample_data: SampleRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    '최종 승인' 엔드포인트입니다. 로직은 SampleController에 위임합니다.
    """
    logger.info(f"🎯 [GRI-Router] /samples/approve 엔드포인트 호출됨. Disclosure ID: {sample_data.disclosure_id}")
    try:
        created_sample = await sample_controller.create_approved_sample(
            db=db,
            sample_data=sample_data
        )
        logger.info(f"✅ [GRI-Router] /samples/approve 요청 처리 완료. 생성된 ID: {created_sample.id}")
        return created_sample
    except Exception as e:
        # ✅ [수정] 관계 설정으로 인해 발생할 수 있는 오류에 대비하여 에러 로깅 강화
        logger.error(f"❌ [GRI-Router] /samples/approve 처리 중 오류 발생: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"최종 승인 문장 저장 중 오류 발생: {str(e)}"
        )