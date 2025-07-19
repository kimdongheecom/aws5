// frontend/src/app/auth/callback/page.tsx

import { Suspense } from 'react';

import LoadingSpinner from '@/components/Common/LoadingSpinner';
import AuthCallbackClient from './AuthCallbackClient';

// Suspense의 fallback으로 사용될 서버 컴포넌트
// 클라이언트 훅(hook)을 사용하지 않는 간단한 로딩 UI입니다.
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Google 인증을 처리하고 있습니다...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    // Suspense로 클라이언트 컴포넌트를 감쌉니다.
    // useSearchParams를 사용하는 컴포넌트가 로드되기 전까지 fallback UI를 보여줍니다.
    <Suspense fallback={<Loading />}>
      <AuthCallbackClient />
    </Suspense>
  );
}