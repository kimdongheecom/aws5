"use client";

import React from 'react';
import EsgGradeCard from '../cards/EsgGradeCard';
import ProfitabilityChart from '../charts/ProfitabilityChart';
import GrowthChart from '../charts/GrowthChart';
import DebtLiquidityChart from '../charts/DebtLiquidityChart';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useCompanyStore } from '../../store/companyStore';
import { CircularProgress, Alert } from '@mui/material';

const SummaryTab = () => {
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {/* 재무 지표 */}
      {data.financialMetrics && data.financialMetrics.years && (
        <ProfitabilityChart data={data.financialMetrics} />
      )}
      
      {/* 성장성 지표 */}
      {data.growthData && data.growthData.years && (
        <GrowthChart data={data.growthData} />
      )}
      
      {/* 부채 및 유동성 지표 */}
      {data.debtLiquidityData && data.debtLiquidityData.years && (
        <DebtLiquidityChart data={data.debtLiquidityData} />
      )}
    </div>
  );
};

// 데이터 분석 보고서 컴포넌트 - 더 세분화된 구조
interface DataAnalysisReportProps {
  analysis: {
    summary: string;
    financialEsgIntegration: {
      riskAssessment: string;
      sustainabilityOutlook: string;
    };
    recommendations: string[];
  };
}

const DataAnalysisReport: React.FC<DataAnalysisReportProps> = ({ analysis }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        금융 및 ESG 데이터 분석 보고
      </h4>
      
      <div className="flex flex-col gap-4">
        <AnalysisSection 
          title="요약 분석"
          content={analysis.summary}
        />
        
        <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
          <h5 className="mb-3 text-lg font-medium text-black dark:text-white">금융-ESG 통합 분석</h5>
          <div className="flex flex-col gap-2">
            <p className="text-base text-waterloo dark:text-manatee">
              <span className="font-medium text-black dark:text-white">투자 위험도 평가:</span> {analysis.financialEsgIntegration.riskAssessment}
            </p>
            <p className="text-base text-waterloo dark:text-manatee">
              <span className="font-medium text-black dark:text-white">지속가능성 전망:</span> {analysis.financialEsgIntegration.sustainabilityOutlook}
            </p>
          </div>
        </div>
        
        <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
          <h5 className="mb-3 text-lg font-medium text-black dark:text-white">추천 사항</h5>
          <ul className="list-disc pl-5 text-base text-waterloo dark:text-manatee">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className={index < analysis.recommendations.length - 1 ? "mb-1" : ""}>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 분석 섹션 컴포넌트 - 재사용 가능한 컴포넌트
interface AnalysisSectionProps {
  title: string;
  content: string;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, content }) => {
  return (
    <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
      <h5 className="mb-3 text-lg font-medium text-black dark:text-white">{title}</h5>
      <p className="text-base text-waterloo dark:text-manatee">{content}</p>
    </div>
  );
};

export default SummaryTab; 