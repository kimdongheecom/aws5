'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/domain/auth/store/auth.store';

export default function AuthInitializer() {
  const { initializeAuth } = useAuthStore();
  
  useEffect(() => {
    // 앱이 브라우저에서 처음 로드될 때 한 번만 실행되어 인증 상태를 확인합니다.
    initializeAuth();
  }, [initializeAuth]);

  return null; // 이 컴포넌트는 화면에 아무것도 그리지 않습니다.
}