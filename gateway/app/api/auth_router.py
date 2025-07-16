from fastapi import APIRouter, Cookie, HTTPException, Query
from fastapi.responses import JSONResponse
from app.domain.controller.auth_controller import AuthController

router = APIRouter()
auth_controller = AuthController()

@router.get("/google/login", summary="Google 로그인 시작")
async def google_login(
    redirect_uri: str = Query(
        default="http://localhost:3000/dashboard",
        description="로그인 후 리다이렉트할 URI (기본값: /dashboard)"
    )
):
    """
    Google OAuth 로그인을 시작합니다.
    리다이렉트 URI는 state 파라미터로 전달되어 콜백 시 다시 받게 됩니다.
    """
    return await auth_controller.start_google_login(redirect_uri)

@router.get("/google/callback", summary="Google OAuth 콜백 처리")
async def google_callback(
    code: str = Query(..., description="Google OAuth 인증 코드"),
    state: str = Query(..., description="로그인 시작 시 전달한 state 값")
):
    """
    Google OAuth 콜백을 처리합니다.
    인증 코드를 받아 처리하고 세션 토큰을 쿠키에 설정한 후 리다이렉트합니다.
    """
    return await auth_controller.handle_google_callback(code, state)

@router.post("/logout", summary="로그아웃")
async def logout(session_token: str | None = Cookie(None)):
    """
    사용자를 로그아웃하고 인증 쿠키를 삭제합니다.
    """
    print(f"로그아웃 요청 - 받은 세션 토큰: {session_token}")
    
    # 로그아웃 응답 생성
    response = JSONResponse({
        "success": True,
        "message": "로그아웃되었습니다."
    })
    
    # 인증 쿠키 삭제
    response.delete_cookie(
        key="session_token",
        path="/",
        # domain 설정 제거 (로컬 환경)
    )
    
    print("✅ 로그아웃 완료 - 인증 쿠키 삭제됨")
    return response

@router.get("/profile", summary="사용자 프로필 조회")
async def get_profile(session_token: str | None = Cookie(None)):
    """
    세션 토큰으로 사용자 프로필을 조회합니다.
    세션 토큰이 없거나 유효하지 않으면 401 에러를 반환합니다.
    """
    print(f"프로필 요청 - 받은 세션 토큰: {session_token}")
    
    if not session_token:
        raise HTTPException(status_code=401, detail="인증 쿠키가 없습니다.")
    try:
        return await auth_controller.get_user_profile(session_token)
    except Exception as e:
        print(f"프로필 조회 오류: {e}")
        raise HTTPException(status_code=401, detail=str(e))

@router.get("/test-cookie", summary="쿠키 테스트")
async def test_cookie():
    """
    쿠키 설정 테스트용 엔드포인트
    """
    from fastapi.responses import JSONResponse
    
    response = JSONResponse({"message": "쿠키 테스트", "success": True})
    response.set_cookie(
        key="test_token",
        value="test_value_123",
        httponly=True,
        samesite="lax",
        max_age=3600,
        path="/",
        secure=False,
        domain="localhost"
    )
    return response