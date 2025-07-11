// GRI 분석 요청 타입
export interface GenerateRequest {
  prompt: string;
}

// GRI 분석 응답 타입
export interface GenerateResponse {
  answer: string;
}

// GRI 분석 결과 타입
export interface GRIAnalysis {
  prompt: string;
  result: string;
  timestamp: string;
}

// 현재 분석 데이터 타입
export interface CurrentAnalysis {
  prompt: string;
  result: string;
}

// GRI 카테고리 타입
export interface GRICategory {
  id: string;
  title: string;
  year: string;
}

// GRI 공시 타입
export interface GRIDisclosure {
  id: string;
  title: string;
  category_id: string;
}

// GRI 요구사항 입력 타입
export interface RequirementInputs {
  [key: string]: string;
}

// GRI 승인된 진술 타입
export interface ApprovedStatement {
  approvedDate: string;
  status: string;
}

// GRI 승인된 진술 맵 타입
export interface ApprovedStatements {
  [key: string]: ApprovedStatement;
}

// GRI 편집된 진술 맵 타입
export interface EditedStatements {
  [key: string]: string;
}

// GRI 카테고리 데이터
export const GRI_CATEGORIES: GRICategory[] = [
  { id: 'GRI 2', title: 'General Disclosures', year: '2021' },
  { id: 'GRI 3', title: 'Material Topics', year: '2021' },
  { id: 'GRI 201', title: 'Economic Performance', year: '2016' },
  { id: 'GRI 202', title: 'Market Presence', year: '2016' },
  { id: 'GRI 203', title: 'Indirect Economic Impacts', year: '2016' },
  { id: 'GRI 204', title: 'Procurement Practices', year: '2016' },
  { id: 'GRI 205', title: 'Anti-corruption', year: '2016' },
  { id: 'GRI 206', title: 'Anti-competitive Behavior', year: '2016' },
  { id: 'GRI 207', title: 'Tax', year: '2019' },
  { id: 'GRI 301', title: 'Materials', year: '2016' },
  { id: 'GRI 302', title: 'Energy', year: '2016' },
  { id: 'GRI 303', title: 'Water and Effluents', year: '2018' },
  { id: 'GRI 304', title: 'Biodiversity', year: '2016' },
  { id: 'GRI 305', title: 'Emissions', year: '2016' },
  { id: 'GRI 306', title: 'Waste', year: '2020' },
  { id: 'GRI 308', title: 'Supplier Environmental Assessment', year: '2016' },
  { id: 'GRI 401', title: 'Employment', year: '2016' },
  { id: 'GRI 402', title: 'Labor/Management Relations', year: '2016' },
  { id: 'GRI 403', title: 'Occupational Health and Safety', year: '2018' },
  { id: 'GRI 404', title: 'Training and Education', year: '2016' },
  { id: 'GRI 405', title: 'Diversity and Equal Opportunity', year: '2016' },
  { id: 'GRI 406', title: 'Non-discrimination', year: '2016' },
  { id: 'GRI 407', title: 'Freedom of Association and Collective Bargaining', year: '2016' },
  { id: 'GRI 408', title: 'Child Labor', year: '2016' },
  { id: 'GRI 409', title: 'Forced or Compulsory Labor', year: '2016' },
  { id: 'GRI 410', title: 'Security Practices', year: '2016' },
  { id: 'GRI 411', title: 'Rights of Indigenous Peoples', year: '2016' },
  { id: 'GRI 413', title: 'Local Communities', year: '2016' },
  { id: 'GRI 414', title: 'Supplier Social Assessment', year: '2016' },
  { id: 'GRI 415', title: 'Public Policy', year: '2016' },
  { id: 'GRI 416', title: 'Customer Health and Safety', year: '2016' },
  { id: 'GRI 417', title: 'Marketing and Labeling', year: '2016' },
  { id: 'GRI 418', title: 'Customer Privacy', year: '2016' }
];

