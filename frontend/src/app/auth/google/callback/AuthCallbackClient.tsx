// frontend/src/app/auth/google/callback/AuthCallbackClient.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();
  const [status, setStatus] = useState<string>('인증 상태를 확인하고 있습니다...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔍 Google OAuth 콜백 처리 시작');
        console.log('📊 현재 인증 상태:', { isAuthenticated, user: user?.name });
        
        // 이미 인증된 사용자라면 바로 대시보드로 리다이렉트
        if (isAuthenticated && user) {
          console.log('✅ 이미 인증된 사용자 - 대시보드로 즉시 리다이렉트');
          setStatus('이미 로그인되어 있습니다. 대시보드로 이동합니다...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
          return;
        }

        const code = searchParams.get('code');
        const error = searchParams.get('error');

        console.log('📋 URL 파라미터:', { hasCode: !!code, hasError: !!error });

        if (error) {
          throw new Error(`Google OAuth 오류: ${error}`);
        }

        if (!code) {
          console.log('⚠️ 인증 코드가 없음 - 인증 상태 재확인 후 처리');
          setStatus('인증 상태를 확인하고 있습니다...');
          
          // 잠시 기다린 후 인증 상태 재확인 (auth store 초기화를 위해)
          setTimeout(() => {
            const { isAuthenticated: authStatus, user: userInfo } = useAuthStore.getState();
            
            if (authStatus && userInfo) {
              console.log('✅ 지연된 인증 확인됨 - 대시보드로 이동');
              setStatus('인증이 확인되었습니다. 대시보드로 이동합니다...');
              router.push('/dashboard');
            } else {
              console.log('❌ 인증 코드와 인증 상태 모두 없음 - 로그인 페이지로 이동');
              setStatus('로그인이 필요합니다. 로그인 페이지로 이동합니다...');
              setTimeout(() => {
                router.push('/auth/login');
              }, 2000);
            }
          }, 2000);
          return;
        }

        // code가 있는 경우 (정상적인 OAuth 콜백)
        setStatus('Google 인증을 처리하고 있습니다...');
        console.log('🔄 Google OAuth 코드 처리 시작');
        
        // 여기서 실제 OAuth 처리가 필요하다면 authService를 사용
        // 현재는 이미 백엔드에서 처리되어 쿠키가 설정된 상태일 것으로 예상
        
        setStatus('인증 완료 확인 중...');
        
        // 잠시 기다린 후 인증 상태 확인
        setTimeout(() => {
          const { isAuthenticated: authStatus, user: userInfo } = useAuthStore.getState();
          
          if (authStatus && userInfo) {
            console.log('✅ OAuth 콜백 후 인증 완료 확인됨');
            setStatus('대시보드로 이동합니다...');
            router.push('/dashboard');
          } else {
            console.log('❌ OAuth 콜백 후에도 인증 실패');
            setStatus('인증에 실패했습니다. 로그인 페이지로 이동합니다...');
            setTimeout(() => {
              router.push('/auth/login');
            }, 2000);
          }
        }, 2000);

      } catch (err) {
        console.error('❌ 콜백 처리 중 오류:', err);
        setStatus('오류가 발생했습니다. 로그인 페이지로 이동합니다...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, isAuthenticated, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">{status}</p>
        <p className="mt-2 text-sm text-gray-500">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}