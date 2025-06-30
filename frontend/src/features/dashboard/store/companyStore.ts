'use client';

import { create } from 'zustand';

interface CompanyState {
  currentCompany: string;
  setCurrentCompany: (company: string) => void;
  clearCompany: () => void;
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  currentCompany: '',
  setCurrentCompany: (company) => {
    const currentState = get();
    
    // 값이 변경될 때만 업데이트하고 로깅
    if (currentState.currentCompany !== company) {
      console.log(`CompanyStore: 변경 [${currentState.currentCompany}] -> [${company}]`);
      set({ currentCompany: company });
    } else {
      console.log(`CompanyStore: 동일한 회사명 중복 설정 무시 [${company}]`);
    }
  },
  clearCompany: () => {
    console.log(`CompanyStore: 회사명 초기화`);
    set({ currentCompany: '' });
  },
})); 