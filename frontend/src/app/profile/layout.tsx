'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';
import Navigation from '@/components/Navigation';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userId } = useAuthStore();
  
  // 인증 상태 판단
  const isAuthenticated = !!userId;

  // 인증 상태 확인
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('인증되지 않은 상태, 로그인 페이지로 리다이렉션...');
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  // 인증되지 않은 경우
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 바 추가 */}
      <Navigation />
      
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1390 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          
          <div className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15">
            <div className="mb-8 flex items-center justify-between border-b border-stroke pb-5 dark:border-strokedark">
              <div>
                <h2 className="text-3xl font-semibold text-black dark:text-white">내 프로필</h2>
                <p className="mt-1 text-base text-waterloo dark:text-manatee">계정 정보 확인 및 수정</p>
              </div>
            </div>
            
            {children}
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 ESG Report. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
