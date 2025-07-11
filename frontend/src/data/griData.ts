// GRI 카테고리 타입 정의
interface GRICategory {
  id: string;
  name: string;
  description: string;
}

// GRI 공시 타입 정의
interface GRIDisclosure {
  id: string;
  category_id: string;
  name: string;
  description: string;
}

// GRI 요구사항 타입 정의
interface GRIRequirement {
  id: string;
  question: string;
  description?: string;
}

// 샘플 카테고리 데이터
export const categories: GRICategory[] = [
  {
    id: 'GRI 201',
    name: '경제성과',
    description: '조직의 경제적 성과와 시장 지위에 관한 정보'
  },
  {
    id: 'GRI 202',
    name: '시장지위',
    description: '조직의 시장 내 위치와 경제적 영향'
  },
  // 추가 카테고리...
];

// 샘플 공시 데이터
export const disclosures: GRIDisclosure[] = [
  {
    id: '201-1',
    category_id: 'GRI 201',
    name: '직접적인 경제적 가치의 창출과 배분',
    description: '조직이 창출하고 분배한 직접적 경제가치'
  },
  {
    id: '201-4',
    category_id: 'GRI 201',
    name: '정부 지원 수혜 실적',
    description: '정부로부터 받은 재정지원'
  },
  // 추가 공시...
];

// 샘플 요구사항 데이터
export const requirements: { [key: string]: GRIRequirement[] } = {
  '201-4': [
    {
      id: '201-4-1',
      question: '보고기간 중 정부로부터 받은 재정지원 금액은 얼마입니까?',
    },
    {
      id: '201-4-2',
      question: '정부 지원의 형태는 무엇입니까? (예: 보조금, R&D 지원, 세금 감면 등)',
    },
    {
      id: '201-4-3',
      question: '정부가 조직의 지배구조에 참여하고 있습니까?',
    }
  ],
  // 추가 요구사항...
};

// 샘플 제안된 진술 데이터
export const suggestedStatements: { [key: string]: string } = {
  '201-4': '당사는 보고기간 동안 정부로부터 다양한 형태의 재정지원을 받았습니다. 주요 지원 내용은 R&D 보조금과 세금 감면 혜택이며, 이를 통해 지속가능한 기술 개발에 투자하고 있습니다.',
  // 추가 진술...
}; 