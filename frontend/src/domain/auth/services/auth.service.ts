import apiClient from '../../../lib/api';
import { useAuthStore } from '../store/auth.store';

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
    const response = await apiClient.post('/auth/validate-token', { token });
    return response.data;
  },

  getGoogleOAuthUrl: async () => {
    const response = await apiClient.get('/auth/google/login');
    return response.data.url;
  },

  handleAuthCallback: async (code: string) => {
    try {
      const response = await apiClient.post('/auth/google/callback', { code });
      const { access_token, user_info } = response.data;
      
      // store에 토큰과 사용자 정보 저장
      const { signin } = useAuthStore.getState();
      await signin(
        user_info.id,
        {
          name: user_info.name,
          email: user_info.email,
          role: 'user'
        },
        access_token
      );

      return response.data;
    } catch (error) {
      console.error('Google 로그인 콜백 처리 실패:', error);
      throw error;
    }
  }
};