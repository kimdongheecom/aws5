'use client';

import React from 'react';
import { useProfile } from '../hooks/useProfile';
import Image from 'next/image';

export const ProfileCard = () => {
  const { profile, isLoading, error } = useProfile();
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">
        <p>오류: {error}</p>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="p-4 rounded-lg bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
        <p>프로필 정보를 찾을 수 없습니다. 로그인이 필요합니다.</p>
      </div>
    );
  }
  
  // 가입 날짜 포맷
  const formattedDate = profile.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '정보 없음';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* 프로필 이미지 */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={`${profile.name}의 프로필 사진`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-2xl">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          
          {/* 프로필 정보 */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold">{profile.name || '익명 사용자'}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{profile.email || profile.id}</p>
            
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mt-2">
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </div>
            
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {profile.bio || '자기소개가 등록되어 있지 않습니다.'}
            </p>
          </div>
        </div>
        
        {/* 추가 정보 */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">전화번호</h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{profile.phone || '등록되지 않음'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">가입일</h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 