"use client";

import React from 'react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        {children}
    </section>
);

// GRI 테이블 행을 위한 재사용 컴포넌트
const TableRow = ({ topicNo, disclosure, page, isHeader = false, isSubHeader = false }) => (
    <div className={`grid grid-cols-12 gap-4 py-2 border-b text-xs ${isHeader ? 'bg-gray-200 font-bold text-center' : ''}`}>
        <div className={`col-span-3 ${isSubHeader ? 'font-bold pl-2' : ''}`}>{topicNo}</div>
        <div className={`col-span-7 ${isSubHeader ? 'font-bold' : 'text-gray-600'}`}>{disclosure}</div>
        <div className="col-span-2 text-center">{page}</div>
    </div>
);


export default function GRIIndex2021Page() {
    const gri2Data = [
        { topicNo: '조직 및 보고 관행', disclosure: '', page: '', isSubHeader: true },
        { topicNo: '2-1', disclosure: '조직 세부 정보', page: '5' },
        { topicNo: '2-2', disclosure: '지속가능성 보고에 포함된 법인', page: '1' },
        { topicNo: '2-3', disclosure: '보고기간, 주기 및 문의처', page: '1' },
        { topicNo: '2-4', disclosure: '정보의 재작성', page: '' },
        { topicNo: '2-5', disclosure: '외부보증', page: '133-134' },
        { topicNo: '조직 활동 및 근로자', disclosure: '', page: '', isSubHeader: true },
        { topicNo: '2-6', disclosure: '활동, 조직 및 기타 사업 관계', page: '5-18' },
        { topicNo: '2-7', disclosure: '임직원', page: '5' },
        { topicNo: '2-8', disclosure: '임직원이 아닌 근로자', page: '125' },
        { topicNo: '지배구조', disclosure: '', page: '', isSubHeader: true },
        { topicNo: '2-9', disclosure: '지배구조 구조 및 구성', page: '5, 111-115' },
        { topicNo: '2-13', disclosure: '최고지배기구의 역할', page: '111-115' },
        { topicNo: '2-14', disclosure: '지속가능성 보고에 대한 최고지배기구의 역할', page: '111-115' },
        { topicNo: '전략, 정책 및 관행', disclosure: '', page: '', isSubHeader: true },
        { topicNo: '2-22', disclosure: '지속가능성 전략에 대한 성명서', page: '3-4' },
        { topicNo: '2-23', disclosure: '정책 약속', page: '11-12, 20' },
        { topicNo: '2-24', disclosure: '내재화된 정책 약속', page: '22-23' },
    ];

    const gri3Data = [
        { topicNo: '중요한 주제에 대한 경과', disclosure: '', page: '', isSubHeader: true },
        { topicNo: '3-1', disclosure: '중요 이슈 결정 프로세스', page: '29-31' },
        { topicNo: '3-2', disclosure: '중요 이슈 목록', page: '29-31' },
        { topicNo: '3-3', disclosure: '중요 이슈 관리', page: '29-31' },
    ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">GRI Standards 2021 Index</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">128</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="Universal Standard (GRI 2)">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <TableRow isHeader={true} topicNo="주제(Topic/No.)" disclosure="(Disclosure)" page="페이지" />
                        <div className="h-[60vh] overflow-y-auto">
                            {gri2Data.map((row, index) => <TableRow key={index} {...row} />)}
                        </div>
                    </div>
                </InfoSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="Universal Standard (GRI 3)">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <TableRow isHeader={true} topicNo="주제(Topic/No.)" disclosure="(Disclosure)" page="페이지" />
                        {gri3Data.map((row, index) => <TableRow key={index} {...row} />)}
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
