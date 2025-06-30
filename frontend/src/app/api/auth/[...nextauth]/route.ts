import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authTestHelpers } from "@/features/auth/test/authServiceTest";
import { authService } from "@/services/authService";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      },
      profile(profile) {
        console.log('Google OAuth 프로필 수신:', {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          picture: profile.picture
        });
        
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user' // 기본 역할 설정
        };
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('인증 정보 없음');
          return null;
        }

        console.log('로그인 시도:', credentials.email);

        // 개발 환경에서는 테스트 헬퍼 사용
        if (process.env.NODE_ENV === 'development' && process.env.USE_MOCK_API === 'true') {
          return authTestHelpers.mockAuthorize(credentials);
        }

        try {
          // 실제 API 연동
          const response = await authService.login({
            email: credentials.email,
            password: credentials.password
          });

          if (!response.success) {
            throw new Error(response.message);
          }

          return {
            id: response.user_id || credentials.email,
            name: response.name || '사용자',
            email: credentials.email,
            role: response.role || 'user'
          };
        } catch (error) {
          console.error('API 로그인 오류:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account) {
        console.log('NextAuth JWT 콜백: 계정 정보로 토큰 업데이트', {
          provider: account.provider,
          type: account.type,
          access_token: account.access_token ? 'present' : 'missing'
        });
        
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.provider = account.provider;
      }
      
      // user 객체가 있으면 (첫 로그인 시) user 정보에서 역할 가져오기
      if (user) {
        console.log('JWT 콜백: 사용자 정보 확인', { 
          id: user.id, 
          email: user.email, 
          role: user.role,
          name: user.name 
        });
        
        // Google 로그인의 경우 프로필 정보 저장
        if (profile && account?.provider === 'google') {
          console.log('Google 프로필 정보를 토큰에 저장');
          token.picture = user.image;
          token.email_verified = profile.email_verified;
        }
        
        // CredentialsProvider로 로그인한 경우 직접 설정된 role 사용
        if (user.role) {
          token.role = user.role;
          console.log('JWT 콜백: Credentials에서 역할 설정됨 -', user.role);
        }
        // Google 로그인 등 다른 Provider로 로그인한 경우
        else if (user.email) {
          if (user.email === 'admin' || user.email.includes('admin@')) {
            token.role = 'admin';
          } else if (user.email.includes('subscriber')) {
            token.role = 'subscriber';
          } else {
            token.role = 'user';
          }
          console.log('JWT 콜백: 이메일 기반 역할 설정됨 -', token.role);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log('NextAuth 세션 콜백: 토큰 정보로 세션 업데이트');
      session.accessToken = token.accessToken as string;
      session.user.role = (token.role as 'user' | 'subscriber' | 'admin') || 'user';
      session.user.provider = token.provider as string;
      
      if (token.picture) {
        session.user.image = token.picture as string;
      }
      
      console.log('세션 콜백: 최종 사용자 정보 -', { 
        email: session.user.email, 
        role: session.user.role,
        provider: session.user.provider,
        name: session.user.name
      });
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth 리다이렉션 콜백 상세:', { 
        url, 
        baseUrl, 
        urlObj: new URL(url, baseUrl),
        isCallback: url.includes('/callback/'),
        isAuth: url.includes('/auth/')
      });
      
      // OAuth 콜백 완료 후 메인 페이지로 리디렉션
      if (url.includes('/api/auth/callback/')) {
        console.log('-> OAuth 콜백 완료, 메인 페이지로 강제 리디렉션');
        return baseUrl;
      }
      
      // 로그인 성공 후 메인 페이지로 리디렉션
      if (url.includes('/auth/login') || url.includes('/signin')) {
        console.log('-> 로그인 페이지에서 메인 페이지로 리디렉션');
        return baseUrl;
      }
      
      // callbackUrl이 지정된 경우 해당 URL로 리디렉션
      try {
        const urlParams = new URL(url, baseUrl).searchParams;
        const callbackUrl = urlParams.get('callbackUrl');
        if (callbackUrl && callbackUrl.startsWith(baseUrl)) {
          console.log('-> 지정된 콜백 URL로 리디렉션:', callbackUrl);
          return callbackUrl;
        }
      } catch (e) {
        console.log('URL 파싱 실패, 기본 처리로 진행');
      }
      
      // 기본 홈 URL이거나 루트 접근인 경우
      if (url === baseUrl || url === `${baseUrl}/` || url.endsWith('/')) {
        console.log('-> 홈 URL 접근, 메인 페이지 유지');
        return baseUrl;
      }
      
      // 외부 URL인 경우 홈으로 리디렉션
      if (!url.startsWith(baseUrl)) {
        console.log('-> 외부 URL 차단, 홈으로 리디렉션');
        return baseUrl;
      }
      
      // 기본적으로 메인 페이지로 리디렉션
      console.log('-> 기본 메인 페이지로 리디렉션');
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('NextAuth 로그인 콜백 상세:', { 
        provider: account?.provider, 
        email: user?.email,
        name: user?.name,
        profileEmail: profile?.email,
        isOAuth: !!account?.provider,
        accountType: account?.type
      });
      
      // Google OAuth 로그인 성공 처리
      if (account?.provider === 'google' && user?.email) {
        console.log('Google OAuth 로그인 성공:', user.email);
        
        // 추가 검증 로직 (필요시)
        if (profile && 'email_verified' in profile && !profile.email_verified) {
          console.log('Google 계정 이메일 미인증으로 로그인 거부');
          return false;
        }
        
        return true;
      }
      
      // Credentials 로그인 성공 처리
      if (account?.provider === 'credentials' && user) {
        console.log('Credentials 로그인 성공:', user.email);
        return true;
      }
      
      console.log('로그인 허용됨 - 기본 처리');
      return true;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login', // 에러 발생 시에도 로그인 페이지로
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-development",
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서 디버그 모드 활성화
  
  // 에러 처리 개선
  events: {
    async signIn(message) {
      console.log('NextAuth signIn 이벤트:', message);
    },
    async signOut(message) {
      console.log('NextAuth signOut 이벤트:', message);
    },
    async createUser(message) {
      console.log('NextAuth createUser 이벤트:', message);
    },
    async session(message) {
      console.log('NextAuth session 이벤트:', message);
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };