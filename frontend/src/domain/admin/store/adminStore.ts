import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api/axios';

interface AdminState {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    lastLogin?: string;
  }>;
  systemSettings: {
    maintenanceMode: boolean;
    allowNewRegistrations: boolean;
    defaultUserRole: string;
  };
  activityLog: Array<{
    id: string;
    action: string;
    performedBy: string;
    timestamp: string;
    details: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

interface AdminActions {
  // 사용자 관리
  fetchUsers: () => Promise<void>;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  
  // 시스템 설정
  updateSystemSettings: (settings: Partial<AdminState['systemSettings']>) => Promise<void>;
  toggleMaintenanceMode: () => Promise<void>;
  
  // 활동 로그
  fetchActivityLog: () => Promise<void>;
  addActivityLog: (action: string, details: string) => Promise<void>;
  
  // 상태 관리
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type AdminStore = AdminState & AdminActions;

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      users: [],
      systemSettings: {
        maintenanceMode: false,
        allowNewRegistrations: true,
        defaultUserRole: 'user',
      },
      activityLog: [],
      isLoading: false,
      error: null,

      // 사용자 관리 액션
      fetchUsers: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.get('/admin/users');
          set({ users: response.data, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : '사용자 목록을 불러오는데 실패했습니다',
            isLoading: false 
          });
        }
      },

      updateUserRole: async (userId: string, role: string) => {
        try {
          set({ isLoading: true, error: null });
          await api.put(`/admin/users/${userId}/role`, { role });
          
          // 사용자 목록 업데이트
          const users = get().users.map(user => 
            user.id === userId ? { ...user, role } : user
          );
          
          set({ users, isLoading: false });
          await get().addActivityLog('UPDATE_USER_ROLE', `사용자 ${userId}의 역할을 ${role}로 변경`);
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : '사용자 역할 변경에 실패했습니다',
            isLoading: false 
          });
        }
      },

      deleteUser: async (userId: string) => {
        try {
          set({ isLoading: true, error: null });
          await api.delete(`/admin/users/${userId}`);
          
          // 사용자 목록에서 제거
          const users = get().users.filter(user => user.id !== userId);
          
          set({ users, isLoading: false });
          await get().addActivityLog('DELETE_USER', `사용자 ${userId} 삭제`);
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : '사용자 삭제에 실패했습니다',
            isLoading: false 
          });
        }
      },

      // 시스템 설정 액션
      updateSystemSettings: async (settings) => {
        try {
          set({ isLoading: true, error: null });
          await api.put('/admin/settings', settings);
          
          set(state => ({
            systemSettings: { ...state.systemSettings, ...settings },
            isLoading: false
          }));
          
          await get().addActivityLog('UPDATE_SETTINGS', '시스템 설정 변경');
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : '설정 업데이트에 실패했습니다',
            isLoading: false 
          });
        }
      },

      toggleMaintenanceMode: async () => {
        const currentMode = get().systemSettings.maintenanceMode;
        await get().updateSystemSettings({ maintenanceMode: !currentMode });
      },

      // 활동 로그 액션
      fetchActivityLog: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.get('/admin/activity-log');
          set({ activityLog: response.data, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : '활동 로그를 불러오는데 실패했습니다',
            isLoading: false 
          });
        }
      },

      addActivityLog: async (action: string, details: string) => {
        try {
          const response = await api.post('/admin/activity-log', { action, details });
          set(state => ({
            activityLog: [...state.activityLog, response.data]
          }));
        } catch (error) {
          console.error('활동 로그 추가 실패:', error);
        }
      },

      // 상태 관리 액션
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error })
    }),
    {
      name: 'admin-store',
      partialize: (state) => ({
        systemSettings: state.systemSettings,
      }),
    }
  )
); 