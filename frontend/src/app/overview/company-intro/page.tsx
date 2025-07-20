"use client";

import React from 'react';
import { 
  Building, 
  Calendar, 
  User, 
  MapPin, 
  Users, 
  Briefcase,
  Globe
} from 'lucide-react';

// 정보 카드 아이템을 위한 재사용 컴포넌트
const InfoCard = ({ icon, label, value, small = false }) => (
  <div className={`flex items-center p-3 rounded-lg ${small ? 'bg-gray-50' : 'bg-gray-100'}`}>
    <div className={`flex-shrink-0 mr-3 ${small ? 'text-blue-500' : 'text-blue-600'}`}>{icon}</div>
    <div>
      <p className={`font-semibold ${small ? 'text-xs text-gray-500' : 'text-sm text-gray-600'}`}>{label}</p>
      <p className={`font-bold ${small ? 'text-sm text-gray-800' : 'text-md text-gray-900'}`}>{value}</p>
    </div>
  </div>
);

// 경영 실적 아이템을 위한 재사용 컴포넌트
const PerformanceItem = ({ label, value, unit }) => (
  <div className="text-left">
    <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
    <p className="text-2xl font-bold text-blue-600">
      {value}
      <span className="text-lg font-medium ml-1">{unit}</span>
    </p>
  </div>
);

// next/image를 사용할 수 없는 환경을 위한 간단한 이미지 컴포넌트 대체
const Image = ({ src, alt, className }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    onError={(e) => { 
      const target = e.target as HTMLImageElement;
      target.onerror = null; 
      target.src = 'https://placehold.co/1000x500/f1f5f9/cbd5e1?text=Image+Not+Found'; 
    }} 
  />
);


export default function CompanyIntroPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">회사 소개</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">05</p>
            </div>
        </header>

        {/* Main Content Grid */}
        <main className="flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* --- Left Column --- */}
              <div className="flex flex-col space-y-10">
                {/* 회사 소개 */}
                <section>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">한국중부발전</h2>
                  <p className="text-md text-gray-700 leading-relaxed">
                    한국중부발전은 발전소 건설 및 운영 기술력을 바탕으로 국내 최초의 표준 석탄화력 보령발전본부를 비롯하여 전국 7개 발전소와 풍력, 태양광, 연료전지 등 다양한 신재생에너지 설비를 운영하며 고품질의 안정적인 전력을 공급하고 있는 대한민국 대표 에너지 전문기업입니다. 국내 전력 공급의 7.5%를 담당하며 총 설비용량 10,775MW를 보유하고 있습니다.
                  </p>
                </section>

                {/* 신용등급 */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">신용등급</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-baseline"><span className="font-bold text-gray-500">Moody's</span><span className="font-extrabold text-xl text-gray-800">Aa2</span></div>
                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-baseline"><span className="font-bold text-gray-500">S&P</span><span className="font-extrabold text-xl text-gray-800">AA</span></div>
                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-baseline"><span className="font-bold text-gray-500">KIS</span><span className="font-extrabold text-xl text-gray-800">AAA</span></div>
                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-baseline"><span className="font-bold text-gray-500">NICE</span><span className="font-extrabold text-xl text-gray-800">AAA</span></div>
                    </div>
                </section>

                {/* 경영 실적 */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">경영 실적</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <PerformanceItem label="자산총계" value="163,942" unit="억원" />
                        <PerformanceItem label="자본총계" value="54,282" unit="억원" />
                        <PerformanceItem label="매출액" value="77,623" unit="억원" />
                        <PerformanceItem label="당기순이익" value="176" unit="억원" />
                        <PerformanceItem label="설비용량" value="10,775" unit="MW" />
                        <PerformanceItem label="발전실적" value="47,377" unit="GWh" />
                    </div>
                </section>
              </div>

              {/* --- Right Column --- */}
              <div className="flex flex-col space-y-10">
                {/* 기업 개요 */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">기업 개요</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard small icon={<Building size={24} />} label="회사명" value="한국중부발전" />
                        <InfoCard small icon={<Calendar size={24} />} label="설립일" value="2001년 4월 2일" />
                        <InfoCard small icon={<User size={24} />} label="기관장" value="이영조" />
                        <InfoCard small icon={<MapPin size={24} />} label="본사소재지" value="충남 보령시 보령북로 160" />
                        <InfoCard small icon={<Users size={24} />} label="임직원 수" value="2,821명 (정원 기준)" />
                        <InfoCard small icon={<Briefcase size={24} />} label="국내사업" value="화력발전소 운영, 신재생에너지 개발" />
                        <InfoCard small icon={<Globe size={24} />} label="해외사업" value="인도네시아, 베트남 등 O&M 사업" />
                    </div>
                </section>

                {/* 조직도 */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">조직도</h3>
                    <div className="w-full">
                        <Image
                          src="/images/organization-chart.png"
                          alt="한국중부발전 조직도"
                          className="w-full h-auto object-contain rounded-lg border border-gray-200"
                        />
                    </div>
                </section>
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
