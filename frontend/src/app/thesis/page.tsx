'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

// 데이터 정의
const rosneftData = [
  { year: 2018, economic: 0.691, environmental: 0.041, social: 0.571, sdIndex: 0.253 },
  { year: 2019, economic: 0.751, environmental: 0.033, social: 0.744, sdIndex: 0.265 },
  { year: 2020, economic: 0.571, environmental: 0.022, social: 0.806, sdIndex: 0.215 },
  { year: 2021, economic: 0.825, environmental: 0.176, social: 0.923, sdIndex: 0.512 }
];

const lukoilData = [
  { year: 2018, economic: 0.678, environmental: 0.794, social: 0.763, sdIndex: 0.743 },
  { year: 2019, economic: 0.648, environmental: 0.953, social: 0.784, sdIndex: 0.785 },
  { year: 2020, economic: 0.578, environmental: 0.747, social: 1.000, sdIndex: 0.756 },
  { year: 2021, economic: 0.869, environmental: 0.722, social: 0.614, sdIndex: 0.728 }
];

// 통합 데이터 (비교용)
const combinedData = rosneftData.map((item, index) => ({
  year: item.year,
  rosneft_economic: item.economic,
  rosneft_environmental: item.environmental,
  rosneft_social: item.social,
  rosneft_sd: item.sdIndex,
  lukoil_economic: lukoilData[index].economic,
  lukoil_environmental: lukoilData[index].environmental,
  lukoil_social: lukoilData[index].social,
  lukoil_sd: lukoilData[index].sdIndex
}));

// 레이더 차트용 데이터
const radarData = [
  { subject: 'Economic', rosneft2021: 0.825, lukoil2021: 0.869, fullMark: 1 },
  { subject: 'Environmental', rosneft2021: 0.176, lukoil2021: 0.722, fullMark: 1 },
  { subject: 'Social', rosneft2021: 0.923, lukoil2021: 0.614, fullMark: 1 }
];

// ESG 등급 정보
const esgRatings = [
  { company: 'Rosneft', rating: 'B-', score: 0.512, trend: 'up', color: '#ff6b6b' },
  { company: 'Lukoil', rating: 'B+', score: 0.728, trend: 'stable', color: '#4ecdc4' }
];

