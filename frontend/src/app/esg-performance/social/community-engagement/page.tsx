"use client";

import React from 'react';
import { CheckCircle, MapPin, Leaf, GraduationCap } from 'lucide-react';

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
        <div className="col-span-2 flex items-center justify-center font-bold text-teal-800 bg-teal-100 rounded-lg p-2 text-center">
            {label}
        </div>
        <div className="col-span-10">
            {children}
        </div>
    </div>
);


// 그리드 아이템을 위한 재사용 컴포넌트
const GridItem = ({ title, icon, description, items, bgColor = 'bg-gray-50' }: {
    title: string;
    icon?: React.ReactNode;
    description?: string;
    items?: string[];
    bgColor?: string;
}) => (
    <div className={`p-4 rounded-lg h-full ${bgColor} border`}>
        <div className="flex flex-col items-center text-center">
            {icon && <div className="text-blue-600 mb-2">{icon}</div>}
            <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
            {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
        </div>
        {items && (
            <ul className="space-y-2 mt-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-xs">
                        <CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);


export default function CommunityEngagementPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Social</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">97</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="지역사회 상생협력">
                <h3 className="text-md font-bold text-gray-800 mt-4">추진전략</h3>
                <p className="mt-1">
                    한국중부발전은 다양한 소통채널을 통해 파악한 지역사회의 주요 니즈를 반영하여 상생협력 추진전략을 수립하였습니다. '지역과 함께 성장하는 KOMIPO', '지역에 힘이 되는 KOMIPO', '지역을 보듬어주는 KOMIPO'를 주요 추진방향으로 설정하여 지역 이해관계자의 니즈에 부합하는 지원사업을 적극적으로 추진하고 있습니다.
                </p>
            </InfoSection>

            <section>
                <h3 className="text-md font-bold text-gray-800 mb-4">상생협력 추진체계</h3>
                <div className="space-y-4">
                    <StrategyRow label="ESG경영 비전">
                        <div className="bg-teal-600 text-white font-semibold text-center p-3 rounded-lg h-full flex items-center justify-center">
                            미래가치를 창출하는 ESG경영 리더
                        </div>
                    </StrategyRow>
                    
                    <StrategyRow label="사회공헌 추진체계">
                         <div className="grid grid-cols-3 gap-2">
                            <div className="bg-teal-200 text-teal-900 font-semibold text-center p-3 rounded-lg">환경(E)</div>
                            <div className="bg-teal-200 text-teal-900 font-semibold text-center p-3 rounded-lg">사회(S)</div>
                            <div className="bg-teal-200 text-teal-900 font-semibold text-center p-3 rounded-lg">지배구조(G)</div>
                        </div>
                    </StrategyRow>

                    <StrategyRow label="추진방향">
                        <div className="grid grid-cols-3 gap-4">
                           <GridItem 
                                icon={<MapPin size={28} />}
                                title="지역 일자리 창출"
                                description="고령화 사회 진입에 따른 양질의 시니어 일자리 창출 필요"
                           />
                           <GridItem 
                                icon={<Leaf size={28} />}
                                title="친환경·소득확대"
                                description="지역 특성을 고려한 친환경 소득 증대사업 추진으로 경제 활성화"
                           />
                           <GridItem 
                                icon={<GraduationCap size={28} />}
                                title="도·농 지역격차 해소"
                                description="도시 및 농어촌 지역격차 해소를 위한 문화예술 진흥 및 교육기회 확대"
                           />
                        </div>
                    </StrategyRow>

                    <StrategyRow label="4대과제">
                        <div className="grid grid-cols-3 gap-4">
                            <GridItem 
                                title="지역과 함께 성장하는 KOMIPO"
                                items={['지역 내 양질의 일자리 창출', '지역특성을 고려한 주민 소득 확대', '지역 농산물 활용 창업 지원으로 매출 증대']}
                            />
                            <GridItem 
                                title="지역에 힘이 되는 KOMIPO"
                                items={['깨끗한 지역을 위한 환경 조성', '문화예술 활성화로 주민참여 확대', '교육환경 개선 및 교육격차 해소']}
                            />
                            <GridItem 
                                title="지역을 보듬어주는 KOMIPO"
                                items={['지역사회 안전망 강화', '취약계층 에너지 효율화 지원', '사회적 약자를 위한 주거환경 개선']}
                            />
                        </div>
                    </StrategyRow>

                    <StrategyRow label="모니터링 및 환류">
                         <div className="bg-teal-600 text-white font-semibold text-center p-3 rounded-lg h-full flex items-center justify-center">
                            다양한 소통채널 운영으로 지역사회 니즈 지속 모니터링 및 업무추진계획 수립 시 반영
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
