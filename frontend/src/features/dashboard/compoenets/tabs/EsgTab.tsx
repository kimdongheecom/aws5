"use client";

import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useCompanyStore } from '../../store/companyStore';
import { CircularProgress, Alert } from '@mui/material';

const EsgTab = () => {
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
  
  // ESG 데이터가 없는 경우
  if (!data.esgGrades) {
    return (
      <Alert severity="info" className="mb-4">
        해당 기업의 ESG 데이터는 현재 제공되지 않습니다.
      </Alert>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4">
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          ESG 분석 데이터
        </h4>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">환경(E)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-success" style={{ width: '82%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">82/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">탄소배출:</span>
                <span className="font-medium text-success">-15% YoY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">재활용률:</span>
                <span className="font-medium text-black dark:text-white">76%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">에너지 효율:</span>
                <span className="font-medium text-success">+12%</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">사회(S)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-primary" style={{ width: '75%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">75/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">직원 만족도:</span>
                <span className="font-medium text-black dark:text-white">84%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">성별 다양성:</span>
                <span className="font-medium text-black dark:text-white">42% 여성</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">지역사회 투자:</span>
                <span className="font-medium text-success">+8%</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">지배구조(G)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-warning" style={{ width: '68%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">68/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">이사회 독립성:</span>
                <span className="font-medium text-black dark:text-white">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">투명성 지수:</span>
                <span className="font-medium text-black dark:text-white">72/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">윤리 강령 준수:</span>
                <span className="font-medium text-success">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsgTab; 