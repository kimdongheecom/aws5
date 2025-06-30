'use client';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { getAccessToken, isTokenExpired } from './authToken';
import { authService } from '@/services/authService';

// axios 타입 직접 정의
interface AxiosRequestConfig {
  headers?: Record<string, string>;
  data?: any;
  [key: string]: any;
}

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

// 토큰 갱신 중인지 추적하는 변수
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: any;
}> = [];

// 대기 중인 요청들 처리
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      // 새 토큰으로 헤더 업데이트
      promise.config.headers['Authorization'] = `Bearer ${token}`;
      promise.resolve(axios(promise.config));
    }
  });
  
  // 큐 초기화
  failedQueue = [];
};

// API 기본 URL 설정 - Gateway 서비스로 연결
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초
});

// 요청 인터셉터 설정 (인증 토큰 첨부)
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    
    // URL 결정: /api/로 시작하면 프론트엔드 직접 호출, 아니면 Gateway 통해 호출
    if (config.url?.startsWith('/api/')) {
      config.baseURL = FRONTEND_URL;
    } else {
      config.baseURL = API_BASE_URL;
    }
    
    // 인증 토큰이 있는 경우 요청 헤더에 추가
    if (session?.accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 (에러 핸들링)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(인증 실패)이고 재시도하지 않은 경우 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 로직을 여기에 구현
        // const refreshResult = await refreshToken();
        // if (refreshResult) {
        //   originalRequest.headers['Authorization'] = `Bearer ${refreshResult.accessToken}`;
        //   return axiosInstance(originalRequest);
        // }
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API 요청 함수 타입
export type ApiRequest = <T>(
  url: string,
  options?: AxiosRequestConfig
) => Promise<T>;

// API 요청 함수들
export const apiGet = async <T>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(url, options);
  return response.data;
};

export const apiPost = async <T>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.post(url, options?.data, options);
  return response.data;
};

export const apiPut = async <T>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.put(url, options?.data, options);
  return response.data;
};

export const apiDelete = async <T>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.delete(url, options);
  return response.data;
};

// 기본 인스턴스 내보내기
const api = axiosInstance;
export default api;
