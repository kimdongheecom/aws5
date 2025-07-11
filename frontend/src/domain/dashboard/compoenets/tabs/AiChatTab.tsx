"use client";

import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useCompanyStore } from '../../store/companyStore';
import { CircularProgress, Alert } from '@mui/material';

const AiChatTab = () => {
  // 필요한 데이터 가져오기
  const { currentCompany } = useCompanyStore();
  const { data, loading, error } = useDashboardData();
  
  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <CircularProgress />
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <Alert severity="error" className="mb-4">
        {error}
      </Alert>
    );
  }

  // 선택된 회사가 없거나 데이터가 없는 경우
  if (!currentCompany || !data) {
    return (
      <div className="p-4 mb-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-waterloo dark:text-manatee">
          기업을 검색하여 분석 결과를 확인하세요.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 p-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">데이터 분석 및 요약 메일 전송</h3>
        <p className="text-waterloo dark:text-manatee">AI 챗봇 인터페이스가 표시됩니다.</p>
        <div className="mt-4 flex items-center border border-stroke rounded p-2 dark:border-strokedark">
          <input 
            type="text" 
            placeholder="AI 챗봇에게 질문하기..." 
            className="flex-1 bg-transparent outline-none text-black dark:text-white" 
          />
          <button className="bg-primary text-white p-2 rounded-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
            </svg>
          </button>
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-medium text-black dark:text-white mb-2">대화 내역</h4>
          <div className="space-y-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-black dark:text-white"><strong>사용자:</strong> {currentCompany}의 재무 지표는 어떻게 되나요?</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-black dark:text-white"><strong>AI 챗봇:</strong> {data.companyName}의 최근 데이터를 분석해보면, 
              {data.financialMetrics.years[0]}년 기준 ROE는 {data.financialMetrics.roe[0].toFixed(2)}%, 
              ROA는 {data.financialMetrics.roa[0].toFixed(2)}%입니다. 
              영업이익률은 {data.financialMetrics.operatingMargin[0].toFixed(2)}%, 
              순이익률은 {data.financialMetrics.netMargin[0].toFixed(2)}%로 나타났습니다. 
              추가 정보가 필요하시면 질문해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatTab; 