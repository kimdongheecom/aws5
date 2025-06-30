'use client';

// import { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Kim Donghee",
//   description: "Kim Donghee - 지속가능성 전문가"
// };

export default function Home() {
  const { data: session, status } = useSession();

  // alert 창이 들어갈 공간간
  useEffect(() => {
    // const currentTime = new Date();
    // const formattedTime = currentTime.toLocaleString('ko-KR', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false
    // });
    
    // alert(`페이지가 로드되었습니다!\n현재 시간: ${formattedTime}`);
    console.log('메인 페이지가 로드되었습니다.');
  }, []);

  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: '/',
      redirect: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* 배경 장식 원들 */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-5 w-24 h-24 bg-indigo-200 rounded-full opacity-25"></div>
      
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen relative">
        {/* 로그인/로그아웃 버튼 - 상단 우측 */}
        <div className="absolute top-4 right-4 z-20">
          {status === "loading" ? (
            <div className="bg-gray-200 animate-pulse py-2 px-6 rounded-full">
              <span className="text-gray-400">로딩중...</span>
            </div>
          ) : session ? (
            <div className="flex items-center space-x-4">
              {/* 사용자 정보 표시 */}
              <div className="bg-white text-blue-600 font-medium py-2 px-4 rounded-full shadow-lg border-2 border-blue-200">
                <span>안녕하세요, {session.user?.name || session.user?.email || '사용자'}님</span>
              </div>
              {/* 로그아웃 버튼 */}
              <button 
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg border-2 border-blue-500 hover:border-blue-600 transition-all duration-300 hover:scale-105"
                data-testid="logout-button"
              >
                <div className="flex items-center space-x-2">
                  <span>🚪</span>
                  <span>로그아웃</span>
                </div>
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <button 
                className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-105"
                data-testid="login-button"
              >
                <div className="flex items-center space-x-2">
                  <span>🔐</span>
                  <span>로그인</span>
                </div>
              </button>
            </Link>
          )}
        </div>

        {/* 메인 컨테이너 */}
        <div className="relative w-full max-w-6xl">
          
          {/* 중앙 컴퓨터 화면 */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* 모니터 베젤 */}
              <div className="bg-gray-800 rounded-t-2xl p-4 shadow-2xl">
                <div className="bg-white rounded-lg overflow-hidden" style={{width: '600px', height: '400px'}}>
                  {/* 브라우저 헤더 */}
                  <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md px-3 py-1 text-sm text-gray-500">
                      www.kimdonghee.com
                    </div>
                  </div>
                  {/* 웹페이지 내용 */}
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                    <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                      Sustainability Platform
                    </h1>
                    <div className="space-y-3">
                      <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                      <div className="h-4 bg-blue-150 rounded w-1/2"></div>
                      <div className="h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg mt-6 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">ESG Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 모니터 스탠드 */}
              <div className="bg-gray-300 w-24 h-8 mx-auto rounded-b-lg"></div>
              <div className="bg-gray-400 w-32 h-4 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* 점선 연결선 SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 1}}>
            {/* 이메일 아이콘과 모니터 연결선 */}
            <line
              x1="12%" y1="20%"
              x2="35%" y2="45%"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
            
            {/* 주가 아이콘과 모니터 연결선 */}
            <line
              x1="12%" y1="80%"
              x2="35%" y2="55%"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
            
            {/* 보고서 아이콘과 모니터 연결선 */}
            <line
              x1="12%" y1="50%"
              x2="30%" y2="50%"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
            
            {/* 강아지 아이콘과 모니터 연결선 */}
            <line
              x1="88%" y1="20%"
              x2="65%" y2="45%"
              stroke="#F97316"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
            
            {/* 논문 아이콘과 모니터 연결선 */}
            <line
              x1="88%" y1="80%"
              x2="65%" y2="55%"
              stroke="#6366F1"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />

            {/* GRI 아이콘과 모니터 연결선 */}
            <line
              x1="84%" y1="50%"
              x2="65%" y2="50%"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />

            {/* 추가 장식 점선들 */}
            <circle cx="20%" cy="35%" r="2" fill="#3B82F6" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="80%" cy="35%" r="2" fill="#F97316" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="20%" cy="65%" r="2" fill="#10B981" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="80%" cy="65%" r="2" fill="#6366F1" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="75%" cy="50%" r="2" fill="#8B5CF6" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </svg>

          {/* 원형 아이콘들 */}
          
          image.png                    {/* GRI 아이콘 - 오른쪽 중앙 */}
          <Link href="/gri" className="absolute top-1/2 right-0 transform -translate-y-1/2 group z-10">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-purple-100" data-testid="gri-button">
              <div className="text-center">
                <div className="text-3xl mb-1">📋</div>
                <div className="text-xs font-semibold text-gray-700">GRI</div>
              </div>
            </div>
          </Link>
          
          {/* 이메일 아이콘 - 왼쪽 상단 */}
          <Link href="/contact" className="absolute top-0 left-0 group z-10">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-blue-100">
              <div className="text-center">
                <div className="text-3xl mb-1">✉️</div>
                <div className="text-xs font-semibold text-gray-700">Contact</div>
              </div>
            </div>
          </Link>

          {/* 주가 상승 아이콘 - 왼쪽 하단 */}
          <Link href="/stock-price" className="absolute bottom-0 left-0 group z-10">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-green-100">
              <div className="text-center">
                <div className="text-3xl mb-1">📈</div>
                <div className="text-xs font-semibold text-gray-700">Stock Price</div>
              </div>
            </div>
          </Link>

          {/* 보고서 아이콘 - 왼쪽 중앙 */}
          <Link href="/home" className="absolute top-1/2 left-0 transform -translate-y-1/2 group z-10">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-green-100">
              <div className="text-center">
                <div className="text-3xl mb-1">📊</div>
                <div className="text-xs font-semibold text-gray-700">ESG Report</div>
              </div>
            </div>
          </Link>

          {/* 강아지 아이콘 - 오른쪽 상단 */}
          <Link href="/watchdog" className="absolute top-0 right-0 group z-10">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-orange-100">
              <div className="text-center">
                <div className="text-3xl mb-1">🐕</div>
                <div className="text-xs font-semibold text-gray-700">Watchdog</div>
              </div>
            </div>
          </Link>

          {/* 논문 아이콘 - 오른쪽 하단 */}
          <Link href="/thesis" className="absolute bottom-0 right-0 group z-10">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-indigo-100">
              <div className="text-center">
                <div className="text-3xl mb-1">📝</div>
                <div className="text-xs font-semibold text-gray-700">Thesis</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}