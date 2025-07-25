# gateway/app/domain/controller/auth_controller.py
import os
from urllib.parse import urlencode
from fastapi import Response
from fastapi.responses import RedirectResponse

from app.domain.service.login_service import LoginService

class AuthController:
    """인증 관련 컨트롤러"""

    def __init__(self, login_service: LoginService):
        """LoginService를 주입받음"""
        self.login_service = login_service

    @staticmethod
    def start_google_login(redirect_uri: str) -> RedirectResponse:
        """Google OAuth 인증 URL을 생성하고 리다이렉트합니다."""
        client_id = os.getenv('GOOGLE_CLIENT_ID', '')
        # 콜백 URI는 환경변수에서 직접 가져와 일관성을 유지합니다.
        callback_uri = f"{os.getenv('GATEWAY_URL', 'http://localhost:8080')}/auth/google/callback"
        
        scope = "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"

        params = {
            'client_id': client_id,
            'redirect_uri': callback_uri,
            'response_type': 'code',
            'scope': scope,
            'access_type': 'offline',
            'prompt': 'consent',
            'state': redirect_uri  # FE가 최종적으로 돌아갈 URI를 state에 저장
        }
        
        auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
        return RedirectResponse(url=auth_url)

    async def handle_google_callback(self, code: str, state: str) -> Response:
        """Google OAuth 콜백을 처리하고 JWT 토큰을 쿠키에 설정합니다."""
        try:
            print(f"🔍 Controller: code={code}, state={state}")
            
            # 서비스 호출하여 모든 백엔드 로직 처리
            result = await self.login_service.handle_google_callback(code)
            print(f"🔍 Controller: result={result}")
            
            # state(원래 사용자가 가려던 페이지)로 리다이렉트
            redirect_url = state
            print(f"🔍 Controller: Redirecting to: {redirect_url}")
            response = RedirectResponse(url=redirect_url)
            
            # 세션 토큰을 쿠키에 설정
            access_token = result['access_token']
            print(f"🔍 Controller: access_token type={type(access_token)}, value={access_token}")
            
            max_age_int = int(3600)  # 명시적으로 정수로 변환
            print(f"🔍 Controller: max_age type={type(max_age_int)}, value={max_age_int}")
            
            # 환경별 쿠키 설정
            env = os.getenv('ENVIRONMENT', 'development')
            is_secure = env == 'production'
            print(f"🔍 Controller: Environment: {env}, Secure: {is_secure}")
            
            print("🔍 Controller: About to set cookie...")
            
            # 쿠키 설정 (도메인 제거, SameSite를 None으로 변경)
            cookie_kwargs = {
                'key': "session_token",
                'value': access_token,
                'httponly': True,
                'samesite': "none" if is_secure else "lax",  # HTTPS에서는 none, HTTP에서는 lax
                'max_age': max_age_int,
                'path': "/",
                'secure': is_secure
            }
            
            print(f"🔍 Controller: Setting cookie with samesite={cookie_kwargs['samesite']}, secure={is_secure}")
            
            response.set_cookie(**cookie_kwargs)
            print(f"🔍 Controller: 쿠키 설정 완료 - secure={is_secure}, env={env}")
            print(f"🔍 Controller: 쿠키 값: {access_token[:20]}...")
            return response
            
        except Exception as e:
            print(f"Google OAuth 콜백 처리 중 오류: {e}")
            import traceback
            print(f"🔍 Controller: 상세 오류 정보: {traceback.format_exc()}")
            error_url = f"https://www.kimdonghee.com/auth/login?error=callback_failed"
            return RedirectResponse(url=error_url)

    async def get_user_profile(self, session_token: str):
        """세션 토큰으로 사용자 프로필을 조회합니다."""
        return await self.login_service.get_user_profile(session_token)