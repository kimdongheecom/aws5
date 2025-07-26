"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
    FileDown, 
    Leaf, 
    Users, 
    Shield, 
    ChevronDown, 
    ChevronRight,
    Building,
    Book,
    BarChart,
    File as FileIcon,
    Bell, 
    LogOut, 
    LayoutDashboard 
} from 'lucide-react';
import Navigation from "../../components/Navigation";
import Sidebar from '@/components/Common/Sidebar';

// next/image를 사용할 수 없는 환경을 위한 간단한 이미지 컴포넌트 대체
const Image = ({ src, alt, className, width, height }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    width={width}
    height={height}
    onError={(e) => { 
      const target = e.target as HTMLImageElement;
      target.onerror = null; 
      target.src = `https://placehold.co/${width || 100}x${height || 100}/e2e8f0/94a3b8?text=Image`; 
    }} 
  />
);

// ESG 하이라이트 카드를 위한 재사용 컴포넌트
const HighlightCard = ({ icon, title, imageSrc, imageAlt, children, color }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/3 shrink-0">
            <div className="w-full h-48 lg:h-full bg-gray-100">
                 <Image src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" width={400} height={300} />
            </div>
        </div>
        <div className="p-6 lg:p-8 flex flex-col">
            <div className={`flex items-center font-bold mb-3 text-${color}-600`}>
                {icon}
                <h3 className="text-xl ml-2">{title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                {children}
            </p>
        </div>
    </div>
);

// ESG 성과 지표 카드 컴포넌트
const PerformanceCard = ({ title, value, unit, change, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <div className="flex items-baseline">
            <span className={`text-2xl font-bold text-${color}-600`}>{value}</span>
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </div>
        {change && (
            <div className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change} vs 전년
            </div>
        )}
    </div>
);

export default function EsgReport(){
  const handleDownload = () => {
    alert('PDF 다운로드 기능이 실행됩니다.');
  };

  // 각 카드별 시간 상태 관리
  const [environmentTime, setEnvironmentTime] = useState<string>('');
  const [socialTime, setSocialTime] = useState<string>('');
  const [governanceTime, setGovernanceTime] = useState<string>('');

  // 현재 시간을 포맷팅하는 함수
  const formatCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 각 카드의 적용하기 버튼 클릭 핸들러
  const handleEnvironmentApply = () => {
    setEnvironmentTime(formatCurrentTime());
  };

  const handleSocialApply = () => {
    setSocialTime(formatCurrentTime());
  };

  const handleGovernanceApply = () => {
    setGovernanceTime(formatCurrentTime());
  };

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen bg-gray-50 pt-14">
        {/* 왼쪽 사이드바 */}
        <aside className="w-64 border-r bg-white shadow-sm shrink-0">
          <Sidebar />
        </aside>
        
        {/* 메인 콘텐츠 */}
        <main className="flex-1">
          <div className="container mx-auto px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Sustainability Report</h1>
                <button 
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow"
                >
                  <FileDown size={16} className="mr-2" />
                  PDF로 다운로드
                </button>
            </div>

            {/* ESG 성과 개요 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <PerformanceCard 
                    title="탄소배출량 감축률" 
                    value="15.2" 
                    unit="%" 
                    change="+2.1" 
                    color="green"
                />
                <PerformanceCard 
                    title="신재생에너지 비중" 
                    value="8.5" 
                    unit="%" 
                    change="+1.3" 
                    color="blue"
                />
                <PerformanceCard 
                    title="안전사고 발생률" 
                    value="0.042" 
                    unit="%" 
                    change="-0.015" 
                    color="orange"
                />
                <PerformanceCard 
                    title="여성 임원 비율" 
                    value="25.8" 
                    unit="%" 
                    change="+3.2" 
                    color="purple"
                />
            </div>

            {/* ESG Highlights Section */}
            <div className="space-y-10">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">ESG Highlights</h2>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 shrink-0">
                        <div className="w-full h-48 lg:h-full bg-gray-100">
                             <Image src="/images/environmental.png" alt="환경 관련 이미지" className="w-full h-full object-cover" width={400} height={300} />
                        </div>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center font-bold text-green-600">
                                <Leaf size={24} />
                                <h3 className="text-xl ml-2">Environment</h3>
                            </div>
                            {environmentTime && (
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {environmentTime}
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                            한국중부발전은 에너지 전환을 위해 국내외에서 신재생에너지 사업을 확대하고 있습니다. 미국에서는 350MW 규모의 태양광 발전사업과 국내 금융기법을 활용한 초분할형 발전사업을 추진하며 해외 시장에 진출하고 있습니다. 국내에서는 수소 생산기지와 실증센터, 블루수소 생산 플랫폼을 구축해 수소경제 기반을 마련하고, 구례 풍력발전사업을 통해 친환경 에너지 개발과 글로벌 투자 유치에 성과를 거두고 있습니다.
                        </p>
                        {/* ADDED: Import and Apply buttons at the bottom right */}
                        <div className="flex justify-end mt-4">
                            <button className="text-sm font-semibold text-gray-700 hover:text-black underline mr-4">
                                E-가져오기
                            </button>
                            <button 
                                className="text-sm font-semibold text-gray-700 hover:text-black underline"
                                onClick={handleEnvironmentApply}
                            >
                                E-적용하기
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 shrink-0">
                        <div className="w-full h-48 lg:h-full bg-gray-100">
                             <Image src="/images/social.png" alt="사회 관련 이미지" className="w-full h-full object-cover" width={400} height={300} />
                        </div>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center font-bold text-orange-600">
                                <Users size={24} />
                                <h3 className="text-xl ml-2">Social</h3>
                            </div>
                            {socialTime && (
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {socialTime}
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                            한국중부발전은 임직원의 안전과 인권 보호를 위해 다양한 제도와 교육을 운영하고 있습니다. 정기·수시 안전교육을 비롯해 직무 유형별 맞춤형 교육을 강화하고 있으며, 인권침해 예방과 고충 처리를 위한 상시 시스템도 마련하고 있습니다. 또한 맞춤형 복지제도와 퇴직자 재취업 지원 프로그램을 통해 임직원의 삶의 질을 높이고, 취약계층을 위한 나눔 활동도 적극 추진하고 있습니다.
                        </p>
                        {/* ADDED: Import and Apply buttons at the bottom right */}
                        <div className="flex justify-end mt-4">
                            <button className="text-sm font-semibold text-gray-700 hover:text-black underline mr-4">
                                S-가져오기
                            </button>
                            <button 
                                className="text-sm font-semibold text-gray-700 hover:text-black underline"
                                onClick={handleSocialApply}
                            >
                                S-적용하기
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 shrink-0">
                        <div className="w-full h-48 lg:h-full bg-gray-100">
                             <Image src="/images/governance.png" alt="거버넌스 관련 이미지" className="w-full h-full object-cover" width={400} height={300} />
                        </div>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center font-bold text-sky-600">
                                <Shield size={24} />
                                <h3 className="text-xl ml-2">Governance</h3>
                            </div>
                            {governanceTime && (
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {governanceTime}
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                            한국중부발전은 투명하고 책임 있는 경영 강화를 위해 이사회 중심의 경영 참여를 확대하고, 비상임이사의 참여 비율을 100% 달성하였습니다. 공정한 계약제도 운영을 통해 중소기업과의 동반성장을 도모하고 있으며, 납품대금 지급도 전년 대비 향상된 100% 이행율을 기록했습니다. 또한 부패위험을 예방하기 위해 부패영향평가를 시행하고, 내부통제와 청렴 수준 향상을 위한 제도도 지속 개선하고 있습니다.
                        </p>
                        {/* ADDED: Import and Apply buttons at the bottom right */}
                        <div className="flex justify-end mt-4">
                            <button className="text-sm font-semibold text-gray-700 hover:text-black underline mr-4">
                                G-가져오기
                            </button>
                            <button 
                                className="text-sm font-semibold text-gray-700 hover:text-black underline"
                                onClick={handleGovernanceApply}
                            >
                                G-적용하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 주요 성과 및 계획 */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">2023년 주요 성과</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>탄소중립 로드맵 2030 발표 및 2050 탄소중립 목표 설정</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>신재생에너지 사업 확대로 해외 진출 성과 달성</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>ESG 경영시스템 인증 획득 및 지속가능경영보고서 발간</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>임직원 안전 및 복지 제도 고도화</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">2024년 주요 계획</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>탄소중립 기술 개발 및 친환경 에너지 사업 확대</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>ESG 경영 내재화 및 이해관계자 소통 강화</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>디지털 전환을 통한 스마트 그리드 구축</span>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 shrink-0"></div>
                            <span>지역사회 상생협력 및 사회적 가치 창출 확대</span>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}



