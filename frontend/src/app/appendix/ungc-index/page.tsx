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

// UNGC 테이블 행을 위한 재사용 컴포넌트
const TableRow = ({ category, principle, page, isHeader = false, isSubHeader = false }) => (
    <div className={`grid grid-cols-12 gap-4 py-3 border-b text-sm ${isHeader ? 'bg-gray-200 font-bold text-center' : ''}`}>
        <div className={`col-span-3 font-bold flex items-center ${isSubHeader ? 'pl-4' : 'justify-center'}`}>{category}</div>
        <div className={`col-span-7 ${isSubHeader ? 'text-gray-700' : 'font-semibold'}`}>{principle}</div>
        <div className="col-span-2 text-center text-gray-600">{page}</div>
    </div>
);


export default function UNGCIndexPage() {
    const ungcData = [
        { category: '인권 (Human Rights)', principle: '원칙 1. 기업은 국제적으로 선언된 인권 보호를 지지하고 존중해야 한다', page: '72-82', isSubHeader: true },
        { category: '', principle: '원칙 2. 기업은 인권 침해에 연루되지 않도록 적극 노력한다', page: '72-82', isSubHeader: true },
        { category: '노동규칙 (Labor Standards)', principle: '원칙 3. 기업은 결사의 자유와 단체교섭권의 실질적인 인정을 지지하고', page: '92-96', isSubHeader: true },
        { category: '', principle: '원칙 4. 모든 형태의 강제노동을 배제하여야', page: '92-96', isSubHeader: true },
        { category: '', principle: '원칙 5. 아동노동을 효율적으로 철폐하고', page: '-', isSubHeader: true },
        { category: '', principle: '원칙 6. 고용 및 업무에서 차별을 철폐한다', page: '92-96', isSubHeader: true },
        { category: '환경 (Environmental)', principle: '원칙 7. 기업은 환경문제에 대한 예방적 접근을 지지하고', page: '59-70', isSubHeader: true },
        { category: '', principle: '원칙 8. 환경적 책임을 증진하는 조치를 수행하며', page: '59-70', isSubHeader: true },
        { category: '', principle: '원칙 9. 환경친화적 기술의 개발과 확산을 촉진한다', page: '59-70', isSubHeader: true },
        { category: '반부패 (Anti-Corruption)', principle: '원칙 10. 기업은 부당취득 및 뇌물 등을 포함하는 모든 형태의 부패에 반대한다', page: '50-56', isSubHeader: true },
    ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">UN Global Compact Index</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">129</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
            <InfoSection title="">
                <p>
                    한국중부발전은 UN Global Compact 인권, 노동, 환경, 반부패 4대 분야의 10가지 원칙을 준수하며 인권 보호, 부정적인 노동 관행 철폐, 환경 보호, 반부패 실현을 위한 노력을 지속하고 있습니다.
                </p>
            </InfoSection>

            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
                <TableRow isHeader={true} category="구분" principle="원칙" page="페이지" />
                <div className="h-[60vh] overflow-y-auto">
                    {ungcData.map((row, index) => <TableRow key={index} {...row} />)}
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
