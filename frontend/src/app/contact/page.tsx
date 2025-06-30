import { Metadata } from "next";
import Navigation from "../../components/Navigation";

export const metadata: Metadata = {
  title: "연락처 | KIM DONGHEE",
  description: "KIM DONGHEE 연락처 정보"
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">✉️</div>
              <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact</h1>
              <p className="text-xl text-gray-600">KIM DONGHEE에 대한 문의사항이 있으시면 언제든 연락주세요.</p>
            </div>

            {/* 경력사항 섹션 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">💼</div>
                <h2 className="text-3xl font-semibold text-gray-800">경력사항</h2>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🌱</div>
                  <h3 className="text-xl font-semibold text-gray-800">ESG 경영 컨설턴트</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-xl mr-2">📊</span>
                  2024년 프로젝트 진행 기업
                </h4>
                <p className="text-sm text-gray-600 mb-4 text-center">ESG 경영 전략 수립, 지속가능성 보고서 기획 및 개발 등 다양한 프로젝트를 성공적으로 진행했습니다.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="https://www.komipo.co.kr/esg/content/95/main.do?mnCd=ESG010201" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h5 className="font-semibold text-gray-800">한국중부발전</h5>
                    </div>
                  </a>
                  <a href="https://www.doosanfuelcell.com/kr/sustainability/sust-0103/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 cursor-pointer">
                    <div className="text-2xl">🔋</div>
                    <div>
                      <h5 className="font-semibold text-gray-800">두산 퓨얼셀</h5>
                    </div>
                  </a>
                  <a href="https://www.lgcns.com/company/csm/sustainabilityreport/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 cursor-pointer">
                    <div className="text-2xl">💻</div>
                    <div>
                      <h5 className="font-semibold text-gray-800">LG CNS</h5>
                    </div>
                  </a>
                  <a href="https://www.spc.co.kr/esg/esgreport" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200 cursor-pointer">
                    <div className="text-2xl">🍰</div>
                    <div>
                      <h5 className="font-semibold text-gray-800">SPC</h5>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">연락 정보</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <p className="font-semibold text-gray-700">이메일</p>
                      <p className="text-blue-600">contact@kimdonghee.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <p className="font-semibold text-gray-700">전화번호</p>
                      <p className="text-blue-600">02-1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🏢</div>
                    <div>
                      <p className="font-semibold text-gray-700">주소</p>
                      <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🕒</div>
                    <div>
                      <p className="font-semibold text-gray-700">운영시간</p>
                      <p className="text-gray-600">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">문의하기</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">메시지</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    메시지 보내기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 