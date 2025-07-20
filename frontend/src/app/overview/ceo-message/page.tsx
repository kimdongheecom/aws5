"use client";

import React from 'react';
import { UserCircle } from 'lucide-react';

// next/image's Image component is not directly available in this environment.
// We'll create a simple substitute that mimics its behavior for the preview.
const Image = ({ src, alt, className, ...props }) => {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return (
      <div className={`w-full h-full bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <UserCircle className="w-24 h-24 mx-auto" />
          <p className="mt-2 text-sm font-medium">Image not found</p>
          <p className="text-xs text-gray-400">{alt}</p>
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setError(true)} {...props} />;
};


export default function CEOMessagePage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl">
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-800">CEO Message</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">03</p>
            </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* --- Left Column (Image) --- */}
          <div className="lg:col-span-1">
            <div className="w-full aspect-[3/4] rounded-lg shadow-md overflow-hidden border">
                <Image
                  src="/images/ceo_message.png"
                  alt="CEO 김호빈"
                  className="w-full h-full object-cover"
                />
            </div>
          </div>

          {/* --- Right Column (Text) --- */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 leading-snug">
              존경하는 이해관계자 여러분, 안녕하십니까?
            </h2>
            <p className="text-md text-gray-700 leading-relaxed">
              한국중부발전의 지속가능한 성장과 도전에 따뜻한 관심과 격려를 보내주신 여러분께 깊은 감사의 말씀을 드립니다. 한국중부발전은 지난 2001년 창사 이후, 우리나라 전력의 약 7.1%를 책임지며 국민의 일상을 지키고 국가 경제발전의 원동력을 제공해 왔습니다. 또한, 대외적으로는 인도네시아, 스페인, 미국 등 전 세계 5개국에서 17개 해외 발전사업을 운영하며 명실공히 아시아를 넘어 세계시장을 개척하는 발전회사로 성장하였습니다.
            </p>
            <p className="text-md text-gray-700 leading-relaxed">
              지난해 국제정세 불확실성과 경기둔화, 에너지 수급 위기, 재무환경 악화 등 매우 어려운 경영환경 속에서도 한국중부발전은 가장 싼 전기(판매단가 1위)를 가장 많이 공급(판매량 1위)하여 국가 경제 안정화에 기여하였으며, 해외 발전사업 역대 최대 순이익 4억 달러 달성과 약 1조 원의 비용 절감 등 고강도 자구노력으로 3년 연속 흑자를 기록하였습니다. 또한, 국내 ESG 평가기관으로부터 2년 연속 A등급 이상을 획득하고, 이를 바탕으로 한국 ESG경영 대상 공공부문 최우수상 수상 등 ESG 분야에서도 남다른 두각을 나타냈습니다.
            </p>
            <p className="text-md text-gray-700 leading-relaxed">
              첫째, 안전을 최우선 가치로 여기는 기업문화를 실현하겠습니다. 국민과 근로자의 생명과 안전을 최우선시하여 안전관리에는 어떠한 타협도 없다는 마음가짐으로 작업 현장의 모든 위험 요소를 철저히 분석하고, 선제적 예방 대책 마련을 위하여 투자와 지원을 아끼지 않겠습니다. 한국중부발전은 2024년 초 노·사가 한마음이 되어 안전하고 공정한 일터 실현 다짐을 결의하고, 안전문화 및 제도혁신을 위하여 16명의 안전 전문가로 구성된 'Safety-Innovator' 발대식을 개최하였습니다.
            </p>
             <p className="text-md text-gray-700 leading-relaxed">
              또한, 안전 동반자인 협력기업과 안전협력체계를 더욱 고도화하고, KOMIPO 안전학교 협력기업 대상을 확대하여 맞춤형 교육을 통한 안전수준 향상과 '안전-ON 시스템' 도입을 통한 전(全)주기 안전 가이드 제공 등 안전 파트너십을 더욱 강화해 나가고 있습니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
