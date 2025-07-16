// httpOnly 쿠키 기반 토큰 관리
// httpOnly 쿠키는 보안상 JavaScript에서 접근할 수 없으므로
// 모든 인증 확인은 백엔드 API 호출로 처리됩니다.

import axios from 'axios';

// axios 인스턴스 생성 (쿠키 자동 포함)
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080',
  withCredentials: true, // httpOnly 쿠키 자동 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

// httpOnly 쿠키는 JavaScript에서 접근할 수 없으므로 
// 토큰 존재 여부는 백엔드 API 호출로만 확인
export const getAccessToken = (): string | null => {
  console.log('🔒 httpOnly 쿠키 사용 중 - 토큰은 백엔드에서 자동 처리');
  return null; // 항상 null 반환, 실제 인증은 백엔드에서 쿠키로 처리
}

// 로그아웃 시 백엔드 API를 호출하여 쿠키 삭제
export const removeAccessToken = async (): Promise<void> => {
  try {
    console.log('🗑️ 로그아웃 처리 시작');
    
    // 백엔드 로그아웃 API 호출 (httpOnly 쿠키 삭제)
    await apiClient.post('/auth/logout');
    console.log('✅ 백엔드 로그아웃 성공 - httpOnly 쿠키 삭제됨');
    
  } catch (error) {
    console.error('❌ 로그아웃 API 호출 실패:', error);
  }
}

// httpOnly 쿠키 환경에서는 토큰 만료 확인을 백엔드에서 처리
export const isTokenExpired = (token: string | null): boolean => {
  console.log('🔍 토큰 만료 확인은 백엔드 API 호출로 처리됩니다');
  return false; // 항상 false 반환, 실제 검증은 백엔드에서
}

// httpOnly 쿠키에서는 토큰 설정을 백엔드에서만 처리
export const setAccessToken = (token: string): void => {
  console.log('🔒 httpOnly 쿠키 환경에서는 토큰 설정을 백엔드에서만 처리합니다');
  // 실제로는 아무것도 하지 않음 - 백엔드에서 쿠키 설정
}