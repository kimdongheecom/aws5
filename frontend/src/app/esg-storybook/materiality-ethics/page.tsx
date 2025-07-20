"use client";

import React from 'react';
import { Scale, BookOpen, Shield, CheckCircle } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 조직도 박스를 위한 재사용 컴포넌트
const OrgBox = ({ title, icon }) => (
    <div className="bg-gray-100 p-3 rounded-lg text-center border h-full flex flex-col justify-center">
        {icon && <div className="flex justify-center mb-1 text-blue-600">{icon}</div>}
        <p className="font-semibold text-sm text-gray-800">{title}</p>
    </div>
);

// 위험/기회 관리 카드를 위한 재사용 컴포넌트
const RiskOpportunityCard = ({ type, title, sections }) => {
    const isRisk = type === 'Risk';
    const bgColor = isRisk ? 'bg-red-50' : 'bg-green-50';
    const textColor = isRisk ? 'text-red-700' : 'text-green-700';
    const borderColor = isRisk ? 'border-red-200' : 'border-green-200';

    return (
        <div className={`p-4 rounded-lg border ${borderColor} ${bgColor}`}>
            <div className={`font-bold text-center p-2 rounded-md mb-4 ${isRisk ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                {type} {title}
            </div>
            <div className="space-y-3">
                {sections.map((section, index) => (
                    <div key={index}>
                        <h4 className={`font-bold text-sm mb-1 ${textColor}`}>{section.title}</h4>
                        <ul className="space-y-1 list-disc list-inside text-xs text-gray-700">
                            {section.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 목표 항목을 위한 재사용 컴포넌트
const GoalItem = ({ text }) => (
    <li className="flex items-start">
        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
        <span>{text}</span>
    </li>
);


export default function MaterialityEthicsPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Materiality #3 윤리·컴플라이언스</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">50</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="윤리·컴플라이언스">
                    <h4 className="text-md font-bold text-gray-800 mt-4">거버넌스</h4>
                    <p className="mt-1">
                        한국중부발전은 청렴·윤리문화 확산을 위하여 윤리경영 추진체계를 구축하고, 기업의 지속가능한 성장 발전을 구현해 나가고 있습니다. 윤리경영 최고의사결정기구는 윤리경영위원회이며, 최고경영자(CEO)를 중심으로 상임감사, 기획전략처장, 감사실장 등으로 구성되어 있습니다.
                    </p>
                </InfoSection>
                
                <InfoSection title="전략">
                    <p>
                        한국중부발전은 투명경영을 통하여 사회적 신뢰를 확보하고, 윤리적인 기업문화를 정착시키고자 합니다. ESG경영 실천 및 윤리경영 선도를 위하여 윤리경영 관리·통제, 윤리적 조직·문화 조성, 기관 운영 투명성 제고를 3대 추진방향으로 설정하였습니다.
                    </p>
                </InfoSection>

                <section>
                    <h4 className="text-md font-bold text-gray-800">추진방향</h4>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                        <OrgBox icon={<Shield size={24}/>} title="윤리위험 관리·통제" />
                        <OrgBox icon={<BookOpen size={24}/>} title="윤리적 조직·문화 조성" />
                        <OrgBox icon={<Scale size={24}/>} title="기관 운영 투명성 제고" />
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="위험 관리">
                    <p>
                        한국중부발전은 윤리·컴플라이언스 관련 주요 위험 및 기회를 지속적으로 고민하며, 기업이 부정부패 방지, 회계통제 운영 문제를 해결하는 데 기여할 수 있는 방안을 모색하고 있습니다.
                    </p>
                </InfoSection>

                <div className="grid grid-cols-2 gap-6">
                    <RiskOpportunityCard 
                        type="Risk"
                        title="1. 청렴계약 불이행"
                        sections={[
                            { title: 'ESG 이슈 연계', items: ['윤리·컴플라이언스', '임직원', '협력기업'] },
                            { title: '위험 요소에 대한 영향', items: ['대내외 이해관계자로부터 브랜드 가치 저하', '법규제 위반으로 인한 금전적 손실 발생'] },
                            { title: '완화하기 위한 관리 방안', items: ['계약현황 실시간 모니터링 시스템 정립(계약계획 개발)', '2024년 전사적으로 확대 시행 및 약 2,800건 모니터링 진행'] },
                        ]}
                    />
                     <RiskOpportunityCard 
                        type="Risk"
                        title="2. 비정상적 회계 통제"
                        sections={[
                            { title: 'ESG 이슈 연계', items: ['윤리·컴플라이언스', '임직원', '출자회사'] },
                            { title: '위험 요소에 대한 영향', items: ['회사에 대한 임직원 신뢰도 저하로 인한 이직률 증가', '내부통제에 관한 새로운 규제·감독 강화'] },
                            { title: '완화하기 위한 관리 방안', items: ['계약현황 실시간 모니터링 등 전사 계약현황시스템 구축', '책임의식 자극 및 성과급 지급 리스크 개선을 위한 현장점검 실시'] },
                        ]}
                    />
                </div>
                
                <InfoSection title="지표 및 목표">
                    <ul className="space-y-2">
                        <GoalItem text="국민권익위원회 종합청렴도 평가" />
                        <GoalItem text="청렴도 취약기관 지정 탈피를 위한 1등급 목표" />
                        <GoalItem text="국민신뢰지수 개발 및 종합청렴도 우수등급 지속" />
                    </ul>
                </InfoSection>
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
