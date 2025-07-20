"use client";

import React from 'react';
import { CheckCircle, Users, Leaf, MessageSquare } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 전략 체계의 각 행을 위한 재사용 컴포넌트
const StrategyRow = ({ label, children }) => (
    <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 flex items-center justify-center font-bold text-teal-800 bg-teal-100 rounded-lg p-2 text-center text-sm">
            {label}
        </div>
        <div className="col-span-10">
            {children}
        </div>
    </div>
);

// 그리드 아이템을 위한 재사용 컴포넌트
const GridItem = ({ title, icon, items, bgColor = 'bg-gray-50' }: {
    title?: string;
    icon?: React.ReactNode;
    items?: string[];
    bgColor?: string;
}) => (
    <div className={`p-4 rounded-lg h-full ${bgColor} border`}>
        <div className="flex flex-col items-center text-center mb-3">
            {icon && <div className="text-blue-600 mb-2">{icon}</div>}
            {title && <h4 className="font-bold text-sm text-gray-800">{title}</h4>}
        </div>
        {items && (
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-xs">
                        <CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{item}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);


export default function LaborRelationsPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Social</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">92</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="건전한 노사관계">
                <h3 className="text-md font-bold text-gray-800 mt-4">추진전략</h3>
                <p className="mt-1">
                    한국중부발전은 '신뢰와 상생의 노사관계 구축을 통한 행복한 일터 구현'이라는 비전을 바탕으로, 노동자와 경영진 간의 소통과 참여를 통하여 미래지향적인 노사관계 전략을 재정립하였습니다. 2022년을 기점으로 노사관계 코드랩을 수립하고 2023년에는 전략방향을 설정하여 각 전략과제와 성과지표를 마련하였습니다.
                </p>
            </InfoSection>

            <section>
                <h3 className="text-md font-bold text-gray-800 mb-4">노사관계 전략체계</h3>
                <div className="space-y-4">
                    <StrategyRow label="비전">
                        <div className="bg-teal-600 text-white font-semibold text-center p-3 rounded-lg h-full flex items-center justify-center">
                            신뢰와 상생의 노사관계 구축을 통한 행복한 일터 구현
                        </div>
                    </StrategyRow>
                    
                    <StrategyRow label="로드맵">
                         <div className="grid grid-cols-3 gap-2">
                            <div className="bg-teal-100 text-teal-800 font-semibold text-center p-3 rounded-lg">2022 (정립)<br/>에너지 대전환기 상생의 파트너십 구축</div>
                            <div className="bg-teal-200 text-teal-900 font-semibold text-center p-3 rounded-lg">2023-2024 (안정화)<br/>세대갈등 해소 및 노사관계 안정화</div>
                            <div className="bg-teal-300 text-teal-900 font-semibold text-center p-3 rounded-lg">2025~ (고도화)<br/>통합 노사관계 고도화</div>
                        </div>
                    </StrategyRow>

                    <StrategyRow label="전략방향">
                        <div className="grid grid-cols-3 gap-4">
                           <GridItem icon={<Users size={28} />} title="협력과 상생 하나되는 노사" />
                           <GridItem icon={<Leaf size={28} />} title="노사 공동 ESG경영으로 책임지는 노사" />
                           <GridItem icon={<MessageSquare size={28} />} title="소통과 화합으로 성장하는 노사" />
                        </div>
                    </StrategyRow>

                    <StrategyRow label="실행과제">
                        <div className="grid grid-cols-3 gap-4">
                           <GridItem items={['협력적 노사 소통체계 구축', '신뢰 기반 합리적 참여관계 운영']} />
                           <GridItem items={['노사 공동 안전·환경·인권 강화', '노동조합의 사회적 책임(USR) 공동이행', '노동관계법령의 원칙적 준수']} />
                           <GridItem items={['노사공감 확산과 의사소통 강화', '노사역량 강화로 노사리스크 최소화', '근로조건 합리성 제고']} />
                        </div>
                    </StrategyRow>
                    
                     <StrategyRow label="성과지표">
                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
                           <div className="bg-gray-200 p-2 rounded">노사 신뢰지수</div>
                           <div className="bg-gray-200 p-2 rounded">노사 협력지수</div>
                           <div className="bg-gray-200 p-2 rounded">안전환경 실천지수</div>
                           <div className="bg-gray-200 p-2 rounded">사회적 책무 이행지수</div>
                           <div className="bg-gray-200 p-2 rounded">소통 활성화지수</div>
                           <div className="bg-gray-200 p-2 rounded">노무관리 역량지수</div>
                           <div className="bg-gray-200 p-2 rounded">제도 개선 만족지수</div>
                        </div>
                    </StrategyRow>

                    <StrategyRow label="환류체계">
                        <div className="grid grid-cols-3 gap-4">
                           <GridItem title="직원 및 노동조합" items={['임금 및 단체협상 결과 전 직원 조합원 투표', '노사협의회, 노사실무협의회', '임금 및 단체교섭 회의', '경영진 및 노조간부 간담회']} />
                           <GridItem title="설문조사" items={['노사관계 만족도 조사', '급여·복지 만족도 조사', '소통 만족도 조사', '노무교육 만족도 조사', '찾아가는 노무교육 현장 설문']} />
                           <GridItem title="최고의사결정기구 및 대내외기관" items={['이사회 보고', '대정부 복지포인트 확산 등 제도 개선 제안', '수시 경영 현장 점검']} />
                        </div>
                    </StrategyRow>
                </div>
            </section>
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
