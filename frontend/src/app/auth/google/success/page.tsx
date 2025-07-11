'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';

export default function GoogleLoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signin, signout } = useAuthStore();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (userId && token) {
      signin(userId, { name: name || '', email: email || '' }, token)
        .then(() => {
          console.log('로그인 성공, 메인 페이지로 이동합니다.');
          router.push('/');
        })
        .catch((error) => {
          console.error('로그인 상태 업데이트 실패:', error);
          router.push('/auth/login');
        });
    } else {
      console.error('필수 정보가 누락되었습니다.');
      router.push('/auth/login');
    }
  }, [router, searchParams, signin]);

  const handleLogout = () => {
    signout();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-2xl font-bold text-primary">로그인 성공!</div>
        <div className="mb-8 text-gray-600 dark:text-gray-400">잠시 후 메인 페이지로 이동합니다...</div>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <button
          onClick={handleLogout}
          className="mt-8 rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
} 