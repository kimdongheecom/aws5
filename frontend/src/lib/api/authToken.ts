// 쿠키 기반 토큰 관리 (localStorage 사용 제거)

// httponly 쿠키는 JavaScript에서 접근할 수 없으므로 
// 토큰 존재 여부는 백엔드 API 호출로만 확인
export const getAccessToken = (): string | null => {
  // httponly 쿠키는 브라우저가 자동으로 전송하므로
  // 프론트엔드에서 직접 읽을 필요 없음
  console.log('🔒 httponly 쿠키 사용 중 - 토큰은 백엔드에서 자동 처리');
  return null; // 항상 null 반환, 실제 인증은 백엔드에서 쿠키로 처리
}

// 쿠키에서 토큰 제거 (로그아웃 시 사용)
export const removeAccessToken = () => {
  if (typeof document !== 'undefined') {
    console.log('🗑️ 쿠키 삭제 시작');
    // Docker 환경에서는 domain 설정 제거
    document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('🗑️ 쿠키 삭제 완료');
  }
}

// httponly 쿠키 환경에서는 토큰 만료 확인을 백엔드에서 처리
export const isTokenExpired = (token: string | null): boolean => {
  // httponly 쿠키는 프론트엔드에서 접근 불가하므로
  // 백엔드 API 호출로 토큰 유효성 확인
  return false; // 일단 false 반환, 실제 검증은 백엔드에서
}

// 토큰 설정 함수는 제거 (서버에서 쿠키로 설정하므로 불필요)
// setAccessToken 함수는 더 이상 사용하지 않음