import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

// axios 인스턴스 생성 (쿠키 자동 포함)
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080',
  withCredentials: true, // httpOnly 쿠키 자동 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  validateToken: async (token: string) => {
    // httpOnly 쿠키 환경에서는 토큰 검증을 직접 하지 않음
    // 대신 프로필 API 호출로 인증 상태 확인
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  handleAuthCallback: async (code: string) => {
    try {
      // 1. 먼저 authorization code를 백엔드로 전송하여 토큰 교환 및 쿠키 설정
      await apiClient.post('/auth/google/callback', { code });
      
      // 2. 쿠키가 설정된 후 프로필 API를 호출하여 사용자 정보 확인
      const response = await apiClient.get('/auth/profile');
      const userInfo = response.data;
      
      // store에 사용자 정보 저장
      const { signin } = useAuthStore.getState();
      await signin(
        userInfo.id || userInfo.email,
        {
          name: userInfo.name,
          email: userInfo.email,
          role: userInfo.role || 'user'
        },
        'httponly-cookie' // httpOnly 쿠키 사용 표시
      );

      return { user_info: userInfo, success: true };
    } catch (error) {
      console.error('Google 로그인 콜백 처리 실패:', error);
      throw error;
    }
  }
};