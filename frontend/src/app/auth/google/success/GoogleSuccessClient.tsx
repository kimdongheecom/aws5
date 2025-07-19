// frontend/src/app/auth/google/success/GoogleSuccessClient.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';

export default function GoogleSuccessClient() {
  const router = useRouter();
  // Suspense 내부에 있으므로 useSearchParams를 안전하게 사용
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
          // 성공 후 메인 페이지('/')로 리다이렉트
          router.push('/');
        })
        .catch((error) => {
          console.error('로그인 상태 업데이트 실패:', error);
          // 실패 시 로그인 페이지로 리다이렉트
          router.push('/auth/login');
        });
    } else {
      console.error('필수 정보(userId, token)가 URL에 누락되었습니다.');
      // 실패 시 로그인 페이지로 리다이렉트
      router.push('/auth/login');
    }
  }, [router, searchParams, signin]);

  const handleLogout = () => {
    // 이 페이지에 머무르는 동안 로그아웃을 할 일은 거의 없겠지만,
    // 만약을 위해 기능을 남겨둡니다.
    signout();
    router.push('/');
  };

  // useEffect에서 리다이렉트가 일어나기 전까지 보여줄 화면
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