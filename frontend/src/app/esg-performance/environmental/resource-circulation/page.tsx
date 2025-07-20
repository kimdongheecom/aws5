"use client";

import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 정보 박스를 위한 재사용 컴포넌트
const InfoBox = ({ title, items, bgColor = 'bg-gray-50', borderColor = 'border-gray-200' }) => (
    <div className={`p-4 rounded-lg border h-full ${bgColor} ${borderColor}`}>
        <h4 className="font-bold text-center text-blue-600 text-sm mb-3">{title}</h4>
        <ul className="space-y-2 list-disc list-inside text-xs text-gray-700">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

// 테이블 헤더를 위한 컴포넌트
const TableHeader = ({ children }) => (
    <div className="bg-gray-200 p-2 text-center font-bold text-xs">{children}</div>
);

// 테이블 셀을 위한 컴포넌트
const TableCell = ({ children, isHeader = false }) => (
    <div className={`p-2 text-center text-xs ${isHeader ? 'font-semibold bg-gray-100' : ''}`}>{children}</div>
);


export default function ResourceCirculationPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Environmental</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">67</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="자원순환">
                    <h4 className="text-md font-bold text-gray-800 mt-4">석탄재 재활용</h4>
                    <p className="mt-1">
                        한국중부발전은 석탄재 및 탈황석고 등 폐자원을 지속가능한 자원으로 활용하여 순환경제 경제를 실천하고 있습니다. 이를 위하여 회처리장 관리체계 개선, 재활용처 발굴, 기술개발 등을 통하여 매립되는 석탄재의 재활용량을 증대시키며 지속가능한 폐자원 순환경제를 선도하고 있습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h4 className="text-md font-bold text-gray-800">회처리장 관리체계 개선</h4>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        <InfoBox title="내부매립장 축소" items={['유효매립용량 확보', '회처리수 순환이용률 제고', '매립회 수위 관리']} />
                        <InfoBox title="내부 수로 수질개선" items={['회처리수 순환계통 개선', '회처리수 수질 관리']} />
                        <InfoBox title="저수구역 준설" items={['저수구역 준설 통한 수심 확보', '보조제방 구축']} />
                    </div>
                </section>

                <section>
                    <h4 className="text-md font-bold text-gray-800">대규모 재활용처 발굴 및 기술개발</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <InfoBox 
                            title="대규모 석탄재 재활용처 활용 확대" 
                            items={['시멘트사向 석탄재 공급', '성토재·복토재용 인·허가 MOU 체결']}
                            bgColor="bg-blue-50"
                            borderColor="border-blue-200"
                        />
                         <InfoBox 
                            title="저회 고부가 가치 재활용 기술개발" 
                            items={['저회 고부가 가치 연구개발', '저회-유리섬유 복합소재 원료 확보', '콘크리트 혼화재 등으로 재활용']}
                            bgColor="bg-blue-50"
                            borderColor="border-blue-200"
                        />
                    </div>
                     <div className="mt-4 bg-blue-600 text-white p-3 rounded-lg text-center font-semibold text-sm">
                        2024~2026년 총 200만 톤 재활용, 2026년 이후 지속 발생량 1.5배 이상 재활용 가능
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="석탄재 재활용 실적">
                    <p>
                        석탄재 발생량 및 재활용량, 재활용률에 대한 실적입니다. 차트는 생략하고 텍스트로 설명합니다.
                    </p>
                </InfoSection>

                <section>
                    <h4 className="text-md font-bold text-gray-800">용도별 재활용 실적</h4>
                    <div className="mt-2 border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-5">
                            <TableHeader>구분</TableHeader>
                            <TableHeader>인천</TableHeader>
                            <TableHeader>보령</TableHeader>
                            <TableHeader>신보령</TableHeader>
                            <TableHeader>합계</TableHeader>
                        </div>
                        <div className="grid grid-cols-5 border-b">
                            <TableCell isHeader={true}>발생량</TableCell>
                            <TableCell>65.1</TableCell>
                            <TableCell>48.7</TableCell>
                            <TableCell>18.3</TableCell>
                            <TableCell>132.1</TableCell>
                        </div>
                        <div className="grid grid-cols-5 border-b">
                            <TableCell isHeader={true}>재활용량</TableCell>
                            <TableCell>91.5</TableCell>
                            <TableCell>38.3</TableCell>
                            <TableCell>12.5</TableCell>
                            <TableCell>142.3</TableCell>
                        </div>
                         <div className="grid grid-cols-5 border-b">
                            <TableCell isHeader={true}>- 레미콘 혼화재</TableCell>
                            <TableCell>43.0</TableCell>
                            <TableCell>38.2</TableCell>
                            <TableCell>10.0</TableCell>
                            <TableCell>91.2</TableCell>
                        </div>
                         <div className="grid grid-cols-5 border-b">
                            <TableCell isHeader={true}>- 시멘트 원료</TableCell>
                            <TableCell>18.1</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>18.1</TableCell>
                        </div>
                         <div className="grid grid-cols-5">
                            <TableCell isHeader={true}>- 성토재/복토재</TableCell>
                            <TableCell>29.8</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>29.8</TableCell>
                        </div>
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
