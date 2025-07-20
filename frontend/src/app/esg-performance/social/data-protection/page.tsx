"use client";

import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 인증 정보 카드를 위한 재사용 컴포넌트
const CertificationCard = ({ title, subtext, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <h4 className="font-bold text-blue-600 text-md mb-2">{title}</h4>
        <p className="font-semibold text-sm text-gray-800 mb-2">{subtext}</p>
        <div className="text-xs text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

// 거버넌스 박스를 위한 재사용 컴포넌트
const GovernanceBox = ({ title, description, bgColor = 'bg-teal-100', textColor = 'text-teal-800' }) => (
    <div className={`p-3 rounded-lg text-center border ${bgColor}`}>
        <p className={`font-bold text-sm ${textColor}`}>{title}</p>
        {description && <p className={`text-xs mt-1 ${textColor} opacity-90`}>{description}</p>}
    </div>
);


export default function DataProtectionPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Social</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">106</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="정보보호">
                <h3 className="text-md font-bold text-gray-800 mt-4">관리체계</h3>
                <p className="mt-1">
                    한국중부발전은 고객의 정보 보호를 위하여 정보보호 및 개인정보보호 관리체계 인증(ISMS-P)과 '국제표준 정보보호 경영시스템 인증(ISO27001)'을 지속적으로 유지하며 공신력 있는 외부 검증기관으로부터 인정받고 있습니다. 또한, 개인정보보호법을 기준으로 수립한 자체 개인정보 처리 방침에 따라 개인정보 수집 최소화, 동의 절차 준수, 정보 암호화 등 개인정보 관리체계를 확립하였습니다.
                </p>
            </InfoSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <h3 className="text-md font-bold text-gray-800">정보보호 인증현황</h3>
                    <CertificationCard title="정보보호 및 개인정보보호 관리체계 인증(ISMS-P)" subtext="ISMS-P는 기업이 각종 위협으로부터 정보보호 및 개인정보보호를 위해 필요한 조치와 활동이 인증 기준에 적합함을 증명하는 제도입니다.">
                        <p>
                            • 한국중부발전은 2016년 개인정보보호 관리체계 인증을 취득한 이후, 2020년 정보보호 및 개인정보보호 관리체계 인증으로 전환하여 지속적으로 인증을 유지하고 있습니다.
                        </p>
                    </CertificationCard>
                     <CertificationCard title="국제표준 정보보호 경영시스템 인증(ISO27001)" subtext="ISO27001은 정보보호 경영시스템에 대한 국제표준으로, 위험 관리, 보호 대책, 접근 통제 등 총체적 관리에 관한 검증을 통하여 조직에서 구현한 정보보호 관리체계가 국제 규격에 적합함을 증명하는 제도입니다.">
                        <p>
                            • 한국중부발전은 2016년에 해당 인증을 취득하여 지속적으로 유지하고 있습니다.
                        </p>
                    </CertificationCard>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <h3 className="text-md font-bold text-gray-800">정보보안 거버넌스 체계</h3>
                    <div className="flex flex-col items-center space-y-2">
                        <GovernanceBox title="정보보안최고책임자(CISO)" description="보안정책 수립, 보안업무 총괄" />
                        <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                        <GovernanceBox title="정보보안실(팀)" description="정보보안, 개인정보보호 및 기반시설보안 업무 총괄" />
                        <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                        <GovernanceBox title="정보보안담당자(사업소)" description="정보유출 방지 및 보안 컴플라이언스 이슈 대응" />
                        <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                        <GovernanceBox title="사이버안전센터" description="24시간 365일 보안관제 수행, 사이버 공격 및 위협 방어" />
                    </div>
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
