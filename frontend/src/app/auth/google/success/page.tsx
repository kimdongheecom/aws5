// frontend/src/app/auth/google/success/page.tsx

import { Suspense } from 'react';
import GoogleSuccessClient from './GoogleSuccessClient';


// Suspense의 fallback으로 보여줄 간단한 로딩 UI
function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-2xl font-bold text-primary">로그인 처리 중...</div>
        <div className="mb-8 text-gray-600 dark:text-gray-400">잠시만 기다려주세요...</div>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    </div>
  );
}

export default function GoogleLoginSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <GoogleSuccessClient />
    </Suspense>
  );
}