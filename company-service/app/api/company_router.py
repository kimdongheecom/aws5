# company-service/app/api/company_router.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.common.database.model.database import get_db
from app.domain.model.company_schema import CompanyCreate, CompanyRead
# [수정] 서비스와 리포지토리 대신 컨트롤러를 import 합니다.
from app.domain.controller.company_controller import company_controller

router = APIRouter()

@router.post(
    "/", 
    response_model=CompanyRead,
    status_code=status.HTTP_201_CREATED,
    summary="새로운 회사 정보 등록",
    description="프론트엔드에서 받은 회사 정보를 데이터베이스에 저장합니다."
)
async def create_company_endpoint(
    company_data: CompanyCreate, 
    db: AsyncSession = Depends(get_db)
):
    """
    회사 생성 엔드포인트입니다.
    [수정] 모든 로직 처리를 컨트롤러에 위임합니다.
    """
    try:
        # 컨트롤러의 메서드를 호출하여 로직을 수행합니다.
        created_company = await company_controller.create_company(
            db=db, 
            company_data=company_data
        )
        return created_company
    except Exception as e:
        # 예외 처리는 API 계층(라우터)에 두는 것이 좋습니다.
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"회사 정보 저장 중 오류 발생: {str(e)}"
        )