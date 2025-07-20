"use client";

import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 채권 카드 컴포넌트
const BondCard = ({ title, subtext, description, bgColor, textColor, borderColor }) => (
    <div className={`p-4 rounded-lg border-2 h-full ${borderColor} ${bgColor}`}>
        <p className={`font-bold text-center ${textColor}`}>{title}</p>
        <p className={`text-xs text-center mt-1 mb-3 ${textColor} opacity-90`}>{subtext}</p>
        <p className="text-xs text-gray-700">{description}</p>
    </div>
);

// 성과 카드 컴포넌트
const ResultCard = ({ year, title, description }) => (
    <div className="bg-gray-50 p-4 rounded-lg border h-full">
        <p className="font-bold text-blue-600">{year}</p>
        <h4 className="font-semibold text-gray-800 mt-1 mb-2">{title}</h4>
        <p className="text-xs text-gray-600">{description}</p>
    </div>
);

// 목표 항목을 위한 재사용 컴포넌트
const GoalItem = ({ text }) => (
    <li className="flex items-start">
        <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
        <span>{text}</span>
    </li>
);

export default function EnvironmentalInvestmentPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Environmental</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">62</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="환경투자">
                    <h4 className="text-md font-bold text-gray-800 mt-4">ESG 채권</h4>
                    <p className="mt-1">
                        한국중부발전은 ESG 채권 발행으로 친환경 투자를 강화하였습니다. 2019년 미화 3억 달러의 Green Bond 발행을 시작으로 2023년까지 총 8,479억 원의 ESG 채권을 발행하였습니다. 이 중 7,679억 원은 태양광, 풍력 등 신재생 사업에, 400억 원은 생태 다양성 분야에 활용하였으며 사회적채권 400억 원은 사회적 일자리 창출에 사용하였습니다.
                    </p>
                </InfoSection>
                
                <section className="grid grid-cols-3 gap-3">
                    <BondCard 
                        title="녹색채권" 
                        subtext="(Green Bond)" 
                        description="녹색프로젝트 자금 조달이나 재원을 마련하기 위하여 발행"
                        bgColor="bg-green-50"
                        textColor="text-green-800"
                        borderColor="border-green-200"
                    />
                    <BondCard 
                        title="사회적채권" 
                        subtext="(Social Bond)" 
                        description="사회적 가치 창출 사업에 자금을 마련하기 위하여 발행"
                        bgColor="bg-yellow-50"
                        textColor="text-yellow-800"
                        borderColor="border-yellow-200"
                    />
                    <BondCard 
                        title="지속가능채권" 
                        subtext="(Sustainability Bond)" 
                        description="녹색 및 사회적 프로젝트에 자금을 마련하기 위하여 발행"
                        bgColor="bg-blue-50"
                        textColor="text-blue-800"
                        borderColor="border-blue-200"
                    />
                </section>

                <InfoSection title="한국형 녹색분류체계 시범사업 성과">
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <ResultCard 
                            year="2022"
                            title="추진성과"
                            description="한국중부발전은 한국형 녹색채권(K-Taxonomy) 시범사업에 선정되어, 환경부와 녹색채권 활성화를 위한 MOU를 체결하고 녹색채권 400억 원을 발행하였습니다."
                        />
                        <ResultCard 
                            year="2023"
                            title="추진성과"
                            description="한국중부발전은 한국형 녹색채권 이차보전 지원 사업에 참여하였습니다. 제주 친환경에너지타운 인허가단계인 제주행원 육상풍력 28기 전환사업에 500억 원을 발행하여 녹색채권의 선두주자로 자리매김하였습니다."
                        />
                    </div>
                </InfoSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="저탄소 에너지 전환 선도">
                    <p>
                        한국중부발전은 탄소중립 실현을 목표로 무탄소 에너지 전환을 선도하고 있습니다. 국내 최초로 150MW 규모의 가스터빈에 수소 30~50% 혼합연소에 성공하였으며, 1,000MW 규모의 석탄화력에 수소화합물 20%를 혼합하는 실증기반 기술 테스트를 완료하였습니다.
                    </p>
                     <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                        <ul className="space-y-2 text-sm">
                            <GoalItem text="핵심기술(터빈) 수소 혼소 20% 버너 연소 시험" />
                            <GoalItem text="신보령발전본부 파일럿 테스트(2025)" />
                            <GoalItem text="수소화합물 20% 혼소 실증(2027)" />
                        </ul>
                     </div>
                </InfoSection>

                <InfoSection title="블루수소 생산 플랜트를 활용한 수소·혼소발전 추진">
                     <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                        <ul className="space-y-2 text-sm">
                            <GoalItem text="핵심기술) 150MW급 가스터빈 수소 혼소 연소 시험" />
                            <GoalItem text="보령신복합 가스터빈 수소 50% 추진" />
                            <GoalItem text="대규모 블루수소 생산 플랜트 건설(2021~2028)" />
                            <GoalItem text="수소 혼소 시 안정적 전력공급 확보(25만톤/년)" />
                        </ul>
                     </div>
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
