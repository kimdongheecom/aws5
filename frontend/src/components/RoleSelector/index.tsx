"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRoleStore, Role } from '@/store/roleStore';

const RoleSelector = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  // Zustand store에서 역할 상태와 setter 가져오기
  const { role: currentRole, setRole } = useRoleStore();
  
  useEffect(() => {
    // 세션에서 역할 가져오기
    if (session?.user?.role) {
      // 세션에 역할이 있으면 store 업데이트
      setRole(session.user.role as Role);
    }
  }, [session, setRole]);
  
  const handleRoleChange = async (role: Role) => {
    // Zustand store에 역할 저장
    setRole(role);
    
    // 세션 업데이트
    await update({ role });
    
    // 리디렉션
    const path = window.location.pathname;
    if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        // 사용자와 구독자는 모두 /dashboard로 리디렉션
        router.push('/dashboard');
      }
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-white p-4 shadow-lg dark:bg-blacksection">
      <h4 className="mb-3 text-sm font-semibold text-black dark:text-white">
        역할 변경 (테스트용)
      </h4>
      <div className="flex flex-col space-y-2">
        <button
          className={`rounded px-4 py-2 text-sm font-medium ${
            currentRole === 'user'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-meta-4 dark:text-gray-200'
          }`}
          onClick={() => handleRoleChange('user')}
        >
          일반 사용자
        </button>
        <button
          className={`rounded px-4 py-2 text-sm font-medium ${
            currentRole === 'subscriber'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-meta-4 dark:text-gray-200'
          }`}
          onClick={() => handleRoleChange('subscriber')}
        >
          구독자
        </button>
        <button
          className={`rounded px-4 py-2 text-sm font-medium ${
            currentRole === 'admin'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-meta-4 dark:text-gray-200'
          }`}
          onClick={() => handleRoleChange('admin')}
        >
          관리자
        </button>
      </div>
    </div>
  );
};

export default RoleSelector; 