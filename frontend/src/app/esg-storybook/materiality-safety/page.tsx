"use client";

import React from 'react';
import { Shield, HardHat, Activity, CheckCircle } from 'lucide-react';

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


export default function MaterialitySafetyPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Materiality #2 안전보건</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">42</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="안전보건">
                    <h4 className="text-md font-bold text-gray-800 mt-4">거버넌스</h4>
                    <p className="mt-1">
                        한국중부발전은 임직원의 안전을 중요한 가치로 여기며, 모든 임직원이 즐겁고 건강하고 행복한 사업장을 조성하는 데 노력하고 있습니다. 이를 위하여 산업안전 거버넌스를 전면 개편하였으며, 안전품질 부서에서 안전경영 강화를 별도 조직으로 분리하여 안전관리 전문인력이 현업에 집중할 수 있도록 하였습니다. 안전경영처는 안전총괄실, 안전보건부, 재난방재부, 재난관리부로 1실 3부 체제로 재편성되었습니다.
                    </p>
                </InfoSection>
                
                <InfoSection title="전략">
                    <p>
                        한국중부발전은 안전예방과 안전수준을 향상시키기 위하여 사람 중심의 안전경영체계를 재정립하였습니다. '현장안전 강화', '안전 체질개선', '재난안전 확보' 키워드 아래에 다양한 중점과제를 추진하고 있으며, 꾸준한 노력과 투자를 통하여 안전 문화를 정착시키고 안전한 근로 환경을 조성하고 있습니다.
                    </p>
                </InfoSection>

                <section>
                    <h4 className="text-md font-bold text-gray-800">추진전략</h4>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                        <OrgBox icon={<HardHat size={24}/>} title="현장안전 강화" />
                        <OrgBox icon={<Activity size={24}/>} title="안전 체질개선" />
                        <OrgBox icon={<Shield size={24}/>} title="재난안전 확보" />
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="위험 관리">
                    <p>
                        한국중부발전은 안전보건 관련 주요 위험 관리를 지속적으로 인식하며 기업이 안전보건 관련 위험을 완화하고 기회를 활용할 수 있는 방안을 모색하고 있습니다.
                    </p>
                </InfoSection>

                <div className="grid grid-cols-2 gap-6">
                    <RiskOpportunityCard 
                        type="Risk"
                        title="1. 중대재해 발생"
                        sections={[
                            { title: 'ESG 이슈 연계', items: ['안전보건', '임직원', '협력기업'] },
                            { title: '위험 요소에 대한 영향', items: ['인명 사고로 인한 인권 손실 발생', '제품 생산에 대한 고객 신뢰 저하'] },
                            { title: '완화하기 위한 관리 방안', items: ['KOMIPO Safety-Net 도입을 통한 유해위험작업 집중 관리', '위험지수 기반으로 실시간 작업현황 관리'] },
                        ]}
                    />
                     <RiskOpportunityCard 
                        type="Opportunity"
                        title="1. 위험성평가 효과성 제고"
                        sections={[
                            { title: 'ESG 이슈 연계', items: ['안전보건', '임직원', '협력기업'] },
                            { title: '기회 요소에 대한 영향', items: ['3D(Check, Confirm, Clean) 활동을 통한 안전보건 확보', '인명 사고 피해에 대한 근원적 원인 분석'] },
                            { title: '극대화하기 위한 관리 방안', items: ['고위험 작업 간 위험성 분석을 통한 작업 실적을 주기적으로 공정안전 보고', '불안전 보고서를 통한 체계적인 분석 및 직접 작업 분석'] },
                        ]}
                    />
                </div>
                
                <InfoSection title="지표 및 목표">
                    <ul className="space-y-2">
                        <GoalItem text="안전책임경영 개선" />
                        <GoalItem text="전원설비 개선으로 안전작업기반 강화 및 안전시설물 보강으로 현장 위험요인 제거" />
                        <GoalItem text="모바일 기반 통합 디지털 재난안전관리시스템 구축 및 주요 위험원 입체구조화 계획 수립" />
                        <GoalItem text="위험성평가사 지속 양성, 위험성평가 표준화 및 포상과 공정한 제재를 통한 자율적 참여 유도" />
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
