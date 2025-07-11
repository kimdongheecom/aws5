'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { useAuthStore } from '@/domain/auth/store/auth.store';

type Role = 'admin' | 'user' | 'subscriber';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: Role | Role[]; // 필요한 역할(들)
  fallback?: ReactNode;
}

const ProtectedRoute = ({ 
  children, 
  role, 
  fallback 
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      console.log('ProtectedRoute - 인증되지 않음');
      router.replace('/auth/login');
      return;
    }

    if (isAuthenticated && user) {
      const userRole = user.role || 'user';

      const requiredRoles = Array.isArray(role) ? role : [role];
      const hasPermission = !role || requiredRoles.includes(userRole as Role);

      if (!hasPermission) {
        console.log('ProtectedRoute - 권한 없음: /dashboard로 이동');
        router.replace('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, role, router]);

  if (isLoading || (isAuthenticated && role && user && !Array.isArray(role) && user.role !== role)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">
            세션 정보를 확인 중...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
