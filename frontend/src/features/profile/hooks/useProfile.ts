'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useApi } from '@/lib/api/useApi';

export type Profile = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  phone?: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type ProfileFormData = {
  name: string;
  bio: string;
  phone: string;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { status } = useSession();
  const api = useApi();
  
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 세션이 인증되지 않은 경우 프로필 로드 중단
      if (status === 'unauthenticated') {
        throw new Error('인증되지 않은 사용자입니다. 로그인이 필요합니다.');
      }
      
      // 로딩 중이면 대기
      if (status === 'loading') {
        return;
      }
      
      // API에서 프로필 데이터 가져오기
      const data = await api.get<Profile>('/api/profile');
      console.log('프로필 데이터 로드 성공:', data);
      setProfile(data);
    } catch (err) {
      console.error('프로필 로딩 오류:', err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : '프로필 정보를 불러오는 중 오류가 발생했습니다.';
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (formData: ProfileFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 세션이 인증되지 않은 경우 업데이트 중단
      if (status === 'unauthenticated') {
        throw new Error('인증되지 않은 사용자입니다. 로그인이 필요합니다.');
      }
      
      // API로 프로필 업데이트 요청
      const updatedProfile = await api.patch<Profile>('/api/profile', formData);
      console.log('프로필 업데이트 성공:', updatedProfile);
      setProfile(updatedProfile);
      return { success: true, data: updatedProfile };
    } catch (err) {
      console.error('프로필 업데이트 오류:', err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : '프로필 업데이트 중 오류가 발생했습니다.';
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  // 세션 상태가 변경되면 프로필 정보 다시 로드
  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);
  
  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile
  };
}; 