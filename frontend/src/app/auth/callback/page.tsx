'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/domain/auth/services/auth.service';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 콜백 페이지가 아닌 경우 처리하지 않음
    if (typeof window === 'undefined') return;
    if (!window.location.pathname.includes('/auth/callback')) return;

    const handleCallback = async () => {
      try {
        // URL에서 authorization code 추출
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`Google OAuth 오류: ${error}`);
        }

        if (!code) {
          console.log('인증 코드가 없음 - 로그인 페이지로 리다이렉트');
          router.push('/auth/login');
          return;
        }

        // 백엔드로 code 전송 (axios는 withCredentials: true로 자동 쿠키 전송)
        // 백엔드에서 토큰 교환 후 httpOnly 쿠키 설정
        await authService.handleAuthCallback(code);

        // 성공 시 대시보드로 리다이렉트
        router.push('/dashboard');
      } catch (err) {
        console.error('콜백 처리 중 오류:', err);
        setError(err instanceof Error ? err.message : '인증 처리 중 오류가 발생했습니다.');

        // 오류 발생 시 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">인증 오류</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">3초 후 로그인 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Google 인증을 처리하고 있습니다...</p>
      </div>
    </div>
  );
} 