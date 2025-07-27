from fastapi import HTTPException, status
# [수정] import 경로 및 클래스 이름 변경
from app.domain.model.sample_schema import SampleRead
from app.domain.repository.report_repository import ReportRepository

class ReportService:
    def __init__(self, report_repository: ReportRepository):
        self.report_repository = report_repository

    async def fetch_qual_data(self, company_id: str, disclosure_id: str) -> SampleRead: # [수정] 반환 타입 힌트 변경
        """
        리포지토리를 통해 데이터를 조회하고, 결과가 없으면 404 에러를 발생시킵니다.
        """
        sample_data = await self.report_repository.get_qual_data_by_ids(
            company_id=company_id,
            disclosure_id=disclosure_id
        )

        if not sample_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"데이터를 찾을 수 없습니다: company_id='{company_id}', disclosure_id='{disclosure_id}'"
            )
        
        # [수정] model_validate에 사용하는 클래스 이름 변경
        return SampleRead.model_validate(sample_data)