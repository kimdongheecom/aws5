from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.common.database.model.database import LoginEntityDB

class LoginRepository:
    def __init__(self, session: AsyncSession): self.session = session
    async def upsert_login_entity(self, login_data: dict) -> LoginEntityDB:
        user_id = login_data.get('id')
        print(f"🔍 Repository: user_id type={type(user_id)}, value={user_id}")
        
        if not user_id:
            raise ValueError("upsert_login_entity에 'id'가 필요합니다.")

        # ✅ [수정] execution_options 제거하고 간단한 select 문 사용
        print(f"🔍 Repository: select(LoginEntityDB) 호출 전")
        stmt = select(LoginEntityDB).where(LoginEntityDB.id == user_id)
        
        result = await self.session.execute(stmt)
        existing_user = result.scalar_one_or_none()
        print(f"🔍 Repository: select(LoginEntityDB) 호출 후, existing_user={existing_user}")

        if existing_user:
            print(f"🔄 LoginEntityDB 업데이트: {user_id}")
            existing_user.provider = login_data.get('provider')
            existing_user.access_token = login_data.get('access_token')
            existing_user.refresh_token = login_data.get('refresh_token')
            existing_user.expires_at = login_data.get('expires_at')
            return existing_user
        else:
            print(f"✨ LoginEntityDB 새로 생성: {user_id}")
            new_user = LoginEntityDB(**login_data)
            self.session.add(new_user)
            return new_user