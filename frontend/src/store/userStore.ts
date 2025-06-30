import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import api from '@/lib/api/axios';

interface UserState {
  user_id: string;
  name: string;
  email: string;
  isLoading: boolean;
  error: string | null;
}

export type UserActions = {
  setUserId: (user_id: UserState['user_id']) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  
  updateName: (name: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  fetchUserData: () => Promise<void>;
  
  // 메모이제이션된 selector 추가
  getUserInfo: () => { name: string; email: string };
}

export type UserStore = UserState & UserActions;

// 원시 값을 반환하는 선택자 함수들 (메모이제이션 필요 없음)
export const getUserId = (state: UserStore) => state.user_id;
export const getUserName = (state: UserStore) => state.name;
export const getUserEmail = (state: UserStore) => state.email;
export const getIsLoading = (state: UserStore) => state.isLoading;
export const getError = (state: UserStore) => state.error;

// 객체를 반환하는 선택자 함수 (shallow 비교 사용 권장)
export const getUserData = (state: UserStore) => ({
  name: state.name,
  email: state.email
});

// 사용자 스토어 생성
export const useUserStore = create<UserStore>()(
  subscribeWithSelector( 
    persist(
      immer(
        devtools(
          (set, get) => ({
            // 상태
            user_id: '', 
            name: '',
            email: '',
            isLoading: false,
            error: null,
            
            // 메모이제이션된 selector 함수
            getUserInfo: () => {
              const { name, email } = get();
              return { name, email };
            },
            
            // 액션: 상태 업데이트
            setUserId: (user_id) => set((state) => {
              state.user_id = user_id;
            }),
            
            setLoading: (isLoading) => set((state) => {
              state.isLoading = isLoading;
            }),
            
            setError: (error) => set((state) => {
              state.error = error;
            }),
            
            reset: () => set({ 
              user_id: '', 
              name: '', 
              email: '', 
              isLoading: false, 
              error: null 
            }),
            
            // 액션: API 호출 및 상태 업데이트
            updateName: async (name) => {
              try {
                set((state) => { state.isLoading = true; state.error = null; });
                
                if (get().user_id) {
                  await api.put(`/users/${get().user_id}`, { name });
                }
                
                set((state) => { 
                  state.name = name;
                  state.isLoading = false;
                });
              } catch (error) {
                set((state) => { 
                  state.error = error instanceof Error ? error.message : '이름 업데이트 중 오류가 발생했습니다';
                  state.isLoading = false;
                });
                console.error('이름 업데이트 오류:', error);
              }
            },
            
            updateEmail: async (email) => {
              try {
                set((state) => { state.isLoading = true; state.error = null; });
                
                if (get().user_id) {
                  await api.put(`/users/${get().user_id}`, { email });
                }
                
                set((state) => { 
                  state.email = email;
                  state.isLoading = false;
                });
              } catch (error) {
                set((state) => { 
                  state.error = error instanceof Error ? error.message : '이메일 업데이트 중 오류가 발생했습니다';
                  state.isLoading = false;
                });
                console.error('이메일 업데이트 오류:', error);
              }
            },
            
            fetchUserData: async () => {
              try {
                const userId = get().user_id;
                if (!userId) return;
                
                set((state) => { state.isLoading = true; state.error = null; });
                
                const response = await api.get(`/users/${userId}`);
                const userData = response.data as { name: string; email: string };
                
                set((state) => { 
                  state.name = userData.name; 
                  state.email = userData.email;
                  state.isLoading = false;
                });
              } catch (error) {
                set((state) => { 
                  state.error = error instanceof Error ? error.message : '사용자 데이터 로드 중 오류가 발생했습니다';
                  state.isLoading = false;
                });
                console.error('사용자 데이터 로드 오류:', error);
              }
            },
          })
        )
      ),
      {
        name: 'user-storage', 
        storage: createJSONStorage(() => localStorage),
      
        partialize: (state) => ({
          user_id: state.user_id,
          name: state.name,
          email: state.email,
        }),
      }
    )
  )
);

// 스토어 구독 설정
useUserStore.subscribe(
  getUserId, 
  (userId) => {
    if (userId) {
      console.log('사용자 로그인됨:', userId);
    } else {
      console.log('사용자 로그아웃됨');
    }
  }
); 

// 사용 예시 주석 추가
/*
다음과 같이 컴포넌트에서 사용하세요:

// 1. 원시값만 사용하는 경우 (권장)
const userId = useUserStore(getUserId);
const name = useUserStore(getUserName);
const email = useUserStore(getUserEmail);

// 2. 객체를 사용해야 할 경우 shallow 비교 사용 (권장)
const userData = useUserStore(getUserData, shallow);

// 3. 스토어 내장 메모이제이션 함수 사용 (권장)
const userInfo = useUserStore(state => state.getUserInfo());

// 4. 필요할 경우 컴포넌트 내부에서 useMemo 활용
const userDataMemo = useMemo(() => {
  return {
    name: useUserStore.getState().name,
    email: useUserStore.getState().email
  };
}, [useUserStore(state => state.name), useUserStore(state => state.email)]);
*/ 