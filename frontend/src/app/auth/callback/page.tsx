"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signin, setIsLoading } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsLoading(true);
        
        // URL에서 코드와 상태 파라미터 추출
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        console.log('====================================');
        console.log('🔄 OAuth 콜백 처리 시작');
        console.log('📄 URL 파라미터:', { 
          code: code ? '존재함' : '없음', 
          state, 
          error,
          fullUrl: window.location.href
        });

        if (error) {
          console.error('❌ OAuth 에러:', error);
          router.replace('/auth/login?error=oauth_error');
          return;
        }

        if (!code) {
          console.error('❌ OAuth 코드가 없음');
          router.replace('/auth/login?error=no_code');
          return;
        }

        // 모든 쿠키 확인
        console.log('🍪 모든 쿠키:', document.cookie);
        
        // 쿠키에서 세션 토큰 확인 (백엔드에서 설정한 쿠키)
        const allCookies = document.cookie.split('; ');
        console.log('🔍 쿠키 배열:', allCookies);
        
        const sessionTokenCookie = allCookies.find(row => row.startsWith('session_token='));
        console.log('🎯 세션 토큰 쿠키:', sessionTokenCookie);
        
        const sessionToken = sessionTokenCookie?.split('=')[1];
        console.log('🔑 추출된 세션 토큰:', sessionToken ? '존재함' : '없음');

        if (sessionToken) {
          console.log('✅ 세션 토큰 발견, 사용자 프로필 요청 시작');
          
          // 백엔드에서 사용자 프로필 가져오기
          const profileUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080'}/auth/profile`;
          console.log('📡 프로필 요청 URL:', profileUrl);
          
          const response = await fetch(profileUrl, {
            credentials: 'include', // 쿠키 포함
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('📊 프로필 응답 상태:', response.status);
          console.log('📋 프로필 응답 헤더:', Object.fromEntries(response.headers.entries()));

          if (response.ok) {
            const userProfile = await response.json();
            console.log('👤 사용자 프로필 수신:', userProfile);

            // 인증 상태 업데이트
            await signin(
              userProfile.id || userProfile.email,
              {
                name: userProfile.name,
                email: userProfile.email,
                role: 'user'
              },
              sessionToken
            );

            // 원래 페이지 또는 대시보드로 리다이렉트
            const redirectUrl = state || '/dashboard';
            console.log('🚀 리다이렉트 URL:', redirectUrl);
            router.replace(redirectUrl);
          } else {
            const errorText = await response.text();
            console.error('❌ 사용자 프로필 가져오기 실패:', response.status, errorText);
            router.replace('/auth/login?error=profile_fetch_failed');
          }
        } else {
          console.error('❌ 세션 토큰이 쿠키에 없음');
          console.log('💡 백엔드 콜백이 제대로 실행되지 않았을 수 있습니다.');
          
          // 잠시 기다렸다가 다시 시도 (백엔드 처리 지연 가능성)
          console.log('⏰ 2초 후 다시 시도...');
          setTimeout(() => {
            const retrySessionToken = document.cookie
              .split('; ')
              .find(row => row.startsWith('session_token='))
              ?.split('=')[1];
            
            if (retrySessionToken) {
              console.log('✅ 재시도에서 세션 토큰 발견');
              window.location.reload();
            } else {
              console.error('❌ 재시도에서도 세션 토큰 없음');
              router.replace('/auth/login?error=no_session');
            }
          }, 2000);
        }
      } catch (error) {
        console.error('❌ 콜백 처리 중 오류:', error);
        console.error('📍 에러 스택:', error instanceof Error ? error.stack : '스택 정보 없음');
        router.replace('/auth/login?error=callback_error');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router, signin, setIsLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          로그인 처리 중...
        </h2>
        <p className="text-gray-600 mt-2">
          잠시만 기다려주세요. Google 계정으로 로그인을 완료하고 있습니다.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          문제가 지속되면 브라우저 개발자 도구(F12)의 Console 탭을 확인해주세요.
        </p>
      </div>
    </div>
  );
} 