"use client";

import React from 'react';
import { Check } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children, titleSize = 'text-xl' }) => (
    <section>
        <h2 className={`${titleSize} font-bold text-gray-800`}>{title}</h2>
        <div className="mt-3 text-gray-700 leading-relaxed text-sm space-y-3">
            {children}
        </div>
    </section>
);

// 리스트 아이템을 위한 재사용 컴포넌트
const ListItem = ({ children }) => (
    <li className="flex items-start">
        <span className="text-blue-500 mr-2 mt-1 shrink-0">•</span>
        <span>{children}</span>
    </li>
);


export default function ThirdPartyVerificationPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">제3자 검증의견서</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">133</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
            <div className="text-left mb-8">
                <h2 className="text-lg font-bold text-gray-800">2023 한국중부발전 지속가능경영보고서 독자 귀하</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-6">
                    <InfoSection title="서문">
                        <p>
                            한국인증원(KMR)은 2023 한국중부발전 지속가능경영보고서(이하 "보고서")의 제3자 검증을 요청받았습니다. 보고서 작성과 정보에 대한 책임은 한국중부발전 경영자에게 있으며, 한국인증원의 책임은 계약 및 협의된 업무를 준수하고 검증의견서를 발급하는 데 있습니다.
                        </p>
                    </InfoSection>
                    
                    <InfoSection title="검증 범위 및 기준">
                        <p>
                            검증원은 보고서에서 보고하고 있는 지속가능성과 관련한 조직의 성과와 활동에 대해 기술하고 있습니다. 검증팀은 국제적 검증기준인 AA1000AS v3 및 KMR 검증 기준인 SRV1000을 적용하였으며, Type 1 방법 및 Moderate 수준의 보증 형태로 검증을 수행하였습니다.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg border text-xs">
                            <p className="font-semibold mb-2">GRI Standards 2021 보고 원칙</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>포괄성(Universal Standards)</li>
                                <li>특정주제 표준(Topic Specific Standards)</li>
                                <li>GRI 205: 반부패(Anti-corruption)</li>
                                <li>GRI 302: 에너지(Energy)</li>
                                <li>GRI 305: 배출(Emissions)</li>
                                <li>GRI 403: 산업 보건 및 안전(Occupational Health and Safety)</li>
                            </ul>
                        </div>
                    </InfoSection>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <InfoSection title="검증방법">
                        <p>
                            한국중부발전은 검증원의 검증 협의된 검증 범위에 대해 상기 기술된 검증기준에 따라 검증하기 위해 아래와 같이 검증을 진행하였습니다.
                        </p>
                        <ul className="space-y-1 text-sm">
                            <ListItem>보고서에 담긴 내용에 대한 전반적인 검토</ListItem>
                            <ListItem>중대성 평가 방법 및 결과 검토</ListItem>
                            <ListItem>지속가능경영 전략 및 성과정보 시스템 프로세스 평가</ListItem>
                            <ListItem>보고서 작성에 대해 책임 있는 담당자와의 인터뷰</ListItem>
                            <ListItem>보고서 성과정보에 대한 신뢰성 평가, 데이터샘플링</ListItem>
                        </ul>
                    </InfoSection>

                    <InfoSection title="제한사항 및 극복방안">
                        <p>
                            검증은 한국중부발전에서 제공한 데이터 및 정보가 완전하고 충분하다는 가정을 기반으로 실시되었습니다. 데이터 검증은 한국중부발전에서 수집한 데이터에 대한 질의 및 분석, 제한된 형태의 표본추출방식을 통해 한정된 범위에서 실시되었습니다.
                        </p>
                    </InfoSection>

                     <InfoSection title="검증결과 및 의견">
                        <p>
                            검증원은 문서검토 및 인터뷰 등의 결과를 토대로 보고서에 수록된 데이터에 대해 여러 차례 논의하였으며 수정 및 개선권고 사항 반영을 확인하기 위해 보고서의 최종판을 검토하였습니다. 검증결과, 한국중부발전은 GRI Standards 2021 외 보고범위에 따라 작성되었으며, AA1000AP(2018)에서 제시하고 있는 원칙 준수와 관련하여 부적합한 부분을 발견할 수 없었습니다.
                        </p>
                    </InfoSection>
                </div>
            </div>
             <p className="text-xs text-gray-600 mt-8">
                보고서의 보고범위 중 외부 조직, 즉, 한국중부발전의 협력기업, 계약자 등에 대한 데이터와 정보는 검증범위에서 제외되었습니다.
            </p>
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
