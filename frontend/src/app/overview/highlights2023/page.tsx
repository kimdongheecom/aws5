"use client";

import React from 'react';
import { TrendingUp, Target, ShieldCheck, Globe, Fuel, DollarSign } from 'lucide-react';

// 주요 성과 카드를 위한 재사용 컴포넌트
const AchievementCard = ({ icon, title, value, unit = "", description }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
    <div className="flex items-center text-blue-600 mb-2">
      {icon}
      <h4 className="font-bold ml-2">{title}</h4>
    </div>
    {value && (
      <p className="text-3xl font-extrabold text-gray-800">
        {value}{unit && <span className="text-xl font-semibold ml-1">{unit}</span>}
      </p>
    )}
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);

// 각 섹션을 위한 재사용 컴포넌트
const HighlightSection = ({ title, children }) => (
    <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 inline-block">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {children}
        </div>
    </section>
);


export default function Highlights2023Page() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">2023년 주요 성과</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">10</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-10">
            <HighlightSection title="전력계통 안정화와 전기요금 상승 억제 기여">
                <div className="text-md text-gray-700 leading-relaxed">
                    <p>
                        한국중부발전은 가장 싼 전기(판매단가 1위)를 가장 많이 공급(판매량 1위)하여 물가 안정화에 기여하였으며, 예비전력 부족이 지속되는 상황에서도 원가 경쟁력으로 발전사 5사에서 유일하게 전년 대비 판매량이 증가하였으며, LNG 직도입을 통하여 전기요금 상승 억제에도 기여하였습니다.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <AchievementCard icon={<ShieldCheck size={20}/>} title="전력판매 실적" value="1위" description="발전사 5사 중" />
                    <AchievementCard icon={<DollarSign size={20}/>} title="LNG발전 판매단가" value="1위" description="가장 저렴한 단가" />
                </div>
            </HighlightSection>

            <HighlightSection title="역대 최대 해외사업 순이익(475억 원) 달성">
                 <div className="text-md text-gray-700 leading-relaxed">
                    <p>
                        한국중부발전은 475억 원의 역대 최대 해외사업 순이익을 달성하였으며, 발전사 중 유일하게 10년 연속 200억 원 이상의 해외사업 순이익 실적을 기록하였습니다. 또한, 해외사업의 안정적인 운영을 통하여 회사의 재무 건전성을 확보하고 경영수지를 개선하였습니다.
                    </p>
                </div>
                <AchievementCard icon={<Globe size={20}/>} title="해외사업 순이익" value="475억" unit="원" description="10년 연속 200억 원 이상 달성" />
            </HighlightSection>

            <HighlightSection title="중장기 부채비율 목표 및 원가절감 흑자 달성">
                 <div className="text-md text-gray-700 leading-relaxed">
                    <p>
                        한국중부발전은 재정건전화계획을 197% 이행하고 투자관리체계를 내재화하여 부채를 지속적으로 줄이기 위하여 노력하였습니다. 그 결과, 중장기 부채비율 목표를 28.7%p 초과 달성하는 성과를 이루었습니다.
                    </p>
                </div>
                <AchievementCard icon={<Target size={20}/>} title="중장기 당기순이익" value="107%" unit="초과 달성" description="연말 순이익 1,052억 원 개선" />
            </HighlightSection>

             <HighlightSection title="연료 조달 다변화를 통한 경제성 강화">
                 <div className="text-md text-gray-700 leading-relaxed">
                    <p>
                        한국중부발전은 전략적으로 구매 포트폴리오를 구성하여 다양한 연료를 조달함으로써 리스크를 분산시키고 경제성을 강화하였습니다. 또한, 가격 최저시점을 포착하여 연료비 7,311억 원을 절감하였습니다.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <AchievementCard icon={<Fuel size={20}/>} title="연료비 절감" value="7,311억" unit="원" description="전략적 구매 포트폴리오 구성" />
                    <AchievementCard icon={<TrendingUp size={20}/>} title="LNG 직도입 누적 절감액" value="8,906억" unit="원" description="글로벌 시장 맞춤형 구매" />
                </div>
            </HighlightSection>
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
