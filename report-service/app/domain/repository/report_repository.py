from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.domain.model.sample_entity import Sample
from typing import Optional

class ReportRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_qual_data_by_ids(self, company_id: str, disclosure_id: str) -> Optional[Sample]:
        """
        company_id와 disclosure_id로 sample 테이블에서 단일 데이터를 조회합니다.
        """
        stmt = select(Sample).where(
            Sample.company_id == company_id,
            Sample.disclosure_id == disclosure_id
        )
        result = await self.session.execute(stmt)
        # 단일 결과를 반환하거나 결과가 없으면 None을 반환합니다.
        return result.scalars().first()