import axios from 'axios';
import { setAccessToken, removeAccessToken, isTokenExpired } from '@/lib/api/authToken';
import { useApi } from '@/lib/api/useApi';
import { axiosInstance } from '@/lib/api/axios';

// 인증 관련 API 응답 타입 정의
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refresh_token?: string;
  user_id?: string;
  role?: string;
  name?: string;
}

// 로그인 요청 타입 정의
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청 타입 정의
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

// API 응답 데이터 타입
interface ApiResponseData {
  data: {
    token?: string;
    refresh_token?: string;
    user_id?: string;
    role?: string;
    name?: string;
    message?: string;
    [key: string]: any;
  };
  message?: string;
}

// 토큰 갱신 응답 타입
interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  message?: string;
}

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
      
      // 토큰 저장
      if (token) {
        setAccessToken(token);
      }
      
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
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponseData>(AUTH_ENDPOINTS.SIGNUP, data);
      return {
        success: true,
        message: '회원가입에 성공했습니다.',
        ...response.data.data
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
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('로그아웃 API 오류:', error);
    } finally {
      // 로컬 스토리지의 토큰 삭제
      removeAccessToken();
    }
  },
  
  // 토큰 유효성 확인
  validateToken: async (): Promise<boolean> => {
    try {
      await axiosInstance.get('/auth/validate');
      return true;
    } catch (error) {
      console.error('토큰 유효성 검사 오류:', error);
      return false;
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
        // 새 액세스 토큰 저장
        setAccessToken(token);
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

// 훅 형태로 사용할 수 있는 버전
export const useAuthService = () => {
  const api = useApi();
  
  return {
    ...authService,
    isLoading: api.loading
  };
}; 