const ESGDashboard: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<'both' | 'rosneft' | 'lukoil'>('both');
  const [selectedMetric, setSelectedMetric] = useState<'economic' | 'environmental' | 'social'>('economic');

  const generatePDFReport = () => {
    // PDF 생성 로직 (실제 구현 시 jsPDF 등 사용)
    alert('PDF 보고서 생성 기능이 곧 추가될 예정입니다.');
  };

  // 선택된 지표에 따른 제목 생성
  const getChartTitle = () => {
    if (selectedMetric === 'economic') {
      return '경제 지표 기하 평균 추이';
    } else if (selectedMetric === 'environmental') {
      return '환경 지표 기하 평균 추이';
    } else if (selectedMetric === 'social') {
      return '사회 지표 기하 평균 추이';
    }
    return 'ESG 성과 추세 분석 (2018-2021)';
  };

  // 선택된 기업에 따른 데이터 필터링
  const getFilteredData = () => {
    if (selectedCompany === 'rosneft') {
      return rosneftData.map(item => ({
        year: item.year,
        economic: item.economic,
        environmental: item.environmental,
        social: item.social,
        sd: item.sdIndex
      }));
    } else if (selectedCompany === 'lukoil') {
      return lukoilData.map(item => ({
        year: item.year,
        economic: item.economic,
        environmental: item.environmental,
        social: item.social,
        sd: item.sdIndex
      }));
    }
    return combinedData;
  };

  const chartData = getFilteredData();
  const chartTitle = getChartTitle();

  return (
    <>
      <style jsx global>{`
        html, body {
          background-color: white !important;
        }
        .dark html, .dark body {
          background-color: #111827 !important;
        }
      `}</style>
      <div className="min-h-screen !bg-white dark:!bg-gray-900" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        {/* 헤더 */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ESG Performance Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  러시아 석유 기업 지속가능성 성과 분석 (2018-2021)
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/thesis/methodology"
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  방법론 보기
                </Link>
                <button
                  onClick={generatePDFReport}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  보고서 다운로드
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 필터 컨트롤 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">분석 필터</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  기업 선택
                </label>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="both">전체 기업</option>
                  <option value="rosneft">Rosneft</option>
                  <option value="lukoil">Lukoil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  지표 선택
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="economic">경제 지표</option>
                  <option value="environmental">환경 지표</option>
                  <option value="social">사회 지표</option>
                </select>
              </div>
            </div>
          </div>

          {/* 주요 지표 추세 차트 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {chartTitle}
            </h2>
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData} 
                  key={`${selectedCompany}-${selectedMetric}`}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                  />
                  <YAxis 
                    domain={[0, 1]}
                  />
                  <Tooltip />
                  <Legend />
                  
                  {/* 단일 기업 모드 - Rosneft */}
                  {selectedCompany === 'rosneft' && selectedMetric === 'economic' && (
                    <Line 
                      type="monotone" 
                      dataKey="economic" 
                      stroke="#ff6b6b" 
                      strokeWidth={3}
                      name="경제 지표"
                      dot={{ r: 6 }}
                    />
                  )}
                  {selectedCompany === 'rosneft' && selectedMetric === 'environmental' && (
                    <Line 
                      type="monotone" 
                      dataKey="environmental" 
                      stroke="#ff9f43" 
                      strokeWidth={3}
                      name="환경 지표"
                      dot={{ r: 6 }}
                    />
                  )}
                  {selectedCompany === 'rosneft' && selectedMetric === 'social' && (
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke="#a55eea" 
                      strokeWidth={3}
                      name="사회 지표"
                      dot={{ r: 6 }}
                    />
                  )}

                  {/* 단일 기업 모드 - Lukoil */}
                  {selectedCompany === 'lukoil' && selectedMetric === 'economic' && (
                    <Line 
                      type="monotone" 
                      dataKey="economic" 
                      stroke="#4ecdc4" 
                      strokeWidth={3}
                      name="경제 지표"
                      dot={{ r: 6 }}
                    />
                  )}
                  {selectedCompany === 'lukoil' && selectedMetric === 'environmental' && (
                    <Line 
                      type="monotone" 
                      dataKey="environmental" 
                      stroke="#26de81" 
                      strokeWidth={3}
                      name="환경 지표"
                      dot={{ r: 6 }}
                    />
                  )}
                  {selectedCompany === 'lukoil' && selectedMetric === 'social' && (
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke="#fd79a8" 
                      strokeWidth={3}
                      name="사회 지표"
                      dot={{ r: 6 }}
                    />
                  )}

                  {/* 전체 비교 모드 */}
                  {selectedCompany === 'both' && selectedMetric === 'economic' && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="rosneft_economic" 
                        stroke="#ff6b6b" 
                        strokeWidth={3}
                        name="Rosneft 경제지표"
                        dot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lukoil_economic" 
                        stroke="#4ecdc4" 
                        strokeWidth={3}
                        name="Lukoil 경제지표"
                        dot={{ r: 6 }}
                      />
                    </>
                  )}
                  {selectedCompany === 'both' && selectedMetric === 'environmental' && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="rosneft_environmental" 
                        stroke="#ff9f43" 
                        strokeWidth={3}
                        name="Rosneft 환경지표"
                        dot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lukoil_environmental" 
                        stroke="#26de81" 
                        strokeWidth={3}
                        name="Lukoil 환경지표"
                        dot={{ r: 6 }}
                      />
                    </>
                  )}
                  {selectedCompany === 'both' && selectedMetric === 'social' && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="rosneft_social" 
                        stroke="#a55eea" 
                        strokeWidth={3}
                        name="Rosneft 사회지표"
                        dot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lukoil_social" 
                        stroke="#fd79a8" 
                        strokeWidth={3}
                        name="Lukoil 사회지표"
                        dot={{ r: 6 }}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 지속가능성 지수 비교 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              통합 지속가능성 지수 (SD Index) 비교
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                <XAxis 
                  dataKey="year" 
                  className="fill-gray-600 dark:fill-gray-400"
                />
                <YAxis 
                  domain={[0, 1]}
                  className="fill-gray-600 dark:fill-gray-400"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="rosneft_sd" 
                  fill="#ff6b6b" 
                  name="Rosneft SD Index"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="lukoil_sd" 
                  fill="#4ecdc4" 
                  name="Lukoil SD Index"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 2021년 ESG 성과 레이더 차트 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              2021년 ESG 성과 비교 (레이더 차트)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid className="stroke-gray-300 dark:stroke-gray-600" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  className="fill-gray-600 dark:fill-gray-400"
                />
                <PolarRadiusAxis 
                  domain={[0, 1]} 
                  className="fill-gray-600 dark:fill-gray-400"
                />
                <Radar
                  name="Rosneft"
                  dataKey="rosneft2021"
                  stroke="#ff6b6b"
                  fill="#ff6b6b"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Radar
                  name="Lukoil"
                  dataKey="lukoil2021"
                  stroke="#4ecdc4"
                  fill="#4ecdc4"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 권고사항 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-2" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                  Rosneft 권고사항
                </h3>
              </div>
              <ul className="space-y-2 text-red-700 dark:text-red-300">
                <li>• 2020년 경제, 사회, 환경 지표의 불안정성 안정화 필요</li>
                <li>• 환경 성과 개선을 위한 전략적 프로그램 집중 투자</li>
                <li>• 지속적인 환경 모니터링 시스템 구축</li>
                <li>• ESG 통합 관리 체계 강화</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  Lukoil 권고사항
                </h3>
              </div>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• 경제, 사회, 환경 지표의 불안정한 상태 수정</li>
                <li>• TRIFR(총 기록 가능한 사고율) 개선에 집중</li>
                <li>• 산업 재해 수 감소를 위한 안전 프로그램 강화</li>
                <li>• 사회적 성과 지표의 일관성 유지</li>
              </ul>
            </div>
          </div>

          {/* 방법론 링크 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  방법론 및 자료
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  분석 방법론, 데이터 정규화 과정, 연쇄 대체법 등 상세 정보를 확인하세요.
                </p>
              </div>
              <Link
                href="/thesis/methodology"
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                방법론 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ESGDashboard;
