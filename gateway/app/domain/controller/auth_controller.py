from typing import Dict, Any
from fastapi.responses import RedirectResponse
from app.domain.service.login_service import LoginService

class AuthController:
    def __init__(self):
        """컨트롤러 초기화"""
        self.login_service = LoginService()

    async def start_google_login(self, redirect_uri: str) -> RedirectResponse:
        """
        Google OAuth 로그인을 시작합니다.
        리다이렉트 URI는 state 파라미터로 전달되어 콜백 시 다시 받게 됩니다.
        """
        auth_url = await self.login_service.get_google_auth_url(redirect_uri)
        return RedirectResponse(url=auth_url)

    async def handle_google_callback(self, code: str, state: str) -> RedirectResponse:
        """
        Google OAuth 콜백을 처리합니다.
        인증 코드를 받아 처리하고 세션 토큰을 쿠키에 설정한 후 대시보드로 직접 리다이렉트합니다.
        """
        try:
            print(f"Google OAuth 콜백 시작 - code: {code[:20]}..., state: {state}")
            
            # 백엔드에서 Google OAuth 토큰 처리
            result = await self.login_service.handle_google_callback(code, state)
            print(f"Google OAuth 처리 결과: {result}")
            
            # 대시보드로 직접 리다이렉트
            redirect_url = state if state else "http://localhost:3000/dashboard"
            print(f"리다이렉트 URL: {redirect_url}")
            
            response = RedirectResponse(url=redirect_url)
            
            # 세션 토큰을 쿠키에 설정
            session_token = result['access_token']
            print(f"쿠키에 설정할 세션 토큰: {session_token[:20]}...")
            
            # 여러 가지 방법으로 쿠키 설정 시도
            response.set_cookie(
                key="session_token",
                value=session_token,
                httponly=False,  # 디버깅을 위해 일시적으로 False
                samesite="lax",
                max_age=3600,  # 1시간
                path="/",
                secure=False,  # 로컬 개발에서는 False
            )
            
            # 추가로 브라우저에서 읽을 수 있는 쿠키도 설정
            response.set_cookie(
                key="auth_token",
                value=session_token,
                httponly=False,
                samesite="lax", 
                max_age=3600,
                path="/",
                secure=False,
            )
            
            print(f"쿠키 설정 완료, 리다이렉트: {redirect_url}")
            return response
            
        except Exception as e:
            print(f"Google OAuth 콜백 처리 중 오류: {e}")
            import traceback
            print(f"에러 스택: {traceback.format_exc()}")
            error_url = f"http://localhost:3000/auth/login?error=callback_failed"
            return RedirectResponse(url=error_url)

    async def get_user_profile(self, session_token: str) -> Dict[str, Any]:
        """
        세션 토큰으로 사용자 프로필을 조회합니다.
        """
        print(f"프로필 조회 요청 - 토큰: {session_token[:20]}...")
        return await self.login_service.get_user_profile(session_token)
