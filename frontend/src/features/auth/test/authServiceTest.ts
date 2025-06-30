// 테스트 계정 정보와 모의 API 코드
// useLoginForm.ts와 authOptions.ts에서 추출함

// 하드코딩된 관리자 계정 정보
export const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: 'admin1234',
  name: '관리자',
  role: 'admin' as const
};

// 하드코딩된 테스트 계정
export const TEST_USERS = [
  {
    id: 'user1',
    password: 'user1234',
    name: '일반사용자',
    role: 'user' as const
  },
  {
    id: 'subscriber1',
    password: 'sub1234',
    name: '구독자',
    role: 'subscriber' as const
  }
];

// Mock API 구현 (실제 서버 API 없이 테스트용)
export const mockApi = {
  post: async (url: string, data: any) => {
    console.log('Mock API called:', url, data);
    
    // /auth/login 엔드포인트 시뮬레이션
    if (url === '/auth/login') {
      // 하드코딩된 관리자 계정 확인
      if (data.email === ADMIN_CREDENTIALS.id && data.password === ADMIN_CREDENTIALS.password) {
        console.log('관리자 계정 로그인 성공');
        return {
          data: {
            success: true,
            message: '관리자 로그인 성공',
            token: 'mock-admin-jwt-token-' + Date.now(),
            refresh_token: 'mock-admin-refresh-token',
            user_id: ADMIN_CREDENTIALS.id,
            role: ADMIN_CREDENTIALS.role,
            name: ADMIN_CREDENTIALS.name
          }
        };
      }
      
      // 테스트 사용자 계정 확인
      const testUser = TEST_USERS.find(user => 
        user.id === data.email && user.password === data.password
      );
      
      if (testUser) {
        console.log(`${testUser.role} 계정 로그인 성공`);
        return {
          data: {
            success: true,
            message: '로그인 성공',
            token: `mock-${testUser.role}-jwt-token-` + Date.now(),
            refresh_token: `mock-${testUser.role}-refresh-token`,
            user_id: testUser.id,
            role: testUser.role,
            name: testUser.name
          }
        };
      }
      
      // 간단한 검증
      if (data.email && data.password) {
        // 특정 이메일을 admin으로 처리 (테스트용)
        const isAdmin = data.email.includes('admin@');
        
        // 성공 응답 시뮬레이션
        return {
          data: {
            success: true,
            message: '로그인 성공',
            token: 'mock-jwt-token-' + Date.now(),
            refresh_token: 'mock-refresh-token',
            user_id: data.email,
            role: isAdmin ? 'admin' : 'user', // 관리자 또는 일반 사용자 역할 지정
            name: isAdmin ? '관리자' : '사용자'
          }
        };
      } else {
        // 실패 응답 시뮬레이션
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    
    throw new Error('지원되지 않는 API 엔드포인트');
  }
};

// NextAuth 관련 테스트 헬퍼 함수들
export const authTestHelpers = {
  // 관리자 계정 체크 함수
  checkAdminCredentials: (id: string, password: string) => {
    return id === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password;
  },

  // NextAuth CredentialsProvider의 authorize 함수 로직 (테스트용)
  mockAuthorize: async (credentials: { email: string, password: string } | null) => {
    if (!credentials) {
      console.log('인증 정보 없음');
      return null;
    }

    console.log('로그인 시도:', credentials.email);

    // 관리자 계정 확인
    if (credentials.email === ADMIN_CREDENTIALS.id && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      console.log('관리자 계정 로그인 성공');
      return {
        id: ADMIN_CREDENTIALS.id,
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.id,
        role: ADMIN_CREDENTIALS.role
      };
    }

    // 테스트 사용자 계정 확인
    const testUser = TEST_USERS.find(user => 
      user.id === credentials.email && user.password === credentials.password
    );

    if (testUser) {
      console.log(`${testUser.role} 계정 로그인 성공`);
      return {
        id: testUser.id,
        name: testUser.name,
        email: testUser.id,
        role: testUser.role
      };
    }

    // 임시 처리: 특정 이메일을 관리자로 처리 (테스트용)
    if (credentials.email?.includes('admin@')) {
      console.log('admin@ 포함된 이메일: 관리자 계정으로 처리');
      return {
        id: credentials.email,
        name: '관리자',
        email: credentials.email,
        role: 'admin'
      };
    }

    // 간단한 검증
    if (credentials.email && credentials.password) {
      console.log('기본 인증 성공: 일반 사용자로 처리');
      return {
        id: credentials.email,
        name: '사용자',
        email: credentials.email,
        role: 'user'
      };
    }

    console.log('인증 실패');
    return null;
  }
};
