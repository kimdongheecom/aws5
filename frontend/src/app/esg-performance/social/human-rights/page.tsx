"use client";

import React from 'react';
import { CheckCircle, MessageSquare, Shield, Scale } from 'lucide-react';

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
const GridItem = ({ title, items, icon, bgColor = 'bg-gray-50', textColor = 'text-gray-800' }: {
    title?: string;
    items?: string[];
    icon?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
}) => (
    <div className={`p-4 rounded-lg h-full ${bgColor} border`}>
        <div className="flex flex-col items-center text-center mb-3">
            {icon && <div className="text-blue-600 mb-2">{icon}</div>}
            {title && <h4 className={`font-bold text-sm ${textColor}`}>{title}</h4>}
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


export default function HumanRightsPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Social</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">72</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="인권보호">
                <h3 className="text-md font-bold text-gray-800 mt-4">추진전략</h3>
                <p className="mt-1">
                    한국중부발전은 '인간존중의 가치를 실현하는 글로벌 리더'라는 인권경영 비전을 달성하기 위하여 중장기 로드맵을 수립하였습니다. 2023년까지 인권 취약분야에 집중하여 인권침해를 예방함으로써 인권경영을 내재화하고, 2024~2025년에는 임직원 중심의 인권존중 마인드를 확립하기 위하여 인권경영을 고도화할 예정입니다.
                </p>
            </InfoSection>

            <section>
                <h3 className="text-md font-bold text-gray-800 mb-4">인권경영 전략체계</h3>
                <div className="space-y-4">
                    <StrategyRow label="비전">
                        <div className="bg-teal-600 text-white font-semibold text-center p-3 rounded-lg h-full flex items-center justify-center">
                            인간존중의 가치를 실현하는 글로벌 리더
                        </div>
                    </StrategyRow>
                    
                    <StrategyRow label="로드맵">
                         <div className="grid grid-cols-3 gap-2">
                            <div className="bg-teal-100 text-teal-800 font-semibold text-center p-3 rounded-lg">~2023 (내재화)<br/>취약분야 집중 인권침해 예방</div>
                            <div className="bg-teal-200 text-teal-900 font-semibold text-center p-3 rounded-lg">2024~2025 (고도화)<br/>임직원 인권존중 마인드 확립</div>
                            <div className="bg-teal-300 text-teal-900 font-semibold text-center p-3 rounded-lg">2026~ (선진화)<br/>인권보호 시스템 고도화</div>
                        </div>
                    </StrategyRow>

                    <StrategyRow label="추진과제">
                        <div className="grid grid-cols-3 gap-4">
                           <GridItem items={['전사적 CEO 인권경영 의지 선포', '맞춤형 인권 침해 직무 스트레스 관리 프로그램 수립', '상하급자간 소통을 위한 프로그램 시행']} />
                           <GridItem items={['이해관계자별 맞춤형 인권 실태조사 신규 시행', '소식지 및 소통 공감 가이드라인 제작 및 배포', '정기적인 실태조사 시 갑질 및 이슈 점검']} />
                           <GridItem items={['인권경영시스템 인증 유지', '특별상담·신고기간 운영 및 사후 재발방지', '내부통제 강화를 통한 갑질예방 확대']} />
                        </div>
                    </StrategyRow>

                    <StrategyRow label="신고채널">
                        <div className="grid grid-cols-3 gap-4">
                            <GridItem icon={<MessageSquare size={28} />} title="[내부] 파랑새 봉투" bgColor="bg-gray-100" />
                            <GridItem icon={<Shield size={28} />} title="[외부] 레드휘슬" bgColor="bg-gray-100" />
                            <GridItem icon={<Scale size={28} />} title="[대외] 인권상담 변호사" bgColor="bg-gray-100" />
                        </div>
                    </StrategyRow>
                    
                     <StrategyRow label="추진실적">
                        <div className="grid grid-cols-3 gap-4">
                           <GridItem items={['인권경영평가', '갑질실태조사']} />
                           <GridItem items={['인권경영시스템 인증', '인권영향평가 심의 정도']} />
                           <GridItem items={['온라인 인권지수(KHIX*)']} />
                        </div>
                    </StrategyRow>

                    <StrategyRow label="중점추진과제">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-teal-500 text-white font-semibold text-center p-3 rounded-lg">취약분야 집중관리</div>
                            <div className="bg-teal-500 text-white font-semibold text-center p-3 rounded-lg">인권 콘텐츠 수준 향상</div>
                            <div className="bg-teal-500 text-white font-semibold text-center p-3 rounded-lg">인권영향평가 인프라 구축</div>
                        </div>
                    </StrategyRow>
                </div>
            </section>
        </main>
        
        {/* 주석 영역 추가 */}
        <footer className="pt-6 border-t border-gray-200 mt-8 shrink-0">
            <h4 className="font-semibold text-gray-700 mb-2">주석</h4>
            <p className="text-sm text-gray-600">
              * Komipo Ethics & Human rights IndeX
            </p>
        </footer>
      </div>
    </div>
  );
}
