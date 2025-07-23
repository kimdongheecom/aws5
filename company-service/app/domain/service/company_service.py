from app.domain.repository.company_repository import CompanyRepository
from app.domain.model.company_schema import CompanyCreate, CompanyRead

class CompanyService:
    def __init__(self, company_repository: CompanyRepository):
        self.company_repository = company_repository

    async def create_new_company(self, company_data: CompanyCreate) -> CompanyRead:
        """
        새로운 회사 정보를 생성하는 비즈니스 로직을 수행합니다.
        """
        # 1. Repository를 통해 DB에 추가할 엔티티를 준비
        created_company_entity = await self.company_repository.create_company(company_data)
        
        # ✅ [수정] Service 레이어에서 트랜잭션을 최종적으로 commit 합니다.
        # 이렇게 하면 여러 Repository 작업을 하나의 트랜잭션으로 묶을 수 있습니다.
        await self.company_repository.session.commit()
        await self.company_repository.session.refresh(created_company_entity)
        
        # 3. commit된 엔티티를 Pydantic 스키마로 변환하여 반환
        return CompanyRead.model_validate(created_company_entity)