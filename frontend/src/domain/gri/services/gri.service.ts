import axios from 'axios';
import { GenerateRequest, GenerateResponse } from '../model/gri.model';

export class GriService {
  private static instance: GriService;
  private readonly baseUrl: string;

  private constructor() {
    // Gateway 서비스를 통해 요청
    this.baseUrl = '/api/gri';
  }

  // 싱글톤 패턴 구현
  public static getInstance(): GriService {
    if (!GriService.instance) {
      GriService.instance = new GriService();
    }
    return GriService.instance;
  }

  /**
   * GRI 분석 텍스트 생성 요청
   * @param prompt 분석할 텍스트
   * @returns 생성된 GRI 분석 결과
   * @throws 요청 실패 시 에러
   */
  public async generateText(prompt: string): Promise<string> {
    try {
      const response = await axios.post<GenerateResponse>(
        `${this.baseUrl}/generate`,
        { prompt } as GenerateRequest
      );

      return response.data.answer;
    } catch (error: any) {
      if (error.response) {
        // 서버에서 응답이 왔지만 에러인 경우
        const errorMessage = error.response.data.detail || '서버 오류가 발생했습니다.';
        throw new Error(errorMessage);
      } else if (error.request) {
        // 요청은 보냈지만 응답이 없는 경우
        throw new Error('서버에 연결할 수 없습니다.');
      } else {
        // 요청 자체가 실패한 경우
        throw new Error('요청을 보내는 중 오류가 발생했습니다.');
      }
    }
  }
}

// 서비스 인스턴스 export
export const griService = GriService.getInstance();
