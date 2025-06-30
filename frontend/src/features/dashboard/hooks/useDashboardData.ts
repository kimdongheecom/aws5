import { useState, useEffect } from 'react';
import { useCompanyStore } from '../store/companyStore';
import { getCompanyData } from '@/services/dashboardService';

// 데이터 타입 정의
export interface Grade {
  year: number;
  grade: string; 
}

export interface ESGGrades {
  overall: Grade[];
  environmental: Grade[];
  social: Grade[];
  governance: Grade[];
}

export interface FinancialMetrics {
  operatingMargin: number[];
  netMargin: number[];
  roe: number[];
  roa: number[];
  years: string[];
}

export interface GrowthData {
  revenueGrowth: number[];
  netIncomeGrowth: number[];
  years: string[];
}

export interface DebtLiquidityData {
  debtRatio: number[];
  currentRatio: number[];
  years: string[];
}

export interface DashboardData {
  companyName: string;
  financialMetrics: FinancialMetrics;
  growthData: GrowthData;
  debtLiquidityData: DebtLiquidityData;
  // 선택적 필드로 변경 - API 응답에 없을 수 있음
  esgGrades?: ESGGrades;
  analysis?: {
    summary: string;
    financialEsgIntegration: {
      riskAssessment: string;
      sustainabilityOutlook: string;
    };
    recommendations: string[];
  };
}

// Mock 데이터 - API 연동 전까지 사용
const mockDataMap: Record<string, DashboardData> = {
  '삼성전자': {
    companyName: '삼성전자',
    esgGrades: {
      overall: [
        { year: 2022, grade: 'B+' },
        { year: 2023, grade: 'B+' },
        { year: 2024, grade: 'A' }
      ],
      environmental: [
        { year: 2022, grade: 'B' },
        { year: 2023, grade: 'A' },
        { year: 2024, grade: 'A+' }
      ],
      social: [
        { year: 2022, grade: 'C+' },
        { year: 2023, grade: 'C+' },
        { year: 2024, grade: 'B' }
      ],
      governance: [
        { year: 2022, grade: 'B' },
        { year: 2023, grade: 'B+' },
        { year: 2024, grade: 'A' }
      ]
    },
    financialMetrics: {
      operatingMargin: [3.26, 4.40, -3.53],
      netMargin: [3.00, 3.76, 1.32],
      roe: [3.57, 3.83, 0.90],
      roa: [1.77, 2.33, 0.56],
      years: ['2022', '2023', '2024']
    },
    growthData: {
      revenueGrowth: [15.7, 12.5, 8.3],
      netIncomeGrowth: [8.3, 6.7, 5.2],
      years: ['2022', '2023', '2024']
    },
    debtLiquidityData: {
      debtRatio: [35.8, 32.5, 30.1],
      currentRatio: [245.2, 250.8, 260.5],
      years: ['2022', '2023', '2024']
    },
    analysis: {
      summary: '삼성전자는 최근 3년간 ESG 등급이 지속적으로 향상되었으며, 특히 환경(E) 부문에서 두드러진 개선을 보였습니다. 재무 건전성과 ESG 성과 간 양의 상관관계가 확인되었습니다.',
      financialEsgIntegration: {
        riskAssessment: 'ESG 개선 추세와 안정적인 재무지표를 고려할 때, 중장기 투자에 적합한 위험 수준을 보유하고 있습니다.',
        sustainabilityOutlook: '탄소 배출량 감소와 에너지 효율성 향상으로 인한 운영비 절감 효과가 예상됩니다.'
      },
      recommendations: [
        '사회(S) 부문 개선을 위한 직원 복지 및 지역사회 투자 확대',
        '지배구조(G) 강화를 위한 이사회 독립성 증진 방안 고려',
        'ESG 성과와 재무 데이터의 상관관계에 대한 정기적인 모니터링 체계 구축'
      ]
    }
  },
  'LG전자': {
    companyName: 'LG전자',
    esgGrades: {
      overall: [
        { year: 2022, grade: 'B' },
        { year: 2023, grade: 'B+' },
        { year: 2024, grade: 'A-' }
      ],
      environmental: [
        { year: 2022, grade: 'B+' },
        { year: 2023, grade: 'A-' },
        { year: 2024, grade: 'A' }
      ],
      social: [
        { year: 2022, grade: 'B-' },
        { year: 2023, grade: 'B' },
        { year: 2024, grade: 'B+' }
      ],
      governance: [
        { year: 2022, grade: 'B' },
        { year: 2023, grade: 'B' },
        { year: 2024, grade: 'B+' }
      ]
    },
    financialMetrics: {
      operatingMargin: [4.1, 4.8, 5.2],
      netMargin: [3.2, 3.5, 4.1],
      roe: [4.2, 4.5, 4.9],
      roa: [2.1, 2.3, 2.6],
      years: ['2022', '2023', '2024']
    },
    growthData: {
      revenueGrowth: [12.3, 10.1, 8.7],
      netIncomeGrowth: [7.5, 6.2, 5.8],
      years: ['2022', '2023', '2024']
    },
    debtLiquidityData: {
      debtRatio: [40.2, 38.5, 36.8],
      currentRatio: [220.5, 225.8, 230.2],
      years: ['2022', '2023', '2024']
    },
    analysis: {
      summary: 'LG전자는 환경 측면에서 강점을 보이며, 전반적인 ESG 성과가 향상되고 있습니다. 지속적인 혁신과 친환경 제품 개발이 회사의 성장 동력이 되고 있습니다.',
      financialEsgIntegration: {
        riskAssessment: '안정적인 재무구조와 개선되는 ESG 성과는 장기적 관점에서 위험을 낮추는 요소로 작용하고 있습니다.',
        sustainabilityOutlook: '제품 에너지 효율성 향상과 재활용 가능 소재 사용 확대로 장기적 경쟁력이 강화될 전망입니다.'
      },
      recommendations: [
        '사회적 책임 영역에서 공급망 관리 강화 필요',
        '지배구조 투명성 향상을 위한 정보 공개 확대',
        '친환경 기술 투자 지속 및 확대'
      ]
    }
  }
};

// 개발 환경 여부 확인
const isDevelopment = process.env.NODE_ENV === 'development';

export interface UseDashboardDataReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const { currentCompany } = useCompanyStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!currentCompany) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getCompanyData(currentCompany);
      setData(result);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentCompany]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
