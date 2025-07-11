import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';

/**
 * 관리자 대시보드에서 사용자 데이터를 관리하는 커스텀 훅
 * (실제 구현에서는 API 호출을 통해 데이터를 가져옵니다)
 */
export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 사용자 데이터 로드
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // 실제 API 호출 (현재는 목업 데이터)
        // const response = await fetch('/api/admin/users');
        // const data = await response.json();
        
        // 목업 데이터
        const mockUsers: User[] = [
          { id: '001', name: '김진민', role: '구독자', roleClass: 'success' },
          { id: '002', name: '홍길동', role: '일반', roleClass: 'warning' },
          { id: '003', name: '이영희', role: '관리자', roleClass: 'primary' }
        ];
        
        setTimeout(() => {
          setUsers(mockUsers);
          setIsLoading(false);
        }, 500); // API 호출 시뮬레이션
      } catch (err) {
        setError('사용자 데이터를 불러오는데 실패했습니다.');
        setIsLoading(false);
        console.error('사용자 데이터 로드 오류:', err);
      }
    };

    fetchUsers();
  }, []);

  // 사용자 편집 핸들러
  const handleEditUser = useCallback((userId: string) => {
    console.log(`사용자 ID: ${userId} 편집 요청`);
    // 실제 구현에서는 편집 모달을 열거나 편집 페이지로 이동
  }, []);

  // 데이터 추가 핸들러
  const handleAddData = useCallback(() => {
    console.log('새 데이터 등록 요청');
    // 실제 구현에서는 데이터 등록 모달을 열거나 등록 페이지로 이동
  }, []);

  return {
    users,
    isLoading,
    error,
    handleEditUser,
    handleAddData
  };
}; 