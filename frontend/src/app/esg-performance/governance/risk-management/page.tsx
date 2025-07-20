"use client";

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 프로세스 박스를 위한 재사용 컴포넌트
const ProcessBox = ({ title }) => (
    <div className="bg-teal-500 text-white p-3 rounded-lg text-center font-semibold text-sm">
        {title}
    </div>
);

// 전략 박스를 위한 재사용 컴포넌트
const StrategyBox = ({ number, title, description }) => (
    <div className="bg-gray-100 p-4 rounded-lg border text-center">
        <div className="mx-auto w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold mb-2">{number}</div>
        <h4 className="font-bold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
);

// 주요 활동 카드를 위한 재사용 컴포넌트
const ActivityCard = ({ title, items }) => (
    <div className="bg-gray-50 p-4 rounded-lg border h-full">
        <h4 className="font-bold text-blue-600 text-md mb-3">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, index) => (
                 <li key={index} className="flex items-start text-xs">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


export default function RiskManagementPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Governance</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">120</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="리스크 관리">
                    <h3 className="text-md font-bold text-gray-800 mt-4">관리체계</h3>
                    <p className="mt-1">
                        한국중부발전은 급변하는 경영환경에 사업 영향을 미칠 수 있는 위험을 감지하고 선제적으로 대응할 수 있도록 전사 차원의 리스크 관리체계를 운영하고 있습니다. 특히, 재무리스크의 경우 최고경영자(CEO)를 중심으로 한 재정건전화 회의, 최고재무관리자(CFO)를 중심으로 한 경영혁신 TF 및 재무위기 비상경영 TF 등 중추 컨트롤 타워를 운영하고 있습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h3 className="text-md font-bold text-gray-800">리스크 관리 프로세스</h3>
                    <div className="mt-2 flex items-center justify-between">
                        <ProcessBox title="리스크 식별" />
                        <ArrowRight className="text-gray-400 shrink-0" />
                        <ProcessBox title="리스크 분석" />
                        <ArrowRight className="text-gray-400 shrink-0" />
                        <ProcessBox title="리스크 대응" />
                        <ArrowRight className="text-gray-400 shrink-0" />
                        <ProcessBox title="사후 관리" />
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="재무리스크 관리">
                    <p>
                        한국중부발전은 부채비율 상승과 순손실 전환 등의 문제를 해결하기 위해 경영진의 주도 아래 적극적인 상시 위기대응체계를 구축하여 재무구조를 안정화하고 건전성을 강화하는 데 힘쓰고 있습니다. 또한, 재무위원회에 대한 재무관리 권한을 위임하여 3가지 위기대응 전략을 수립하고, 이를 구현하기 위하여 최선의 노력을 기울이고 있습니다.
                    </p>
                </InfoSection>

                <section>
                    <h3 className="text-md font-bold text-gray-800">재무리스크 대응 전략</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <StrategyBox number="01" title="수익성 강화" description="판매수익 증대 원가 절감, 수익 창출" />
                        <StrategyBox number="02" title="자산 효율화" description="유휴자산 매각, 재고자산 최적화" />
                        <StrategyBox number="03" title="부채비율 개선" description="차입금 상환, 위원회 부채비율 최소화" />
                    </div>
                </section>

                <section>
                    <h3 className="text-md font-bold text-gray-800">주요 활동</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <ActivityCard 
                            title="전사적"
                            items={['소통기반 경영 현안 설명회', '분야별 세부과제 교육 시행', '전사적 투자관리체계 내실화']}
                        />
                         <ActivityCard 
                            title="조직화"
                            items={['재무위기 대응 부서 협업 강화', '중장기 재무관리계획 추진', '상황별 투자 달성 프로젝트 추진']}
                        />
                         <ActivityCard 
                            title="지속화"
                            items={['수익성 극대화', '예산절감제도 도입, 제도화', '달성금 등 수익 증대사업 개발', '자금 차입관련 금융비용 절감']}
                        />
                    </div>
                </section>
            </div>
        </main>
        
        {/* 주석 영역 추가 */}
        <footer className="pt-6 border-t border-gray-200 mt-8 shrink-0">
            <h4 className="font-semibold text-gray-700 mb-2">주석</h4>
            <p className="text-sm text-gray-600">
              * 여기에 주석 내용을 입력할 수 있습니다.
            </p>
        </footer>
      </div>
    </div>
  );
}
