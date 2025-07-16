import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GRIAnalysis, CurrentAnalysis } from '../model/gri.model';
import { griService, GriService } from '../services/gri.service';


interface GRIState {
  // GRI 분석 데이터
  analysisData: GRIAnalysis[];
  // 현재 분석 중인 데이터
  currentAnalysis: CurrentAnalysis | null;
  // 로딩 상태
  isLoading: boolean;
  // 에러 상태
  error: string | null;
}

interface GRIActions {
  // GRI 분석 요청
  generateGRIAnalysis: (prompt: string) => Promise<string>;
  // 현재 분석 초기화
  clearCurrentAnalysis: () => void;
  // 에러 초기화
  clearError: () => void;
  // 분석 기록 삭제
  clearAnalysisHistory: () => void;
}

// GRI Store 타입 정의
type GRIStore = GRIState & GRIActions;

// GRI Store 생성
export const useGRIStore = create<GRIStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      analysisData: [],
      currentAnalysis: null,
      isLoading: false,
      error: null,

      // GRI 분석 생성
      generateGRIAnalysis: async (prompt: string) => {
        set({ isLoading: true, error: null });
        try {
          // GriService를 통해 분석 요청
          const answer = await griService.generateText(prompt);

          // 새로운 분석 데이터 생성
          const newAnalysis: GRIAnalysis = {
            prompt,
            result: answer,
            timestamp: new Date().toISOString()
          };

          // 상태 업데이트
          set((state) => ({
            currentAnalysis: { prompt, result: answer },
            analysisData: [...state.analysisData, newAnalysis],
            isLoading: false
          }));

          return answer;
        } catch (error: any) {
          set({
            error: error.message || '분석 중 오류가 발생했습니다.',
            isLoading: false
          });
          throw error;
        }
      },

      // 현재 분석 초기화
      clearCurrentAnalysis: () => {
        set({ currentAnalysis: null });
      },

      // 에러 초기화
      clearError: () => {
        set({ error: null });
      },

      // 분석 기록 삭제
      clearAnalysisHistory: () => {
        set({ analysisData: [] });
      }
    }),
    {
      name: 'gri-storage', // localStorage에 저장될 키 이름
      partialize: (state) => ({
        analysisData: state.analysisData // 분석 기록만 영구 저장
      })
    }
  )
);
