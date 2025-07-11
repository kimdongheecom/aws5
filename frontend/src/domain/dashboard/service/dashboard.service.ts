import axios from 'axios';

// API 기본 URL - Gateway 서비스로 연결
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// API 엔드포인트
const ENDPOINTS = {
  COMPANY_DATA: '/fin/financial',
  COMPANY_LIST: '/fin/companies',
};

export interface DashboardData {
  companyName: string;
  financialMetrics: {
    operatingMargin: number[];
    netMargin: number[];
    roe: number[];
    roa: number[];
    years: string[];
  };
  growthData: {
    revenueGrowth: number[];
    netIncomeGrowth: number[];
    years: string[];
  };
  debtLiquidityData: {
    debtRatio: number[];
    currentRatio: number[];
    years: string[];
  };
}

/**
 * 회사 데이터 조회 API 함수
 * @param companyName 조회할 회사명
 * @returns 회사 대시보드 데이터
 */
export const getCompanyData = async (companyName: string): Promise<DashboardData> => {
  try {
    const url = `${API_BASE_URL}${ENDPOINTS.COMPANY_DATA}`;
    const params = { company_name: companyName };
    
    console.log('API 요청 URL:', url);
    console.log('요청 파라미터:', params);
    
    const response = await axios.post<DashboardData>(url, null, {
      params,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('대시보드 데이터 조회 실패:', error);
    if (axios.isAxiosError(error)) {
      console.error('요청 URL:', error.config?.url);
      console.error('요청 메서드:', error.config?.method);
      console.error('요청 데이터:', error.config?.data);
      console.error('응답 상태:', error.response?.status);
      console.error('응답 데이터:', error.response?.data);
    }
    throw error;
  }
};

/**
 * 회사 목록 조회 API 함수
 * @returns 회사 목록
 */
export const getCompanyList = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}${ENDPOINTS.COMPANY_LIST}`);
    return response.data;
  } catch (error) {
    console.error('회사 목록 조회 실패:', error);
    throw error;
  }
};
