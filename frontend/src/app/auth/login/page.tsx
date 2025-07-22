'use client';

import React, { useState, useCallback } from 'react';
import { Mail, Lock } from 'lucide-react';

// Google 로고 SVG 아이콘 컴포넌트
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.596,44,31.016,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// 새로운 로그인 페이지 컴포넌트
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('이메일/비밀번호 로그인 시도:', { email, password });
  };
  
  // ✨ [핵심 수정] handleGoogleLogin 함수 수정
  const handleGoogleLogin = useCallback(() => {
    console.log('🚀 Google 로그인 시작');
    try {
      // [수정] redirectUri를 최종 목적지인 '/dashboard'로 변경합니다.
      // 이렇게 하면 백엔드가 모든 처리를 끝내고 사용자를 바로 대시보드로 보냅니다.
      const redirectUri = `${window.location.origin}/dashboard`;
      
      const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
      
      // 백엔드의 로그인 시작 URL 호출 (redirect_uri를 state 파라미터로 사용)
      const googleOAuthUrl = `${gatewayUrl}/auth/google/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
      
      console.log('🌐 Google OAuth URL로 리다이렉트:', googleOAuthUrl);
      window.location.href = googleOAuthUrl;
    } catch (error) {
      console.error('❌ Google 로그인 에러:', error);
    }
  }, []);

  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 sm:p-12 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900">
            ESG-AI Platform
          </h1>
          <p className="mt-3 text-gray-600">
            지속 가능한 미래를 위한 데이터 기반 인사이트
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            로그인
          </button>
        </form>
        
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">또는</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-50 border border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <GoogleIcon />
          <span>Google 계정으로 계속하기</span>
        </button>
        
        <div className="mt-6 text-sm flex justify-between">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">회원가입</a>
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
}