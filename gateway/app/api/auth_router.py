# gateway/app/api/auth_router.py

import os
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

frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')

@router.get("/google/login", summary="Google 로그인 시작")
async def google_login(
    redirect_uri: str = Query(default=f"{frontend_url}/dashboard")
):
    """
    Google OAuth 로그인을 시작하는 엔드포인트입니다.
    DB 세션이 필요 없으므로 컨트롤러의 정적 메소드를 직접 호출합니다.
    """
    return AuthController.start_google_login(redirect_uri)

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
    # 디버깅을 위한 로그 추가
    print(f"🔍 [Profile Debug] Session token: {session_token}")
    print(f"🔍 [Profile Debug] Session token type: {type(session_token)}")
    print(f"🔍 [Profile Debug] Session token length: {len(session_token) if session_token else 0}")
    
    if not session_token:
        print("🔍 [Profile Debug] No session token found")
        raise HTTPException(status_code=401, detail="인증 쿠키가 없습니다.")
    
    if len(session_token) < 50:
        print(f"🔍 [Profile Debug] Session token too short: {session_token}")
        raise HTTPException(status_code=401, detail="유효하지 않은 세션 토큰입니다.")
    
    try:
        # 여기도 의존성 주입 체인을 만들어줌
        login_repo = LoginRepository(session=db)
        profile_repo = ProfileRepository(session=db)
        login_service = LoginService(login_repo=login_repo, profile_repo=profile_repo)
        auth_controller = AuthController(login_service=login_service)
        
        return await auth_controller.get_user_profile(session_token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))