# company-service/app/domain/service/company_service.py

from app.domain.repository.company_repository import CompanyRepository
from app.domain.model.company_schema import CompanyCreate, CompanyRead

class CompanyService:
    def __init__(self, company_repository: CompanyRepository):
        self.company_repository = company_repository

    async def create_new_company(self, company_data: CompanyCreate) -> CompanyRead:
        """
        새로운 회사 정보를 생성하는 비즈니스 로직을 수행합니다.
        """
        created_company_entity = await self.company_repository.create_company(company_data)
        
        # SQLAlchemy 엔티티를 Pydantic 스키마로 변환하여 반환
        return CompanyRead.from_orm(created_company_entity)