# C:\Users\edh48\Documents\aws5\gri-service\app\domain\controller\sample_controller.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.schema.sample_schema import SampleRequest, SampleResponse
from app.domain.repository.sample_repository import SampleRepository
from app.domain.service.sample_service import SampleService

class SampleController:
    """
    Sample 데이터 관련 요청을 받아 서비스와 연결하는 컨트롤러
    """
    async def create_approved_sample(
        self, 
        db: AsyncSession, 
        sample_data: SampleRequest
    ) -> SampleResponse:
        """
        Sample 생성(최종 승인) 요청을 서비스 계층에 전달합니다.
        """
        # 1. Repository 인스턴스 생성
        sample_repo = SampleRepository(session=db)
        
        # 2. Service 인스턴스 생성 (Repository 주입)
        sample_service = SampleService(sample_repository=sample_repo)
        
        # 3. Service의 비즈니스 로직 호출
        created_sample = await sample_service.approve_and_save_sample(sample_data)
        
        return created_sample

# 라우터에서 사용하기 쉽도록 컨트롤러 인스턴스를 생성
sample_controller = SampleController()