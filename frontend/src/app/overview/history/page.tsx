"use client";

import React from 'react';
import { Camera } from 'lucide-react';

// 타임라인의 각 항목(이벤트 블록)을 위한 재사용 컴포넌트 (반응형으로 수정)
const TimelineEvent = ({ period, events, hasImage, position }) => {
  const positionClass = position === 'top' ? 'bottom-full mb-4' : 'top-full mt-4';
  
  return (
    // 고정 너비(w-40)를 최대 너비(max-w-40)로 변경하여 내용에 따라 크기 조절
    <div className={`absolute ${positionClass} flex flex-col items-center max-w-40`}>
      {/* Content Box */}
      <div className="bg-gray-50 p-2.5 rounded-lg shadow-md w-full border border-gray-200">
        {hasImage && (
          <div className="w-full h-16 mb-2 rounded-lg bg-gray-200 flex items-center justify-center">
             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <Camera className="w-5 h-5 text-gray-500" />
             </div>
          </div>
        )}
        <h4 className="font-bold text-blue-600 text-xs mb-1.5">{period}</h4>
        <ul className="space-y-1 text-gray-700">
          {events.map((event, index) => (
            <li key={index} className="flex text-xs">
              <span className="text-gray-500 mr-1.5 shrink-0">{event.year}</span>
              {/* 단어 단위로 줄바꿈이 되도록 break-keep 클래스 추가 */}
              <span className="leading-snug break-keep">{event.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default function HistoryPage() {
  const historyData = [
    { period: '본사 이전', events: [{year: '1961', text: '(주)한국전력주식회사 발족'}, {year: '1962', text: '한국전력주식회사 개정'}], hasImage: false, position: 'top', left: '0%' },
    { period: '2001-2009', events: [{year: '2001', text: '한국중부발전주식회사 출범'}, {year: '2003', text: '보령화력 제3발전소 준공'}, {year: '2009', text: '보령 7,8호기 준공'}], hasImage: true, position: 'bottom', left: '14%' },
    { period: '2010-2012', events: [{year: '2010', text: '현대그린파워(주) 종합준공'}, {year: '2012', text: '인도네시아 찌레본 석탄화력 준공'}], hasImage: true, position: 'top', left: '28%' },
    { period: '2013-2015', events: [{year: '2013', text: '탄소경영보고서 발간'}, {year: '2015', text: '본사 충남 보령 이전'}], hasImage: true, position: 'bottom', left: '42%' },
    { period: '2016-2018', events: [{year: '2016', text: '원두정 청정연료발전소 준공'}, {year: '2017', text: '신보령 1,2호기 준공'}], hasImage: true, position: 'top', left: '56%' },
    { period: '2019-2020', events: [{year: '2019', text: '국내 최초 60MW급 풍력사업 진출'}, {year: '2020', text: '해외수력사업 진출'}], hasImage: true, position: 'bottom', left: '70%' },
    { period: '2021-2022', events: [{year: '2021', text: '보령 신복합 1호기 착공'}, {year: '2022', text: '세종발전소 상업운전 개시'}], hasImage: true, position: 'top', left: '84%' },
    { period: '2023-현재', events: [{year: '2023', text: '보령 신복합 2호기 착공'}, {year: '2024', text: '보령 5호기 상업운전 개시'}], hasImage: true, position: 'bottom', left: '100%' },
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">주요 연혁</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">06</p>
            </div>
        </header>

        {/* Main Timeline Container - Layout fixed with consistent width */}
        <main className="flex-grow flex items-center justify-center my-16">
            {/* 좌우 여백(px-24)을 늘려 양 끝 요소가 벗어나지 않도록 수정 */}
            <div className="w-full px-24">
                <div className="relative">
                    {/* Timeline Axis */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 rounded-full transform -translate-y-1/2"></div>

                    {/* Timeline Events and Stems */}
                    {historyData.map((item, index) => (
                        <div key={index} className="absolute top-1/2" style={{ left: item.left, transform: 'translateX(-50%)' }}>
                            {/* Circle on the axis */}
                            <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10 transform -translate-y-1/2"></div>
                            
                            {/* Stem Line */}
                            <div className={`absolute left-1/2 w-px bg-gray-400 ${item.position === 'top' ? 'bottom-2 h-8' : 'top-2 h-8'}`}></div>

                            {/* Event Block */}
                            <TimelineEvent {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
        
        {/* 주석 영역 */}
        <footer className="pt-6 border-t border-gray-200 shrink-0">
            <h4 className="font-semibold text-gray-700 mb-2">주석</h4>
            <p className="text-sm text-gray-600">
              * 여기에 주석 내용을 입력할 수 있습니다. 예를 들어, 자료의 출처나 기준일을 명시할 수 있습니다.
            </p>
        </footer>
      </div>
    </div>
  );
}
