'use client';

import React, { useState } from 'react';
import { FileText, BookOpen, ShieldAlert, TrendingUp, ArrowUp, ArrowDown, PlusCircle, Search, MoreVertical, Eye, X } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/domain/auth/store/auth.store";

// --- 미리보기 모달 컴포넌트 (밝은 테마) ---
const ReportPreviewModal = ({ report, onClose }: { report: any, onClose: () => void }) => {
    if (!report) return null;

    const chartData = [
        { name: '에너지', '2024': 4000, '2025': 2400 },
        { name: '용수', '2024': 3000, '2025': 1398 },
        { name: '폐기물', '2024': 2000, '2025': 9800 },
        { name: '온실가스', '2024': 2780, '2025': 3908 },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
                <header className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">보고서 미리보기: {report.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </header>
                <main className="flex-grow overflow-y-auto p-8 text-gray-700 bg-gray-50">
                    <section className="mb-12 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{report.name}</h1>
                        <p className="text-gray-500">발행일: {new Date().toLocaleDateString('ko-KR')}</p>
                    </section>
                    
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 pb-2 mb-4">1. 서문</h3>
                        <p>본 지속가능경영 보고서는 ESG-AI Platform의 사회적, 환경적 책임과 투명한 지배구조를 바탕으로 한 지속 가능한 미래를 위한 약속과 성과를 담고 있습니다. 우리는 이해관계자들과의 소통을 통해 더 나은 가치를 창출하고자 노력하고 있습니다.</p>
                    </section>

                    <section className="mb-10">
                        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">2. 환경 (Environment)</h3>
                        <p className="mb-6">기후 변화 대응 및 자원 순환 경제를 위해 다양한 노력을 기울이고 있습니다. 주요 환경 성과는 아래와 같습니다.</p>
                        <div className="h-80 bg-white p-4 rounded-xl border">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderColor: '#e5e7eb', borderRadius: '0.75rem' }} />
                                    <Bar dataKey="2024" fill="#38bdf8" name="2024년" />
                                    <Bar dataKey="2025" fill="#34d399" name="2025년" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                     <section className="mb-10">
                        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-4">3. 사회 (Social)</h3>
                        <p>임직원의 성장과 안전을 최우선으로 하며, 지역 사회와 함께 발전하는 것을 목표로 합니다. 인권 경영, 공급망 관리, 산업 안전 등 다양한 분야에서 사회적 책임을 다하고 있습니다.</p>
                    </section>
                    
                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">4. 지배구조 (Governance)</h3>
                        <p>투명하고 건전한 지배구조를 확립하여 주주 및 이해관계자의 신뢰를 확보하고 있습니다. 이사회 중심의 책임 경영을 강화하고, 윤리 경영을 실천하여 기업 가치를 제고합니다.</p>
                    </section>
                </main>
            </div>
        </div>
    );
};


// 1. 개별 대시보드 카드 UI 컴포넌트 (밝은 테마)
const DashboardCard = ({ icon, title, children, className = '' }: { icon?: React.ReactNode; title: string; children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col ${className}`}>
    <div className="p-5 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {icon}
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      <button className="text-gray-400 hover:text-gray-700">
        <MoreVertical size={20} />
      </button>
    </div>
    <div className="p-5 flex-grow">
      {children}
    </div>
  </div>
);

// 2. 각 기능별 위젯 컴포넌트들 (밝은 테마)

// ESG 보고서 관리 위젯
const EsgReportWidget = () => {
    const [isPreviewOpen, setPreviewOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handlePreview = (report: any) => {
        setSelectedReport(report);
        setPreviewOpen(true);
    };

    const handleClose = () => {
        setPreviewOpen(false);
        setSelectedReport(null);
    };

    const reports = [
        { id: 1, name: '2025년 한국중부발전 지속가능경영 보고서', status: '진행중', progress: 75, statusColor: 'text-blue-600' },
        { id: 2, name: '2024년 LG 전자 지속가능경영 보고서', status: '완료', progress: 100, statusColor: 'text-green-600' },
        { id: 3, name: '2024년 삼성전자 지속가능경영 보고서', status: '검토요청', progress: 90, statusColor: 'text-yellow-600' },
    ];

    return (
        <>
            <DashboardCard icon={<FileText className="w-6 h-6 text-green-500" />} title="ESG 보고서 관리">
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">최근 보고서 현황입니다. '새 보고서 생성'으로 새 작업을 시작하세요.</p>
                    <ul className="space-y-4">
                        {reports.map((report) => (
                            <li key={report.id}>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="text-gray-700">{report.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`font-semibold ${report.statusColor}`}>{report.status}</span>
                                        <button onClick={() => handlePreview(report)} title="미리보기" className="text-gray-400 hover:text-gray-800">
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`${report.status === '완료' ? 'bg-green-500' : 'bg-blue-500' } h-2 rounded-full`} style={{ width: `${report.progress}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full mt-4 flex items-center justify-center bg-green-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        새 보고서 생성
                    </button>
                </div>
            </DashboardCard>
            {isPreviewOpen && <ReportPreviewModal report={selectedReport} onClose={handleClose} />}
        </>
    );
};

