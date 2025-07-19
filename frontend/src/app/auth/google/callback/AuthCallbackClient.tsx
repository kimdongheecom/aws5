// frontend/src/app/auth/google/callback/AuthCallbackClient.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/domain/auth/services/auth.service';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function AuthCallbackClient() {
  const router = useRouter();
  // 이 컴포넌트는 Suspense 내부에 있으므로 useSearchParams를 안전하게 사용할 수 있습니다.
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL에서 authorization code 추출
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        if (errorParam) {
          throw new Error(`Google OAuth 오류: ${errorParam}`);
        }

        if (!code) {
          console.log('인증 코드가 없음 - 로그인 페이지로 리다이렉트');
          router.push('/auth/login');
          return;
        }

        // 백엔드로 code 전송
        await authService.handleAuthCallback(code);

        // 성공 시 대시보드로 리다이렉트
        router.push('/dashboard');
      } catch (err) {
        console.error('콜백 처리 중 오류:', err);
        setError(err instanceof Error ? err.message : '인증 처리 중 오류가 발생했습니다.');

        // 오류 발생 시 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  // 에러가 발생한 경우 에러 UI를 렌더링
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

  // 처리 중일 때 보여줄 로딩 UI (Suspense의 fallback과 동일하지만, 로직 처리 중 계속 보여주기 위함)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Google 인증을 처리하고 있습니다...</p>
      </div>
    </div>
  );
}