// 프로필 API 모킹 (실제 서버 API 없이 테스트용)

// 사용자 프로필 인터페이스
export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: 'user' | 'subscriber' | 'admin';
  bio?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// 프로필 업데이트 인터페이스
export interface UpdateProfileData {
  name?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
}

// 세션 스토리지에서 프로필 데이터를 가져오거나 기본값 설정
const getStoredProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  
  const storedProfile = sessionStorage.getItem('userProfile');
  return storedProfile ? JSON.parse(storedProfile) : null;
};

// 세션 스토리지에 프로필 데이터 저장
const storeProfile = (profile: UserProfile): void => {
  if (typeof window === 'undefined') return;
  
  sessionStorage.setItem('userProfile', JSON.stringify(profile));
};

// 프로필 API 객체
export const profileApi = {
  // 사용자 프로필 정보 가져오기
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    console.log('프로필 데이터 요청:', userId);
    
    // 이미 저장된 프로필이 있는지 확인
    const storedProfile = getStoredProfile();
    if (storedProfile && storedProfile.userId === userId) {
      console.log('저장된 프로필 사용');
      return storedProfile;
    }
    
    // 서버에서 데이터를 가져오는 대신 모의 데이터 생성
    await new Promise(resolve => setTimeout(resolve, 500)); // 실제 API 호출 시뮬레이션
    
    const currentDate = new Date().toISOString();
    const isAdmin = userId.includes('admin');
    
    const mockProfile: UserProfile = {
      userId,
      name: isAdmin ? '관리자' : '사용자',
      email: userId,
      role: isAdmin ? 'admin' : 'user',
      bio: '안녕하세요! LIF 서비스를 이용해 주셔서 감사합니다.',
      phone: '010-1234-5678',
      avatar: isAdmin 
        ? 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff' 
        : 'https://ui-avatars.com/api/?name=User&background=2AAF74&color=fff',
      createdAt: currentDate,
      updatedAt: currentDate
    };
    
    // 세션 스토리지에 저장
    storeProfile(mockProfile);
    
    return mockProfile;
  },
  
  // 프로필 정보 업데이트
  updateProfile: async (userId: string, data: UpdateProfileData): Promise<UserProfile> => {
    console.log('프로필 업데이트 요청:', { userId, data });
    
    // 기존 프로필 가져오기
    const currentProfile = await profileApi.getUserProfile(userId);
    
    // 새 데이터로 업데이트
    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    // 서버 업데이트 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 세션 스토리지에 저장
    storeProfile(updatedProfile);
    
    return updatedProfile;
  }
}; 