"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 절차 스텝을 위한 재사용 컴포넌트
const StepBox = ({ step, title, bgColor = 'bg-teal-500', textColor = 'text-white' }) => (
    <div className={`p-3 rounded-lg text-center ${bgColor}`}>
        <p className={`text-xs font-bold ${textColor}`}>Step {step}</p>
        <p className={`font-semibold text-sm mt-1 ${textColor}`}>{title}</p>
    </div>
);

// 테이블 행을 위한 재사용 컴포넌트
const TableRow = ({ 구분, 개최일, 주요안건 }) => (
    <div className="grid grid-cols-12 gap-4 py-2 border-b text-sm">
        <div className="col-span-1 text-center font-semibold">{구분}</div>
        <div className="col-span-3">{개최일}</div>
        <div className="col-span-8">{주요안건}</div>
    </div>
);

export default function CorporateGovernancePage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Governance</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">112</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
                <InfoSection title="지배구조">
                    <h3 className="text-md font-bold text-gray-800 mt-4">이사회 선임 및 운영</h3>
                    <p className="mt-1">
                        한국중부발전은 「공공기관의 운영에 관한 법률」 등 관련 법률에 따라 투명하고 객관적인 절차를 통하여 이사를 선임하고 있습니다. 모든 이사는 주주총회의 의결을 거쳐 선임하며, 특히 사장, 상임감사위원, 비상임이사는 임원추천위원회의 추천을 받아 공공기관운영위원회에 심의와 의결을 거쳐 임명됩니다.
                    </p>
                </InfoSection>
                
                <InfoSection title="임원추천위원회">
                     <p>
                        임원추천위원회는 「공공기관 운영에 관한 법률」 제25조와 제29조, 공공기관의 운영에 관한 법률 시행령 제23조에 따라 설치되며 5~15명 범위 내에서 비상임이사와 이사회가 선임하는 위원으로 구성됩니다.
                    </p>
                </InfoSection>

                <section>
                    <h3 className="text-md font-bold text-gray-800 mb-3">이사 선임 절차</h3>
                    <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-12 gap-2 p-2 bg-gray-100 rounded-lg border">
                            <div className="col-span-3 font-semibold">상임감사위원</div>
                            <div className="col-span-9">임원추천위원회 추천 → 공공기관운영위원회 심의·의결 → 기획재정부 장관 제청 → 대통령 임명</div>
                        </div>
                        <div className="grid grid-cols-12 gap-2 p-2 bg-gray-100 rounded-lg border">
                            <div className="col-span-3 font-semibold">비상임이사</div>
                            <div className="col-span-9">임원추천위원회 추천 → 공공기관운영위원회 심의·의결 → 기획재정부 장관 임명</div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-md font-bold text-gray-800 mb-3">이사회 의장 선임 절차</h3>
                    <div className="flex items-center gap-2">
                        <StepBox step="1" title="공공기관운영위원회 심의 및 의결" />
                        <ArrowRight className="text-gray-400 shrink-0" />
                        <StepBox step="2" title="기획재정부장관 임명" />
                    </div>
                </section>
                
                <section>
                    <h3 className="text-md font-bold text-gray-800 mb-3">이사회 안건 상정 절차</h3>
                     <div className="flex items-center gap-2">
                        <StepBox step="1" title="안건부의 (상임이사)" bgColor="bg-gray-200" textColor="text-gray-800" />
                        <ArrowRight className="text-gray-400 shrink-0" />
                        <StepBox step="2" title="비상임이사 사전심의" bgColor="bg-gray-200" textColor="text-gray-800" />
                        <ArrowRight className="text-gray-400 shrink-0" />
                        <StepBox step="3" title="이사회 심의 및 의결" bgColor="bg-gray-200" textColor="text-gray-800" />
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <InfoSection title="이사회 운영 현황">
                    <p>
                        이사회는 2023년 총 13회 개최되었으며, 이사회 참석률은 100%를 기록했습니다. 주요 안건으로는 보수규정 개정, 예산 및 기금운용계획, 중장기 경영목표 등이 있었습니다.
                    </p>
                </InfoSection>

                <section>
                    <h3 className="text-md font-bold text-gray-800">이사회 개최 실적</h3>
                    <div className="mt-2 bg-gray-50 p-4 rounded-lg border">
                        <div className="grid grid-cols-12 gap-4 py-2 border-b bg-gray-200 font-bold text-sm text-center">
                            <div className="col-span-1">구분</div>
                            <div className="col-span-3">개최일</div>
                            <div className="col-span-8">주요 안건</div>
                        </div>
                        <TableRow 구분="1" 개최일="2023. 2. 17." 주요안건="보수규정 개정(안) 등" />
                        <TableRow 구분="2" 개최일="2023. 3. 10." 주요안건="제22기(2022년) 재무제표 및 연결재무제표 승인(안) 등" />
                        <TableRow 구분="3" 개최일="2023. 4. 21." 주요안건="2022년 비상임이사 평가결과 보고" />
                        <TableRow 구분="4" 개최일="2023. 5. 19." 주요안건="신보령발전본부 무재해·무고장 달성 포상(안)" />
                        <TableRow 구분="5" 개최일="2023. 6. 30." 주요안건="2023~2027년 중장기재무관리계획(안) 등" />
                        <TableRow 구분="6" 개최일="2023. 7. 21." 주요안건="2023년도 중소기업 상생협력기금 출연(안)" />
                        <TableRow 구분="7" 개최일="2023. 8. 18." 주요안건="2022회계연도 상임감사 결과 보고 등" />
                        <TableRow 구분="8" 개최일="2023. 9. 15." 주요안건="수전해기반 수소생산기지 구축사업(안) 등" />
                        <TableRow 구분="9" 개최일="2023. 10. 20." 주요안건="중장기(2024~2028년) 경영목표(안)" />
                        <TableRow 구분="10" 개최일="2023. 11. 17." 주요안건="ESG위원회 외부위원 위촉 및 위촉동의(안)" />
                        <TableRow 구분="11" 개최일="2023. 12. 13." 주요안건="2023년도 예산변경(안)" />
                        <TableRow 구분="12" 개최일="2023. 12. 27." 주요안건="2023년도 비상임이사 및 직원 성과급 지급률(안) 등" />
                        <TableRow 구분="13" 개최일="2023. 12. 29." 주요안건="제23기(2023년) 회계연도 중간배당(안)" />
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
