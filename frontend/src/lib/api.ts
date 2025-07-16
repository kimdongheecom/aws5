import axios from 'axios';

// httpOnly 쿠키 기반 API 클라이언트
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // httpOnly 쿠키 자동 포함 - 필수!
});

// 요청 인터셉터 - httpOnly 쿠키 환경에서는 Authorization 헤더 불필요
apiClient.interceptors.request.use(
  (config) => {
    console.log('📡 API 요청:', config.url, '- httpOnly 쿠키 자동 전송');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 에러 시 로그인 페이지로 리다이렉트
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('🚫 인증 실패 - 로그인 페이지로 리다이렉트');
      
      // 클라이언트 사이드에서만 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient; 