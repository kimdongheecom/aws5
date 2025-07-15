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
        const authTokenCookie = allCookies.find(row => row.startsWith('auth_token='));
        console.log('🎯 세션 토큰 쿠키:', sessionTokenCookie);
        console.log('🎯 인증 토큰 쿠키:', authTokenCookie);
        
        const sessionToken = sessionTokenCookie?.split('=')[1] || authTokenCookie?.split('=')[1];
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
          console.error('❌ 세션 토큰을 찾을 수 없음');
          router.replace('/auth/login?error=no_session_token');
        }
      } catch (error) {
        console.error('❌ OAuth 콜백 처리 중 오류:', error);
        router.replace('/auth/login?error=callback_error');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router, signin, setIsLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
} 