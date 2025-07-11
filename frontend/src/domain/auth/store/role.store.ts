import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'user' | 'subscriber' | 'admin';

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: 'user', // 기본 역할
      setRole: (role: Role) => set({ role }),
    }),
    {
      name: 'user-role-storage', // 로컬스토리지에 저장될 키 이름
    }
  )
);

// 현재 역할 가져오기 함수 (세션과 연동을 위한 유틸리티 함수)
export const getCurrentRole = (): Role => {
  return useRoleStore.getState().role;
}; 