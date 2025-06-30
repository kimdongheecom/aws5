'use client';

import React, { useEffect } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { CircularProgress, Alert } from '@mui/material';
import { useCompanySearch } from '../../hooks/useCompanySearch';
import { useCompanyStore } from '../../store/companyStore';

interface SearchCompanyBoxProps {
  onSearch?: (company: string) => void;
}

// 기업 목록 데이터
const companyList = [
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

const SearchCompanyBox: React.FC<SearchCompanyBoxProps> = ({ onSearch }) => {
  // 외부 상태와 훅 분리
  const { currentCompany } = useCompanyStore();
  const {
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
  } = useCompanySearch({ onSearch });

  // 컴포넌트 마운트 시 한 번만 현재 선택된 회사명 설정
  useEffect(() => {
    if (currentCompany && !searchText) {
      setSearchText(currentCompany);
    }
  }, []);

  return (
    <div className="p-4 mb-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
      <div className="flex flex-col">
        <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
          기업 검색
        </h4>
        
        {/* 에러 메시지 표시 */}
        {companyListError && (
          <Alert 
            severity="error" 
            icon={<AlertCircle size={18} />}
            className="mb-4"
          >
            {companyListError}
          </Alert>
        )}
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder={companyListLoading ? "기업 목록 로딩 중..." : "기업명을 입력하세요"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2.5 border border-stroke rounded-lg bg-transparent outline-none focus:border-primary dark:border-strokedark dark:text-white"
              disabled={companyListLoading}
            />
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-waterloo hover:text-primary dark:text-manatee dark:hover:text-white"
              onClick={handleSearch}
              disabled={companyListLoading}
              aria-label="검색"
              type="button"
            >
              {companyListLoading ? (
                <CircularProgress size={18} />
              ) : (
                <Search size={18} />
              )}
            </button>
            
            {/* 자동완성 목록 */}
            {showSuggestions && (
              <div 
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-1 bg-white border border-stroke rounded-lg shadow-lg dark:bg-blacksection dark:border-strokedark"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    onKeyDown={(e) => handleSuggestionKeyDown(e, index)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-1 dark:hover:bg-meta-4 text-black dark:text-white transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* 검색 버튼 추가 */}
          <button
            className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
            onClick={handleSearch}
            disabled={companyListLoading || !searchText.trim()}
            type="button"
          >
            검색
          </button>
        </div>
        
        {recentSearches.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-waterloo dark:text-manatee mb-2">최근 검색 기업</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((company, index) => (
                <button
                  key={index}
                  onClick={() => selectRecentSearch(company)}
                  className="px-3 py-1 text-xs bg-gray-1 dark:bg-meta-4 rounded-md text-black dark:text-white hover:bg-gray-2 dark:hover:bg-meta-5"
                  disabled={companyListLoading}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCompanyBox; 