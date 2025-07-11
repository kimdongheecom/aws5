"use client";

import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useCompanyStore } from '../../store/companyStore';
import { CircularProgress, Alert } from '@mui/material';

// 공통 테이블 스타일
const tableStyles = {
  itemCell: "py-3 px-4 text-black dark:text-white w-[391.62px] h-[50.61px]",
  valueCell: "py-3 px-4 text-center font-medium text-black dark:text-white w-[321.29px] h-[50.61px]",
  headerCell: "py-4 px-4 font-medium text-black dark:text-white text-center w-[321.29px]",
  itemHeaderCell: "py-4 px-4 font-medium text-black dark:text-white w-[391.62px]",
};

const FinanceTab = () => {
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

  // 데이터 추출 - 방어적 코드 추가
  const { financialMetrics, growthData, debtLiquidityData } = data;
  
  // 필요한 데이터가 없는 경우 처리
  if (!financialMetrics?.years || !growthData?.years || !debtLiquidityData?.years) {
    return (
      <Alert severity="warning" className="mb-4">
        해당 기업의 재무 데이터를 가져올 수 없습니다.
      </Alert>
    );
  }
  
  const years = financialMetrics.years;

  return (
    <div className="mb-8 grid grid-cols-1 gap-6">
      {/* 수익성 지표 */}
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          수익성 지표
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className={tableStyles.itemHeaderCell}>항목</th>
                {years.map((year, index) => (
                  <th key={`year-${index}`} className={tableStyles.headerCell}>
                    {year}년
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stroke dark:border-strokedark">
                <td className={tableStyles.itemCell}>
                  순이익률
                </td>
                {financialMetrics.netMargin.map((value, index) => (
                  <td key={`netMargin-${index}`} className={tableStyles.valueCell}>
                    {value.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr className="border-b border-stroke dark:border-strokedark">
                <td className={tableStyles.itemCell}>
                  영업이익률
                </td>
                {financialMetrics.operatingMargin.map((value, index) => (
                  <td key={`opMargin-${index}`} className={tableStyles.valueCell}>
                    {value.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr className="border-b border-stroke dark:border-strokedark">
                <td className={tableStyles.itemCell}>
                  ROE
                </td>
                {financialMetrics.roe.map((value, index) => (
                  <td key={`roe-${index}`} className={tableStyles.valueCell}>
                    {value.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className={tableStyles.itemCell}>
                  ROA
                </td>
                {financialMetrics.roa.map((value, index) => (
                  <td key={`roa-${index}`} className={tableStyles.valueCell}>
                    {value.toFixed(2)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 성장성 지표 */}
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          성장성 지표
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className={tableStyles.itemHeaderCell}>항목</th>
                {years.map((year, index) => (
                  <th key={`growthYear-${index}`} className={tableStyles.headerCell}>
                    {year}년
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stroke dark:border-strokedark">
                <td className={tableStyles.itemCell}>
                  매출 성장률
                </td>
                {growthData.revenueGrowth.map((value, index) => (
                  <td 
                    key={`revGrowth-${index}`} 
                    className={tableStyles.valueCell}
                  >
                    {value >= 0 ? '+' : ''}{value.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className={tableStyles.itemCell}>
                  순이익 성장률
                </td>
                {growthData.netIncomeGrowth.map((value, index) => (
                  <td 
                    key={`netGrowth-${index}`} 
                    className={tableStyles.valueCell}
                  >
                    {value >= 0 ? '+' : ''}{value.toFixed(2)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 안정성 지표 */}
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          안정성 지표
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className={tableStyles.itemHeaderCell}>항목</th>
                {years.map((year, index) => (
                  <th key={`stabilityYear-${index}`} className={tableStyles.headerCell}>
                    {year}년
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stroke dark:border-strokedark">
                <td className={tableStyles.itemCell}>
                  유동비율
                </td>
                {debtLiquidityData.currentRatio.map((value, index) => (
                  <td key={`currentRatio-${index}`} className={tableStyles.valueCell}>
                    {value.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className={tableStyles.itemCell}>
                  부채비율
                </td>
                {debtLiquidityData.debtRatio.map((value, index) => (
                  <td key={`debtRatio-${index}`} className={tableStyles.valueCell}>
                    {value.toFixed(2)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceTab; 