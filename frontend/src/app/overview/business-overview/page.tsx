"use client";

import React from 'react';

// 사업 현황 정보 카드를 위한 재사용 컴포넌트
const ProjectInfoCard = ({ title, details, type }) => {
  const typeClasses = {
    construction: 'border-orange-500',
    hydrogen: 'border-blue-500',
  };
  const typeDotClasses = {
    construction: 'bg-orange-500',
    hydrogen: 'bg-blue-500',
  };

  return (
    <div className={`bg-white p-3 rounded-lg shadow-sm border ${typeClasses[type]}`}>
      <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
        <span className={`w-2 h-2 rounded-full mr-2 ${typeDotClasses[type]}`}></span>
        {title}
      </h4>
      <ul className="space-y-1 pl-4">
        {details.map((item, index) => (
          <li key={index} className="flex text-xs text-gray-600 leading-snug">
            <span className="font-semibold w-16 shrink-0">{item.label}</span>
            <span className="break-keep">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// next/image를 사용할 수 없는 환경을 위한 간단한 이미지 컴포넌트 대체
const Image = ({ src, alt, className }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    onError={(e) => { 
      const target = e.target as HTMLImageElement;
      target.onerror = null; 
      target.src = 'https://placehold.co/600x800/e2e8f0/94a3b8?text=Map+Image'; 
    }} 
  />
);


export default function BusinessOverviewPage() {
  const constructionProjects = [
    { title: '보령화력 발전사업', details: [{ label: '사업용량', value: '500MW급(250MW*2기)' }, { label: '준공시기', value: '2023.12 ~ 2026.12' }, { label: '사업비', value: '약 1조 5,300억 원' }] },
    { title: '구미복합 발전사업', details: [{ label: '사업용량', value: '500MW급(250MW*2기)' }, { label: '준공시기', value: '2021.12 ~ 2024.12' }, { label: '사업비', value: '약 1조 3,900억 원' }] },
    { title: '인천복합 건설사업', details: [{ label: '사업용량', value: '500MW급' }, { label: '준공시기', value: '2024.12 ~ 2027.12' }, { label: '사업비', value: '7,787억 원' }] },
    { title: '제주복합 3호기 건설사업', details: [{ label: '사업용량', value: '50MW급' }, { label: '준공시기', value: '2025.9' }, { label: '사업비', value: '약 4,039억 원' }] },
    { title: '보령 신복합 1호기 건설사업', details: [{ label: '용량', value: '500MW급' }, { label: '준공시기', value: '2023.10 ~ 2026.6' }, { label: '사업비', value: '5,354억 원' }] },
  ];

  const hydrogenProjects = [
    { title: '울진 SK네트웍스 청정수소발전사업', details: [{ label: '용량', value: 'LNG/수소' }, { label: '준공시기', value: "'27.12" }, { label: '사업비', value: '약 1.1조 원' }] },
    { title: '블루수소 생산플랜트 구축사업', details: [{ label: '준공시기', value: '2027.9 ~ 2028.12' }, { label: '사업비', value: '2조 583억 원' }, { label: '주요내용', value: '청정수소 12.5만톤/年 생산' }] },
    { title: '신보령 수소융합형 중소형원자로 기술개발', details: [{ label: '준공시기', value: '2023.4 ~ 2027.12' }, { label: '사업비', value: '3,694억 원' }] },
    { title: '수전해 기반 그린수소 생산·저장 구축사업', details: [{ label: '준공시기', value: '2023.10 ~ 2031.9' }, { label: '사업비', value: '948억 원' }] },
    { title: '수소항만 시험연구센터 구축사업', details: [{ label: '준공시기', value: '2023.11 ~ 2026.12' }, { label: '사업비', value: '460억 원' }] },
    { title: '보령 수소생산기지 공동추진', details: [{ label: '사업용량', value: '250MW급' }, { label: '준공시기', value: '2028.3' }, { label: '사업비', value: '약 1.3조 원' }] },
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">사업 소개</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">08</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">국내사업 현황</h2>
                <p className="text-gray-600 mt-1 text-sm">한국중부발전은 친환경·신재생 기반의 미래에너지를 선도하고 고효율의 안정적인 전력 공급을 위해 지속적으로 신규 사업개발을 적극적으로 추진하고 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Left Column */}
                <div className="md:col-span-1 space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span><span className="text-xs font-semibold">건설사업</span></div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span><span className="text-xs font-semibold">수소사업</span></div>
                    </div>
                    {/* 데이터 배열을 기반으로 왼쪽 열 프로젝트 렌더링 */}
                    <ProjectInfoCard {...constructionProjects[4]} type="construction" />
                    {hydrogenProjects.slice(0, 5).map((p, i) => <ProjectInfoCard key={i} {...p} type="hydrogen" />)}
                </div>

                {/* Center Column (Map) */}
                <div className="md:col-span-1 flex items-center justify-center h-full">
                    <Image src="/images/map.png" alt="사업 현황 지도" className="w-full h-auto object-contain" />
                </div>

                {/* Right Column */}
                <div className="md:col-span-1 space-y-4">
                    {/* 데이터 배열을 기반으로 오른쪽 열 프로젝트 렌더링 */}
                    {constructionProjects.slice(0, 4).map((p, i) => <ProjectInfoCard key={i} {...p} type="construction" />)}
                    <ProjectInfoCard {...hydrogenProjects[5]} type="hydrogen" />
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
