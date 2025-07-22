# gateway/app/domain/controller/auth_controller.py

from fastapi.responses import RedirectResponse
from app.domain.service.login_service import LoginService

class AuthController:
    def __init__(self, login_service: LoginService):
        """컨트롤러 초기화 시 서비스를 주입받음"""
        self.login_service = login_service
        
    async def start_google_login(self, redirect_uri: str) -> RedirectResponse:
        """Google OAuth 로그인을 시작합니다."""
        auth_url = await self.login_service.get_google_auth_url(redirect_uri)
        return RedirectResponse(url=auth_url)

    async def handle_google_callback(self, code: str, state: str) -> RedirectResponse:
        """Google OAuth 콜백을 처리하고 쿠키를 설정하며 리다이렉트합니다."""
        try:
            # 서비스 호출하여 모든 백엔드 로직 처리
            result = await self.login_service.handle_google_callback(code)
            
            # state(원래 사용자가 가려던 페이지)로 리다이렉트
            redirect_url = state
            response = RedirectResponse(url=redirect_url)
            
            # 세션 토큰을 쿠키에 설정
            access_token = result['access_token']
            response.set_cookie(
                key="session_token",
                value=access_token,
                httponly=True,
                samesite="lax",
                max_age=3600,
                path="/",
                secure=False # 로컬 개발 시 False
            )
            return response
            
        except Exception as e:
            print(f"Google OAuth 콜백 처리 중 오류: {e}")
            error_url = f"http://localhost:3000/auth/login?error=callback_failed"
            return RedirectResponse(url=error_url)

    async def get_user_profile(self, session_token: str):
        """세션 토큰으로 사용자 프로필을 조회합니다."""
        return await self.login_service.get_user_profile(session_token)