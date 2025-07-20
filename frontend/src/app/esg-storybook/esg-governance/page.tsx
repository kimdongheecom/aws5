"use client";

import React from 'react';
import { ShieldCheck, Users, Briefcase, BarChart2 } from 'lucide-react';

// next/image를 사용할 수 없는 환경을 위한 간단한 이미지 컴포넌트 대체
const Image = ({ src, alt, className }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    onError={(e) => { 
      const target = e.target as HTMLImageElement;
      target.onerror = null; 
      target.src = 'https://placehold.co/800x600/e2e8f0/94a3b8?text=Image+Not+Found'; 
    }} 
  />
);

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 테이블 행을 위한 재사용 컴포넌트
const TableRow = ({ 구분, 계획, 주요내용, 이행률 }) => (
    <div className="grid grid-cols-12 gap-4 py-2 border-b text-sm">
        <div className="col-span-1 text-center font-semibold">{구분}</div>
        <div className="col-span-2">{계획}</div>
        <div className="col-span-7">{주요내용}</div>
        <div className="col-span-2 text-center font-bold text-blue-600">{이행률}</div>
    </div>
);

export default function EsgGovenancePage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">ESG 거버넌스</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">21</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                    <InfoSection title="ESG경영 추진조직">
                        <p>
                            한국중부발전은 2022년 임직원 및 협력기업, 자회사를 대상으로 미래가치를 창출하는 ESG경영 리더라는 KOMIPO ESG경영 2050 비전을 선포하고, 이사회 산하 ESG위원회(2021. 9. 발족)와 ESG경영 총괄 전담부서를 신설하여 조직체계를 구축하고 추진동력을 확보하였습니다. 또한, 최고경영자(CEO)를 중심으로 ESG경영추진위원회를 설치하여 ESG 영역별 3개 워킹 그룹으로 구성된 ESG실무협의회를 통하여 각 실무부서에 업무분장별 ESG 기능을 부여하고 추진과제 발굴 및 이행 실적을 주기적으로 점검·관리하며 ESG경영 기반을 강화하고 있습니다.
                        </p>
                    </InfoSection>
                    
                    <section>
                        <h2 className="text-xl font-bold text-gray-800">조직도</h2>
                        <div className="mt-4 w-full bg-gray-50 p-4 rounded-lg border">
                             <Image
                                src="/images/organization-chart2.png"
                                alt="ESG 거버넌스 조직도"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <InfoSection title="ESG위원회">
                        <p>
                            ESG위원회는 효과적인 ESG 리스크 관리를 위하여 환경, 안전, 경제, 행정 등 ESG 분야별 전문성을 보유한 비상임이사 5인과 외부전문가 1인으로 ESG위원회를 구성하여 투명성과 객관성을 확보하였습니다. ESG위원회는 분기 1회 개최를 원칙으로 ESG 관련 주요 경영현안 심의와 의사결정을 지원하며 지속가능경영 전반의 방향성에 대한 포괄적인 경영자문을 제공하고 있으며, ESG경영 추진실적에 대한 성과 환류를 통하여 점검기능을 강화함으로써 ESG경영 내실화를 위하여 노력하고 있습니다.
                        </p>
                    </InfoSection>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800">ESG위원회 개최 실적</h2>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                            <div className="grid grid-cols-12 gap-4 py-2 border-b bg-gray-200 font-bold text-sm text-center">
                                <div className="col-span-1">구분</div>
                                <div className="col-span-2">개최일</div>
                                <div className="col-span-7">주요 안건</div>
                                <div className="col-span-2">참석률</div>
                            </div>
                            <TableRow 구분="1" 계획="2023. 6. 10." 주요내용="2023년 KOMIPO ESG경영 추진계획" 이행률="" />
                            <TableRow 구분="2" 계획="2023. 9. 15." 주요내용="• 중부발전 K-ESG경영 추진실적 • 수전해 기반 수소에너지 구축사업 • ESG경영 성과와 환류 추진 현황" 이행률="100%" />
                            <TableRow 구분="3" 계획="2023. 12. 29." 주요내용="• 2030 탄소중립 로드맵 중간 보고" 이행률="" />
                        </div>
                    </section>

                    <InfoSection title="ESG경영 추진위원회">
                        <p>
                            한국중부발전은 ESG경영 실행력 강화를 위하여 최고경영자(CEO)를 중심으로 구성된 ESG경영추진위원회를 운영하고 있습니다. 또한, 3개 워킹 그룹 17개 실로 구성된 ESG실무협의회를 통하여 ESG위원회에 의결사항 사전 검토 및 방향성을 구체화하고, 세부과제에 대한 추진실적을 ESG위원회에 정기 보고함으로써 실효성 있는 ESG경영 실행체계를 구축하였습니다.
                        </p>
                    </InfoSection>
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


