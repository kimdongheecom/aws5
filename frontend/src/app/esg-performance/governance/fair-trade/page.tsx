"use client";

import React from 'react';
import { CheckCircle, ArrowRight, TrendingUp, Shield } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 모니터링 지표 박스를 위한 재사용 컴포넌트
const MonitoringBox = ({ title, items }) => (
    <div className="bg-teal-500 text-white p-3 rounded-lg h-full">
        <h4 className="font-bold text-center text-sm mb-2">{title}</h4>
        <ul className="space-y-1 list-disc list-inside text-xs">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

// 개선내용 카드를 위한 재사용 컴포넌트
const ImprovementCard = ({ title, items }) => (
    <div className="bg-gray-50 p-4 rounded-lg border h-full">
        <h4 className="font-bold text-blue-600 text-md mb-3">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, index) => (
                 <li key={index} className="flex items-start text-xs">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

// 성과 카드를 위한 재사용 컴포넌트
const StatCard = ({ title, value, subValue, description, icon }) => (
    <div className="bg-gray-50 p-4 rounded-lg border text-center">
        <h4 className="font-semibold text-gray-800 text-sm mb-2">{title}</h4>
        <p className="text-3xl font-bold text-teal-600">{value}</p>
        {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
        <div className="flex items-center justify-center mt-3 text-xs font-semibold text-blue-600 bg-blue-100 p-2 rounded">
            {icon}
            <span className="ml-2">{description}</span>
        </div>
    </div>
);


export default function FairTradePage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Governance</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">117</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="공정거래">
                    <h3 className="text-md font-bold text-gray-800 mt-4">효율적 계약제도 운영</h3>
                    <p className="mt-1">
                        한국중부발전은 효율적인 계약제도 유지를 위하여 계약추진 단계에서부터 계약이행 단계, 사후관리 단계까지 단계별 프로세스를 구축하고 고도화하고 있습니다. 모니터링을 통하여 운영 중인 계약제도에 대한 미비점을 발굴하고, 개선하는 피드백 체계를 갖추고 있습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h3 className="text-md font-bold text-gray-800">모니터링 지표</h3>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        <MonitoringBox title="계약추진 단계" items={['민·관 합작에 의한 수의계약률', '이행보증 대상 계약 건수']} />
                        <MonitoringBox title="계약이행 단계" items={['선금지급률 및 지급금액', '하도급대금 연체 이행률']} />
                        <MonitoringBox title="사후관리 단계" items={['실적평가, 피드백의 질', '2차 기업 수혜 건수']} />
                    </div>
                </section>

                <section>
                    <h3 className="text-md font-bold text-gray-800">주요 개선내용</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <ImprovementCard 
                            title="계약투명성 제고 및 청렴도 향상"
                            items={['수의계약내역 내부고객 확대', '이행보증 방지 대상 양적완화']}
                        />
                         <ImprovementCard 
                            title="중소기업 채무 유동성 지원"
                            items={['ERP 개선으로 대금 행정처리 간소화', '하도급대금 연체방지 절차 전사 교육']}
                        />
                         <ImprovementCard 
                            title="하수급인 대금 체불 방지"
                            items={['선금의무 및 상생결제 대상 1,047개 이상 증가']}
                        />
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="추진성과">
                    <p>
                        2023년 주요 개선과제는 수의계약률 감축을 위한 내부 교육 강화, 하도급지킴이 및 상생결제 확대를 위한 약정은행 추가 발굴, 선금행정처리 간소화 등이 있습니다. 주요 개선과정을 집중적으로 관리한 결과, 수의계약률 2.8%p 감축, 선금지급률 2.7%p 상승, 하도급지킴이 이용금액 49억 원 증가 등의 성과를 달성하였습니다.
                    </p>
                </InfoSection>

                <div className="grid grid-cols-2 gap-6">
                    <StatCard 
                        title="계약투명성 제고 및 청렴도 향상"
                        value="2.8%p"
                        subValue="수의계약률"
                        description="이행보증 대상 계약 건수 ZERO"
                        icon={<Shield size={16} />}
                    />
                    <StatCard 
                        title="중소기업 채무 유동성 지원"
                        value="2.7%p"
                        subValue="선금지급률"
                        description="납품대금 연체 이행률 100%"
                        icon={<TrendingUp size={16} />}
                    />
                </div>
                 <div className="grid grid-cols-2 gap-6">
                    <StatCard 
                        title="하수급인 대금 체불 방지"
                        value="2차 기업"
                        subValue="상생결제"
                        description="하도급지킴이 이용금액 49억 증가"
                        icon={<CheckCircle size={16} />}
                    />
                </div>
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
