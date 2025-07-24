# C:\Users\edh48\Documents\aws5\gri-service\app\domain\controller\answer_controller.py

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
        답변 저장 요청을 받아 서비스에 전달하고, AI 문장 생성 후 결과를 반환합니다.
        """
        answer_repo = AnswerRepository(session=db)
        answer_service = AnswerService(answer_repository=answer_repo)
        
        try:
            logger.info("AnswerController: 답변 추가 및 AI 문장 생성 요청을 서비스로 전달합니다.")
            
            # 1. 답변 저장 (커밋은 아직 안 함)
            await answer_service.add_new_answers(request)

            # 2. disclosure_id 조회
            disclosure_id = await answer_service.get_disclosure_id(request)
            
            # 3. AI 문장 생성
            peft_answer = await answer_service.get_peft_answer(disclosure_id, request)
            
            # 4. 모든 작업 성공 시 최종 커밋
            await db.commit()
            
            logger.info(f"👌👌👌👌👌AnswerController: PEFT 모델 추론 결과: {peft_answer}")
            return BulkUpsertResponse(
                message=peft_answer,
                processed_count=len(request.answers)
            )
        except Exception as e:
            # 5. 오류 발생 시 롤백
            await db.rollback()
            logger.error(f"❌ AnswerController에서 오류 발생: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="답변 저장 및 AI 문장 생성 중 서버 오류가 발생했습니다.")