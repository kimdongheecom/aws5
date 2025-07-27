from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.common.database.model.database import get_db
# [수정] import 경로 및 클래스 이름 변경
from app.domain.model.sample_schema import SampleRead
from app.domain.controller.report_controller import report_controller

router = APIRouter()

@router.get(
    "/qual-data",
    response_model=SampleRead, # [수정] 응답 모델을 명확해진 이름으로 변경
    summary="특정 조건의 질적 데이터 조회",
    description="회사 ID와 공시 ID를 기준으로 sample 테이블에서 질적 데이터를 가져옵니다."
)
async def get_qual_data_endpoint(
    company_id: str = Query(..., description="회사 ID (예: KOMIPO)"),
    disclosure_id: str = Query(..., description="공시 ID (예: 301-1)"),
    db: AsyncSession = Depends(get_db)
):
    """
    프론트엔드에서 E, S, G 가져오기 버튼 클릭 시 호출되는 API 엔드포인트입니다.
    """
    try:
        return await report_controller.get_qual_data(
            db=db,
            company_id=company_id,
            disclosure_id=disclosure_id
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"데이터 조회 중 서버 오류 발생: {str(e)}"
        )