# C:\Users\edh48\Documents\aws5\gri-service\app\domain\service\answer_service.py

import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.repository.answer_repository import AnswerRepository
from app.domain.schema.answer_schema import AnswerBulkCreateRequest

logger = logging.getLogger(__name__)

class AnswerService:
    def __init__(self, answer_repository: AnswerRepository):
        self.answer_repo = answer_repository

    async def add_new_answers(self, request: AnswerBulkCreateRequest) -> int:
        """
        요청 데이터를 받아 리포지토리를 통해 새로운 답변을 추가합니다. (기존 유지)
        """
        logger.info(f"AnswerService: {len(request.answers)}개의 답변 추가를 시작합니다. (사용자: {request.user_id})")

        answers_to_insert = [
            {
                "requirement_id": ans.requirement_id,
                "quant_data": ans.quant_data,
                "user_id": request.user_id
            }
            for ans in request.answers
        ]

        try:
            processed_count = await self.answer_repo.insert_answers_bulk(answers_to_insert)
            return processed_count
        except Exception as e:
            logger.error(f"❌ AnswerService 처리 중 오류 발생: {e}", exc_info=True)
            raise e

    async def get_disclosure_id(self, request: AnswerBulkCreateRequest) -> str:
        """
        [수정] request 객체에서 requirement_id를 추출하여 repository를 호출합니다.
        """
        if not request.answers:
            raise ValueError("조회할 답변 데이터가 없습니다.")
        
        first_requirement_id = request.answers[0].requirement_id
        disclosure_id = await self.answer_repo.get_disclosure_id(first_requirement_id)
        
        if not disclosure_id:
            raise ValueError(f"ID가 {first_requirement_id}인 항목의 disclosure_id를 찾을 수 없습니다.")
        return disclosure_id

    async def get_peft_answer(self, disclosure_id: str, request: AnswerBulkCreateRequest) -> str:
        """
        [수정] disclosure_id와 사용자 답변 요청을 받아 AI 프롬프트를 만들고 추론을 실행합니다.
        """
        context = await self.answer_repo.get_context_for_peft(disclosure_id)
        if not context:
            raise ValueError(f"ID가 {disclosure_id}인 disclosure의 컨텍스트를 찾을 수 없습니다.")

        user_answers_map = {ans.requirement_id: ans.quant_data for ans in request.answers}
        
        prompt_data = {
            "company_info": {"name": "우리 회사"},
            "g_standard": context["g_standard"],
            "disclosure_item": f"{context['disclosure_id']} {context['disclosure_title']}",
            "requirements_and_data": [
                {
                    "id": req["id"],
                    "question": req["question"],
                    "raw_answer": user_answers_map.get(req["id"], "답변 없음")
                } for req in context["all_requirements"] if user_answers_map.get(req["id"])
            ]
        }
        
        final_prompt = f"""You are an expert ESG report writer. Based on the following structured data, synthesize the information into a single, cohesive, and professional Korean paragraph for a sustainability report.

### Data:
{prompt_data}

### Polished Report Paragraph:"""
        
        logger.info(f"AI 모델에 전달할 최종 프롬프트 생성 완료.")

        peft_answer = await self.answer_repo.get_peft_answer(final_prompt)
        return peft_answer