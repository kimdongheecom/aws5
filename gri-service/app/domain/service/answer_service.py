# gri-service/app/domain/service/answer_service.py

import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.repository.answer_repository import AnswerRepository
from app.domain.schema.answer_schema import AnswerBulkCreateRequest

logger = logging.getLogger(__name__)

class AnswerService:
    def __init__(self):
        self.answer_repo = AnswerRepository()

    async def create_or_update_answers(self, db: AsyncSession, request: AnswerBulkCreateRequest) -> int:
        """
        요청 데이터를 받아 리포지토리를 통해 답변을 생성하거나 업데이트합니다.
        """
        logger.info(f"AnswerService: {len(request.answers)}개의 답변 처리를 시작합니다. (사용자: {request.user_id})")

        # Repository에 전달할 데이터 형태로 가공 (List of Dictionaries)
        answers_to_upsert = [
            {
                "requirement_id": ans.requirement_id,
                "quant_data": ans.quant_data,
                "user_id": request.user_id
            }
            for ans in request.answers
        ]

        try:
            processed_count = await self.answer_repo.upsert_answers_bulk(db, answers_to_upsert)
            logger.info(f"AnswerService: {processed_count}개 답변 처리 완료.")
            return processed_count
        except Exception as e:
            logger.error(f"❌ AnswerService 처리 중 오류 발생: {e}", exc_info=True)
            # 서비스 계층에서 발생한 특정 오류를 여기서 처리할 수 있습니다.
            raise e