// GRI 공시 데이터
export const GRI_DISCLOSURES: GRIDisclosure[] = [
  // GRI 2 Disclosures
  { id: '2-1', title: '조직 세부 정보', category_id: 'GRI 2' },
  { id: '2-2', title: '조직의 지속 가능성 보고에 포함된 엔티티', category_id: 'GRI 2' },
  { id: '2-3', title: '보고서 보고기간, 보고주기 및 문의처', category_id: 'GRI 2' },
  { id: '2-4', title: '정보 재진술', category_id: 'GRI 2' },
  { id: '2-5', title: '외부 검증', category_id: 'GRI 2' },
  { id: '2-6', title: '활동, 가치 사슬 및 기타 비즈니스 관계', category_id: 'GRI 2' },
  { id: '2-7', title: '근로자', category_id: 'GRI 2' },
  { id: '2-8', title: '기타 근로자', category_id: 'GRI 2' },
  { id: '2-9', title: '지배구조', category_id: 'GRI 2' },
  { id: '2-10', title: '최고 거버넌스 기구의 지명 및 선정', category_id: 'GRI 2' },
  { id: '2-11', title: '최고의사결정기구 의장', category_id: 'GRI 2' },
  { id: '2-12', title: '영향 관리를 감독하는 최고의사결정기구의 역할', category_id: 'GRI 2' },
  { id: '2-13', title: '영향 관리에 대한 책임 위임', category_id: 'GRI 2' },
  { id: '2-14', title: '지속가능성 보고에 대한 최고의사결정기구 역할', category_id: 'GRI 2' },
  { id: '2-15', title: '이해관계 상충', category_id: 'GRI 2' },
  { id: '2-16', title: '중요 문제에 대한 커뮤니케이션', category_id: 'GRI 2' },
  { id: '2-17', title: '최고의사결정기구의 집단지식', category_id: 'GRI 2' },
  { id: '2-18', title: '최고의사결정기구의 성과 평가', category_id: 'GRI 2' },
  { id: '2-19', title: '보수정책', category_id: 'GRI 2' },
  { id: '2-20', title: '보수 결정 절차', category_id: 'GRI 2' },
  { id: '2-21', title: '연간 총 보상 비율', category_id: 'GRI 2' },
  { id: '2-22', title: '지속가능한 개발전략에 관한 성명서', category_id: 'GRI 2' },
  { id: '2-23', title: '정책 선언문', category_id: 'GRI 2' },
  { id: '2-24', title: '정책 공약 책임', category_id: 'GRI 2' },
  { id: '2-25', title: '부정적인 영향을 해결하기 위한 프로세스', category_id: 'GRI 2' },
  { id: '2-26', title: '제기된 우려사항 및 조언에 대한 메커니즘', category_id: 'GRI 2' },
  { id: '2-27', title: '법규제에 대한 컴플라이언스', category_id: 'GRI 2' },
  { id: '2-28', title: '멤버십 조직', category_id: 'GRI 2' },
  { id: '2-29', title: '이해관계자 참여 방식', category_id: 'GRI 2' },
  { id: '2-30', title: '단체협약', category_id: 'GRI 2' },
  
  // GRI 3 Disclosures
  { id: '3-1', title: '중요 주제 결정 과정', category_id: 'GRI 3' },
  { id: '3-2', title: '중요 주제 목록', category_id: 'GRI 3' },
  { id: '3-3', title: '중요 주제 관리', category_id: 'GRI 3' },
  
  // GRI 200 Series Disclosures (Economic)
  { id: '201-1', title: '직접적인 경제적 가치의 창출과 분배', category_id: 'GRI 201' },
  { id: '201-2', title: '기후변화에 따른 재무적 영향 및 기타 위험과 기회', category_id: 'GRI 201' },
  { id: '201-3', title: '확정급여형 연금 채무 및 기타 퇴직연금안', category_id: 'GRI 201' },
  { id: '201-4', title: '정부 재정지원', category_id: 'GRI 201' },
  
  { id: '202-1', title: '사업장 소재 지역의 최저 임금 대비 초임 임금의 비율', category_id: 'GRI 202' },
  { id: '202-2', title: '사업장이 소재한 지역사회에서 고용된 고위 임원의 비율', category_id: 'GRI 202' },
  
  { id: '203-1', title: '사회기반시설 투자 및 서비스 지원', category_id: 'GRI 203' },
  { id: '203-2', title: '중요한 간접 경제 영향', category_id: 'GRI 203' },
  
  { id: '204-1', title: '지역 공급업체에 지출하는 비용의 비중', category_id: 'GRI 204' },
  
  { id: '205-1', title: '사업장 부패 위험 평가', category_id: 'GRI 205' },
  { id: '205-2', title: '반부패 정책 및 절차에 관한 공지와 교육', category_id: 'GRI 205' },
  { id: '205-3', title: '확인된 부패사례와 이에 대한 조치', category_id: 'GRI 205' },
  
  { id: '206-1', title: '경쟁 저해 행위, 독과점 등 불공정 거래 행위에 대한 법적 조치', category_id: 'GRI 206' },
  
  { id: '207-1', title: '조세 접근법', category_id: 'GRI 207' },
  { id: '207-2', title: '조세 전략을 책임지는 지배기구, 통제 및 리스크 관리', category_id: 'GRI 207' },
  { id: '207-3', title: '조세 관련 이해관계자의 참여 및 관리', category_id: 'GRI 207' },
  { id: '207-4', title: '국가별 리포팅', category_id: 'GRI 207' },

  // GRI 300 Series Disclosures (Environmental)
  { id: '301-1', title: '원재료의 중량이나 부피', category_id: 'GRI 301' },
  { id: '301-2', title: '재생투입 원재료 사용 비율', category_id: 'GRI 301' },
  { id: '301-3', title: '재생된 제품 및 포장재', category_id: 'GRI 301' },
  
  { id: '302-1', title: '조직 내부 에너지 소비', category_id: 'GRI 302' },
  { id: '302-2', title: '조직 외부 에너지 소비', category_id: 'GRI 302' },
  { id: '302-3', title: '에너지 집약도', category_id: 'GRI 302' },
  { id: '302-4', title: '에너지 소비 감축', category_id: 'GRI 302' },
  { id: '302-5', title: '제품 및 서비스의 에너지 요구량 감축', category_id: 'GRI 302' },
  
  { id: '303-1', title: '용수 공유 자원 활용 및 교류', category_id: 'GRI 303' },
  { id: '303-2', title: '방수 관련 영향 관리', category_id: 'GRI 303' },
  { id: '303-3', title: '용수 취수량', category_id: 'GRI 303' },
  { id: '303-4', title: '용수 방류량', category_id: 'GRI 303' },
  { id: '303-5', title: '용수 소비량', category_id: 'GRI 303' },
  
  { id: '304-1', title: '보호지역 및 생물다양성 가치가 높은 지역 내 또는 그 인근에서 소유/임대/운영되는 사업장', category_id: 'GRI 304' },
  { id: '304-2', title: '조직의 사업활동, 제품, 서비스가 생물다양성에 미치는 영향', category_id: 'GRI 304' },
  { id: '304-3', title: '서식지 보호 또는 복구', category_id: 'GRI 304' },
  { id: '304-4', title: 'IUCN 적색목록 및 조직 사업의 영향을 받는 지역 내에 서식하는 국가보호종 목록', category_id: 'GRI 304' },
  
  { id: '305-1', title: '직접 온실가스 배출량 (Scope1)', category_id: 'GRI 305' },
  { id: '305-2', title: '간접 온실가스 배출량 (Scope2)', category_id: 'GRI 305' },
  { id: '305-3', title: '기타 간접 온실가스 배출량 (Scope3)', category_id: 'GRI 305' },
  { id: '305-4', title: '온실가스 배출 집약도', category_id: 'GRI 305' },
  { id: '305-5', title: '온실가스 배출 감축', category_id: 'GRI 305' },
  { id: '305-6', title: '오존층 파괴 물질 (ODS) 배출량', category_id: 'GRI 305' },
  { id: '305-7', title: '질소산화물(NOx), 황산화물(SOx) 및 기타 중요한 대기 배출량', category_id: 'GRI 305' },
  
  { id: '306-1', title: '폐기물 발생 및 중대 폐기물 관련 영향', category_id: 'GRI 306' },
  { id: '306-2', title: '폐기물 관련 중대 영향 관리', category_id: 'GRI 306' },
  { id: '306-3', title: '폐기물 발생', category_id: 'GRI 306' },
  { id: '306-4', title: '폐기되지 않은 폐기물', category_id: 'GRI 306' },
  { id: '306-5', title: '처분 대상 폐기물', category_id: 'GRI 306' },
  
  { id: '308-1', title: '환경 기준 심사를 거친 신규 공급업체', category_id: 'GRI 308' },
  { id: '308-2', title: '공급망의 부정적 환경 영향 및 이에 대한 조치', category_id: 'GRI 308' },

  // GRI 400 Series Disclosures (Social)
  { id: '401-1', title: '신규채용 및 이직', category_id: 'GRI 401' },
  { id: '401-2', title: '비정규직 근로자에게는 제공되지 않는 정규직 근로자를 위한 복리후생', category_id: 'GRI 401' },
  { id: '401-3', title: '육아휴직', category_id: 'GRI 401' },
  
  { id: '402-1', title: '운영상의 변화와 관련한 최소 공지기간', category_id: 'GRI 402' },
  
  { id: '403-1', title: '산업안전보건경영시스템', category_id: 'GRI 403' },
  { id: '403-2', title: '유해 요인 식별, 위험성 평가 및 사고 조사', category_id: 'GRI 403' },
  { id: '403-3', title: '산업보건 서비스', category_id: 'GRI 403' },
  { id: '403-4', title: '직업안전보건에 대한 근로자 참여, 협의 및 의사소통', category_id: 'GRI 403' },
  { id: '403-5', title: '산업안전보건 근로자 교육', category_id: 'GRI 403' },
  { id: '403-6', title: '근로자 건강 증진', category_id: 'GRI 403' },
  { id: '403-7', title: '경영 관계에 의해 직접적으로 연계된 산업안전보건 영향의 예방 및 저감', category_id: 'GRI 403' },
  { id: '403-8', title: '산업안전보건경영시스템의 적용을 받는 근로자', category_id: 'GRI 403' },
  { id: '403-9', title: '업무 관련 상해', category_id: 'GRI 403' },
  { id: '403-10', title: '업무 관련 질병', category_id: 'GRI 403' },
  
  { id: '404-1', title: '근로자 1인당 평균 교육 시간', category_id: 'GRI 404' },
  { id: '404-2', title: '직원 역량강화 및 평생교육 프로그램', category_id: 'GRI 404' },
  { id: '404-3', title: '정기적으로 성과 및 경력 개발 검토를 받는 직원 비율', category_id: 'GRI 404' },
  
  { id: '405-1', title: '지배구조 기구와 직원의 다양성', category_id: 'GRI 405' },
  { id: '405-2', title: '남성 대비 여성의 기본급 및 보수 비율', category_id: 'GRI 405' },
  
  { id: '406-1', title: '차별 사례 및 이에 대한 시정조치', category_id: 'GRI 406' },
  
  { id: '407-1', title: '집회결사 및 단체교섭권 훼손 위험이 있는 사업장 및 공급업체', category_id: 'GRI 407' },
  
  { id: '408-1', title: '아동노동 발생 위험이 높은 사업장 및 공급업체', category_id: 'GRI 408' },
  
  { id: '409-1', title: '강제 노역 발생 위험이 높은 사업장 및 공급업체', category_id: 'GRI 409' },
  
  { id: '410-1', title: '인권 정책 및 절차에 관한 교육을 받은 보안 담당자', category_id: 'GRI 410' },
  
  { id: '411-1', title: '토착민 권리 침해 사례', category_id: 'GRI 411' },
  
  { id: '413-1', title: '지역사회 참여, 영향 평가 및 개발 프로그램 운영 사업장', category_id: 'GRI 413' },
  { id: '413-2', title: '지역사회에 중대한 실제적/잠재적 부정적 영향을 미치는 사업장', category_id: 'GRI 413' },
  
  { id: '414-1', title: '사회적 기준에 따른 심사를 거친 신규 공급업체', category_id: 'GRI 414' },
  { id: '414-2', title: '공급망 내 부정적 사회적 영향 및 그에 대한 대응조치', category_id: 'GRI 414' },
  
  { id: '415-1', title: '정치 기부금', category_id: 'GRI 415' },
  
  { id: '416-1', title: '제품/서비스의 건강 및 안전 영향 평가', category_id: 'GRI 416' },
  { id: '416-2', title: '제품/서비스의 건강 및 안전 영향 관련 위반', category_id: 'GRI 416' },
  
  { id: '417-1', title: '제품/서비스 관련 정보 및 라벨링 요건', category_id: 'GRI 417' },
  { id: '417-2', title: '제품/서비스 정보 및 라벨링 관련 위반', category_id: 'GRI 417' },
  { id: '417-3', title: '마케팅 커뮤니케이션 관련 위반', category_id: 'GRI 417' },
  
  { id: '418-1', title: '고객 개인정보보호 위반 및 고객정보 분실 관련 입증된 민원', category_id: 'GRI 418' }
];
