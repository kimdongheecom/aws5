"use client";

import React from 'react';
import { BarChart2, Zap, Users, Shield, Award, Bot, Globe } from 'lucide-react';

// next/image를 사용할 수 없는 환경을 위한 간단한 이미지 컴포넌트 대체
const Image = ({ src, alt, className }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    onError={(e) => { 
      const target = e.target as HTMLImageElement;
      target.onerror = null; 
      target.src = 'https://placehold.co/400x200/e2e8f0/94a3b8?text=Image+Not+Found'; 
    }} 
  />
);

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 조직도 박스를 위한 재사용 컴포넌트
const OrgBox = ({ title, icon, bgColor, textColor, subtext }) => (
    <div className={`p-3 rounded-lg text-center ${bgColor}`}>
        {icon && <div className={`flex justify-center mb-1 ${textColor}`}>{icon}</div>}
        <p className={`font-bold ${textColor}`}>{title}</p>
        {subtext && <p className={`text-xs mt-1 ${textColor} opacity-90`}>{subtext}</p>}
    </div>
);

// 대표 사례 카드를 위한 재사용 컴포넌트
const CaseCard = ({ icon, title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex items-center font-bold text-blue-600 mb-2">
            {icon}
            <h4 className="ml-2 text-md">{title}</h4>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);


export default function StakeholderEngagementPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">이해관계자 소통</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">25</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="소통 관리체계">
                    <h3 className="text-md font-bold text-gray-800 mt-4">소통채널 통합관리체계 구축</h3>
                    <p className="mt-1">
                        한국중부발전은 통합적인 소통채널 관리체계를 구축한 후 소통채널관리위원회를 반기별로 운영하여 국민의 의견을 수렴하고 경영 활동에 반영하고 있습니다. 기획관리본부장을 위원장으로 하는 본 위원회는 K-ESG 분과별로 구성되며, 국민의 의견 반영 여부를 책임감 있게 점검하고 있습니다. 또한 소통채널의 효과를 높이기 위하여 소통채널 신설 및 통합을 심의하는 역할을 수행하고 있습니다. 이를 통하여 다양한 이해관계자와 적극적으로 소통하여 제13회 '대한민국 SNS 대상 공기업 부문 대상'을 수상하는 성과를 이루어냈습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h3 className="text-md font-bold text-gray-800">소통채널위원회 조직도</h3>
                    <div className="mt-2 bg-gray-50 p-4 rounded-lg border space-y-3">
                        <OrgBox title="기획관리본부장 (위원장)" icon={null} subtext={null} bgColor="bg-blue-600" textColor="text-white" />
                        <OrgBox title="홍보실 (총괄조정조직)" icon={null} subtext={null} bgColor="bg-blue-200" textColor="text-blue-800" />
                        <div className="grid grid-cols-4 gap-3">
                            <OrgBox icon={<BarChart2 size={24}/>} title="K분과" subtext="미래성장" bgColor="bg-gray-200" textColor="text-gray-800" />
                            <OrgBox icon={<Zap size={24}/>} title="E분과" subtext="친환경" bgColor="bg-gray-200" textColor="text-gray-800" />
                            <OrgBox icon={<Users size={24}/>} title="S분과" subtext="사회책임" bgColor="bg-gray-200" textColor="text-gray-800" />
                            <OrgBox icon={<Shield size={24}/>} title="G분과" subtext="국민신뢰" bgColor="bg-gray-200" textColor="text-gray-800" />
                        </div>
                    </div>
                </section>

                 <InfoSection title="소통 관리체계 재정립">
                    <p>
                        한국중부발전은 국민 의견을 효과적으로 반영하기 위하여 신규 소통채널 7개를 소통채널위원회의 통합 관리체계에 편입하였으며, 기관 자체 소통지수인 'KOMIPO 소통지수'를 개발하여 운영하고 있습니다. 이를 통하여 한국중부발전의 소통의 질을 측정하고 환류활동을 강화하고 있습니다. 2023년 소통지수는 84점이었으며, 2027년과 2030년에는 각각 87점과 90점을 목표로 설정하고, 이해관계자와의 소통 품질을 높이기 위한 중장기 계획을 수립하여 운영 중에 있습니다.
                    </p>
                </InfoSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="대표 사례">
                    <div className="space-y-4 mt-2">
                        <CaseCard icon={<Award size={20} />} title="ESG위원회 주도의 ESG경영 성과와 환류체계 측정체계 구축">
                            <p>
                                한국중부발전 ESG경영의 중요성을 국민이 쉽게 이해할 수 있는 언어로 전달하는 것이 중요하다는 ESG위원회 전원의 의견을 수용하여 ESG경영 성과와 환류 가치를 측정하는 시스템을 구축하였습니다. ESG 활동으로 얻은 결과를 화폐 단위로 변환하는 계수를 적용하여 성과 규모를 정량적으로 측정하였습니다.
                            </p>
                        </CaseCard>
                        <CaseCard icon={<Bot size={20} />} title="디지털혁신추진위원회 실행력 제고를 위한 운영 강화">
                             <p>
                                한국중부발전은 정부 및 전문기관들로부터 디지털플랫폼 기반 확대 속도를 높이는 요구에 부응하기 위하여 실행력을 강화하는 한해를 이끌었습니다. 기존의 3개 분과로 운영되던 디지털혁신추진위원회를 AI빅데이터 분과, IoT·지능형 발전소 분과 등 4개 분과로 재편성하고, 디지털 혁신 실행력이 높은 과제를 발굴하였습니다.
                            </p>
                        </CaseCard>
                        <CaseCard icon={<Globe size={20} />} title="해외사업법인 사회공헌활동의 'Better Bloom'의 지속적인 글로벌 ESG경영 기반 확대">
                            <p>
                                한국중부발전 해외사업법인은 사업 대상국의 지역사회와 함께 동반하여 현지 주민의 장기적인 유대관계 형성을 중요하게 인식하고 있습니다. 이를 위하여 KOMIPO 유치원을 개원하고, 현지 주민 및 교육 당국의 지원에 직접 동참하고 있습니다.
                            </p>
                            <div className="mt-3 w-full h-32 rounded-lg overflow-hidden border">
                                <Image 
                                    src="/images/stakeholder-communication.png" 
                                    alt="이해관계자 소통 활동 이미지" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </CaseCard>
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
