'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

/**
 * 사용자 역할(role)에 따라 적절한 대시보드로 리다이렉션하는 커스텀 훅
 * 
 * - admin: /admin/dashboard
 * - user/subscriber: /dashboard
 * - 인증되지 않음: /auth/login
 */
export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { role: storeRole } = useAuthStore();
  
  // 역할 확정 상태를 추적하는 상태 변수 추가
  const [isRoleConfirmed, setIsRoleConfirmed] = useState(false);
  const [confirmedRole, setConfirmedRole] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // 세션과 스토어에서 역할 정보를 가져와 확정하는 효과
  useEffect(() => {
    // 인증 상태가 아직 로딩 중이면 역할 확정하지 않음
    if (status === 'loading') {
      console.log('useAuthRedirect - 세션 로딩 중, 역할 확정 대기 중...');
      return;
    }
    
    // 인증되지 않은 상태면 역할 필요 없음 (로그인 페이지로 리다이렉션)
    if (status === 'unauthenticated') {
      console.log('useAuthRedirect - 인증되지 않음, 역할 확정 필요 없음');
      setIsRoleConfirmed(true);
      setConfirmedRole(null);
      return;
    }
    
    // 인증된 상태일 때만 역할 확정
    if (status === 'authenticated' && session) {
      // 세션의 역할이 존재하면 우선 사용, 없으면 스토어 역할 사용
      const userRole = session?.user?.role || storeRole;
      console.log('useAuthRedirect - 세션에서 역할 확인:', session?.user?.role);
      console.log('useAuthRedirect - 스토어에서 역할 확인:', storeRole);
      
      // 역할 정보가 있으면 확정
      if (userRole) {
        console.log('useAuthRedirect - 역할 확정됨:', userRole);
        setConfirmedRole(userRole);
        setIsRoleConfirmed(true);
      } else {
        // 역할 정보가 없으면 일반 사용자로 간주 (fallback)
        console.log('useAuthRedirect - 역할 정보 없음, 기본값 사용');
        setConfirmedRole('user');
        setIsRoleConfirmed(true);
      }
    }
  }, [status, session, storeRole]);

  // 실제 리다이렉션 처리는 역할이 확정된 후에만 수행
  useEffect(() => {
    // 이미 리다이렉션 중이면 중복 리다이렉션 방지
    if (isRedirecting) {
      return;
    }
    
    // 역할이 확정되지 않았으면 리다이렉션 하지 않음
    if (!isRoleConfirmed) {
      console.log('useAuthRedirect - 역할이 아직 확정되지 않음, 리다이렉션 대기 중...');
      return;
    }
    
    console.log('useAuthRedirect - 역할 확정 후 리다이렉션 판단 시작');
    console.log('useAuthRedirect - 현재 경로:', pathname);
    console.log('useAuthRedirect - 확정된 역할:', confirmedRole);
    
    // 이미 적절한 페이지에 있는 경우 리다이렉션 방지
    const isAdminPath = pathname?.startsWith('/admin');
    const isDashboardPath = pathname === '/dashboard';
    const isLoginPath = pathname === '/auth/login';
    const isHomePath = pathname === '/' || pathname === '';

    // 인증되지 않은 상태면 로그인 페이지로 리다이렉션
    if (status === 'unauthenticated') {
      // 이미 로그인 페이지에 있으면 리다이렉션 건너뛰기
      if (isLoginPath) {
        console.log('useAuthRedirect - 이미 로그인 페이지에 있음, 리다이렉션 건너뛰기');
        return;
      }
      
      console.log('useAuthRedirect - 인증되지 않음: 로그인 페이지로 이동');
      setIsRedirecting(true);
      router.replace('/auth/login');
      return;
    }

    // 인증된 경우, 확정된 역할에 따라 적절한 대시보드로 리다이렉션
    if (status === 'authenticated' && confirmedRole) {
      // 홈 페이지에 있는 경우 역할에 맞는 대시보드로 리다이렉션
      if (isHomePath) {
        if (confirmedRole === 'admin') {
          console.log('useAuthRedirect - 홈 페이지: 관리자 대시보드로 이동');
          setIsRedirecting(true);
          router.replace('/admin/dashboard');
          return;
        } else {
          console.log('useAuthRedirect - 홈 페이지: 일반 대시보드로 이동');
          setIsRedirecting(true);
          router.replace('/dashboard');
          return;
        }
      }

      // 관리자가 관리자 경로에 있거나, 일반 사용자가 일반 대시보드에 있으면 리다이렉션 건너뛰기
      if ((confirmedRole === 'admin' && isAdminPath) || 
          (confirmedRole !== 'admin' && isDashboardPath)) {
        console.log('useAuthRedirect - 이미 적절한 페이지에 있음, 리다이렉션 건너뛰기');
        return;
      }

      // 잘못된 대시보드에 있을 경우 적절한 대시보드로 리다이렉션
      if (confirmedRole === 'admin' && !isAdminPath && isDashboardPath) {
        console.log('useAuthRedirect - 관리자가 일반 대시보드에 있음: 관리자 대시보드로 이동');
        setIsRedirecting(true);
        router.replace('/admin/dashboard');
        return;
      }
      
      if (confirmedRole !== 'admin' && isAdminPath) {
        console.log('useAuthRedirect - 일반 사용자가 관리자 대시보드에 있음: 일반 대시보드로 이동');
        setIsRedirecting(true);
        router.replace('/dashboard');
        return;
      }
    }
  }, [isRoleConfirmed, confirmedRole, status, router, pathname, isRedirecting]);

  return { 
    status, 
    role: confirmedRole || 'user',
    isRoleConfirmed
  };
}; 