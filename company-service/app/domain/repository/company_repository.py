# company-service/app/domain/repository/company_repository.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.model.company_entity import Company
from app.domain.model.company_schema import CompanyCreate

class CompanyRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_company(self, company_data: CompanyCreate) -> Company:
        """
        새로운 회사 정보를 데이터베이스에 저장합니다.
        """
        # Pydantic 모델을 dict로 변환하여 SQLAlchemy 모델 인스턴스 생성
        company_entity = Company(**company_data.model_dump())
        
        self.session.add(company_entity)
        await self.session.commit()
        await self.session.refresh(company_entity)
        
        return company_entity