import { Metadata } from "next";
import Navigation from "../../components/Navigation";

export const metadata: Metadata = {
  title: "ESG Watchdog | LIF",
  description: "ESG 감시 서비스 - 기업의 ESG 활동을 실시간으로 모니터링"
};

export default function ESGWatchdogPage() {
  return (
    <>
      <Navigation />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🐕</div>
              <h1 className="text-4xl font-bold text-orange-600 mb-4">ESG Watchdog</h1>
              <p className="text-xl text-gray-600">기업의 ESG 활동을 실시간으로 감시하고 분석하는 지능형 모니터링 서비스</p>
            </div>
            
            {/* 서비스 개요 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🔍</div>
                <h2 className="text-3xl font-semibold text-gray-800">서비스 개요</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl mb-2">🏢</div>
                  <h3 className="font-semibold text-gray-800 mb-2">기업 모니터링</h3>
                  <p className="text-sm text-gray-600">상장기업 1,000여 개사의 ESG 활동을 24/7 실시간 추적</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-800 mb-2">데이터 분석</h3>
                  <p className="text-sm text-gray-600">AI 기반 ESG 리스크 분석 및 예측 모델 제공</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl mb-2">🚨</div>
                  <h3 className="font-semibold text-gray-800 mb-2">알림 시스템</h3>
                  <p className="text-sm text-gray-600">ESG 이슈 발생 시 즉시 알림 및 대응 가이드 제공</p>
                </div>
              </div>
            </div>

            {/* 기업 검색 */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🔍</div>
                <h2 className="text-2xl font-semibold text-gray-800">기업 ESG 모니터링 검색</h2>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="모니터링할 기업명을 입력하세요 (예: 삼성전자, LG화학, SK하이닉스...)"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200"
                  />
                  <button className="absolute right-2 top-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-semibold">
                    검색
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    💡 팁: 여러 기업을 쉼표(,)로 구분하여 동시에 모니터링할 수 있습니다
                  </p>
                </div>
              </div>
            </div>

            {/* 핵심 기능 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">🌍</div>
                  <h3 className="text-xl font-semibold text-gray-800">환경(E) 모니터링</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>탄소 배출량 실시간 추적</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>폐기물 처리 현황 모니터링</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>재생에너지 사용률 분석</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>환경 규제 위반 사례 감지</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">👥</div>
                  <h3 className="text-xl font-semibold text-gray-800">사회(S) 모니터링</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>근로자 권익 보호 현황</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>다양성 및 포용성 지표</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>지역사회 기여 활동 추적</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>안전보건 관리 상태</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">⚖️</div>
                <h3 className="text-xl font-semibold text-gray-800">지배구조(G) 모니터링</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span>이사회 독립성 및 다양성</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span>경영진 보상 구조 분석</li>
                </ul>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span>투명성 및 공시 품질</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span>윤리경영 및 컴플라이언스</li>
                </ul>
              </div>
            </div>

            {/* 실시간 대시보드 */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">📈</div>
                <h2 className="text-2xl font-semibold text-gray-800">실시간 ESG 위험도 대시보드</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow border-l-4 border-green-500">
                  <div className="text-2xl font-bold text-green-600">892</div>
                  <div className="text-sm text-gray-600">모니터링 기업</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow border-l-4 border-yellow-500">
                  <div className="text-2xl font-bold text-yellow-600">23</div>
                  <div className="text-sm text-gray-600">주의 등급 기업</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow border-l-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600">7</div>
                  <div className="text-sm text-gray-600">위험 등급 기업</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow border-l-4 border-blue-500">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">시간 업데이트</div>
                </div>
              </div>
            </div>

            {/* AI 분석 엔진 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🤖</div>
                <h2 className="text-2xl font-semibold text-gray-800">AI 분석 엔진</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🧠</div>
                  <h3 className="font-semibold text-gray-800 mb-2">딥러닝 분석</h3>
                  <p className="text-sm text-gray-600">뉴스, SNS, 공시자료를 실시간 분석하여 ESG 리스크 조기 탐지</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <h3 className="font-semibold text-gray-800 mb-2">감정 분석</h3>
                  <p className="text-sm text-gray-600">미디어와 투자자 반응을 분석하여 ESG 평판 위험도 측정</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔮</div>
                  <h3 className="font-semibold text-gray-800 mb-2">예측 모델</h3>
                  <p className="text-sm text-gray-600">과거 데이터 기반으로 향후 ESG 이슈 발생 확률 예측</p>
                </div>
              </div>
            </div>

            {/* 알림 설정 */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🚨</div>
                <h2 className="text-2xl font-semibold text-gray-800">맞춤형 알림 서비스</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">알림 수준 설정</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-gray-700">긴급 (Critical) 이슈</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-gray-700">높음 (High) 위험도</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">보통 (Medium) 위험도</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">낮음 (Low) 위험도</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">알림 방식</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="notification" className="mr-2" defaultChecked />
                      <span className="text-gray-700">이메일 + SMS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="notification" className="mr-2" />
                      <span className="text-gray-700">이메일만</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="notification" className="mr-2" />
                      <span className="text-gray-700">대시보드 알림만</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="text-center">
              <button className="bg-orange-600 text-white py-4 px-10 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-semibold text-lg mr-4">
                🐕 Watchdog 서비스 시작하기
              </button>
              <button className="bg-gray-300 text-gray-700 py-4 px-10 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-semibold text-lg">
                📋 상세 데모 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 