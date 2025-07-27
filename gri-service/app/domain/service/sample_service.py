# C:\Users\edh48\Documents\aws5\gri-service\app\domain\service\sample_service.py

from app.domain.repository.sample_repository import SampleRepository
from app.domain.schema.sample_schema import SampleRequest, SampleResponse

class SampleService:
    def __init__(self, sample_repository: SampleRepository):
        self.sample_repository = sample_repository

    async def approve_and_save_sample(self, sample_data: SampleRequest) -> SampleResponse:
        """
        최종 승인된 sample 데이터를 저장(UPSERT)하고, 관계 정보까지 포함하여 반환합니다.
        """
        # 1. Repository를 통해 데이터를 UPSERT합니다.
        # ✅ [수정] create_sample 대신 upsert_sample을 호출합니다.
        upserted_entity = await self.sample_repository.upsert_sample(sample_data)
        
        # 2. UPSERT 작업은 트랜잭션을 즉시 반영해야 하므로 commit 합니다.
        await self.sample_repository.session.commit()
        
        # 3. commit 후, UPSERT된 엔티티의 ID를 사용하여 관계 정보를 포함한 전체 데이터를 다시 조회합니다.
        #    이렇게 해야 Pydantic 스키마가 relationship 필드를 채울 수 있습니다.
        full_sample_entity = await self.sample_repository.get_by_id_with_relations(
            sample_id=upserted_entity.id
        )

        if not full_sample_entity:
            # 이 경우는 거의 발생하지 않지만, 안정성을 위한 방어 코드입니다.
            raise Exception("데이터 저장 후 조회가 실패했습니다.")
        
        # 4. 관계가 모두 포함된 완전한 엔티티를 Pydantic 응답 스키마로 변환하여 반환합니다.
        return SampleResponse.model_validate(full_sample_entity)