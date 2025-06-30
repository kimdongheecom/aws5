'use client';

import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { ProfileFormData } from '../hooks/useProfile';

export const ProfileForm = () => {
  const { profile, isLoading, error, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    bio: '',
    phone: '',
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    success: '',
    error: '',
  });
  
  // 프로필 데이터가 로드되면 폼 초기화
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);
  
  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormState({
      isSubmitting: true,
      success: '',
      error: '',
    });
    
    try {
      // 변경된 데이터만 API로 전송
      const changedData: ProfileFormData = {
        name: formData.name,
        bio: formData.bio || '',
        phone: formData.phone || '',
      };
      
      // 변경사항이 없으면 메시지 표시하고 종료
      if (
        profile?.name === changedData.name && 
        profile?.bio === changedData.bio && 
        profile?.phone === changedData.phone
      ) {
        setFormState({
          isSubmitting: false,
          success: '변경된 정보가 없습니다.',
          error: '',
        });
        return;
      }
      
      // 프로필 업데이트 요청
      const result = await updateProfile(changedData);
      
      if (result.success) {
        setFormState({
          isSubmitting: false,
          success: '프로필이 성공적으로 업데이트되었습니다.',
          error: '',
        });
      } else {
        throw new Error(result.error || '프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        success: '',
        error: error instanceof Error ? error.message : '프로필 업데이트 중 오류가 발생했습니다.',
      });
    }
  };
  
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
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 성공/오류 메시지 */}
      {formState.success && (
        <div className="p-4 rounded-lg bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          {formState.success}
        </div>
      )}
      
      {formState.error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {formState.error}
        </div>
      )}
      
      {/* 프로필 필드 */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          자기소개
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
          rows={4}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          전화번호
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
          placeholder="010-0000-0000"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
        >
          {formState.isSubmitting ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </form>
  );
}; 