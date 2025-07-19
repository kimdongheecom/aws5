import os
import asyncio
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

print('=== 환경변수 확인 ===')
print(f'DB_HOST: {os.getenv("DB_HOST", "없음")}')
print(f'DB_PORT: {os.getenv("DB_PORT", "없음")}')
print(f'DB_NAME: {os.getenv("DB_NAME", "없음")}')
print(f'DB_USER: {os.getenv("DB_USER", "없음")}')
print(f'DB_PASS: {"설정됨" if os.getenv("DB_PASS") else "없음"}')

async def main():
    print('\n=== 새로운 연결 테스트 ===')
    try:
        from app.common.database.model.database import test_connection, create_tables
        
        # 연결 테스트
        result = await test_connection()
        if result:
            print('✅ Supabase 데이터베이스 연결 성공!')
            
            # 테이블 생성 테스트
            print('\n=== 테이블 생성 테스트 ===')
            await create_tables()
            print('✅ 테이블 생성 성공!')
            
        else:
            print('❌ Supabase 데이터베이스 연결 실패!')
            
    except Exception as e:
        print(f'❌ 테스트 중 오류: {e}')

if __name__ == "__main__":
    asyncio.run(main()) 