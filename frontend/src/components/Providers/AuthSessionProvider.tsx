'use client';

import { useAuthSession } from '@/features/auth/hooks/useSession';
import { memo } from 'react';

/**
 * NextAuth 세션과 Zustand 스토어를 동기화하는 Provider 컴포넌트
 * 앱의 최상위 레벨에 배치하여 NextAuth 세션이 변경될 때마다 
 * Zustand 스토어가 자동으로 업데이트되도록 합니다.
 */
const AuthSessionProvider = memo(({
  children
}: {
  children: React.ReactNode;
}) => {
  // 세션 동기화 훅 호출 (자동으로 useEffect 내에서 스토어 업데이트)
  useAuthSession();
  
  // 자식 컴포넌트 그대로 렌더링
  return <>{children}</>;
});

// 컴포넌트 이름 지정
AuthSessionProvider.displayName = 'AuthSessionProvider';

export default AuthSessionProvider; 