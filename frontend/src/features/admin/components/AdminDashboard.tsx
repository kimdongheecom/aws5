'use client';

import React, { useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';

const AdminDashboard = () => {
  const { name, email, role } = useAuthStore();

  // 사용자 데이터 메모이제이션
  const userData = useMemo(() => ({
    name: name || '관리자',
    email: email || 'admin@example.com',
    role: role || 'admin'
  }), [name, email, role]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">관리자 대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">사용자 정보</h2>
          <div className="space-y-2">
            <p><span className="font-medium">이름:</span> {userData.name}</p>
            <p><span className="font-medium">이메일:</span> {userData.email}</p>
            <p><span className="font-medium">역할:</span> {userData.role === 'admin' ? '관리자' : '일반 사용자'}</p>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">사이트 통계</h2>
          <div className="space-y-2">
            <p><span className="font-medium">총 사용자:</span> 1,245</p>
            <p><span className="font-medium">오늘 방문자:</span> 168</p>
            <p><span className="font-medium">활성 세션:</span> 42</p>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">시스템 상태</h2>
          <div className="space-y-2">
            <p><span className="font-medium">서버 상태:</span> <span className="text-green-500">정상</span></p>
            <p><span className="font-medium">CPU 사용량:</span> 24%</p>
            <p><span className="font-medium">메모리 사용량:</span> 1.2GB / 4GB</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">활동</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">user1@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">로그인</td>
                <td className="px-6 py-4 whitespace-nowrap">10분 전</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">user2@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">프로필 업데이트</td>
                <td className="px-6 py-4 whitespace-nowrap">42분 전</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">설정 변경</td>
                <td className="px-6 py-4 whitespace-nowrap">1시간 전</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 