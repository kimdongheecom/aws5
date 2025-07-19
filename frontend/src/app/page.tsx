'use client';

import { FileText, ShieldAlert, TrendingUp, BookOpen, Globe, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// 홈페이지에 소개될 주요 기능 목록
const features = [
  {
    name: 'Contact',
    description: '서비스 관련 문의나 기술 지원이 필요하시면 언제든지 연락주세요.',
    href: '/contact',
    icon: Mail,
  },
  {
    name: 'ESG Report',
    description: '복잡한 ESG 보고서 작성 과정을 AI로 자동화하여 시간과 비용을 절감하세요.',
    href: '/esg-report',
    icon: FileText,
  },
  {
    name: 'Stock Price',
    description: '관심 기업의 주가와 ESG 성과를 연동하여 함께 모니터링하세요.',
    href: '/stock-price',
    icon: TrendingUp,
  },
  {
    name: 'Watchdog',
    description: '뉴스, 공시 등 데이터를 분석하여 잠재적인 ESG 리스크를 실시간으로 알려드립니다.',
    href: '/watchdog',
    icon: ShieldAlert,
  },
  {
    name: 'GRI',
    description: 'GRI 등 국제 표준에 맞춰 보고서를 작성하고 관리할 수 있는 기능을 제공합니다.',
    href: '/gri',
    icon: Globe,
  },
  {
    name: 'Thesis',
    description: '최신 ESG 관련 논문과 연구 자료를 검색하고 인사이트를 얻으세요.',
    href: '/thesis',
    icon: BookOpen,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section: 서비스의 첫인상을 결정하는 부분 */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-violet-200 rounded-full filter blur-3xl opacity-40 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-40 animate-pulse-slow-delay"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-indigo-100 text-indigo-600 font-semibold px-4 py-1 rounded-full text-sm mb-4">
            ESG 경영의 새로운 기준
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 mb-6">
            AI로 완성하는 지속가능경영 플랫폼
          </h1>
          <p className="max-w-2xl mx-auto text-lg lg:text-xl text-gray-600 mb-10">
            데이터 기반의 정확한 분석과 자동화된 보고서 생성으로 기업의 ESG 경쟁력을 한 단계 끌어올리세요.
          </p>
          <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105">
            대시보드 바로가기 <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section: 주요 기능 소개 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">주요 기능</h2>
            <p className="mt-4 text-lg text-gray-600">ESG-AI 플랫폼이 제공하는 강력한 기능들을 만나보세요.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.name} className="group block p-8 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <span className="font-semibold text-indigo-600 flex items-center">
                  더 알아보기 <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} ESG-AI. All rights reserved.</p>
            <p className="text-sm mt-2">Life, Intelligence, Future</p>
        </div>
      </footer>

      {/* Tailwind CSS 애니메이션을 위한 스타일 */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.2) rotate(20deg); opacity: 0.6; }
        }
        @keyframes pulse-slow-delay {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
            50% { transform: scale(1.2) rotate(-20deg); opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s infinite ease-in-out;
        }
        .animate-pulse-slow-delay {
            animation: pulse-slow-delay 12s infinite ease-in-out;
            animation-delay: 3s;
        }
      `}</style>
    </main>
  );
}