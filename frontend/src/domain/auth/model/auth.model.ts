import axios from 'axios';
import { getAccessToken, removeAccessToken } from '../../../lib/api/authToken';

// 타입 정의
interface ApiResponseData {
  data: {
    token: string;
    user_id: string;
    role: string;
    name: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user_id?: string;
  role?: string;
  name?: string;
}

interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  message?: string;
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // 쿠키를 주고받기 위해 필요
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 쿠키에서 토큰 가져오기 (localStorage 사용 제거)
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 실제 API 주소 - Gateway 서비스로 연결
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
};

// 토큰 갱신 요청을 위한 별도의 axios 인스턴스 (인터셉터 없음)
const refreshAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // 쿠키를 주고받기 위해 필요
});

// 인증 서비스 클래스
export const authService = {
  // 로그인 API
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponseData>(AUTH_ENDPOINTS.LOGIN, credentials);
      
      // 응답에서 토큰 정보 추출
      const { token, user_id, role, name } = response.data.data;
      
      // 토큰은 서버에서 쿠키로 설정하므로 클라이언트에서 별도 저장 불필요
      
      return {
        success: true,
        message: '로그인에 성공했습니다.',
        token,
        user_id,
        role,
        name
      };
    } catch (error: any) {
      console.error('로그인 API 오류:', error);
      
      // 에러 응답 처리
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || '로그인에 실패했습니다.',
        };
      }
      
      return {
        success: false,
        message: '서버 연결에 실패했습니다. 네트워크 연결을 확인해주세요.',
      };
    }
  },

  // 회원가입 API
  signup: async (userData: { email: string; password: string; name: string }): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponseData>(AUTH_ENDPOINTS.SIGNUP, userData);
      
      const { token, user_id, role, name } = response.data.data;
      
      return {
        success: true,
        message: '회원가입에 성공했습니다.',
        token,
        user_id,
        role,
        name
      };
    } catch (error: any) {
      console.error('회원가입 API 오류:', error);
      
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || '회원가입에 실패했습니다.',
        };
      }
      
      return {
        success: false,
        message: '서버 연결에 실패했습니다. 네트워크 연결을 확인해주세요.',
      };
    }
  },

  // 로그아웃 API
  logout: async (): Promise<AuthResponse> => {
    try {
      await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
      
      // 쿠키에서 토큰 제거
      removeAccessToken();
      
      return {
        success: true,
        message: '로그아웃에 성공했습니다.',
      };
    } catch (error: any) {
      console.error('로그아웃 API 오류:', error);
      
      // 로그아웃 실패해도 클라이언트에서 토큰 제거
      removeAccessToken();
      
      return {
        success: false,
        message: '로그아웃 중 오류가 발생했습니다.',
      };
    }
  },

  // 액세스 토큰 갱신 (리프레시 토큰 사용)
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    try {
      // 리프레시 토큰은 HTTP-Only 쿠키에 저장되어 있어 자동으로 요청에 포함됨
      const response = await refreshAxios.post<{ token: string }>(AUTH_ENDPOINTS.REFRESH, {}, {
        withCredentials: true, // 쿠키 포함을 위해 필요
      });

      // 응답에서 새 액세스 토큰 추출
      const { token } = response.data;

      if (token) {
        // 새 토큰은 서버에서 쿠키로 설정하므로 클라이언트에서 별도 저장 불필요
        console.log('액세스 토큰이 갱신되었습니다.');
        return {
          success: true,
          token
        };
      }

      throw new Error('새 액세스 토큰을 받지 못했습니다.');
    } catch (error: any) {
      console.error('토큰 갱신 오류:', error);
      
      // 갱신 실패 시, 사용자가 다시 로그인해야 함
      removeAccessToken();

      return {
        success: false,
        message: '토큰 갱신에 실패했습니다. 다시 로그인해주세요.'
      };
    }
  }
}; 