# company-service/app/domain/controller/company_controller.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.model.company_schema import CompanyCreate, CompanyRead
from app.domain.repository.company_repository import CompanyRepository
from app.domain.service.company_service import CompanyService

class CompanyController:
    """
    회사(Company)와 관련된 요청을 받아 처리를 담당하는 서비스와 연결하는 컨트롤러
    """
    async def create_company(
        self, 
        db: AsyncSession, 
        company_data: CompanyCreate
    ) -> CompanyRead:
        """
        회사 생성 요청을 받아 서비스 계층에 전달합니다.

        Args:
            db (AsyncSession): 데이터베이스 세션
            company_data (CompanyCreate): 생성할 회사 정보

        Returns:
            CompanyRead: 생성된 회사 정보
        """
        # 1. Repository 인스턴스 생성
        company_repo = CompanyRepository(session=db)
        
        # 2. Service 인스턴스 생성 (Repository 주입)
        company_service = CompanyService(company_repository=company_repo)
        
        # 3. Service의 비즈니스 로직 호출
        created_company = await company_service.create_new_company(company_data)
        
        return created_company

# 라우터에서 사용하기 쉽도록 컨트롤러 인스턴스를 생성
company_controller = CompanyController()