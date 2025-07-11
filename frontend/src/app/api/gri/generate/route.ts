import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Gateway 서비스로 요청 전달
    const response = await axios.post('http://localhost:8080/api/gri/generate', body, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60초 타임아웃
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('GRI 생성 오류:', error);
    
    if (error.response) {
      // 서버에서 응답이 왔지만 에러인 경우
      return NextResponse.json(
        { error: error.response.data.message || '서버 오류가 발생했습니다.' },
        { status: error.response.status }
      );
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      return NextResponse.json(
        { error: 'GRI 서비스에 연결할 수 없습니다. 서비스가 실행 중인지 확인해주세요.' },
        { status: 503 }
      );
    } else {
      // 요청 자체를 보내지 못한 경우
      return NextResponse.json(
        { error: '요청을 처리하는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  }
} 