"use client";

import React from 'react';
import { Shield, Leaf, DollarSign, Droplets, TrendingUp, CheckCircle } from 'lucide-react';

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
    <div className="bg-gray-100 p-3 rounded-lg text-center border">
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

// 목표 항목을 위한 재사용 컴포넌트 (highlight prop 추가)
const GoalItem = ({ text, highlight = false }) => (
    <li className="flex items-start">
        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
        <span className={highlight ? 'font-semibold text-gray-800' : ''}>{text}</span>
    </li>
);


export default function MaterialityClimatePage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Materiality #1 기후변화 대응</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">32</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="기후변화 대응">
                    <h4 className="text-md font-bold text-gray-800 mt-4">거버넌스</h4>
                    <p className="mt-1">
                        한국중부발전은 기후변화 대응 조직체계를 구축하고 기후변화 위험과 기회요인을 선제적으로 식별 및 관리하고 있습니다. ESG위원회, 탄소중립위원회, 배출권관리위원회, 기후위기적응 TF 등 다양한 전문 위원회를 통하여 기후변화에 대한 중대 이슈를 독립적이고, 객관적으로 판단하여 전략적인 기후변화 대응 활동을 추진하고 있습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h4 className="text-md font-bold text-gray-800">ESG 전환위원회</h4>
                    <div className="mt-2 grid grid-cols-4 gap-3">
                        <OrgBox icon={<Shield size={24}/>} title="ESG위원회" />
                        <OrgBox icon={<Leaf size={24}/>} title="탄소중립위원회" />
                        <OrgBox icon={<DollarSign size={24}/>} title="배출권관리위원회" />
                        <OrgBox icon={<TrendingUp size={24}/>} title="기후위기적응 TF" />
                    </div>
                </section>

                <InfoSection title="전략">
                    <p>
                        한국중부발전은 탄소경영체계를 구축하고, '2050 탄소중립 로드맵'을 수립하였습니다. 2040년까지 2017년 대비 온실가스 2,840만 톤 감축을 목표로 하고 있으며, '탄소경영체계 구축', '온실가스 감축', '기후 신기술 확보'를 추진방향으로 설정하고 세부적인 추진전략을 수립하였습니다. 이를 통하여 한국중부발전은 2040년까지 무탄소 연료 전환과 온실가스 감축 투자를 확대하여 2050 탄소중립을 실현하고자 합니다.
                    </p>
                </InfoSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="위험 관리">
                    <p>
                        한국중부발전은 기후변화 대응 관련 주요 위험 및 기회를 지속적으로 인식하여 기후변화 문제를 해결하는 데 기여할 수 있는 방안을 모색하고 있습니다.
                    </p>
                </InfoSection>

                <div className="grid grid-cols-2 gap-6">
                    <RiskOpportunityCard 
                        type="Risk"
                        title="1. LNG 가격 변동성"
                        sections={[
                            { title: 'ESG 이슈 연계', items: ['임직원', '지역사회', '고객'] },
                            { title: '위험 요소에 대한 영향', items: ['국제 시장에서의 수급 불균형', 'LNG 발전 비용 증가에 따른 연료비 변동성 증폭'] },
                            { title: '완화하기 위한 관리 방안', items: ['LNG 선도·도입 및 추진 중간 정산 단축', 'LNG 생산국과의 장기계약을 통한 가격 안정성 확보'] },
                        ]}
                    />
                     <RiskOpportunityCard 
                        type="Opportunity"
                        title="1. 블루수소 생산"
                        sections={[
                            { title: 'ESG 이슈 연계', items: ['임직원', '지역사회', '고객'] },
                            { title: '기회 요소에 대한 영향', items: ['탄소 배출 감축을 통한 기후변화 대응', '블루수소 생산 플랜트 구축을 통한 새로운 비즈니스 기회 창출'] },
                            { title: '극대화하기 위한 관리 방안', items: ['블루수소 생산을 위한 기술개발 및 인프라 구축 투자', '블루수소 관련 규제 완화를 통한 경제성 확보'] },
                        ]}
                    />
                </div>
                
                <InfoSection title="지표 및 목표">
                    <ul className="space-y-2">
                        <GoalItem text="신재생에너지 분산자원 활성화" highlight={true} />
                        <GoalItem text="분산에너지 보급 지원 확대 및 발전량 예측 고도화" />
                        <GoalItem text="해외사업 대상국 내 수자원 보전 강화" highlight={true} />
                        <GoalItem text="신사업 사업성 평가 기반 신규 사업 개발 및 신재생 환경 영향 강화" />
                        <GoalItem text="국내외 온실가스 감축사업 활성화" highlight={true} />
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
