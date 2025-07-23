# gri-service/app/domain/controller/answer_controller.py

import logging
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.service.answer_service import AnswerService
from app.domain.schema.answer_schema import AnswerBulkCreateRequest, BulkUpsertResponse

logger = logging.getLogger(__name__)

class AnswerController:
    def __init__(self):
        self.answer_service = AnswerService()

    async def save_answers(self, db: AsyncSession, request: AnswerBulkCreateRequest) -> BulkUpsertResponse:
        """
        답변 저장 요청을 받아 서비스에 전달하고 결과를 반환합니다.
        """
        try:
            logger.info("AnswerController: 답변 저장 요청을 서비스로 전달합니다.")
            processed_count = await self.answer_service.create_or_update_answers(db, request)
            
            return BulkUpsertResponse(
                message="답변이 성공적으로 저장되었습니다.",
                processed_count=processed_count
            )
        except Exception as e:
            logger.error(f"❌ AnswerController에서 오류 발생: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="답변 저장 중 서버 오류가 발생했습니다.")
