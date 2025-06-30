'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileCard } from '@/features/profile/components/ProfileCard';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'edit'>('info');
  const { data: session } = useSession();
  const { userId, name, email, role } = useAuthStore();
  
  console.log('프로필 페이지 - 세션 정보:', session);
  console.log('프로필 페이지 - 스토어 정보:', { userId, name, email, role });
  
  // Tab 변경 핸들러
  const changeTab = (tab: 'info' | 'edit') => {
    setActiveTab(tab);
  };
  
  return (
    <ProtectedRoute>
      <div className="profile-container">
        {/* 프로필 탭 */}
        <div className="mb-8 border-b border-stroke dark:border-strokedark">
          <div className="flex flex-wrap">
            <button
              className={`mr-2 inline-block px-6 py-3 text-lg font-semibold ${
                activeTab === 'info'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-black hover:text-primary dark:text-white dark:hover:text-primary'
              }`}
              onClick={() => changeTab('info')}
            >
              프로필 정보
            </button>
            
            <button
              className={`mr-2 inline-block px-6 py-3 text-lg font-semibold ${
                activeTab === 'edit'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-black hover:text-primary dark:text-white dark:hover:text-primary'
              }`}
              onClick={() => changeTab('edit')}
            >
              프로필 수정
            </button>
          </div>
        </div>
        
        {/* 프로필 콘텐츠 */}
        <div className="px-5 py-2">
          {activeTab === 'info' ? (
            <div className="profile-info">
              <ProfileCard />
            </div>
          ) : (
            <div className="profile-edit">
              <ProfileForm />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
