import { create } from 'zustand';
import { setAccessToken, removeAccessToken } from '@/lib/api/authToken';
import { useRouter } from 'next/navigation';

interface AuthState {
  userId: string;
  name: string;
  email: string;
  role: 'user' | 'subscriber' | 'admin';
  accessToken: string;
  setAuth: (auth: { userId: string; name: string; email: string; role: 'user' | 'subscriber' | 'admin'; accessToken: string }) => void;
  resetAuth: () => void;
  signin: (userId: string, userInfo: { name?: string; email?: string; role?: 'user' | 'subscriber' | 'admin' }, token?: string) => Promise<void>;
  signout: () => void;
  handleAuthFailure: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: '',
  name: '',
  email: '',
  role: 'user',
  accessToken: '',
  
  setAuth: ({ userId, name, email, role, accessToken }) => 
    set({ userId, name, email, role, accessToken }),
  
  resetAuth: () => 
    set({ userId: '', name: '', email: '', role: 'user', accessToken: '' }),
  
  signin: async (userId, userInfo, token) => {
    try {
      // 토큰이 제공되면 저장
      if (token) {
        setAccessToken(token);
      }
      
      set({ 
        userId, 
        name: userInfo?.name || '사용자', 
        email: userInfo?.email || '', 
        role: userInfo?.role || 'user',
        accessToken: token || ''
      });
      
      console.log('Auth 스토어: 로그인 성공');
      return Promise.resolve();
    } catch (error) {
      console.error('Auth 스토어: 로그인 실패', error);
      return Promise.reject(error);
    }
  },
  
  signout: () => {
    // 토큰 제거
    removeAccessToken();
    
    // 상태 초기화
    set({ userId: '', name: '', email: '', role: 'user', accessToken: '' });
    console.log('Auth 스토어: 로그아웃 완료');
  },

  // 인증 실패 처리 (토큰 갱신 실패 등)
  handleAuthFailure: () => {
    // 토큰 제거 및 상태 초기화 (로그아웃)
    removeAccessToken();
    set({ userId: '', name: '', email: '', role: 'user', accessToken: '' });
    
    console.log('Auth 스토어: 인증 실패로 로그아웃 처리');
    
    // Client-side 리다이렉트 (CSR)
    if (typeof window !== 'undefined') {
      // 현재 URL 저장 (로그인 후 돌아오기 위해)
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/auth/login?returnUrl=${returnUrl}`;
    }
  }
}));

// 초기화 함수 - 앱 시작 시 호출
export const initializeAuth = () => {
  console.log('Auth 초기화 완료');
  // useAuthStore로 접근하는 로직은 필요 없어 단순히 로그만 출력
};