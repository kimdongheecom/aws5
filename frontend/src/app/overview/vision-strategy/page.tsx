"use client";

import React from 'react';
import { Shield, TrendingUp, MessageSquare, Users, CheckCircle } from 'lucide-react';

// 핵심가치, 경영목표 등 정보 카드를 위한 재사용 컴포넌트
const InfoBox = ({ icon, title, value = "", unit = "", bgColor, textColor }) => (
  <div className={`p-4 rounded-lg text-center h-full flex flex-col justify-center ${bgColor}`}>
    {icon && <div className="flex justify-center mb-2">{icon}</div>}
    <p className={`font-bold ${textColor}`}>{title}</p>
    {value && <p className={`text-2xl font-extrabold mt-1 ${textColor}`}>{value}{unit && <span className="text-lg font-semibold">{unit}</span>}</p>}
  </div>
);

// 전략과제 항목을 위한 재사용 컴포넌트
const StrategyItem = ({ text }) => (
    <li className="flex items-start text-sm">
        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
        <span>{text}</span>
    </li>
);

export default function VisionStrategyPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">비전 및 전략</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">11</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <section>
                <h2 className="text-xl font-bold text-gray-800">KOMIPO 2040 비전</h2>
                <p className="mt-2 text-gray-700 leading-relaxed text-sm">
                    한국중부발전은 2022년 12월 탄소중립과 친환경 패러다임의 전환을 위한 경영전략 'KOMIPO 2040'을 공표하였습니다. KOMIPO 2040은 글로벌 기후위기 대응에 동참하고, 에너지 전환 및 신사업을 통하여 에너지 전문기업으로 거듭나고자 하는 한국중부발전의 의지를 담고 있습니다. 주력사업의 성과 창출 뿐만 아니라 지속가능한 에너지의 안정적 공급과 소통을 통한 혁신을 추구하여 국가발전과 국민 삶의 질 개선에 기여하기 위하여 '친환경으로 미래를 여는 에너지 전문기업'이라는 비전을 수립하였습니다.
                </p>
            </section>

            <section className="space-y-4">
                <div className="bg-blue-600 text-white p-4 rounded-lg">
                    <span className="font-semibold text-sm bg-white text-blue-600 px-2 py-0.5 rounded-full">미션</span>
                    <p className="mt-2 font-medium">친환경 에너지의 안전하고 현명한 공급을 통하여 국가발전과 국민 삶의 질 개선에 기여한다.</p>
                </div>
                 <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
                    <span className="font-semibold text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full">비전</span>
                    <p className="mt-2 font-bold text-lg">친환경으로 미래를 여는 에너지 전문기업</p>
                    <p className="text-sm opacity-90">Green Energy Leader Creating a Clean Tomorrow</p>
                </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <InfoBox icon={<Shield size={28} />} title="안전환경" bgColor="bg-blue-500" textColor="text-white" />
                <InfoBox icon={<TrendingUp size={28} />} title="미래성장" bgColor="bg-blue-500" textColor="text-white" />
                <InfoBox icon={<MessageSquare size={28} />} title="혁신소통" bgColor="bg-blue-500" textColor="text-white" />
                <InfoBox icon={<Users size={28} />} title="국민신뢰" bgColor="bg-blue-500" textColor="text-white" />
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div className="col-span-5 font-bold text-center bg-gray-200 p-2 rounded-lg">전략목표</div>
                <InfoBox icon={null} title="주력사업 효율화" bgColor="bg-gray-100" textColor="text-gray-800" />
                <InfoBox icon={null} title="내부경영 효율화" bgColor="bg-gray-100" textColor="text-gray-800" />
                <InfoBox icon={null} title="지속가능 에너지 선도" bgColor="bg-gray-100" textColor="text-gray-800" />
                <InfoBox icon={null} title="사람중심 경영혁신 강화" bgColor="bg-gray-100" textColor="text-gray-800" />
                <InfoBox icon={null} title="국민니즈 맞춤 공공성 제고" bgColor="bg-gray-100" textColor="text-gray-800" />

                <div className="col-span-5 font-bold text-center bg-gray-200 p-2 rounded-lg mt-4">전략과제</div>
                <div className="space-y-2"><StrategyItem text="기존설비 재난안전체계 확산" /><StrategyItem text="품질경쟁력 발전설비 확보" /><StrategyItem text="친환경 전력 생산기반 확대" /></div>
                <div className="space-y-2"><StrategyItem text="재무건전성 관리 고도화" /><StrategyItem text="신사업 수익성 강화" /><StrategyItem text="조직운영 효율성 제고" /></div>
                <div className="space-y-2"><StrategyItem text="탄소중립 기반 구축" /><StrategyItem text="탄소중립 이행 확대" /><StrategyItem text="신재생에너지 역량 확보" /></div>
                <div className="space-y-2"><StrategyItem text="공공기관 ESG경영 선도" /><StrategyItem text="소통·상생의 조직문화 확산" /><StrategyItem text="조직 및 임직원 혁신역량 강화" /></div>
                <div className="space-y-2"><StrategyItem text="이해관계자 책임경영 강화" /><StrategyItem text="윤리·인권경영 고도화" /><StrategyItem text="투명한 기업 운영 및 국민참여 확대" /></div>
            </section>
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
