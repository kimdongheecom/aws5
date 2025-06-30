import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useCompanyStore } from '../store/companyStore';
import * as dashboardService from '@/services/dashboardService';

// 개발 환경 여부 확인
const isDevelopment = process.env.NODE_ENV === 'development';

// 기업 목록 데이터 (개발 환경에서만 사용)
const mockCompanyList = [
  '삼성전자',
  'LG전자',
  'LG화학',
  'SK하이닉스',
  'SK이노베이션',
  '현대자동차',
  '기아자동차',
  'NAVER',
  '카카오',
  '네이버',
  '포스코',
  '삼성바이오로직스', 
  '삼성SDI',
  '삼성화재',
  '신한금융지주',
  '하나금융지주',
  'KB금융지주',
  '셀트리온',
  'LG생활건강',
  '롯데케미칼'
];

// 초성 매핑 (한글 자음-초성 매핑)
const HANGUL_INITIAL_CONSONANTS = {
  'ㄱ': /[가-깋]/g,
  'ㄲ': /[까-낗]/g,
  'ㄴ': /[나-닣]/g,
  'ㄷ': /[다-딯]/g,
  'ㄸ': /[따-띻]/g,
  'ㄹ': /[라-맇]/g,
  'ㅁ': /[마-밓]/g,
  'ㅂ': /[바-빟]/g,
  'ㅃ': /[빠-삗]/g,
  'ㅅ': /[사-싷]/g,
  'ㅆ': /[싸-앃]/g,
  'ㅇ': /[아-잏]/g,
  'ㅈ': /[자-짛]/g,
  'ㅉ': /[짜-찧]/g,
  'ㅊ': /[차-칳]/g,
  'ㅋ': /[카-킿]/g,
  'ㅌ': /[타-팋]/g,
  'ㅍ': /[파-핗]/g,
  'ㅎ': /[하-힣]/g
};

interface UseCompanySearchProps {
  onSearch?: (company: string) => void;
}

interface UseCompanySearchReturn {
  searchText: string;
  setSearchText: (text: string) => void;
  recentSearches: string[];
  suggestions: string[];
  showSuggestions: boolean;
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleSearch: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSuggestionKeyDown: (e: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  selectSuggestion: (company: string) => void;
  selectRecentSearch: (company: string) => void;
  companyListLoading: boolean;
  companyListError: string | null;
}

export const useCompanySearch = ({ onSearch }: UseCompanySearchProps = {}): UseCompanySearchReturn => {
  // Zustand 스토어 사용 (상태 설정만 사용하고 읽기는 사용하지 않음)
  const { setCurrentCompany } = useCompanyStore();
  
  // 로컬 상태만 관리 - store와 로컬 상태를 동기화하지 않음
  const [searchText, setSearchText] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '삼성전자',
    'LG화학',
    'SK하이닉스',
    '현대자동차',
    'NAVER'
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 회사 목록 상태
  const [companyList, setCompanyList] = useState<string[]>(mockCompanyList);
  const [companyListLoading, setCompanyListLoading] = useState<boolean>(false);
  const [companyListError, setCompanyListError] = useState<string | null>(null);

  // 회사 목록 가져오기
  useEffect(() => {
    const fetchCompanyList = async () => {
      // 개발 환경에서는 목업 데이터 사용
      if (isDevelopment) {
        return;
      }
      
      setCompanyListLoading(true);
      setCompanyListError(null);
      
      try {
        const list = await dashboardService.getCompanyList();
        setCompanyList(list);
      } catch (err) {
        console.error('회사 목록 조회 실패:', err);
        setCompanyListError('회사 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setCompanyListLoading(false);
      }
    };
    
    fetchCompanyList();
  }, []);

  // 초성 검색을 포함한 검색어 필터링 함수
  const filterCompanies = (input: string): string[] => {
    if (!input.trim()) return [];
    
    const query = input.toLowerCase();
    
    // 초성인지 확인
    const isInitialConsonant = Object.keys(HANGUL_INITIAL_CONSONANTS).includes(query);
    
    return companyList.filter(company => {
      // 초성 검색일 경우
      if (isInitialConsonant) {
        return HANGUL_INITIAL_CONSONANTS[query as keyof typeof HANGUL_INITIAL_CONSONANTS].test(company);
      }
      
      // 일반 검색 (포함 여부)
      return company.toLowerCase().includes(query);
    });
  };

  const handleSearch = () => {
    if (searchText.trim() === '') return;
    
    // Zustand 스토어 업데이트 (단방향: 로컬 -> 스토어)
    setCurrentCompany(searchText);
    
    // Props 콜백도 유지 (옵션)
    if (onSearch) {
      onSearch(searchText);
    }
    
    // 최근 검색어에 추가
    if (!recentSearches.includes(searchText)) {
      setRecentSearches(prev => [searchText, ...prev.slice(0, 4)]);
    }
    
    // 검색 후 자동완성 닫기
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      // 아래 화살표 키: 자동완성 목록으로 포커스 이동
      if (suggestionsRef.current) {
        const firstSuggestion = suggestionsRef.current.querySelector('button');
        if (firstSuggestion) {
          (firstSuggestion as HTMLButtonElement).focus();
        }
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      // 다음 제안으로 이동
      const nextSuggestion = suggestionsRef.current?.querySelectorAll('button')[index + 1];
      if (nextSuggestion) {
        (nextSuggestion as HTMLButtonElement).focus();
      }
    } else if (e.key === 'ArrowUp') {
      if (index === 0) {
        // 첫 번째 제안에서 위로 이동하면 입력 필드로 돌아감
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else {
        // 이전 제안으로 이동
        const prevSuggestion = suggestionsRef.current?.querySelectorAll('button')[index - 1];
        if (prevSuggestion) {
          (prevSuggestion as HTMLButtonElement).focus();
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectSuggestion(suggestions[index]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const selectSuggestion = (company: string) => {
    setSearchText(company);
    
    // Zustand 스토어 업데이트 (단방향: 로컬 -> 스토어)
    setCurrentCompany(company);
    
    // Props 콜백도 유지 (옵션)
    if (onSearch) {
      onSearch(company);
    }
    
    setShowSuggestions(false);
    
    // 최근 검색어에 추가
    if (!recentSearches.includes(company)) {
      setRecentSearches(prev => [company, ...prev.slice(0, 4)]);
    }
  };

  const selectRecentSearch = (company: string) => {
    setSearchText(company);
    
    // Zustand 스토어 업데이트 (단방향: 로컬 -> 스토어)
    setCurrentCompany(company);
    
    // Props 콜백도 유지 (옵션)
    if (onSearch) {
      onSearch(company);
    }
  };

  // 검색어 변경 시 자동 완성 업데이트
  useEffect(() => {
    if (searchText.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = filterCompanies(searchText);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchText]);
  
  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    searchText,
    setSearchText,
    recentSearches,
    suggestions,
    showSuggestions,
    suggestionsRef,
    inputRef,
    handleSearch,
    handleKeyDown,
    handleSuggestionKeyDown,
    selectSuggestion,
    selectRecentSearch,
    companyListLoading,
    companyListError
  };
};