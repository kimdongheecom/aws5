import { Metadata } from "next";
import Navigation from "../../components/Navigation";

export const metadata: Metadata = {
  title: "석사 논문 | KIM DONGHEE",
  description: "석사 졸업 논문 소개"
};

export default function ThesisPage() {
  return (
    <>
      <Navigation />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">📝</div>
              <h1 className="text-4xl font-bold text-indigo-600 mb-4">석사 졸업 논문</h1>
              <p className="text-xl text-gray-600">기업의 지속가능성에 대한 연구</p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">논문 개요</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">📋 논문 제목</h3>
                  <p className="text-gray-600 mb-4">"ESG 경영이 기업의 디지털 전환과 지속가능성에 미치는 영향: 한국 상장기업을 중심으로"</p>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">🎓 학위 과정</h3>
                  <p className="text-gray-600 mb-4">경영학 석사 (MBA)</p>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">🏫 소속 대학교</h3>
                  <p className="text-gray-600 mb-4">서울대학교 경영대학원</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">📅 완료 일자</h3>
                  <p className="text-gray-600 mb-4">2024년 2월</p>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">👨‍🏫 지도교수</h3>
                  <p className="text-gray-600 mb-4">김교수 교수님</p>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">📊 페이지 수</h3>
                  <p className="text-gray-600 mb-4">120페이지</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  연구 목적
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• ESG 경영이 기업 성과에 미치는 영향 분석</li>
                  <li>• 디지털 전환과 ESG의 상관관계 연구</li>
                  <li>• 지속가능한 비즈니스 모델 제시</li>
                  <li>• 한국 기업의 ESG 경영 현황 파악</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔬</span>
                  연구 방법
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 한국 상장기업 300개사 데이터 분석</li>
                  <li>• 실증분석 및 회귀분석 실시</li>
                  <li>• 전문가 인터뷰 (20명)</li>
                  <li>• 국내외 사례연구 및 문헌조사</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">📈</span>
                주요 연구 결과
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-800 mb-2">ESG 성과</h4>
                  <p className="text-sm text-gray-600">ESG 우수 기업의 ROA가 평균 2.3% 높음</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl mb-2">💻</div>
                  <h4 className="font-semibold text-gray-800 mb-2">디지털 전환</h4>
                  <p className="text-sm text-gray-600">ESG와 디지털 전환 간 유의미한 정(+)의 상관관계</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl mb-2">🌱</div>
                  <h4 className="font-semibold text-gray-800 mb-2">지속가능성</h4>
                  <p className="text-sm text-gray-600">ESG 경영이 장기 성장에 기여하는 것으로 나타남</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">💡</span>
                정책 제언 및 시사점
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-xl">1️⃣</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">정부 차원</h4>
                    <p className="text-gray-600">ESG 공시 의무화 및 인센티브 제도 확대</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-xl">2️⃣</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">기업 차원</h4>
                    <p className="text-gray-600">ESG 경영을 디지털 전환 전략과 통합하여 추진</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-xl">3️⃣</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">투자자 차원</h4>
                    <p className="text-gray-600">ESG 평가를 투자 의사결정의 핵심 지표로 활용</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold mr-4">
                전체 논문 다운로드
              </button>
              <button className="bg-gray-300 text-gray-700 py-3 px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-semibold">
                요약본 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 