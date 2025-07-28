"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { 
    FileDown, 
    Leaf, 
    Users, 
    Shield, 
} from 'lucide-react';
import Navigation from "../../components/Navigation";
import Sidebar from '@/components/Common/Sidebar';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  pdf,
  Font 
} from '@react-pdf/renderer';

// next/image 대체 컴포넌트
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

// PDF 스타일 정의
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'NotoSansKR',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: 10,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#333',
    whiteSpace: 'pre-line',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
});

// PDF 문서 컴포넌트
const ESGReportDocument = ({ 
  environmentData, 
  socialData, 
  governanceData 
}: { 
  environmentData: string; 
  socialData: string; 
  governanceData: string; 
}) => {
  const generatePageContent = (path: string, title: string): string => {
    const pageContents = {
      '/overview': `Business Overview
회사의 비즈니스 개요와 전략적 방향성을 제시합니다.

CEO Message
최고경영자의 ESG 비전과 메시지를 담고 있습니다.

Company Introduction
회사의 역사와 발전 과정을 소개합니다.

Vision & Strategy
지속가능한 미래를 위한 비전과 전략을 제시합니다.`,

      '/esg-performance': `Environmental Performance
환경 성과 지표와 목표 달성 현황을 보여줍니다.

Social Performance
사회적 성과와 이해관계자 참여 현황을 제시합니다.

Governance Performance
거버넌스 성과와 투명성 지표를 보여줍니다.`,

      '/esg-storybook': `ESG Vision & Strategy
ESG 비전과 전략적 접근 방식을 소개합니다.

Double Materiality
이중 중요성 평가 결과를 제시합니다.

Materiality Assessment
기후, 안전, 윤리 등 주요 이슈별 중요성 평가를 보여줍니다.

Stakeholder Communication
이해관계자와의 소통 현황을 제시합니다.`,

      '/esg-report': `Sustainability Report
지속가능성 보고서의 핵심 내용을 요약합니다.

ESG Highlights
환경, 사회, 거버넌스 주요 성과를 제시합니다.

Environmental Initiatives
환경 보호를 위한 주요 이니셔티브를 소개합니다.

Social Responsibility
사회적 책임 활동과 성과를 보여줍니다.

Governance Excellence
거버넌스 우수성과 투명성을 제시합니다.

Current ESG Data:
${environmentData}

${socialData}

${governanceData}`,

      '/appendix': `GRI Index 2021
GRI 표준에 따른 지표 매핑을 제공합니다.

TCFD Index
기후 관련 재무정보 공시 지표를 제시합니다.

ESG Data
주요 ESG 데이터와 지표를 제공합니다.

Third-party Verification
외부 검증 결과를 제시합니다.

Awards & Memberships
수상 실적과 협회 멤버십을 소개합니다.`
    };

    return pageContents[path] || `${title} 페이지의 내용이 여기에 포함됩니다.`;
  };

  const pages = [
    { path: '/overview', title: 'Overview' },
    { path: '/esg-performance', title: 'ESG Performance' },
    { path: '/esg-storybook', title: 'ESG Storybook' },
    { path: '/esg-report', title: 'ESG Report' },
    { path: '/appendix', title: 'Appendix' }
  ];

  return (
    <Document>
      {pages.map((page, index) => (
        <Page key={page.path} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.pageTitle}>{page.title}</Text>
            <Text style={styles.content}>
              {generatePageContent(page.path, page.title)}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default function EsgReport(){
  // PDF 다운로드 상태 관리
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // PDF 다운로드 함수 구현 - @react-pdf/renderer 사용
  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // 한글 폰트 등록
      Font.register({
        family: 'NotoSansKR',
        src: '/fonts/NotoSansKR-Regular.ttf',
      });

      // PDF 문서 컴포넌트 생성
      const pdfDocument = (
        <ESGReportDocument 
          environmentData={environmentData}
          socialData={socialData}
          governanceData={governanceData}
        />
      );

      // PDF 생성
      const blob = await pdf(pdfDocument).toBlob();
      
      // 다운로드
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ESG_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('PDF 다운로드가 완료되었습니다!');
    } catch (error) {
      console.error('PDF 생성 중 오류 발생:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 각 카드별 시간 상태 관리
  const [environmentTime, setEnvironmentTime] = useState<string>('');
  const [socialTime, setSocialTime] = useState<string>('');
  const [governanceTime, setGovernanceTime] = useState<string>('');

  // 각 카드의 내용을 담을 상태 변수를 추가하고, 기존 텍스트로 초기화합니다.
  const [environmentData, setEnvironmentData] = useState<string>(
    `한국중부발전은 에너지 전환을 위해 국내외에서 신재생에너지 사업을 확대하고 있습니다. 미국에서는 350MW 규모의 태양광 발전사업과 국내 금융기법을 활용한 초분할형 발전사업을 추진하며 해외 시장에 진출하고 있습니다. 국내에서는 수소 생산기지와 실증센터, 블루수소 생산 플랫폼을 구축해 수소경제 기반을 마련하고, 구례 풍력발전사업을 통해 친환경 에너지 개발과 글로벌 투자 유치에 성과를 거두고 있습니다.`
  );
  const [socialData, setSocialData] = useState<string>(
    `한국중부발전은 임직원의 안전과 인권 보호를 위해 다양한 제도와 교육을 운영하고 있습니다. 정기·수시 안전교육을 비롯해 직무 유형별 맞춤형 교육을 강화하고 있으며, 인권침해 예방과 고충 처리를 위한 상시 시스템도 마련하고 있습니다. 또한 맞춤형 복지제도와 퇴직자 재취업 지원 프로그램을 통해 임직원의 삶의 질을 높이고, 취약계층을 위한 나눔 활동도 적극 추진하고 있습니다.`
  );
  const [governanceData, setGovernanceData] = useState<string>(
    `한국중부발전은 투명하고 책임 있는 경영 강화를 위해 이사회 중심의 경영 참여를 확대하고, 비상임이사의 참여 비율을 100% 달성하였습니다. 공정한 계약제도 운영을 통해 중소기업과의 동반성장을 도모하고 있으며, 납품대금 지급도 전년 대비 향상된 100% 이행율을 기록했습니다. 또한 부패위험을 예방하기 위해 부패영향평가를 시행하고, 내부통제와 청렴 수준 향상을 위한 제도도 지속 개선하고 있습니다.`
  );
  
  // API 호출을 위한 공통 함수를 생성합니다.
  const handleFetchData = async (
      disclosureId: string, 
      setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
      const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const apiUrl = `${gatewayUrl}/e/v2/report/qual-data`;
      
      setter("데이터를 불러오는 중..."); // 사용자에게 로딩 중임을 알립니다.

      try {
          const response = await axios.get(apiUrl, {
              params: {
                  company_id: 'KOMIPO',
                  disclosure_id: disclosureId,
              },
              withCredentials: true,
          });

          if (response.data && response.data.qual_data) {
              setter(response.data.qual_data); // 성공 시 상태를 업데이트합니다.
              alert(`'${disclosureId}' 데이터를 성공적으로 가져왔습니다.`);
          } else {
               setter(`'${disclosureId}'에 대한 데이터를 찾을 수 없습니다.`);
               alert(`해당 데이터를 찾을 수 없습니다.`);
          }
      } catch (error) {
          console.error(`Error fetching data for ${disclosureId}:`, error);
          let errorMessage = '데이터를 가져오는 중 오류가 발생했습니다.';
          if (axios.isAxiosError(error) && error.response) {
              errorMessage = `오류: ${error.response.status} - ${error.response.data.detail || error.message}`;
          }
          setter(errorMessage); // 에러 메시지를 화면에 표시합니다.
          alert(errorMessage);
      }
  };

  const formatCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('ko-KR'); // 사용자의 지역에 맞는 시간 형식으로 표시
  };

  // 적용하기 버튼 핸들러
  const handleEnvironmentApply = () => setEnvironmentTime(formatCurrentTime());
  const handleSocialApply = () => setSocialTime(formatCurrentTime());
  const handleGovernanceApply = () => setGovernanceTime(formatCurrentTime());

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen bg-gray-50 pt-14">
        <aside className="w-64 border-r bg-white shadow-sm shrink-0">
          <Sidebar />
        </aside>
        
        <main className="flex-1">
          <div className="container mx-auto px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Sustainability Report</h1>
                <button 
                  onClick={handleDownload}
                  disabled={isGeneratingPDF}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow ${
                    isGeneratingPDF 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FileDown size={16} className="mr-2" />
                  {isGeneratingPDF ? 'PDF 생성 중...' : 'PDF로 다운로드'}
                </button>
            </div>

            {/* ESG 성과 개요 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* ... PerformanceCard 컴포넌트들 ... */}
            </div>

            {/* ESG Highlights Section */}
            <div className="space-y-10">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">ESG Highlights</h2>

                {/* Environment Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 shrink-0"><Image src="/images/environmental.png" alt="환경 관련 이미지" className="w-full h-full object-cover" width={400} height={300} /></div>
                    <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center font-bold text-green-600"><Leaf size={24} /><h3 className="text-xl ml-2">Environment</h3></div>
                            {environmentTime && (<div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{environmentTime}</div>)}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                            {environmentData}
                        </p>
                        <div className="flex justify-end mt-4">
                            <button className="text-sm font-semibold text-gray-700 hover:text-black underline mr-4"
                                onClick={() => handleFetchData('301-1', setEnvironmentData)}>
                                E-가져오기
                            </button>
                            <button className="text-sm font-semibold text-gray-700 hover:text-black underline" onClick={handleEnvironmentApply}>
                                E-적용하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 shrink-0"><Image src="/images/social.png" alt="사회 관련 이미지" className="w-full h-full object-cover" width={400} height={300} /></div>
                    <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center font-bold text-orange-600"><Users size={24} /><h3 className="text-xl ml-2">Social</h3></div>
                             {socialTime && (<div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{socialTime}</div>)}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                             {socialData}
                        </p>
                        <div className="flex justify-end mt-4">
                             <button className="text-sm font-semibold text-gray-700 hover:text-black underline mr-4"
                                 onClick={() => handleFetchData('403-3', setSocialData)}>
                                 S-가져오기
                             </button>
                             <button className="text-sm font-semibold text-gray-700 hover:text-black underline" onClick={handleSocialApply}>
                                 S-적용하기
                             </button>
                        </div>
                    </div>
                </div>

                {/* Governance Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 shrink-0"><Image src="/images/governance.png" alt="거버넌스 관련 이미지" className="w-full h-full object-cover" width={400} height={300} /></div>
                    <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center font-bold text-sky-600"><Shield size={24} /><h3 className="text-xl ml-2">Governance</h3></div>
                             {governanceTime && (<div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{governanceTime}</div>)}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                             {governanceData}
                        </p>
                        <div className="flex justify-end mt-4">
                             <button className="text-sm font-semibold text-gray-700 hover:text-black underline mr-4"
                                 onClick={() => handleFetchData('205-1', setGovernanceData)}>
                                 G-가져오기
                             </button>
                             <button className="text-sm font-semibold text-gray-700 hover:text-black underline" onClick={handleGovernanceApply}>
                                 G-적용하기
                             </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 하단 주요 성과 및 계획 */}
          </div>
        </main>
      </div>
    </>
  );
}