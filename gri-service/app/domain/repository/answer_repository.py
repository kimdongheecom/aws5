# gri-service/app/domain/repository/answer_repository.py

import logging
from typing import List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from app.domain.entity.answer_entity import AnswerEntity

logger = logging.getLogger(__name__)

class AnswerRepository:
    async def upsert_answers_bulk(self, db: AsyncSession, answers_data: List[Dict]) -> int:
        """
        여러 답변을 한번에 생성하거나 업데이트합니다(UPSERT).
        
        'requirement_id'가 이미 존재하면 'quant_data'와 'user_id'를 업데이트하고,
        존재하지 않으면 새로운 레코드를 삽입합니다.
        """
        if not answers_data:
            return 0

        # UPSERT를 위한 SQLAlchemy 2.0+ 구문
        stmt = insert(AnswerEntity).values(answers_data)
        
        # 'requirement_id'가 충돌(중복)할 경우 업데이트할 필드를 지정합니다.
        # 'excluded'는 INSERT 하려던 새로운 값들을 참조합니다.
        upsert_stmt = stmt.on_conflict_do_update(
            index_elements=['requirement_id'],
            set_={
                'quant_data': stmt.excluded.quant_data,
                'user_id': stmt.excluded.user_id
            }
        )
        
        try:
            result = await db.execute(upsert_stmt)
            await db.commit()
            logger.info(f"✅ {result.rowcount}개의 답변이 성공적으로 UPSERT 되었습니다.")
            return result.rowcount
        except Exception as e:
            await db.rollback()
            logger.error(f"❌ 답변 대량 UPSERT 중 데이터베이스 오류 발생: {e}", exc_info=True)
            raise e
