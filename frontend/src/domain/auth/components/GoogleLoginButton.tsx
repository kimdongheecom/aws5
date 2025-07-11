import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import apiClient from '../../../lib/api';

export const GoogleLoginButton = () => {
  const { setIsLoading } = useAuthStore();

  const handleGoogleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // 리다이렉트 URI 설정
      const redirectUri = `${window.location.origin}/dashboard`;
      
      console.log('🚀 Google 로그인 요청 시작');
      console.log('📍 리다이렉트 URI:', redirectUri);
      
      // 백엔드에서 Google OAuth URL 가져오기
      const response = await apiClient.get(`/auth/google/login?redirect_uri=${encodeURIComponent(redirectUri)}`);
      
      console.log('✅ 백엔드 응답 받음:');
      console.log('📦 전체 응답 객체:', response);
      console.log('📄 응답 데이터:', response.data);
      console.log('📊 응답 상태:', response.status);
      console.log('📋 응답 헤더:', response.headers);
      
      // Google OAuth 페이지로 리다이렉트
      // 참고: 백엔드가 RedirectResponse를 반환하므로 response.data에는 실제 URL이 없을 수 있음
      const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
      const finalUrl = `${gatewayUrl}/auth/google/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
      
      console.log('🌐 최종 리다이렉트 URL:', finalUrl);
      window.location.href = finalUrl;
      
    } catch (error) {
      console.error('❌ Google 로그인 중 오류 발생:', error);
      console.error('🔍 에러 상세:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setIsLoading(false);
    }
  }, [setIsLoading]);

  return (
    <button
      data-testid="google-login-button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-300"
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Google로 로그인
    </button>
  );
}; 