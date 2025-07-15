import axios from 'axios';
import { getAccessToken, removeAccessToken } from './api/authToken';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // httponly 쿠키를 위해 필수
});

// 요청 인터셉터 - httponly 쿠키 환경에서는 Authorization 헤더 불필요
apiClient.interceptors.request.use(
  (config) => {
    // httponly 쿠키는 브라우저가 자동으로 전송하므로
    // Authorization 헤더 설정 불필요
    console.log('📡 API 요청:', config.url, '- httponly 쿠키 자동 전송');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response?.status === 401) {
      console.log('🚫 인증 실패 - 로그인 페이지로 리다이렉트');
      // 쿠키 삭제
      removeAccessToken();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient; 