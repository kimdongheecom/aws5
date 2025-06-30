const ACCESS_TOKEN_KEY = 'access_token'
// 리프레시 토큰은 HTTP-Only 쿠키로 관리되므로 클라이언트에서는 직접 접근하지 않음

export const setAccessToken = (token: string) => {
  console.log('🆔🆔🆔🆔🆔setAccessToken :', token)
  localStorage.setItem(ACCESS_TOKEN_KEY, token) // Authorization 헤더에 토큰 저장
}

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }
  return null
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// 토큰 만료 여부 확인 (JWT 디코딩)
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  
  try {
    // JWT의 페이로드 부분 디코딩
    const payload = JSON.parse(atob(token.split('.')[1]));
    // 만료 시간 확인 (exp 값은 초 단위)
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('토큰 파싱 오류:', error);
    return true;
  }
}