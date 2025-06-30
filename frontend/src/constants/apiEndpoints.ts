/**
 * API 엔드포인트 상수
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    ME: '/auth/me',
  },
  DASHBOARD: {
    COMPANY_DATA: '/dashboard/company',
    COMPANY_LIST: '/dashboard/companies',
    ESG_GRADES: '/dashboard/esg-grades',
    FINANCIAL_METRICS: '/dashboard/financial-metrics',
    COMPANY_ANALYSIS: '/dashboard/company-analysis',
  },
}; 