"use client";

import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/lib/api/authToken';
import { useUserStore } from '@/store/userStore';

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    formState,
    handleChange,
    handleLogin
  } = useLoginForm();
  
  // OAuth 로그인 성공 감지 및 자동 리디렉션
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      console.log('OAuth 로그인 성공 감지:', {
        email: session.user.email,
        name: session.user.name,
        status
      });
      
      // 성공 메시지 표시 후 메인 페이지로 리디렉션
      setTimeout(() => {
        console.log('메인 페이지로 자동 리디렉션');
        router.push('/');
        router.refresh();
      }, 1000);
    }
  }, [status, session, router]);

  // useCallback으로 소셜 로그인 핸들러 메모이제이션
  const handleGoogleSignIn = useCallback(async () => {
    console.log('구글 로그인 시도...');
    // 백엔드의 redirect 콜백이 역할에 따라 적절한 페이지로 리다이렉션하도록 함
    // 즉, /admin/dashboard나 /dashboard 대신 / 사용
    signIn('google', { 
      callbackUrl: '/' 
    });
  }, []);

  const handleGithubSignIn = useCallback(async () => {
    console.log('깃허브 로그인 시도...');
    // 백엔드의 redirect 콜백이 역할에 따라 적절한 페이지로 리다이렉션하도록 함
    signIn('github', { 
      callbackUrl: '/' 
    });
  }, []);

  // 로딩 상태 표시
  if (status === 'loading') {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">로그인 상태 확인 중...</p>
      </div>
    );
  }

  // 이미 로그인된 상태
  if (status === 'authenticated') {
    return (
      <div className="text-center py-8">
        <div className="mb-4 rounded-md bg-green-50 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          로그인에 성공했습니다! 잠시 후 메인 페이지로 이동합니다.
        </div>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
        로그인
      </h2>

      {formState.error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {formState.error}
        </div>
      )}

      {formState.success && (
        <div className="mb-6 rounded-md bg-green-50 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          {formState.success}
        </div>
      )}
            
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="아이디"
            name="id"
            value={formState.id}
            onChange={handleChange}
            className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
          />
        </div>
        
        <div className="mb-6 flex justify-end text-sm">
          <Link href="/forgot-id" className="text-primary hover:text-primary/80">
            아이디 찾기
          </Link>
          <span className="mx-2 text-stroke dark:text-strokedark">|</span>
          <Link href="/forgot-password" className="text-primary hover:text-primary/80">
            비밀번호 찾기
          </Link>
        </div>
        
        <button
          type="submit"
          disabled={formState.isLoading}
          className="w-full rounded-md bg-primary py-3 text-white transition-colors hover:bg-primary/90 mb-4"
        >
          {formState.isLoading ? '로그인 중...' : '로그인'}
        </button>
        
        <Link
          href="/auth/signup"
          className="mt-4 block w-full rounded-md border border-stroke bg-white py-3 text-center text-black transition-colors hover:bg-stroke/20 dark:border-strokedark dark:bg-black dark:text-white dark:hover:bg-strokedark/20"
        >
          회원가입
        </Link>
        
        <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
          <p className="text-black dark:text-white">
            소셜 계정으로 로그인
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              aria-label="login with google"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-stroke bg-white text-black transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-strokedark dark:bg-black dark:text-white dark:hover:border-primary"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_95:967)">
                  <path
                    d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                    fill="#34A853"
                  />
                  <path
                    d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_95:967">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            
            <button
              aria-label="login with github"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-stroke bg-white text-black transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-strokedark dark:bg-black dark:text-white dark:hover:border-primary"
              type="button"
              onClick={handleGithubSignIn}
            >
              <svg
                fill="currentColor"
                width="22"
                height="22"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M32 1.7998C15 1.7998 1 15.5998 1 32.7998C1 46.3998 9.9 57.9998 22.3 62.1998C23.9 62.4998 24.4 61.4998 24.4 60.7998C24.4 60.0998 24.4 58.0998 24.3 55.3998C15.7 57.3998 13.9 51.1998 13.9 51.1998C12.5 47.6998 10.4 46.6998 10.4 46.6998C7.6 44.6998 10.5 44.6998 10.5 44.6998C13.6 44.7998 15.3 47.8998 15.3 47.8998C18 52.6998 22.6 51.2998 24.3 50.3998C24.6 48.3998 25.4 46.9998 26.3 46.1998C19.5 45.4998 12.2 42.7998 12.2 30.9998C12.2 27.5998 13.5 24.8998 15.4 22.7998C15.1 22.0998 14 18.8998 15.7 14.5998C15.7 14.5998 18.4 13.7998 24.3 17.7998C26.8 17.0998 29.4 16.6998 32.1 16.6998C34.8 16.6998 37.5 16.9998 39.9 17.7998C45.8 13.8998 48.4 14.5998 48.4 14.5998C50.1 18.7998 49.1 22.0998 48.7 22.7998C50.7 24.8998 51.9 27.6998 51.9 30.9998C51.9 42.7998 44.6 45.4998 37.8 46.1998C38.9 47.1998 39.9 49.1998 39.9 51.9998C39.9 56.1998 39.8 59.4998 39.8 60.4998C39.8 61.2998 40.4 62.1998 41.9 61.8998C54.1 57.7998 63 46.2998 63 32.5998C62.9 15.5998 49 1.7998 32 1.7998Z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm; 