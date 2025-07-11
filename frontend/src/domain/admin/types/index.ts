/**
 * 관리자 대시보드에서 사용하는 사용자 정보 타입
 */
export interface User {
  id: string;
  name: string;
  role: string;
  roleClass: string;
}

/**
 * 관리자 역할 타입
 */
export type AdminRole = 'admin' | 'superadmin';

/**
 * 사용자 역할 타입
 */
export type UserRole = 'user' | 'subscriber' | 'admin'; 