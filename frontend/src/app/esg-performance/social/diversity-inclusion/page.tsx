"use client";

import React from 'react';
import { Users, UserCheck, UserPlus, Heart, Hospital, Building, CheckCircle } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 추진과제 카드를 위한 재사용 컴포넌트
const InitiativeCard = ({ title, items }) => (
    <div className="bg-gray-50 p-4 rounded-lg border h-full">
        <h4 className="font-bold text-blue-600 text-md mb-3">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, index) => (
                 <li key={index} className="flex items-start text-xs">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

// 성과 카드를 위한 재사용 컴포넌트
const StatCard = ({ icon, value, label }) => (
    <div className="bg-gray-50 p-3 rounded-lg border text-center">
        <div className="flex justify-center text-blue-600 mb-2">{icon}</div>
        <p className="font-bold text-lg text-gray-800">{value}</p>
        <p className="text-xs text-gray-600 mt-1 break-keep">{label}</p>
    </div>
);


export default function DiversityInclusionPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Social</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">86</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="다양성·포용성">
                    <h3 className="text-md font-bold text-gray-800 mt-4">여성친화적 근무환경 구축</h3>
                    <p className="mt-1">
                        한국중부발전은 양성평등 및 모성보호 문화를 확산하여 여성친화적인 근무환경을 구축하기 위하여 노력하고 있습니다. 그 결과, 여성 채용비율이 3년 연속 꾸준히 증가하였고, 여성관리자 목표를 초과 달성하였습니다. 또한, 남성의 육아휴직 기간이 단축되고 육아시간 사용자는 증가하는 성과를 이루었습니다.
                    </p>
                </InfoSection>
                
                <section>
                    <h3 className="text-md font-bold text-gray-800">중점추진과제</h3>
                    <div className="mt-2 bg-teal-600 text-white p-3 rounded-lg text-center font-semibold mb-3">
                        양성평등 및 모성보호 확산 통한 여성친화적 근무환경 구축
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InitiativeCard 
                            title="양성평등 강화 지속 개선"
                            items={[
                                '서류-필기-면접 단계별 블라인드 채용으로 성차별 원천 차단',
                                '여성 채용확대 전문 교육 및 채용면접 여성위원 참여 확대',
                                '부장급 이상(1~2(을)급) 승격자 발령 시 여성 최우선 배치',
                                '차장급(3급) 승격시험 시 합리적 여성인재 할당비율 운영'
                            ]}
                        />
                        <InitiativeCard 
                            title="모성보호 강화"
                            items={[
                                '배우자 출산휴가 확대 (기존 10일 → 개선 15일)',
                                '고위험 임산부 재택근무로 장기 안정휴가 추가 부여',
                                '임신기 근로시간 단축근무 시행',
                                '육아시간 사용가능 자녀 연령 확대 (기존 5세 → 개선 8세)'
                            ]}
                        />
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="주요 성과">
                    <h3 className="text-md font-bold text-gray-800 mt-4">취약계층 채용</h3>
                    <p>
                        한국중부발전은 취약계층 채용 우대 제도를 운영하여 취업지원대상자 채용률 9.3%, 장애인 채용의 경우 사회형평채용 19%로 정부기준을 초과 달성하였습니다. 또한, 시니어 일자리 창출 사업 추진결과로 제주 지역 숙박 시설 폐관을 수거하여 업사이클링 제품을 제작하는 일자리, 소아암 환아 가정을 위한 간병과 돌봄 서비스를 제공하는 사회서비스형 일자리, 지역 서적 특색을 살린 '다독다독 책방' 창업 지원을 통하여 61명의 시니어 일자리를 창출하였습니다.
                    </p>
                </InfoSection>

                <section>
                    <div className="grid grid-cols-3 gap-4">
                        <StatCard icon={<UserCheck size={28} />} value="9.3%" label="취업지원대상자 채용률" />
                        <StatCard icon={<Users size={28} />} value="19%" label="사회형평 채용률" />
                        <StatCard icon={<UserPlus size={28} />} value="61명" label="시니어 일자리 창출 사업" />
                        <StatCard icon={<Heart size={28} />} value="24명" label="소아암 환아 가족 돌봄 서비스" />
                        <StatCard icon={<Hospital size={28} />} value="16명" label="'우리 동네 병원' 창업" />
                        <StatCard icon={<Building size={28} />} value="7,387명" label="건강한 작업장 일자리 창출" />
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
