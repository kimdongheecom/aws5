"use client";

import React from 'react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        {children}
    </section>
);

// 데이터 테이블을 위한 재사용 컴포넌트
const DataTable = ({ title, headers, data }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-bold text-md text-blue-600 mb-3">{title}</h3>
        <div className="overflow-x-auto">
            {/* grid-cols-5를 grid-cols-6으로 수정하여 열 개수를 맞춥니다. */}
            <div className="grid grid-cols-6 gap-2 py-2 border-b bg-gray-200 font-bold text-xs text-center">
                {headers.map((header, index) => <div key={index} className={header === '구분' ? 'col-span-2' : 'col-span-1'}>{header}</div>)}
            </div>
            {data.map((row, rowIndex) => (
                // grid-cols-5를 grid-cols-6으로 수정하여 열 개수를 맞춥니다.
                <div key={rowIndex} className="grid grid-cols-6 gap-2 py-1.5 border-b text-xs text-center items-center">
                    <div className="col-span-2 text-left font-semibold">{row.category}</div>
                    <div className="col-span-1 text-gray-600">{row.unit}</div>
                    <div className="col-span-1">{row.y2021}</div>
                    <div className="col-span-1">{row.y2022}</div>
                    <div className="col-span-1">{row.y2023}</div>
                </div>
            ))}
        </div>
    </div>
);


export default function ESGDataPage() {
    const ghgData = [
        { category: 'Scope 1+2 배출량', unit: 'tCO2eq', y2021: '33,063.78', y2022: '31,840.51', y2023: '31,295.81' },
        { category: '온실가스 원단위', unit: 'tCO2eq/MWh', y2021: '0.714', y2022: '0.709', y2023: '0.683' },
        { category: '온실가스 총 감축량', unit: '%', y2021: '18.6', y2022: '22.6', y2023: '28.9' },
    ];
    const energyData = [
        { category: '에너지 사용량', unit: 'TJ', y2021: '417,830', y2022: '402,301', y2023: '400,021' },
        { category: '에너지 원단위', unit: 'GJ/MWh', y2021: '9.03', y2022: '8.96', y2023: '8.86' },
    ];
     const waterData = [
        { category: '총 용수 사용량', unit: '톤', y2021: '10,836,029', y2022: '10,773,905', y2023: '12,332,915' },
        { category: '용수 원단위', unit: '톤/MWh', y2021: '0.210', y2022: '0.228', y2023: '0.233' },
    ];
    const waterPollutionData = [
        { category: '수질오염물질 배출량', unit: '톤', y2021: '12.17', y2022: '11.42', y2023: '11.58' },
    ];
    const airPollutionData = [
        { category: 'SOx(황산화물)', unit: '톤', y2021: '3,342', y2022: '2,482', y2023: '2,281' },
        { category: 'NOx(질소산화물)', unit: '톤', y2021: '7,426', y2022: '5,978', y2023: '5,432' },
    ];
     const wasteData = [
        { category: '총 폐기물 발생량', unit: '톤', y2021: '16,048', y2022: '27,513', y2023: '16,293' },
        { category: '지정폐기물', unit: '톤', y2021: '389', y2022: '19', y2023: '1,311' },
        { category: '일반폐기물', unit: '톤', y2021: '13,758', y2022: '24,743', y2023: '14,982' },
    ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">ESG Data</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">124</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
                <InfoSection title="환경 Data">
                    <DataTable title="온실가스 배출량" headers={['구분', '단위', '2021', '2022', '2023']} data={ghgData} />
                </InfoSection>
                <DataTable title="에너지 소비량" headers={['구분', '단위', '2021', '2022', '2023']} data={energyData} />
                <DataTable title="용수 관리" headers={['구분', '단위', '2021', '2022', '2023']} data={waterData} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                 <DataTable title="수질오염물질 배출량" headers={['구분', '단위', '2021', '2022', '2023']} data={waterPollutionData} />
                 <DataTable title="대기오염물질 배출량" headers={['구분', '단위', '2021', '2022', '2023']} data={airPollutionData} />
                 <DataTable title="폐기물 관리" headers={['구분', '단위', '2021', '2022', '2023']} data={wasteData} />
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
