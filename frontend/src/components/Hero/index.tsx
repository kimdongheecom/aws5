"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faChevronDown, 
  faChevronRight,
  faHome,
  faBuilding,
  faBook,
  faChartBar,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Common/Sidebar';


const ESGContents: React.FC = () => {
 

  return (
    <div className="min-h-screen bg-white">

      
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 영역 - 제목과 로그인 버튼 */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          <div className="hidden lg:block lg:flex-1"></div>
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-center text-blue-600 lg:flex-1">Sustainability Report</h1>
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
            <Link href="/auth/login">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors duration-200 rounded-lg shadow-lg 
                          w-full sm:w-auto
                          px-4 sm:px-6 lg:px-8
                          py-2 sm:py-3 lg:py-4
                          text-sm sm:text-base lg:text-lg
                          min-w-[120px] sm:min-w-[150px] lg:min-w-[200px]
                          max-w-[300px] sm:max-w-[350px] lg:max-w-[400px]
                          h-12 sm:h-14 lg:h-16"
              >
                로그인
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          <Sidebar/>
          {/* 메인 컨텐츠 영역 */}
          <div className="w-full lg:w-3/4">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">ESG 보고서</h2>
              <p className="mb-4">환경(Environmental), 사회(Social), 지배구조(Governance) 측면에서 기업의 지속가능한 발전을 위한 활동과 성과를 담은 보고서입니다.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-700 rounded-lg">
                  <h3 className="font-bold">Overview</h3>
                  <p className="text-sm mt-2">회사 소개 및 비전</p>
                </div>
                <div className="text-center p-4 bg-blue-700 rounded-lg">
                  <h3 className="font-bold">ESG Storybook</h3>
                  <p className="text-sm mt-2">ESG 전략 및 활동</p>
                </div>
                <div className="text-center p-4 bg-blue-700 rounded-lg">
                  <h3 className="font-bold">ESG Performance</h3>
                  <p className="text-sm mt-2">ESG 성과 지표</p>
                </div>
                <div className="text-center p-4 bg-blue-700 rounded-lg">
                  <h3 className="font-bold">Appendix</h3>
                  <p className="text-sm mt-2">부록 및 추가 자료</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">주요 ESG 성과</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border text-left">카테고리</th>
                      <th className="py-2 px-4 border text-left">지표</th>
                      <th className="py-2 px-4 border text-left">2023년 성과</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border">Environmental</td>
                      <td className="py-2 px-4 border">온실가스 배출량 감축</td>
                      <td className="py-2 px-4 border">전년 대비 15% 감소</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">Social</td>
                      <td className="py-2 px-4 border">임직원 교육 시간</td>
                      <td className="py-2 px-4 border">인당 평균 42시간</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">Governance</td>
                      <td className="py-2 px-4 border">이사회 다양성</td>
                      <td className="py-2 px-4 border">여성 이사 비율 30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 ESG Report. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ESGContents;

