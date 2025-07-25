import { NextRequest, NextResponse } from 'next/server';

// 모의 데이터를 위한 사용자 프로필 저장소
let profilesStore: Record<string, any> = {};

// 사용자 기본 프로필 생성
const createDefaultProfile = (userId: string, email: string, role: string = 'user') => {
  const isAdmin = role === 'admin';
  const currentDate = new Date().toISOString();
  
  return {
    id: userId,
    name: isAdmin ? '관리자' : `사용자_${userId.substring(0, 5)}`,
    email: email,
    role: role,
    bio: '안녕하세요! LIF 서비스를 이용해 주셔서 감사합니다.',
    phone: '010-1234-5678',
    avatar: isAdmin 
      ? 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff' 
      : 'https://ui-avatars.com/api/?name=User&background=2AAF74&color=fff',
    createdAt: currentDate,
    updatedAt: currentDate
  };
};

// GET 요청 처리 - 사용자 프로필 조회
export async function GET(request: NextRequest) {
  // Authorization 헤더에서 토큰 가져오기
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: '인증되지 않은 요청입니다.' },
      { status: 401 }
    );
  }
  
  // 토큰에서 사용자 정보 추출 (임시로 테스트 사용자 사용)
  const userId = 'test@example.com'; // 실제로는 JWT 토큰에서 추출
  
  // 프로필이 없으면 기본 프로필 생성
  if (!profilesStore[userId]) {
    profilesStore[userId] = createDefaultProfile(
      userId,
      userId,
      'user'
    );
  }
  
  // 시뮬레이션된 지연
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    data: profilesStore[userId],
    status: 200
  });
}

// PATCH 요청 처리 - 사용자 프로필 업데이트
export async function PATCH(request: NextRequest) {
  // Authorization 헤더에서 토큰 가져오기
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: '인증되지 않은 요청입니다.' },
      { status: 401 }
    );
  }
  
  // 토큰에서 사용자 정보 추출 (임시로 테스트 사용자 사용)
  const userId = 'test@example.com'; // 실제로는 JWT 토큰에서 추출
  
  // 요청 본문 파싱
  const requestData = await request.json();
  
  // 프로필이 없으면 기본 프로필 생성
  if (!profilesStore[userId]) {
    profilesStore[userId] = createDefaultProfile(
      userId,
      userId,
      'user'
    );
  }
  
  // 프로필 업데이트
  const profile = profilesStore[userId];
  const updatedProfile = {
    ...profile,
    ...requestData,
    updatedAt: new Date().toISOString()
  };
  
  // 저장소에 업데이트된 프로필 저장
  profilesStore[userId] = updatedProfile;
  
  // 시뮬레이션된 지연
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return NextResponse.json({
    data: updatedProfile,
    status: 200
  });
} 