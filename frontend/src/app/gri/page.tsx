'use client';

import React from 'react';
import Navigation from '../../components/Navigation';
import ChartIcon from '@/domain/gri/components/ChartIcon';
import AnalyzeGri from '@/domain/gri/components/AnalyzeGri';
import SaveRequirementsButton from '@/domain/gri/components/SaveRequirementsButton';

export default function GRIPage() {
  // 더미 데이터 (ChartIcon에 props 전달용)
  const dummyRequirements = {};
  const dummyRequirementInputs = {};
  const dummySuggestedStatements = {};
  const dummyApprovedStatements = {};

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        <ChartIcon 
          requirements={dummyRequirements}
          requirementInputs={dummyRequirementInputs}
          suggestedStatements={dummySuggestedStatements}
          approvedStatements={dummyApprovedStatements}
        />

        <div className="container mx-auto px-4 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-800">GRI 리포트 생성기</h1>
          </div>

          {/* GRI 설명 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">GRI 리포트 생성 시스템이란?</h2>
            <div className="text-gray-600 mb-6 space-y-4">
              <p>
                GRI (Global Reporting Initiative)는 전 세계적으로 가장 널리 사용되는 지속가능성 보고 표준으로, 기업의 경제·환경·사회적 영향에 대한 정보를 투명하게 공시할 수 있도록 지원합니다.
              </p>
              <p>
                본 시스템은 GRI Standard 2021에 기반하여 보고서 생성을 자동화합니다. 사용자는 요구사항(Requirements)을 입력하면, 시스템이 AI를 활용해 Suggested Statement를 생성하고, 이를 수정 및 승인함으로써 최종 보고 문장을 완성할 수 있습니다.
              </p>
              <p className="mb-6">
                전체 데이터는 다음과 같은 구조로 연결되어 있습니다:
              </p>
              
              {/* 플로우 차트 */}
              <div className="flex items-center justify-center mb-6 overflow-x-auto">
                <div className="flex items-center space-x-2 min-w-max">
                  {/* Categories */}
                  <div className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[120px] justify-center">
                    <span className="text-lg">📂</span>
                    <span className="font-semibold text-sm">Categories</span>
                  </div>
                  
                  {/* 화살표 1 */}
                  <div className="text-gray-400 text-xl px-2">
                    →
                  </div>
                  
                  {/* Disclosures */}
                  <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[120px] justify-center">
                    <span className="text-lg">📋</span>
                    <span className="font-semibold text-sm">Disclosures</span>
                  </div>
                  
                  {/* 화살표 2 */}
                  <div className="text-gray-400 text-xl px-2">
                    →
                  </div>
                  
                  {/* Requirements */}
                  <div className="bg-purple-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[130px] justify-center">
                    <span className="text-lg">❓</span>
                    <span className="font-semibold text-sm">Requirements</span>
                  </div>
                  
                  {/* 화살표 3 */}
                  <div className="text-gray-400 text-xl px-2">
                    →
                  </div>
                  
                  {/* Suggested Statement */}
                  <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[140px] justify-center">
                    <span className="text-lg">💡</span>
                    <span className="font-semibold text-sm">Suggested Statement</span>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* GRI 설명 */}

          <SaveRequirementsButton />

          <AnalyzeGri />
          
          {/* GRI 표준 링크 */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">참고 자료</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://www.globalreporting.org/standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <h3 className="font-semibold text-purple-800">GRI 표준 공식 사이트</h3>
                <p className="text-sm text-gray-600">최신 GRI 표준 및 가이드라인</p>
              </a>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800">AI 모델 정보</h3>
                <p className="text-sm text-gray-600">Llama3 기반 GRI 분석 엔진 활용</p>
              </div>
            </div>
          </div>
        </div>
      </div> {/* min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 */}
    </>
  );
} 