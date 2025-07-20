"use client";

import React from 'react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        {children}
    </section>
);

// 수상실적 테이블 행을 위한 재사용 컴포넌트
const AwardTableRow = ({ date, achievement, host }) => (
    <div className="grid grid-cols-12 gap-4 py-2 border-b text-xs">
        <div className="col-span-3">{date}</div>
        <div className="col-span-6 font-semibold">{achievement}</div>
        <div className="col-span-3 text-gray-600">{host}</div>
    </div>
);

// 가입단체 테이블 행을 위한 재사용 컴포넌트
const MembershipTableRow = ({ department, association }) => (
     <div className="grid grid-cols-12 gap-4 py-2 border-b text-xs">
        <div className="col-span-4 font-semibold">{department}</div>
        <div className="col-span-8 text-gray-600">{association}</div>
    </div>
);


export default function AwardsMembershipsPage() {
    const awardsData = [
        { date: '2023. 2. 10.', achievement: '2023 CDP Water Korea 어워즈 우수상', host: 'CDP한국위원회' },
        { date: '2023. 4. 13.', achievement: '2023 국가산업대상 ESG/안전경영 부문 최우수 기관', host: '산업정책연구원' },
        { date: '2023. 5. 25.', achievement: '2023 국가 재난관리 유공 대통령 표창', host: '행정안전부' },
        { date: '2023. 8. 28.', achievement: '제1회 산업부 공공데이터 활용 비즈니스 아이디어 공모전 최우수상', host: '한국전력공사' },
        { date: '2023. 10. 12.', achievement: '제10회 대한민국 SNS대상 공공기업 부문 대상', host: '한국소셜콘텐츠진흥협회' },
        { date: '2023. 11. 8.', achievement: '2023 독서경영 우수직장 인증 대통령상', host: '문화체육관광부, 혁신조직' },
        { date: '2023. 11. 22.', achievement: '품질분임조 전국대회 금상', host: '산업통상자원부' },
        { date: '2023. 12. 15.', achievement: '2023 환경정보공개 우수사례 발표대회 장려상', host: '환경부' },
    ];

    const membershipsData = [
        { department: 'LNGC소싱실', association: '(사)한국가스공사' },
        { department: '감사실', association: '(사)한국공공기관감사협회' },
        { department: '경영기획부', association: '(사)한국경제조사연구회' },
        { department: '기획기술부', association: '(사)한국산업기술보호협회' },
        { department: '노사협력실', association: '(사)한국노사협력진흥원' },
        { department: '발전환경실', association: '전력산업 환경보전 협회' },
        { department: '수소사업실', association: '(사)한국수소산업협회' },
        { department: '신재생기획실', association: '(사)한국신재생에너지협회' },
    ];


  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">수상실적 및 가입단체 현황</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">131-132</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="주요 수상실적">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="grid grid-cols-12 gap-4 py-2 border-b bg-gray-200 font-bold text-xs text-center">
                            <div className="col-span-3">수상일자</div>
                            <div className="col-span-6">수상실적</div>
                            <div className="col-span-3">주관</div>
                        </div>
                        <div className="h-96 overflow-y-auto">
                            {awardsData.map((award, index) => <AwardTableRow key={index} {...award} />)}
                            {/* Add more AwardTableRow components as needed */}
                        </div>
                    </div>
                </InfoSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="가입단체">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="grid grid-cols-12 gap-4 py-2 border-b bg-gray-200 font-bold text-xs text-center">
                            <div className="col-span-4">주관부서</div>
                            <div className="col-span-8">학·협회명</div>
                        </div>
                         <div className="h-96 overflow-y-auto">
                            {membershipsData.map((mem, index) => <MembershipTableRow key={index} {...mem} />)}
                            {/* Add more MembershipTableRow components as needed */}
                        </div>
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
