import logging
from typing import List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from app.domain.entity.answer_entity import AnswerEntity

logger = logging.getLogger(__name__)

class AnswerRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

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