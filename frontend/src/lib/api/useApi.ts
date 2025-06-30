'use client';

import { useState } from 'react';
import { axiosInstance } from './axios';

interface ApiResponse<T> {
  data: T;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const handleError = (error: any): ApiError => {
    console.error('API 오류:', error);
    
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태 코드인 경우
      return {
        message: error.response.data?.message || '서버 오류가 발생했습니다.',
        status: error.response.status
      };
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      return {
        message: '서버에서 응답이 없습니다. 네트워크 연결을 확인해주세요.',
        status: 0
      };
    } else {
      // 요청 자체에 문제가 있는 경우
      return {
        message: error.message || '요청 생성 중 오류가 발생했습니다.',
        status: 0
      };
    }
  };

  const get = async <T>(url: string, params?: any): Promise<T> => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const post = async <T>(url: string, data?: any): Promise<T> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(url, data);
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const put = async <T>(url: string, data?: any): Promise<T> => {
    setLoading(true);
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(url, data);
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const patch = async <T>(url: string, data?: any): Promise<T> => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch<ApiResponse<T>>(url, data);
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const del = async <T>(url: string): Promise<T> => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete<ApiResponse<T>>(url);
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    get,
    post,
    put,
    patch,
    delete: del
  };
}; 