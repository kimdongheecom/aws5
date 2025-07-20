"use client";

import React from 'react';
import { Shield, BarChart, Award, CheckCircle } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 시스템 박스를 위한 재사용 컴포넌트
const SystemBox = ({ title, bgColor, textColor, isSmall = false }) => (
    <div className={`text-center rounded-md border ${bgColor} ${isSmall ? 'p-2 text-xs' : 'p-3 font-semibold'}`}>
        <p className={textColor}>{title}</p>
    </div>
);

// 성과 카드를 위한 재사용 컴포넌트
const StatCard = ({ value, label, year, bgColor = 'bg-teal-500', textColor = 'text-white' }) => (
    <div className={`p-4 rounded-lg text-center ${bgColor}`}>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        <p className={`text-sm font-semibold mt-1 ${textColor}`}>{label}</p>
        <p className={`text-xs mt-2 ${textColor} opacity-80`}>{year}</p>
    </div>
);

// 타임라인 아이템을 위한 재사용 컴포넌트
const TimelineItem = ({ year, title, description, highlight = false }: {
    year: string;
    title: string;
    description?: string;
    highlight?: boolean;
}) => (
    <div className={`p-3 rounded-lg border ${highlight ? 'bg-teal-100 border-teal-300' : 'bg-gray-100 border-gray-200'}`}>
        <p className={`font-bold ${highlight ? 'text-teal-700' : 'text-gray-600'}`}>{year}</p>
        <p className={`font-semibold text-sm mt-1 ${highlight ? 'text-teal-800' : 'text-gray-800'}`}>{title}</p>
        {description && <p className="text-xs mt-1 text-gray-500">{description}</p>}
    </div>
);


export default function CustomerSatisfactionPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Social</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">109</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="고객만족">
                    <h3 className="text-md font-bold text-gray-800 mt-4">리스크 관리</h3>
                    <p className="mt-1">
                        한국중부발전은 전력 계통에 지속적이고 안정적인 전력 공급을 위하여 발전설비 예측진단시스템을 개선하여 발전소의 운전정보를 열람하고, 데이터 분석과 원격 감시 기능을 통하여 발전설비 리스크를 관리하고 있습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h3 className="text-md font-bold text-gray-800">리스크 관리 시스템</h3>
                    <div className="mt-2 bg-gray-50 p-4 rounded-lg border space-y-3">
                        <SystemBox title="예측진단시스템" bgColor="bg-teal-600" textColor="text-white" />
                        <div className="grid grid-cols-4 gap-3">
                            <SystemBox title="SmartPAM I" bgColor="bg-teal-200" textColor="text-teal-800" />
                            <SystemBox title="SmartPIS" bgColor="bg-teal-200" textColor="text-teal-800" />
                            <SystemBox title="SmartEWS" bgColor="bg-teal-200" textColor="text-teal-800" />
                            <SystemBox title="SmartEMS" bgColor="bg-teal-200" textColor="text-teal-800" />
                        </div>
                        <SystemBox title="SmartPAM II 응용시스템" bgColor="bg-gray-200" textColor="text-gray-800" />
                        <div className="grid grid-cols-4 gap-2">
                            <SystemBox title="가동지원시스템" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="영상감시시스템" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="업무용무인기" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="석탄회감시시스템" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="진동분석시스템" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="보일러튜브감시" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="수처리감시시스템" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                            <SystemBox title="환경설비감시시스템" bgColor="bg-white" textColor="text-gray-700" isSmall={true} />
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-6">
                    <StatCard value="16" label="고장 건수" year="2023" />
                    <StatCard value="29" label="고장 미발생 발전기 수" year="2023" bgColor="bg-teal-600" />
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="주요 성과">
                    <h3 className="text-md font-bold text-gray-800 mt-4">중대고장 예방 및 고장정지 관리</h3>
                    <p className="mt-1">
                        한국중부발전은 중대고장 예방을 위해 중기·장기 정비계획을 집중 관리하여 2015년부터 2023년 사이 9년 연속 중대고장 총 0건을 달성하였습니다. 발전설비 운영기술을 고도화하여 3년 연속 고장정지율이 감소하였으며, 2023년에는 발전 5개사 중 고장정지율 1위를 달성하였습니다.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <StatCard value="0.042%" label="3년 연속 고장정지율 감소" year="(2021-2023)" bgColor="bg-gray-100" textColor="text-gray-800" />
                        <StatCard value="0건" label="9년 연속 중대고장 제로화" year="최대 0건" bgColor="bg-gray-100" textColor="text-gray-800" />
                    </div>
                </InfoSection>

                <InfoSection title="품질경영시스템(ISO9001) 취득">
                    <p>
                        품질경영시스템(ISO9001)은 국제표준화기구(ISO)에서 제정한 품질경영에 관한 국제규격으로, 제품 및 서비스에 이르는 전 생산 과정에 걸친 품질보증체계를 의미하며, 이해관계자의 요구와 기대를 충족시키기 위하여 품질 목표와 관련된 성과를 체계적으로 관리하여 조직의 시스템을 개선시키는 데 목적이 있습니다.
                    </p>
                </InfoSection>

                <section>
                    <h3 className="text-md font-bold text-gray-800">품질경영시스템(ISO9001) 취득 현황</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <TimelineItem year="2004. 9. 7." title="품질경영시스템(ISO9001) 최초 획득" />
                        <TimelineItem year="2022. 9. 7." title="품질경영시스템(ISO9001) 전환 인증" />
                        <TimelineItem year="2023. 9. 7." title="품질경영시스템(ISO9001) 사후심사" highlight={true} />
                    </div>
                </section>
                 <section>
                    <h3 className="text-md font-bold text-gray-800">2024년 품질경영시스템 운영 계획</h3>
                    <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border">
                        <p className="font-semibold">· 품질 목표 및 관리 계획 수립 (1월 ~ 3월)</p>
                        <p className="font-semibold text-gray-500 pl-4">↳ 내부심사 준비 (4월 ~ 5월)</p>
                        <p className="font-semibold text-gray-400 pl-8">↳ 보증/인증, 절차서 지침서 정비 (6월 ~ 9월)</p>
                        <p className="font-semibold text-gray-300 pl-12">↳ 품질경영시스템 사후심사 (9월)</p>
                    </div>
                </section>
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
