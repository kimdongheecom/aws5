import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.repository.answer_repository import AnswerRepository
from app.domain.schema.answer_schema import AnswerBulkCreateRequest

logger = logging.getLogger(__name__)

class AnswerService:
    def __init__(self, answer_repository: AnswerRepository):
        self.answer_repo = answer_repository

    # ✅ [수정] 함수 이름과 설명을 순수 INSERT에 맞게 변경
    async def add_new_answers(self, request: AnswerBulkCreateRequest) -> int:
        """
        요청 데이터를 받아 리포지토리를 통해 새로운 답변을 추가합니다.
        """
        logger.info(f"AnswerService: {len(request.answers)}개의 답변 추가를 시작합니다. (사용자: {request.user_id})")

        # ✅ [수정] 변수 이름을 INSERT에 맞게 변경
        answers_to_insert = [
            {
                "requirement_id": ans.requirement_id,
                "quant_data": ans.quant_data,
                "user_id": request.user_id
            }
            for ans in request.answers
        ]

        try:
            # ✅ [수정] 변경된 Repository 함수(insert_answers_bulk)를 호출합니다.
            processed_count = await self.answer_repo.insert_answers_bulk(answers_to_insert)

            # 트랜잭션 관리는 그대로 유지 (매우 중요)
            await self.answer_repo.session.commit()

            # ✅ [수정] 로그 메시지를 INSERT에 맞게 변경
            logger.info(f"AnswerService: {processed_count}개 답변 추가 및 커밋 완료.")
            return processed_count
        except Exception as e:
            logger.error(f"❌ AnswerService 처리 중 오류 발생, 롤백을 시도합니다: {e}", exc_info=True)
            await self.answer_repo.session.rollback()
            raise e