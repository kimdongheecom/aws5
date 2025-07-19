import { create } from 'zustand';
import axios from 'axios';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null; // httpOnly 쿠키 사용 시에는 실제 토큰 값이 아닌 상태 표시용

  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setAccessToken: (token: string | null) => void;

  // Auth Operations
  signin: (userId: string, userInfo: Partial<User>, token?: string | null) => Promise<void>;
  signout: () => Promise<void>;
  handleAuthFailure: () => void;
  initializeAuth: () => Promise<void>;
  forceSignout: () => void; // 강제 로그아웃 함수 추가
}

// axios 인스턴스 생성 (쿠키 자동 포함)
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080',
  withCredentials: true, // httpOnly 쿠키 자동 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAuthStore = create<AuthState>((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,

  // Basic Setters
  setUser: (user) => set({ user }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsLoading: (value) => set({ isLoading: value }),
  setAccessToken: (token) => set({ accessToken: token }),

  // Auth Operations
  signin: async (userId, userInfo, token) => {
    try {
      const user: User = {
        id: userId,
        name: userInfo?.name || '사용자',
        email: userInfo?.email || '',
        role: userInfo?.role || 'user'
      };

      set({
        user,
        isAuthenticated: true,
        accessToken: 'httponly-cookie', // httpOnly 쿠키 사용 표시
        isLoading: false
      });

      console.log('Auth 스토어: 로그인 성공', { user });
      return Promise.resolve();
    } catch (error) {
      console.error('Auth 스토어: 로그인 실패', error);
      return Promise.reject(error);
    }
  },

  // 강제 로그아웃 함수 추가
  forceSignout: () => {
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      isLoading: false
    });
    
    // 백엔드 쿠키 삭제
    apiClient.post('/auth/logout').catch(error => {
      console.error('강제 로그아웃 중 에러:', error);
    });
    
    console.log('Auth 스토어: 강제 로그아웃 완료');
    
    // 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },

  signout: async () => {
    try {
      console.log('🚪 로그아웃 프로세스 시작');
      
      // 백엔드 로그아웃 API 호출 (httpOnly 쿠키 삭제)
      await apiClient.post('/auth/logout');
      console.log('✅ 백엔드 로그아웃 성공 - httpOnly 쿠키 삭제됨');
      
    } catch (error) {
      console.error('❌ 로그아웃 API 호출 실패:', error);
    }
    
    // 클라이언트 상태 정리
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      isLoading: false
    });
    
    console.log('Auth 스토어: 로그아웃 완료');
    
    // 로그아웃 후 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },

  handleAuthFailure: () => {
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      isLoading: false
    });
    
    console.log('Auth 스토어: 인증 실패로 로그아웃 처리');
    
    if (typeof window !== 'undefined') {
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/auth/login?returnUrl=${returnUrl}`;
    }
  },

  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      console.log('🔄 인증 상태 초기화 시작');
      console.log('📡 백엔드 프로필 API 호출 (httpOnly 쿠키 자동 포함)');
      
      // 백엔드에서 사용자 프로필 가져오기 (httpOnly 쿠키 자동 포함)
      const response = await apiClient.get('/auth/profile');
      
      console.log('✅ 사용자 프로필 수신:', response.data);
      
      set({
        isLoading: false,
        user: {
          id: response.data.id || response.data.email,
          name: response.data.name || '사용자',
          email: response.data.email || '',
          role: response.data.role || 'user'
        },
        isAuthenticated: true,
        accessToken: 'httponly-cookie' // httpOnly 쿠키 사용 표시
      });

      console.log('✅ Auth 스토어: 인증 상태 초기화 완료');
      
    } catch (error) {
      // axios 에러 처리
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log('📝 401 응답: 인증되지 않은 상태 (정상)');
        } else {
          console.error('❌ API 호출 실패:', error.response?.status, error.response?.data);
        }
      } else {
        console.error('❌ 예상치 못한 오류:', error);
      }
      
      set({
        isLoading: false,
        user: null,
        isAuthenticated: false,
        accessToken: null
      });
    }
  }
}));