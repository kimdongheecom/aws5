from fastapi import APIRouter, HTTPException, Query
from app.domain.schema.login_schema import LoginResponseSchema, LoginSchema
from app.domain.service.login_service import LoginService

from app.domain.model.login_model import LoginEntity
from typing import List

router = APIRouter(prefix="/login",tags=["login"])
login_service = LoginService()

@router.get("/{login_id}", response_model=LoginEntity)
async def get_login_by_id(login_id: str):
    """ID로 Login 정보 조회"""
    login = await login_service.get_login_by_id(login_id)
    if not login:
        raise HTTPException(status_code=404, detail="Login 정보를 찾을 수 없습니다")
    return login

@router.get("/", response_model=List[LoginEntity])
async def get_login_by_provider(provider: str = Query(..., description="Login 제공자")):
    """제공자별 Login 정보 조회"""
    return await login_service.get_login_by_provider(provider)

@router.post("/", response_model=LoginResponseSchema)
async def create_login(login_data: LoginSchema):
    """Login 인증 정보 생성"""
    try:
        return await login_service.create_login(login_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{login_id}/refresh", response_model=LoginResponseSchema)
async def refresh_login_token(login_id: str):
    """Login 토큰 갱신"""
    response = await login_service.refresh_login_token(login_id)
    if not response:
        raise HTTPException(status_code=404, detail="토큰 갱신에 실패했습니다")
    return response

@router.delete("/{login_id}", response_model=bool)
async def delete_login(login_id: str):
    """Login 정보 삭제"""
    result = await login_service.delete_login(login_id)
    if not result:
        raise HTTPException(status_code=404, detail="Login 정보를 찾을 수 없습니다")
    return True