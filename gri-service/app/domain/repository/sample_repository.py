# C:\Users\edh48\Documents\aws5\gri-service\app\domain\repository\sample_repository.py

from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
# ✅ [신규] UPSERT를 위해 postgresql dialect의 insert를 임포트합니다.
from sqlalchemy.dialects.postgresql import insert

from app.domain.entity.sample_entity import SampleEntity
from app.domain.schema.sample_schema import SampleRequest

class SampleRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    # ✅ [수정] create_sample 메서드를 upsert_sample로 완전히 대체합니다.
    async def upsert_sample(self, sample_data: SampleRequest) -> SampleEntity:
        """
        disclosure_id를 기준으로 sample 데이터를 생성(INSERT)하거나 업데이트(UPDATE)합니다. (UPSERT)
        """
        # 1. Pydantic 스키마를 딕셔너리로 변환합니다.
        data_to_upsert = sample_data.model_dump()

        # 2. SQLAlchemy의 INSERT 문을 생성합니다.
        stmt = insert(SampleEntity).values(data_to_upsert)
        
        # 3. ON CONFLICT DO UPDATE 절을 추가합니다.
        #    - index_elements=['disclosure_id']: disclosure_id 컬럼에서 unique 충돌이 발생하면
        #    - set_={...}: qual_data와 company_id 컬럼을 새로 들어온 값으로 업데이트합니다.
        stmt = stmt.on_conflict_do_update(
            index_elements=['disclosure_id'],
            set_={
                'qual_data': stmt.excluded.qual_data,
                'company_id': stmt.excluded.company_id,
            }
        ).returning(SampleEntity) # 4. 삽입/업데이트된 행 전체를 반환하도록 설정합니다.

        # 5. 쿼리를 실행하고 결과를 가져옵니다.
        result = await self.session.execute(stmt)
        upserted_entity = result.scalar_one()
        return upserted_entity

    # ✅ [유지] 이 메서드는 변경 없이 그대로 사용합니다.
    async def get_by_id_with_relations(self, sample_id: int) -> Optional[SampleEntity]:
        """
        ID를 기반으로 Sample 데이터를 조회하되, 관련된 Company와 Disclosure 정보도
        함께 로드(Eager Loading)합니다.
        """
        stmt = (
            select(SampleEntity)
            .where(SampleEntity.id == sample_id)
            .options(
                selectinload(SampleEntity.company),
                selectinload(SampleEntity.disclosure)
            )
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()