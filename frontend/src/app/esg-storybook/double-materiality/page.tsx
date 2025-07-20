"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 개념도 박스를 위한 재사용 컴포넌트
const ConceptBox = ({ title, subtext, bgColor, textColor, borderColor }) => (
    <div className={`p-4 rounded-lg border-2 text-center ${bgColor} ${borderColor}`}>
        <p className={`font-bold ${textColor}`}>{title}</p>
        <p className={`text-xs mt-1 ${textColor} opacity-90`}>{subtext}</p>
    </div>
);

// 프로세스 스텝 카드를 위한 재사용 컴포넌트
const ProcessStep = ({ step, title, items }) => (
    <div className="bg-blue-600 text-white p-4 rounded-lg h-full">
        <p className="font-bold mb-2">Step {step}. {title}</p>
        <ul className="space-y-1 list-disc list-inside">
            {items.map((item, index) => (
                <li key={index} className="text-xs">{item}</li>
            ))}
        </ul>
    </div>
);


export default function DoubleMaterialityPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">이중중대성 평가</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">29</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="Double Materiality">
                    <h3 className="text-md font-bold text-gray-800 mt-4">이중중대성 평가 개념</h3>
                    <p className="mt-1">
                        GRI Standards 등 국제 ESG 공시 가이드라인은 지속가능경영보고서의 신뢰도를 제고하고 고도화 하고자 이중 중대성 개념을 적용하고 있습니다. 이중 중대성은 외부 지속가능성 관련 요인이 기업의 재무 상태에 미치는 영향과 기업의 경영활동 등이 환경·사회에 미치는 영향, 즉 내부적 관점과 외부적 관점을 모두 고려하는 개념입니다.
                    </p>
                </InfoSection>
                
                <section className="space-y-4 text-center">
                    <ConceptBox title="환경·사회 중요성" subtext="Inside-out(외부적 관점)에서 기업의 경영활동으로 인해 사회 및 환경에 끼칠 수 있는 긍·부정적 영향의 정도를 의미" bgColor="bg-blue-50" textColor="text-blue-800" borderColor="border-blue-200" />
                    <div className="font-semibold text-gray-600">기업이 받는 영향 | 기업이 끼치는 영향</div>
                    <ConceptBox title="기업" subtext="" bgColor="bg-gray-100" textColor="text-gray-800" borderColor="border-gray-300" />
                    <div className="font-semibold text-gray-600">외부 이해관계자 | 내부 임직원</div>
                    <ConceptBox title="재무적 중요성" subtext="Outside-in(내부적 관점)에서 외부 지속가능성 관련 요인이 기업의 재무상태에 끼칠 수 있는 긍·부정적 영향의 정도를 의미" bgColor="bg-blue-50" textColor="text-blue-800" borderColor="border-blue-200" />
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="이중 중대성 평가 프로세스">
                    <p>
                        한국중부발전은 중요한 지속가능성 이슈를 식별하고, 지속가능성 이슈에 대한 방향성을 도출하기 위하여 이중 중대성 평가를 실시하였습니다. 외부의 ESG 요인이 한국중부발전의 재무에 미치는 영향과, 한국중부발전의 활동이 환경·사회에 미치는 영향을 모두 고려하여 한국중부발전의 지속가능성 이슈를 분석하였습니다. 이 과정에서 GRI Standards 2021 개정안을 준수하고, EU CSRD(기업 지속가능성 보고지침)의 중대성 평가 방법론을 적용하였습니다.
                    </p>
                </InfoSection>

                <section className="space-y-4">
                    <ProcessStep 
                        step="1" 
                        title="ESG 이슈 풀 도출" 
                        items={[
                            'ESG 이슈 식별: 지속가능경영 표준·지표 검토',
                            'ESG 신규 이슈 업데이트: 기업 신규 현황 변화 반영'
                        ]} 
                    />
                    <ProcessStep 
                        step="2" 
                        title="영향도 평가" 
                        items={[
                            '환경·사회 영향도 평가: GRI, UN SDGs 등 글로벌 표준 분석',
                            '재무 중요도 평가: 한국중부발전 비전·전략 분석'
                        ]} 
                    />
                     <ProcessStep 
                        step="3" 
                        title="이슈 맵 도식화" 
                        items={[
                            '14개 ESG 이슈에 대한 Matrix 구성'
                        ]} 
                    />
                     <ProcessStep 
                        step="4" 
                        title="핵심 이슈 선정" 
                        items={[
                            '환경·사회적 영향도와 재무적 영향도를 기준으로 내부 검토를 진행하여 핵심 이슈 결정'
                        ]} 
                    />
                     <ProcessStep 
                        step="5" 
                        title="이해관계자 의견 수렴" 
                        items={[
                            '외부 이해관계자 인터뷰'
                        ]} 
                    />
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
