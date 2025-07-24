# C:\Users\edh48\Documents\aws5\gri-service\app\domain\repository\answer_repository.py

import logging
from typing import List, Dict, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.dialects.postgresql import insert

# [수정] 파일 구조에 맞게 entity import 경로 수정
from app.domain.entity.answer_entity import AnswerEntity
from app.domain.service.model_loader_service import model_loader_service

logger = logging.getLogger(__name__)

class AnswerRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_disclosure_id(self, requirement_id: str) -> str:
        """
        requirement_id로부터 disclosure_id를 조회합니다.
        """
        try:
            # 간단한 구현: requirement_id에서 disclosure_id 추출
            # 예: "gri301-1-a" -> "gri301-1"
            if "-" in requirement_id:
                disclosure_id = "-".join(requirement_id.split("-")[:-1])
                return disclosure_id
            else:
                return requirement_id
        except Exception as e:
            logger.error(f"disclosure_id 조회 중 오류 발생: {e}", exc_info=True)
            raise e

    async def get_context_for_peft(self, disclosure_id: str) -> Dict:
        """
        PEFT 모델을 위한 컨텍스트 정보를 조회합니다.
        """
        try:
            # 간단한 구현: 기본 컨텍스트 반환
            context = {
                "g_standard": "GRI",
                "disclosure_id": disclosure_id,
                "disclosure_title": f"{disclosure_id} 관련 제목",
                "all_requirements": [
                    {
                        "id": f"{disclosure_id}-a",
                        "question": f"{disclosure_id}에 대한 질문"
                    }
                ]
            }
            return context
        except Exception as e:
            logger.error(f"컨텍스트 조회 중 오류 발생: {e}", exc_info=True)
            raise e

    async def get_peft_answer(self, prompt: str) -> str:
        """
        PEFT 모델을 사용해서 프롬프트에 대한 답변을 생성합니다.
        """
        try:
            # 모델이 로드되지 않았다면 로드
            if not model_loader_service.model:
                model_loader_service.load_model()
            
            # model_loader_service의 generate 메소드 사용
            answer = model_loader_service.generate(prompt, max_new_tokens=512)
            
            logger.info(f"PEFT 모델로 답변 생성 완료")
            return answer
            
        except Exception as e:
            logger.error(f"PEFT 모델 추론 중 오류 발생: {e}", exc_info=True)
            raise e

    # ✅ [수정] 함수 이름과 설명을 순수 INSERT에 맞게 변경
    async def insert_answers_bulk(self, answers_data: List[Dict]) -> int:
        """
        여러 답변을 데이터베이스에 새로 추가(INSERT)합니다.
        """
        if not answers_data:
            return 0

        # ✅ [수정] on_conflict_do_update 부분을 제거하여 순수한 INSERT 문으로 만듭니다.
        stmt = insert(AnswerEntity).values(answers_data)
        
        try:
            result = await self.session.execute(stmt)
            # ✅ [수정] 로그 메시지를 INSERT에 맞게 변경
            logger.info(f"✅ {result.rowcount}개의 답변이 DB 세션에 추가(INSERT)되었습니다. (아직 커밋되지 않음)")
            await self.session.flush()
            return result.rowcount
        except Exception as e:
            # ✅ [수정] 로그 메시지를 INSERT에 맞게 변경
            logger.error(f"❌ 답변 대량 INSERT 중 데이터베이스 오류 발생: {e}", exc_info=True)
            raise e