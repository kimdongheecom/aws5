"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import Navigation from "../../components/Navigation";

// 메타데이터는 클라이언트 컴포넌트에서 export할 수 없으므로 제거
// 대신 title을 동적으로 설정
export default function StockPricePage() {
  const [stockData, setStockData] = useState([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 185.92,
      change: +2.45,
      changePercent: +1.34,
      volume: "52.3M",
      marketCap: "2.87T"
    },
    {
      symbol: "MSFT", 
      name: "Microsoft Corporation",
      price: 378.85,
      change: +5.12,
      changePercent: +1.37,
      volume: "23.1M",
      marketCap: "2.81T"
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 131.86,
      change: -1.24,
      changePercent: -0.93,
      volume: "28.7M",
      marketCap: "1.67T"
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 248.50,
      change: +12.35,
      changePercent: +5.23,
      volume: "75.2M",
      marketCap: "789.4B"
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation", 
      price: 722.48,
      change: +18.92,
      changePercent: +2.69,
      volume: "41.5M",
      marketCap: "1.78T"
    },
    {
      symbol: "005930",
      name: "삼성전자",
      price: 71200,
      change: +800,
      changePercent: +1.14,
      volume: "12.8M",
      marketCap: "424.7조"
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // 실시간 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prevData => 
        prevData.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: stock.change + (Math.random() - 0.5) * 1,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.5
        }))
      );
      setLastUpdated(new Date());
    }, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStockData(prevData => 
        prevData.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 5
        }))
      );
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "005930") {
      return `₩${price.toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const formatChange = (change: number, symbol: string) => {
    const sign = change >= 0 ? "+" : "";
    if (symbol === "005930") {
      return `${sign}₩${change.toFixed(0)}`;
    }
    return `${sign}$${change.toFixed(2)}`;
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📈</div>
              <h1 className="text-4xl font-bold text-green-600 mb-4">실시간 주가 모니터링</h1>
              <p className="text-xl text-gray-600">글로벌 주요 기업의 실시간 주가 정보를 확인하세요</p>
              <p className="text-sm text-gray-500 mt-2">
                마지막 업데이트: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>

            {/* 새로고침 버튼 */}
            <div className="text-center mb-6">
              <button 
                onClick={refreshData}
                disabled={isLoading}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold disabled:opacity-50"
              >
                {isLoading ? "업데이트 중..." : "🔄 데이터 새로고침"}
              </button>
            </div>

            {/* 주가 카드들 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stockData.map((stock, index) => (
                <div key={stock.symbol} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                    </div>
                    <div className={`text-2xl ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.changePercent >= 0 ? '📈' : '📉'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {formatPrice(stock.price, stock.symbol)}
                      </span>
                      <div className={`text-right ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="font-semibold">
                          {formatChange(stock.change, stock.symbol)}
                        </div>
                        <div className="text-sm">
                          ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>거래량: {stock.volume}</span>
                        <span>시총: {stock.marketCap}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 시장 개요 */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 시장 개요</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2">🟢</div>
                  <h3 className="font-semibold text-gray-800 mb-1">상승 종목</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {stockData.filter(stock => stock.changePercent > 0).length}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl mb-2">🔴</div>
                  <h3 className="font-semibold text-gray-800 mb-1">하락 종목</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {stockData.filter(stock => stock.changePercent < 0).length}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-semibold text-gray-800 mb-1">총 시가총액</h3>
                  <p className="text-lg font-bold text-blue-600">$10.92T</p>
                </div>
              </div>
            </div>

            {/* 기능 소개 */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚀 주요 기능</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-semibold text-gray-800 mb-2">실시간 업데이트</h3>
                  <p className="text-sm text-gray-600">5초마다 자동 업데이트되는 실시간 주가 정보</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h3 className="font-semibold text-gray-800 mb-2">글로벌 종목</h3>
                  <p className="text-sm text-gray-600">미국, 한국 주요 기업 주가 모니터링</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📱</div>
                  <h3 className="font-semibold text-gray-800 mb-2">반응형 디자인</h3>
                  <p className="text-sm text-gray-600">모바일, 태블릿, 데스크톱 최적화</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-semibold text-gray-800 mb-2">직관적 UI</h3>
                  <p className="text-sm text-gray-600">한눈에 보기 쉬운 주가 변동 표시</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 