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
        company_entity = Company(**company_data.model_dump())
        
        self.session.add(company_entity)
        
        # ✅ [수정] commit과 refresh를 Repository에서 제거합니다.
        # 트랜잭션 관리는 Service 레이어에서 담당하도록 합니다.
        # await self.session.commit()
        # await self.session.refresh(company_entity)
        
        # 아직 commit되지 않은 엔티티를 반환합니다.
        return company_entity