// 논문 라이브러리 위젯
const ThesisWidget = () => {
    const papers = [
        { title: 'ESG 성과가 기업 가치에 미치는 영향 분석' },
        { title: '생성형 AI를 활용한 보고서 자동화 기술 연구' },
        { title: '기후 변화 관련 재무 정보 공개 TCFD 연구' },
    ];

    return (
        <DashboardCard icon={<BookOpen className="w-6 h-6 text-indigo-500" />} title="논문 라이브러리">
            <div className="space-y-4">
                <p className="text-sm text-gray-500">총 {papers.length}개의 논문이 저장되어 있습니다.</p>
                <ul className="space-y-3">
                    {papers.map((paper, index) => (
                        <li key={index} className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer flex items-start">
                           <span className="mr-2 mt-1">&#8226;</span> <span>{paper.title}</span>
                        </li>
                    ))}
                </ul>
                <button className="w-full mt-4 flex items-center justify-center bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                    <Search className="w-5 h-5 mr-2" />
                    논문 검색하기
                </button>
            </div>
        </DashboardCard>
    );
};

// 위험 감성 분석 위젯
const RiskAnalysisWidget = () => {
    const sentimentData = [
        { name: '긍정', value: 65 },
        { name: '중립', value: 25 },
        { name: '부정', value: 10 },
    ];
    const COLORS = ['#22c55e', '#a1a1aa', '#ef4444'];
    const latestAlert = 'SK하이닉스, 신규 공장 투자 관련 긍정적 뉴스 다수 발생';

    return (
        <DashboardCard icon={<ShieldAlert className="w-6 h-6 text-red-500" />} title="실시간 위험 감성 분석">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {sentimentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    borderColor: 'rgba(229, 231, 235, 1)',
                                    borderRadius: '0.75rem'
                                }}
                            />
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#1f2937" fontSize="24" fontWeight="bold">
                                안정
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">최근 주요 알림:</p>
                    <p className="text-gray-700 p-3 bg-gray-100 rounded-lg">{latestAlert}</p>
                     <div className="flex justify-between text-xs pt-2">
                        {sentimentData.map((item, index) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                            <span className="text-gray-500">{item.name} {item.value}%</span>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

// 관심 주식 현황 위젯
const StockWidget = () => {
    const stocks = [
        { name: '삼성전자', price: '92,500', change: 1200, isUp: true, data: [{v:4},{v:3},{v:5},{v:8},{v:7},{v:10},{v:12}] },
        { name: 'SK하이닉스', price: '210,000', change: -500, isUp: false, data: [{v:10},{v:12},{v:8},{v:9},{v:7},{v:6},{v:5}] },
        { name: '현대차', price: '255,000', change: 3000, isUp: true, data: [{v:2},{v:4},{v:3},{v:6},{v:8},{v:7},{v:9}] },
    ];

    return (
        <DashboardCard icon={<TrendingUp className="w-6 h-6 text-orange-500" />} title="관심 주식 현황">
            <div className="space-y-2">
                {stocks.map((stock) => (
                    <div key={stock.name} className="grid grid-cols-3 items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                        <div>
                            <p className="font-bold text-gray-800">{stock.name}</p>
                            <p className="text-sm text-gray-500">{stock.price} 원</p>
                        </div>
                        <div className="h-10 -mx-4">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stock.data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id={stock.isUp ? "colorUv" : "colorPv"} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={stock.isUp ? "#22c55e" : "#ef4444"} stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor={stock.isUp ? "#22c55e" : "#ef4444"} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="v" stroke={stock.isUp ? "#22c55e" : "#ef4444"} strokeWidth={2} fillOpacity={1} fill={`url(#${stock.isUp ? "colorUv" : "colorPv"})`} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={`text-right font-semibold ${stock.isUp ? 'text-green-600' : 'text-red-600'}`}>
                            <div className="flex items-center justify-end">
                                {stock.isUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                <span>{stock.change.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};


// 3. 위젯들을 통합하는 메인 대시보드 컴포넌트
const NewDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 [grid-auto-rows:1fr]">
      <div className="2xl:col-span-2">
        <EsgReportWidget />
      </div>
      <div>
        <StockWidget />
      </div>
      <div className="2xl:col-span-2">
        <RiskAnalysisWidget />
      </div>
      <div>
        <ThesisWidget />
      </div>
    </div>
  );
};


// --- 최종 페이지 ---
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 text-gray-800">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-200 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-50"></div>
        </div>
        <div className="max-w-screen-2xl mx-auto relative z-10">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">사용자 대시보드</h1>
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
