import { create } from 'zustand';

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
  accessToken: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setAccessToken: (token: string | null) => void;

  // Auth Operations
  signin: (userId: string, userInfo: Partial<User>, token?: string | null) => Promise<void>;
  signout: () => void;
  handleAuthFailure: () => void;
  initializeAuth: () => Promise<void>;
}

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
  setAccessToken: (token) => {
    // localStorage 사용 제거 - 쿠키만 사용
    set({ accessToken: token });
  },

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
        accessToken: token || null,
        isLoading: false
      });

      console.log('Auth 스토어: 로그인 성공', { user });
      return Promise.resolve();
    } catch (error) {
      console.error('Auth 스토어: 로그인 실패', error);
      return Promise.reject(error);
    }
  },

  signout: () => {
    // localStorage 사용 제거
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      isLoading: false
    });
    
    // 쿠키 삭제
    if (typeof document !== 'undefined') {
      document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    console.log('Auth 스토어: 로그아웃 완료');
  },

  handleAuthFailure: () => {
    // localStorage 사용 제거
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      isLoading: false
    });
    
    // 쿠키 삭제
    if (typeof document !== 'undefined') {
      document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
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
      
      // 쿠키에서만 토큰 확인 (localStorage 사용 제거)
      let token: string | null = null;
      if (typeof document !== 'undefined') {
        console.log('🍪 전체 쿠키:', document.cookie);
        
        // session_token 쿠키 확인
        const sessionTokenCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('session_token='));
        
        // auth_token 쿠키도 확인 (백업용)
        const authTokenCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth_token='));
        
        console.log('🔍 session_token 쿠키:', sessionTokenCookie);
        console.log('🔍 auth_token 쿠키:', authTokenCookie);
        
        token = sessionTokenCookie?.split('=')[1] || authTokenCookie?.split('=')[1] || null;
        
        console.log('🎯 추출된 토큰:', token ? '존재함' : '없음');
      }
      
      if (!token) {
        console.log('❌ 토큰이 없어서 인증 초기화 종료');
        set({ isLoading: false });
        return;
      }

      console.log('📡 백엔드로 프로필 요청 시작');
      
      // 백엔드에서 사용자 프로필 가져오기 (쿠키 기반)
      const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080'}/auth/profile`, {
        credentials: 'include', // 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 프로필 응답 상태:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ 프로필 요청 실패:', response.status, errorText);
        throw new Error('프로필 가져오기 실패');
      }
      
      const userData = await response.json();
      console.log('👤 사용자 데이터 수신:', userData);
      
      set({
        isLoading: false,
        user: {
          id: userData.id || userData.email,
          name: userData.name || '사용자',
          email: userData.email || '',
          role: userData.role || 'user'
        },
        isAuthenticated: true,
        accessToken: token
      });

      console.log('✅ Auth 스토어: 인증 상태 초기화 완료');
    } catch (error) {
      console.error('❌ Auth initialization failed:', error);
      set({
        isLoading: false,
        user: null,
        isAuthenticated: false,
        accessToken: null
      });
      
      // 쿠키 삭제
      if (typeof document !== 'undefined') {
        document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }
  }
}));