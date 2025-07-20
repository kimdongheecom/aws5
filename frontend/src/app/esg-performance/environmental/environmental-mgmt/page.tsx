"use client";

import React from 'react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 전략 체계 박스를 위한 재사용 컴포넌트
const StrategyBox = ({ label, content, subContent, bgColor, textColor, labelBgColor, labelTextColor, isLarge=false }: {
    label: string;
    content: string;
    subContent?: string;
    bgColor: string;
    textColor: string;
    labelBgColor?: string;
    labelTextColor?: string;
    isLarge?: boolean;
}) => (
    <div className={`flex items-center p-3 rounded-lg ${bgColor}`}>
        <div className={`font-bold w-24 shrink-0 text-center ${labelBgColor ? `p-2 rounded ${labelBgColor}` : ''}`}>
            <span className={labelTextColor}>{label}</span>
        </div>
        <div className={`flex-grow text-center ${textColor}`}>
            <p className={`font-semibold ${isLarge ? 'text-lg' : 'text-md'}`}>{content}</p>
            {subContent && <p className="text-sm opacity-90">{subContent}</p>}
        </div>
    </div>
);

// 그리드 아이템을 위한 재사용 컴포넌트
const GridItem = ({ title, subtext, bgColor = 'bg-gray-100', textColor = 'text-gray-800' }: {
    title: string;
    subtext?: string;
    bgColor?: string;
    textColor?: string;
}) => (
    <div className={`p-3 rounded-lg text-center h-full flex flex-col justify-center ${bgColor}`}>
        <p className={`font-bold text-sm ${textColor}`}>{title}</p>
        {subtext && <p className={`text-xs mt-1 ${textColor} opacity-80`}>{subtext}</p>}
    </div>
);


export default function EnvironmentalMgmtPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Environmental</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">59</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="환경경영">
                <h3 className="text-md font-bold text-gray-800 mt-4">추진전략</h3>
                <p className="mt-1">
                    한국중부발전은 대내외 환경변화에 대응하고, "세계적 수준의 친환경 에너지 전문기업"을 달성하기 위하여 중장기 환경경영전략(ECO-KOMIPO 2030)을 재수립하였습니다. 2050 탄소중립 목표에 기반하여 4대 전략방향과 환경경영방침을 고려한 9개의 목표를 설정하고, 이를 실현하기 위하여 12개의 전략과제를 선정하였습니다.
                </p>
            </InfoSection>

            <section>
                <h3 className="text-md font-bold text-gray-800 mb-4">환경경영 전략체계</h3>
                <div className="space-y-2">
                    <StrategyBox label="미션" content="친환경 에너지의 안전하고 현명한 공급을 통하여 국가발전과 국민 삶의 질 개선에 기여한다" bgColor="bg-blue-600" textColor="text-white" />
                    <StrategyBox label="비전" content="친환경으로 미래를 여는 에너지 전문기업" subContent="Green Energy Leader Creating a Clean Tomorrow" bgColor="bg-blue-500" textColor="text-white" isLarge={true} />
                    <StrategyBox label="환경방침" content="깨끗한 에너지로 국민이 신뢰하는 지속가능한 발전회사 구현" bgColor="bg-gray-200" textColor="text-gray-800" />
                    <StrategyBox label="추진목표" content="2050 탄소중립 달성" bgColor="bg-gray-300" textColor="text-gray-900" isLarge={true} />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-2">
                    <GridItem title="지속가능경영체계 고도화" subtext="Toughen sustainable future of KOMIPO" bgColor="bg-blue-100" textColor="text-blue-800" />
                    <GridItem title="탄소 감축사업 확대" subtext="Reinforce mechanism for carbon neutral" bgColor="bg-blue-100" textColor="text-blue-800" />
                    <GridItem title="환경오염 배출 제로화" subtext="Ultimate zero of pollutant discharge" bgColor="bg-blue-100" textColor="text-blue-800" />
                    <GridItem title="상생 포용 환경경영 구현" subtext="Strengthen cohabitation & engagement" bgColor="bg-blue-100" textColor="text-blue-800" />
                </div>

                <div className="grid grid-cols-6 gap-2 mt-4 text-xs font-semibold">
                    <div className="col-span-6 text-center bg-gray-200 p-2 rounded-lg font-bold text-sm">12대 전략과제</div>
                    <GridItem title="탄소중립 체질 구축" />
                    <GridItem title="에너지 전환" />
                    <GridItem title="탄소경영 역량 강화" />
                    <GridItem title="환경오염물질 저감" />
                    <GridItem title="환경설비 상생협력 강화" />
                    <GridItem title="유해화학물질 제로화" />
                    <GridItem title="탄소흡수원 적용 확대" />
                    <GridItem title="KOMIPO 환경브랜드 경쟁력 강화" />
                    <GridItem title="온실가스 외부 감축사업 다각화" />
                    <GridItem title="이해관계자 맞춤형 소통" />
                    <GridItem title="임직원 비즈니스 모델 확산" />
                    <GridItem title="자원순환 경제사회 전환" />
                </div>

                 <div className="grid grid-cols-6 gap-2 mt-4 text-xs">
                    <div className="col-span-6 text-center bg-gray-200 p-2 rounded-lg font-bold text-sm">환경경영 활동</div>
                    <GridItem title="기후변화 대응 노력" subtext="기후변화에 대응하여 신기술 개발과 저탄소 전원 확보에 앞장서며 온실가스 감축을 위해 노력" />
                    <GridItem title="환경규제 선제적 대응" subtext="국내외 환경법규 강화에 중점을 두고 사업장별 환경관리 기준을 설정하여 환경경영을 최소화" />
                    <GridItem title="녹색경영 지속적 추진" subtext="전 직원에 대한 녹색경영 교육을 실시하고 사업활동에서 환경성과를 개선" />
                    <GridItem title="자원 순환 발전소(3R 제도)" subtext="(Reduce), 재이용(Reuse), 재활용(Recycle)을 적극 추진하여 자원순환형 발전소 구현" />
                    <GridItem title="자원·에너지 효율적 이용" subtext="자원·에너지 원단위 개선 목표를 설정하고 자원과 에너지의 효율적 이용에 적극 노력" />
                    <GridItem title="이해관계자 신뢰 구축" subtext="환경경영 관련 정보를 이해관계자에게 투명하게 공개하여 사회적 책임을 다함" />
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
