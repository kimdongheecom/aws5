'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Calculator,
  Database,
  CheckCircle,
  ArrowRight,
  BookOpen,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

const MethodologyPage: React.FC = () => {
  const downloadPaper = () => {
    // 실제 구현 시 논문 PDF 다운로드 로직
    alert('논문 PDF 다운로드 기능이 곧 추가될 예정입니다.');
  };

  const methodologySteps = [
    {
      step: 1,
      title: "지표 선정 (Indicator Selection)",
      description: "ESG 성과 측정을 위한 핵심 지표들을 선별하고 분류",
      details: [
        "경제 지표: 수익성, 성장성, 안정성 관련 재무 지표",
        "환경 지표: 온실가스 배출, 에너지 효율성, 환경 투자",
        "사회 지표: 고용, 안전, 지역사회 기여도"
      ],
      icon: <Database className="w-6 h-6" />
    },
    {
      step: 2,
      title: "데이터 수집 및 검증 (Data Collection & Validation)",
      description: "공개된 기업 보고서 및 공식 통계를 통한 데이터 수집",
      details: [
        "연간 지속가능성 보고서 분석",
        "재무제표 및 ESG 관련 공시자료",
        "러시아 연방 통계청 공식 데이터"
      ],
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 3,
      title: "데이터 정규화 (Normalization)",
      description: "서로 다른 단위와 스케일의 지표들을 비교 가능하도록 표준화",
      details: [
        "Min-Max 정규화 적용: (x - min) / (max - min)",
        "0-1 범위로 스케일 조정",
        "이상치 탐지 및 처리"
      ],
      icon: <Calculator className="w-6 h-6" />
    },
    {
      step: 4,
      title: "연쇄 대체법 (Chain Substitution Method)",
      description: "각 지표가 전체 성과에 미치는 영향을 정량적으로 분석",
      details: [
        "기준년도 대비 변화량 측정",
        "각 요인별 기여도 분리 계산",
        "상호작용 효과 제거"
      ],
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      step: 5,
      title: "기하 통합 기법 (Geometric Mean Aggregation)",
      description: "개별 지표들을 통합하여 종합 지수 산출",
      details: [
        "기하평균을 통한 가중치 적용",
        "극값의 영향 최소화",
        "균형잡힌 성과 평가"
      ],
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  const keyFormulas = [
    {
      title: "정규화 공식",
      formula: "X_normalized = (X - X_min) / (X_max - X_min)",
      description: "각 지표를 0-1 범위로 표준화"
    },
    {
      title: "기하평균 공식",
      formula: "GM = ⁿ√(x₁ × x₂ × ... × xₙ)",
      description: "n개 지표의 기하평균으로 통합지수 계산"
    },
    {
      title: "연쇄대체법",
      formula: "Δy = f(a₁, b₀, c₀) - f(a₀, b₀, c₀)",
      description: "각 요인의 순수한 기여도 분리"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* 헤더 */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <Link
                  href="/thesis"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  대시보드로 돌아가기
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                방법론 및 자료
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                ESG 성과 측정을 위한 연구 방법론 상세 설명
              </p>
            </div>
            <button
              onClick={downloadPaper}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              논문 PDF 다운로드
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 연구 개요 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">연구 개요</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                연구 목적
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                본 연구는 러시아 석유 기업의 ESG(환경·사회·지배구조) 성과를 정량적으로 측정하고 
                비교 분석하여 지속가능성 개선 방안을 제시하는 것을 목적으로 합니다.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                연구 대상
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Rosneft (러시아 최대 석유기업)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Lukoil (러시아 2위 석유기업)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  분석 기간: 2018-2021 (4년간)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                주요 기여점
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  기하평균 기반 ESG 통합지수 개발
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  연쇄대체법을 통한 요인별 기여도 분석
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  러시아 석유기업 ESG 성과 비교 평가
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  실무적 개선 권고사항 제시
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 방법론 단계 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            연구 방법론 단계
          </h2>
          
          <div className="space-y-6">
            {methodologySteps.map((step, index) => (
              <div key={step.step} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {step.step}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="text-blue-600 dark:text-blue-400 mr-3">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {index < methodologySteps.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 핵심 공식 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            핵심 수학적 공식
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyFormulas.map((formula, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {formula.title}
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 mb-3 font-mono text-center">
                  <code className="text-blue-600 dark:text-blue-400">
                    {formula.formula}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {formula.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 데이터 출처 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            데이터 출처 및 신뢰성
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                주요 데이터 출처
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Rosneft 연간 보고서
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      2018-2021 지속가능성 및 재무 보고서
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Lukoil 연간 보고서
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ESG 성과 및 재무 데이터
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      러시아 연방 통계청
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      산업별 벤치마크 데이터
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                데이터 품질 보증
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    공식 감사 완료된 재무제표 사용
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    국제 ESG 표준 준수 데이터
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    교차 검증 및 일관성 확인
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    이상치 탐지 및 처리 완료
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 연구의 한계 및 향후 연구 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4">
              연구의 한계
            </h3>
            <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
              <li>• 4년간의 제한된 분석 기간</li>
              <li>• 러시아 석유 기업 2개사로 한정</li>
              <li>• 공개된 데이터에 의존한 분석</li>
              <li>• 정성적 요인의 정량화 어려움</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
              향후 연구 방향
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li>• 분석 대상 기업 및 기간 확대</li>
              <li>• 산업 간 ESG 성과 비교 연구</li>
              <li>• 실시간 ESG 모니터링 시스템 개발</li>
              <li>• AI 기반 ESG 예측 모델 구축</li>
            </ul>
          </div>
        </div>

        {/* 대시보드로 돌아가기 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ESG 성과 대시보드
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                시각화된 분석 결과와 인터랙티브 차트를 확인하세요.
              </p>
            </div>
            <Link
              href="/thesis"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              대시보드 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage; 