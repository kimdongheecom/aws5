# gateway/app/api/auth_router.py

from fastapi import APIRouter, Cookie, HTTPException, Query, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

# [수정] 의존성 주입을 위한 import 추가
from app.common.database.model.database import get_db
from app.domain.controller.auth_controller import AuthController
from app.domain.service.login_service import LoginService
from app.domain.repository.login_repository import LoginRepository
from app.domain.repository.profile_repository import ProfileRepository

router = APIRouter()

# [수정] 컨트롤러를 직접 생성하지 않음

@router.get("/google/login", summary="Google 로그인 시작")
async def google_login(
    redirect_uri: str = Query(default="http://localhost:3000/dashboard")
):
    # 컨트롤러를 직접 초기화하지 않고, 임시로 서비스만 사용
    # 실제로는 컨트롤러 패턴을 일관되게 사용해야 함
    # 이 부분은 단순 리다이렉트라 DB 세션이 필요 없음
    temp_service = LoginService(None, None) # 임시 인스턴스
    auth_controller = AuthController(temp_service)
    return await auth_controller.start_google_login(redirect_uri)

@router.get("/google/callback", summary="Google OAuth 콜백 처리")
async def google_callback(
    code: str = Query(...),
    state: str = Query(...),
    db: AsyncSession = Depends(get_db) # [핵심] DB 세션 주입
):
    # [핵심] 의존성 주입 체인: 라우터 -> 컨트롤러 -> 서비스 -> 리포지토리
    login_repo = LoginRepository(session=db)
    profile_repo = ProfileRepository(session=db)
    login_service = LoginService(login_repo=login_repo, profile_repo=profile_repo)
    auth_controller = AuthController(login_service=login_service)
    
    return await auth_controller.handle_google_callback(code, state)

@router.post("/logout", summary="로그아웃")
async def logout():
    response = JSONResponse({"message": "로그아웃되었습니다."})
    response.delete_cookie(key="session_token", path="/")
    return response

@router.get("/profile", summary="사용자 프로필 조회")
async def get_profile(
    session_token: str | None = Cookie(None),
    db: AsyncSession = Depends(get_db) # 프로필 조회도 DB 작업이 필요할 수 있음
):
    if not session_token:
        raise HTTPException(status_code=401, detail="인증 쿠키가 없습니다.")
    try:
        # 여기도 의존성 주입 체인을 만들어줌
        login_repo = LoginRepository(session=db)
        profile_repo = ProfileRepository(session=db)
        login_service = LoginService(login_repo=login_repo, profile_repo=profile_repo)
        auth_controller = AuthController(login_service=login_service)
        
        return await auth_controller.get_user_profile(session_token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))