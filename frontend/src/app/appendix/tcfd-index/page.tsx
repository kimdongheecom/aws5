"use client";

import React from 'react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// TCFD 테이블 행을 위한 재사용 컴포넌트
const TableRow = ({ category, recommendation, page, isHeader = false, isSubHeader = false }) => (
    <div className={`grid grid-cols-12 gap-4 py-3 border-b text-sm ${isHeader ? 'bg-gray-200 font-bold text-center' : ''}`}>
        <div className={`col-span-2 font-bold flex items-center ${isSubHeader ? 'pl-4' : 'justify-center'}`}>{category}</div>
        <div className={`col-span-8 ${isSubHeader ? 'text-gray-700' : 'font-semibold'}`}>{recommendation}</div>
        <div className="col-span-2 text-center text-gray-600">{page}</div>
    </div>
);


export default function TCFDIndexPage() {
    const tcfdData = [
        { category: '지배구조', recommendation: 'a) 기후변화 관련 위험과 기회에 대한 이사회의 감독 설명', page: '32-33', isSubHeader: true },
        { category: '', recommendation: 'b) 기후변화 관련 위험과 기회를 평가하고 관리하는 경영진의 역할 설명', page: '', isSubHeader: true },
        { category: '전략', recommendation: 'a) 단기, 중기 및 장기적 측면의 기후변화 관련 위험과 기회 설명', page: '32, 34-36', isSubHeader: true },
        { category: '', recommendation: 'b) 기후변화 위험과 기회가 조직의 사업, 전략 및 재무 계획에 미치는 영향 설명', page: '', isSubHeader: true },
        { category: '', recommendation: 'c) 2℃ 이하의 시나리오를 포함하여 다양한 기후변화 관련 시나리오를 고려한 전략의 회복 탄력성 설명', page: '', isSubHeader: true },
        { category: '위험관리', recommendation: 'a) 기후변화 관련 위험을 식별하고 평가하기 위한 조직의 프로세스 설명', page: '32, 41', isSubHeader: true },
        { category: '', recommendation: 'b) 기후변화 관련 위험을 관리하기 위한 조직의 프로세스 설명', page: '', isSubHeader: true },
        { category: '', recommendation: 'c) 기후변화 관련 위험을 식별, 평가 및 관리하는 프로세스가 조직의 전반적인 위험 관리에 통합되는 방식 설명', page: '', isSubHeader: true },
        { category: '지표와 감축목표', recommendation: 'a) 조직의 전략 및 위험관리 프로세스에 따라 기후변화와 관련된 위험과 기회를 평가하기 위해 사용한 지표', page: '32, 41', isSubHeader: true },
        { category: '', recommendation: 'b) Scope 1, Scope 2, 그리고 해당되는 경우 Scope 3 온실가스 배출량 및 관련 위험', page: '', isSubHeader: true },
        { category: '', recommendation: 'c) 기후변화 관련 위험, 기회 및 목표 성과를 관리하기 위하여 조직이 사용하는 목표', page: '', isSubHeader: true },
    ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">TCFD Index</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">130</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
            <InfoSection title="">
                <p>
                    한국중부발전은 TCFD(기후변화 관련 재무정보 공개 협의체, Task Force on Climate-related Financial Disclosures)에 따라 기후변화 관련 정보를 투명하게 보고하고 있습니다. TCFD는 2015년에 금융안정위원회(FSB)가 설립한 국제 협의체로, 기업의 기후 관련 정보를 자발적으로 공개하여 투자, 신용, 보험 결정에 도움을 주기 위하여 2017년에 관련 권고안을 제시하였습니다. 한국중부발전은 TCFD 권고안을 준수하고 환경정보를 투명하게 공개하여 지구 온난화 방지를 위한 글로벌 노력에 동참하고 있습니다.
                </p>
            </InfoSection>

            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
                <TableRow isHeader={true} category="TCFD 권고안" recommendation="" page="페이지" />
                <div className="h-[60vh] overflow-y-auto">
                    {tcfdData.map((row, index) => <TableRow key={index} {...row} />)}
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
