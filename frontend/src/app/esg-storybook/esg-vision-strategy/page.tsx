"use client";

import React from 'react';
import { Leaf, Users, Scale, CheckCircle, TrendingUp, Award, Target } from 'lucide-react';

// 정보 박스를 위한 재사용 컴포넌트
const InfoBox = ({ label, content, isTitle = false, bgColor = 'bg-blue-600', textColor = 'text-white' }) => (
    <div className={`flex items-center p-3 rounded-lg ${bgColor}`}>
        <div className={`font-bold w-20 shrink-0 ${textColor}`}>{label}</div>
        <div className={`font-semibold flex-grow text-center ${textColor} ${isTitle ? 'text-lg' : 'text-md'}`}>{content}</div>
    </div>
);

// 전략 목표 카드를 위한 재사용 컴포넌트
const ObjectiveCard = ({ icon, title }) => (
    <div className="bg-gray-100 p-4 rounded-lg text-center h-full flex flex-col items-center justify-center">
        <div className="text-blue-600 mb-2">{icon}</div>
        <p className="font-bold text-gray-800">{title}</p>
    </div>
);

// 전략 과제 항목을 위한 재사용 컴포넌트
const StrategyItem = ({ text }) => (
    <li className="flex items-start text-sm">
        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
        <span>{text}</span>
    </li>
);

export default function EsgVisionStrategyPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">ESG 비전 및 전략</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">20</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <section>
                <h2 className="text-xl font-bold text-gray-800">ESG경영 추진전략</h2>
                <p className="mt-2 text-gray-700 leading-relaxed text-sm">
                    한국중부발전은 '미래가치를 창출하는 ESG경영 리더'라는 비전 아래 글로벌 ESG경영 선도를 위한 2025년 중장기 ESG경영 추진 로드맵을 수립하였습니다. 특히, 환경(E), 사회(S), 지배구조(G) 각 영역별로 전략적인 목표를 수립하고 12개의 전략과제를 설정하여 실행력을 높이고 있습니다. 이를 통하여 친환경 에너지 사업의 글로벌 리더십을 발휘하고, 포용과 상생을 기반으로 한 지속가능한 사회 공동체를 형성하며 투명한 경영을 통하여 대국민의 공감을 얻는 ESG경영을 실현해나가고자 합니다.
                </p>
            </section>

            <section className="space-y-3">
                 <h3 className="text-lg font-bold text-gray-800 mb-2">ESG경영 추진체계</h3>
                 <InfoBox label="ESG 비전" content="미래가치를 창출하는 ESG경영 리더" />
                 <InfoBox label="ESG 목표" content="KOMIPO형 ESG 지수 최우수등급 달성" />
                 <InfoBox label="슬로건" content='"THINK TOMORROW, ESG LEADER!"' isTitle={true} />
            </section>
            
            <section>
                <h3 className="text-lg font-bold text-gray-800 mb-4">로드맵</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="font-bold text-blue-800">2022</p>
                        <p className="text-sm mt-1">정립기</p>
                        <p className="font-semibold text-blue-700 mt-2">ESG경영 구현체계 정립</p>
                    </div>
                     <div className="bg-blue-200 p-4 rounded-lg">
                        <p className="font-bold text-blue-900">2023</p>
                        <p className="text-sm mt-1">확산기</p>
                        <p className="font-semibold text-blue-800 mt-2">ESG경영 체계 고도화</p>
                    </div>
                     <div className="bg-blue-300 p-4 rounded-lg">
                        <p className="font-bold text-blue-900">2025</p>
                        <p className="text-sm mt-1">정착기</p>
                        <p className="font-semibold text-blue-800 mt-2">글로벌 ESG 선도</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-800 mb-4">전략목표</h3>
                <div className="grid grid-cols-3 gap-6">
                    <ObjectiveCard icon={<Leaf size={32} />} title="친환경 기반의 미래에너지 선도" />
                    <ObjectiveCard icon={<Users size={32} />} title="사람 중심의 지속가능 공동체 구현" />
                    <ObjectiveCard icon={<Scale size={32} />} title="투명경영을 통한 국민신뢰 제고" />
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-800 mb-4">전략과제</h3>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-center text-green-600 mb-3">Environmental</h4>
                        <ul className="space-y-2">
                            <StrategyItem text="국내외 재생에너지 신사업 확대" />
                            <StrategyItem text="온실가스 감축체계 강화" />
                            <StrategyItem text="친환경 설비 및 연료 종합관리 구축" />
                        </ul>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-center text-orange-600 mb-3">Social</h4>
                        <ul className="space-y-2">
                            <StrategyItem text="안전중심 책임안전 관리체계 강화" />
                            <StrategyItem text="인간·혁신중심 상생협력 생태계 조성" />
                            <StrategyItem text="가치를 같이하는 인권경영 실현" />
                            <StrategyItem text="소통과 공존의 조직문화 구현" />
                        </ul>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-center text-sky-600 mb-3">Governance</h4>
                        <ul className="space-y-2">
                            <StrategyItem text="지배구조 및 ESG 목표 관리 강화" />
                            <StrategyItem text="글로벌 수준 윤리경영 실현" />
                            <StrategyItem text="내부통제 강화로 경영 리스크 최소화" />
                            <StrategyItem text="투명성 제고로 이해관계자 신뢰 확보" />
                        </ul>
                    </div>
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
