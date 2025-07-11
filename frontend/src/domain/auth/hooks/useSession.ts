'use client';

import { useAuthStore } from '@/domain/auth/store/auth.store';

/**
 * Zustand 인증 스토어의 상태를 반환하는 커스텀 훅
 * 로그인 상태와 사용자 정보를 제공
 */
export const useAuthSession = () => {
  const { user, isAuthenticated, accessToken } = useAuthStore();
  
  // 세션 형태로 사용자 정보 반환
  const session = isAuthenticated && user ? {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    accessToken
  } : null;

  const status = isAuthenticated ? 'authenticated' : 'unauthenticated';

  return { session, status };
}; 