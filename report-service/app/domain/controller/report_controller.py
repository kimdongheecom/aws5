from sqlalchemy.ext.asyncio import AsyncSession
# [수정] import 경로 및 클래스 이름 변경
from app.domain.model.sample_schema import SampleRead
from app.domain.repository.report_repository import ReportRepository
from app.domain.service.report_service import ReportService

class ReportController:
    async def get_qual_data(
        self,
        db: AsyncSession,
        company_id: str,
        disclosure_id: str
    ) -> SampleRead: # [수정] 반환 타입 힌트 변경
        """
        요청을 받아 리포지토리와 서비스를 초기화하고 로직을 실행합니다.
        """
        report_repo = ReportRepository(session=db)
        report_service = ReportService(report_repository=report_repo)
        
        # 서비스 계층 호출
        qual_data = await report_service.fetch_qual_data(
            company_id=company_id,
            disclosure_id=disclosure_id
        )
        return qual_data

# 라우터에서 사용하기 위한 컨트롤러 인스턴스
report_controller = ReportController()