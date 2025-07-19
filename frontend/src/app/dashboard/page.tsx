'use client';

import React from 'react';
import { FileText, BookOpen, ShieldAlert, TrendingUp, ArrowUp, ArrowDown, PlusCircle, Search } from 'lucide-react';
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/domain/auth/store/auth.store";

// --- 새로운 대시보드 컴포넌트 ---

// 1. 개별 대시보드 카드 UI 컴포넌트
const DashboardCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
    <div className="p-5 border-b border-gray-200 flex items-center space-x-3 bg-gray-50">
      {icon}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <div className="p-5 flex-grow">
      {children}
    </div>
  </div>
);

// 2. 각 기능별 위젯 컴포넌트들

// ESG 보고서 관리 위젯
const EsgReportWidget: React.FC = () => {
    // NOTE: 이 데이터는 실제 API 호출을 통해 받아와야 합니다.
    const reports = [
        { name: '2025년 1분기 지속가능경영 보고서', status: '진행중', statusColor: 'text-blue-500' },
        { name: '2024년 연간 ESG 보고서', status: '완료', statusColor: 'text-green-500' },
        { name: '2024년 3분기 보고서', status: '검토요청', statusColor: 'text-yellow-500' },
    ];

    return (
        <DashboardCard icon={<FileText className="w-6 h-6 text-green-600" />} title="ESG 보고서 관리">
            <div className="space-y-4">
                <p className="text-sm text-gray-600">최근 진행된 보고서 목록입니다. 새로운 보고서 생성을 시작할 수 있습니다.</p>
                <ul className="space-y-3">
                    {reports.map((report, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-800">{report.name}</span>
                            <span className={`font-semibold ${report.statusColor}`}>{report.status}</span>
                        </li>
                    ))}
                </ul>
                <button className="w-full mt-4 flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    새 보고서 생성
                </button>
            </div>
        </DashboardCard>
    );
};

// 논문 라이브러리 위젯
const ThesisWidget: React.FC = () => {
    // NOTE: 이 데이터는 실제 API 호출을 통해 받아와야 합니다.
    const papers = [
        { title: 'ESG 성과가 기업 가치에 미치는 영향 분석' },
        { title: '생성형 AI를 활용한 보고서 자동화 기술 연구' },
    ];

    return (
        <DashboardCard icon={<BookOpen className="w-6 h-6 text-indigo-600" />} title="논문 라이브러리">
            <div className="space-y-4">
                <p className="text-sm text-gray-600">총 {papers.length}개의 논문이 저장되어 있습니다. 새로운 논문을 검색하고 추가하세요.</p>
                <ul className="space-y-2">
                    {papers.map((paper, index) => (
                        <li key={index} className="text-sm text-gray-800 truncate">
                            - {paper.title}
                        </li>
                    ))}
                </ul>
                <button className="w-full mt-4 flex items-center justify-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Search className="w-5 h-5 mr-2" />
                    논문 검색하기
                </button>
            </div>
        </DashboardCard>
    );
};

// 위험 감성 분석 위젯
const RiskAnalysisWidget: React.FC = () => {
    // NOTE: 이 데이터는 실제 API 호출을 통해 받아와야 합니다.
    const riskData = {
        status: '안정',
        sentiment: { positive: 65, neutral: 25, negative: 10 },
        latestAlert: 'SK하이닉스, 신규 공장 투자 관련 긍정적 뉴스 다수 발생',
    };

    return (
        <DashboardCard icon={<ShieldAlert className="w-6 h-6 text-red-600" />} title="실시간 위험 감성 분석">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">현재 기업 리스크 상태</span>
                    <span className="px-3 py-1 text-sm font-bold text-green-800 bg-green-100 rounded-full">{riskData.status}</span>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-2">뉴스 감성 분석</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
                        <div className="bg-blue-500 h-4" style={{ width: `${riskData.sentiment.positive}%` }}></div>
                        <div className="bg-gray-400 h-4" style={{ width: `${riskData.sentiment.neutral}%` }}></div>
                        <div className="bg-red-500 h-4" style={{ width: `${riskData.sentiment.negative}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                        <span className="text-blue-500">긍정 {riskData.sentiment.positive}%</span>
                        <span className="text-gray-500">중립 {riskData.sentiment.neutral}%</span>
                        <span className="text-red-500">부정 {riskData.sentiment.negative}%</span>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-600">최근 주요 알림</p>
                    <p className="text-sm text-gray-800 p-3 bg-gray-100 rounded-lg mt-2">{riskData.latestAlert}</p>
                </div>
            </div>
        </DashboardCard>
    );
};

// 관심 주식 현황 위젯
const StockWidget: React.FC = () => {
    // NOTE: 이 데이터는 실제 API 호출을 통해 받아와야 합니다.
    const stocks = [
        { name: '삼성전자', price: '92,500', change: 1200, isUp: true },
        { name: 'SK하이닉스', price: '210,000', change: -500, isUp: false },
        { name: '현대차', price: '255,000', change: 3000, isUp: true },
    ];

    return (
        <DashboardCard icon={<TrendingUp className="w-6 h-6 text-orange-600" />} title="관심 주식 현황">
            <div className="space-y-3">
                {stocks.map((stock, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-800">{stock.name}</p>
                            <p className="text-sm text-gray-600">{stock.price} 원</p>
                        </div>
                        <div className={`text-right ${stock.isUp ? 'text-green-600' : 'text-red-600'}`}>
                            <div className="flex items-center justify-end">
                                {stock.isUp ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                <span className="font-semibold">{stock.change.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};


// 3. 위젯들을 통합하는 메인 대시보드 컴포넌트
const NewDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
      <EsgReportWidget />
      <ThesisWidget />
      <RiskAnalysisWidget />
      <StockWidget />
    </div>
  );
};


// --- 최종 페이지 ---
// 이 부분이 C:\...\frontend\src\app\dashboard\page.tsx 파일의 내용이 됩니다.
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute role={['user', 'subscriber']}>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-2xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">사용자 대시보드</h1>
                {user?.name && (
                    <p className="mt-2 text-lg text-gray-600">안녕하세요, {user.name}님! 프로젝트 현황을 한눈에 확인하세요.</p>
                )}
            </header>
            <main>
                <NewDashboard />
            </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
