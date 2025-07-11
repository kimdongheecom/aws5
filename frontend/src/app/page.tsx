'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const circleButtons = [
  { id: 1, name: 'Contact', href: '/contact', color: '#22C55E', icon: '/images/icon/icon-01.svg', emoji: '✉' },
  { id: 2, name: 'ESG Report', href: '/esg-report', color: '#3B82F6', icon: '/images/icon/icon-02.svg', emoji: '📊' },
  { id: 3, name: 'Stock Price', href: '/stock-price', color: '#6366F1', icon: '/images/icon/icon-03.svg', emoji: '📈' },
  { id: 4, name: 'Watchdog', href: '/watchdog', color: '#EC4899', icon: '/images/icon/icon-04.svg', emoji: '🐕' },
  { id: 5, name: 'GRI', href: '/gri', color: '#8B5CF6', icon: '/images/icon/icon-05.svg', emoji: '📄' },
  { id: 6, name: 'Thesis', href: '/thesis', color: '#A855F7', icon: '/images/icon/icon-06.svg', emoji: '📝' },
];

export default function Home() {
  const leftButtonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightButtonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const monitorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateLines = () => {
      if (!svgRef.current || !monitorRef.current) return;

      const svgContainer = svgRef.current;
      const monitorRect = monitorRef.current.getBoundingClientRect();
      const containerRect = svgContainer.parentElement?.getBoundingClientRect();
      
      if (!containerRect) return;

      // SVG 크기를 컨테이너에 맞게 설정
      svgContainer.setAttribute('width', containerRect.width.toString());
      svgContainer.setAttribute('height', containerRect.height.toString());
      svgContainer.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

      // 모니터의 상대적 위치 계산
      const monitorCenterX = monitorRect.left - containerRect.left + monitorRect.width / 2;
      const monitorCenterY = monitorRect.top - containerRect.top + monitorRect.height / 2;

      // SVG 내용 초기화
      svgContainer.innerHTML = '';

      // 왼쪽 버튼들의 연결선 그리기
      leftButtonRefs.current.forEach((buttonRef, index) => {
        if (buttonRef) {
          const buttonRect = buttonRef.getBoundingClientRect();
          const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2;
          const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2;

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          
          // 모니터 왼쪽 가장자리에서 시작 (안쪽으로 40px)
          const monitorX = monitorRect.left - containerRect.left + 40;
          const monitorY = monitorCenterY + (index - 1) * 30;

          path.setAttribute('x1', buttonCenterX.toString());
          path.setAttribute('y1', buttonCenterY.toString());
          path.setAttribute('x2', monitorX.toString());
          path.setAttribute('y2', monitorY.toString());
          path.setAttribute('stroke', circleButtons[index].color);
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('stroke-dasharray', '4,4');
          path.style.opacity = '0.5';
          svgContainer.appendChild(path);
        }
      });

      // 오른쪽 버튼들의 연결선 그리기
      rightButtonRefs.current.forEach((buttonRef, index) => {
        if (buttonRef) {
          const buttonRect = buttonRef.getBoundingClientRect();
          const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2;
          const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2;

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          
          // 모니터 오른쪽 가장자리에서 시작 (안쪽으로 40px)
          const monitorX = monitorRect.right - containerRect.left - 40;
          const monitorY = monitorCenterY + (index - 1) * 30;

          path.setAttribute('x1', buttonCenterX.toString());
          path.setAttribute('y1', buttonCenterY.toString());
          path.setAttribute('x2', monitorX.toString());
          path.setAttribute('y2', monitorY.toString());
          path.setAttribute('stroke', circleButtons[index + 3].color);
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('stroke-dasharray', '4,4');
          path.style.opacity = '0.5';
          svgContainer.appendChild(path);
        }
      });
    };

    // 초기 라인 그리기
    updateLines();

    // 윈도우 리사이즈 시 라인 업데이트
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      {/* SVG Container for connection lines */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Left Buttons */}
      <div className="absolute left-[28%] flex flex-col gap-6">
        {circleButtons.slice(0, 3).map((button, index) => (
          <Link key={button.id} href={button.href} className="group">
            <div
              ref={(el: HTMLDivElement | null) => {
                leftButtonRefs.current[index] = el;
              }}
              className="w-20 h-20 rounded-full bg-white shadow-lg flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300"
              style={{ boxShadow: `0 4px 14px 0 ${button.color}20` }}
            >
              <span className="text-2xl mb-1">{button.emoji}</span>
              <span className="text-xs font-bold text-gray-600">{button.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Monitor */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Monitor Frame */}
        <div ref={monitorRef} className="w-[600px] h-[400px] bg-[#1a1a1a] rounded-lg p-3 shadow-2xl">
          {/* Screen */}
          <div className="bg-white rounded-md overflow-hidden h-full">
            {/* Browser Bar */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border-b">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-gray-500 text-sm">www.kimdonghee.com</div>
            </div>
            
            {/* Content */}
            <div className="space-y-6 p-8">
              <h1 className="text-3xl font-bold text-blue-600 text-center">Sustainability Platform</h1>
              <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 p-8 rounded-lg">
                <h2 className="text-xl text-blue-600 text-center">ESG Dashboard</h2>
              </div>
            </div>
              </div>
            </div>
        
        {/* Monitor Stand */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-4">
          <div className="w-32 h-4 bg-[#1a1a1a] rounded-t-lg mx-auto"></div>
          <div className="w-40 h-1 bg-[#1a1a1a] rounded-lg mx-auto"></div>
              </div>
            </div>

      {/* Right Buttons */}
      <div className="absolute right-[28%] flex flex-col gap-6">
        {circleButtons.slice(3).map((button, index) => (
          <Link key={button.id} href={button.href} className="group">
            <div
              ref={(el: HTMLDivElement | null) => {
                rightButtonRefs.current[index] = el;
              }}
              className="w-20 h-20 rounded-full bg-white shadow-lg flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300"
              style={{ boxShadow: `0 4px 14px 0 ${button.color}20` }}
            >
              <span className="text-2xl mb-1">{button.emoji}</span>
              <span className="text-xs font-bold text-gray-600">{button.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}