import logging
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.repository.answer_repository import AnswerRepository
from app.domain.service.answer_service import AnswerService
from app.domain.schema.answer_schema import AnswerBulkCreateRequest, BulkUpsertResponse

logger = logging.getLogger(__name__)

class AnswerController:
    async def save_answers(self, db: AsyncSession, request: AnswerBulkCreateRequest) -> BulkUpsertResponse:
        """
        답변 저장 요청을 받아 서비스에 전달하고 결과를 반환합니다.
        """
        try:
            answer_repo = AnswerRepository(session=db)
            answer_service = AnswerService(answer_repository=answer_repo)

            logger.info("AnswerController: 답변 추가 요청을 서비스로 전달합니다.")
            # ✅ [수정] 변경된 Service 함수(add_new_answers)를 호출합니다.
            processed_count = await answer_service.add_new_answers(request)
            
            return BulkUpsertResponse(
                # ✅ [수정] 응답 메시지를 '추가'에 맞게 변경
                message="답변이 성공적으로 추가되었습니다.",
                processed_count=processed_count
            )
        except Exception as e:
            logger.error(f"❌ AnswerController에서 오류 발생: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="답변 저장 중 서버 오류가 발생했습니다.")