"use client";

import React from 'react';
import { Leaf, Users, Scale, CheckCircle } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 프로세스 스텝 카드를 위한 재사용 컴포넌트
const ProcessStepCard = ({ step, title, items }) => (
    <div className="bg-gray-50 p-4 rounded-lg border h-full">
        <p className="font-bold text-blue-600 mb-2">Step {step}. {title}</p>
        <ul className="space-y-1">
            {items.map((item, index) => (
                <li key={index} className="flex text-xs">
                    <span className="font-semibold w-5 mr-1">{item.label}</span>
                    <span className="text-gray-600">{item.text}</span>
                </li>
            ))}
        </ul>
    </div>
);

// 테이블 행을 위한 재사용 컴포넌트
const TableRow = (props) => (
    <div className="grid grid-cols-12 gap-2 py-2 border-b text-xs text-center items-center">
        <div className="col-span-1 font-semibold">{props.category}</div>
        <div className="col-span-1">{props.weight}</div>
        <div className="col-span-3 text-left">{props.indicator}</div>
        <div className="col-span-1">{props.goal2023}</div>
        <div className="col-span-1">{props.perf2023}</div>
        <div className="col-span-1">{props.achieveRate2023}</div>
        <div className="col-span-1">{props.weightPercent}</div>
        <div className="col-span-1">{props.index2023}</div>
        <div className="col-span-1">{props.index2022}</div>
    </div>
);


export default function EsgInternalizationPage() {
    // This data is no longer used for the table, but kept for reference
    const tableData = [
        { category: '환경(E)', weight: '(45)', indicator: '대기오염물질 등 배출량(저감실적)', goal2023: '0.137', perf2023: '0.115', achieveRate2023: '100', weightPercent: '12', index2023: '12', index2022: '12' },
        { category: '', weight: '', indicator: '온실가스 원단위(감축실적)', goal2023: '1,005', perf2023: '1,118', achieveRate2023: '100', weightPercent: '17', index2023: '17', index2022: '17' },
        { category: '', weight: '', indicator: '국내 신재생에너지 설비용량[MW]', goal2023: '1,553', perf2023: '1,242', achieveRate2023: '81.7', weightPercent: '5', index2023: '4.1', index2022: '5' },
        { category: '사회(S)', weight: '(35)', indicator: 'ESG 상생협력 지원(중소기업)', goal2023: '50', perf2023: '47', achieveRate2023: '94', weightPercent: '3', index2023: '2.8', index2022: '3' },
        { category: '', weight: '', indicator: '안전경영 평가(기관장)', goal2023: '98.0', perf2023: '98.6', achieveRate2023: '100', weightPercent: '7', index2023: '7', index22: '7' },
        { category: '지배구조(G)', weight: '(20)', indicator: '국민권익위원회 종합청렴도(등급)', goal2023: '1등급', perf2023: '2등급', achieveRate2023: '80', weightPercent: '7', index2023: '5.6', index2022: '5.6' },
    ];

  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">ESG 경영 내재화</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">22</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="ESG경영 점검체계">
                <h3 className="text-md font-bold text-gray-800 mt-4">KOMIPO-ESG 지수 자체 진단</h3>
                <p className="mt-1">
                    한국중부발전은 ESG경영 체계 확립과 성과 확대를 위하여 한국중부발전 고유의 ESG 지수 산정 프로세스를 개발하였으며, 매년 ESG경영 수준을 자체 진단하고 있습니다. 이 프로세스는 KOMIPO 2040 경영전략과 연계한 대표 KPI 16개 지수를 선정하여 총 7단계를 거쳐 완성되었습니다. 자체 ESG경영 수준진단 평가 결과를 통하여 각 실무부서에서는 목표 미달성 지표에 대한 보완점을 도출하고 개선활동을 시행하고 있습니다. 2023년에 시행된 ESG 지수 산정 결과 양호한 수준으로 확인되었으며, 앞으로도 꾸준한 모니터링과 성과관리를 통하여 높은 수준을 유지해나가도록 노력할 것입니다.
                </p>
            </InfoSection>

            <section>
                <h3 className="text-md font-bold text-gray-800">ESG 지수 산정 프로세스</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ProcessStepCard step="1" title="K-ESG 가이드라인 활용" items={[{label: 'E', text: '환경'}, {label: 'S', text: '사회'}, {label: 'G', text: '지배구조'}]} />
                    <ProcessStepCard step="2" title="측정항목 지표 선정" items={[{label: 'E', text: '온실가스 등'}, {label: 'S', text: '안전 등'}, {label: 'G', text: '청렴 등'}]} />
                    <ProcessStepCard step="3" title="ESG 등급 및 등급 산정" items={[{label: '', text: '목표치 설정, 가중치 부여'}]} />
                </div>
                <div className="mt-2 bg-gray-50 p-3 rounded-lg border text-sm text-gray-700">
                    <p><span className="font-bold">Step 4.</span> 지표별 AHP조사지 작성 → <span className="font-bold">Step 5.</span> 내외부 전문가 선정 및 조사 → <span className="font-bold">Step 6.</span> 지표별 가중치 도출 → <span className="font-bold">Step 7.</span> 지수별 가중치 부여 및 ESG 지수 도출, 등급 부여</p>
                </div>
            </section>
            
            <section>
                <h3 className="text-md font-bold text-gray-800">KOMIPO ESG 지수 산정 결과</h3>
                <div className="mt-2 text-gray-700 leading-relaxed text-sm bg-gray-50 p-4 rounded-lg border">
                    <p>
                        한국중부발전의 2023년 ESG 지수 산정 결과에 따르면, 전반적인 ESG 성과는 양호한 수준이나, 일부 항목에서는 개선의 여지가 있는 것으로 나타났다. 환경(E) 부문에서는 온실가스 배출량과 신재생에너지 발전 비중 등 주요 지표에서 일부 목표를 달성하지 못해 전반적인 점수 하락에 영향을 미쳤다. 특히 국내 신재생에너지 발전량 비중은 12% 목표 대비 실제 10.5%로 달성률이 87.7%에 그쳤으며, 국내 온실가스 배출량 역시 목표치를 초과하여 자체 평가 점수가 감소하였다. 
                    </p>
                    <p className="mt-2">
                        반면 사회(S) 및 지배구조(G) 부문에서는 모든 핵심 지표에서 목표치를 100% 달성하며 우수한 성과를 보였다. 중대재해 발생 여부, 청렴도, 고충처리 절차 등 사회 부문 항목은 안정적으로 관리되고 있으며, 이사회 다양성 확보, 내부통제 체계, 감사기구 구성 등 지배구조 부문 역시 높은 수준의 투명성과 책임성을 유지하고 있다. 
                    </p>
                    <p className="mt-2">
                        종합적으로 2023년 자체부여 ESG 점수는 85.4점으로, 전년도 96.1점 대비 다소 하락하였으며, 향후 환경 부문의 성과 개선이 ESG 전반의 경쟁력 제고를 위한 핵심 과제로 평가된다.
                    </p>
                </div>
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
