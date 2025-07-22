# gateway/app/domain/repository/login_repository.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.common.database.model.database import LoginEntityDB

class LoginRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def upsert_login_entity(self, login_data: dict) -> LoginEntityDB:
        """
        [최종 수정] 가장 단순하고 안정적인 방식으로 UPSERT를 구현합니다.
        session.get()으로 존재 여부를 확인하고, ORM 객체의 속성을 직접 수정합니다.
        """
        user_id = login_data.get('id')
        if not user_id:
            raise ValueError("upsert_login_entity에 'id'가 필요합니다.")

        # 1. session.get() 으로 해당 ID의 객체를 직접 가져옵니다. (가장 효율적)
        existing_user = await self.session.get(LoginEntityDB, user_id)

        if existing_user:
            # 2. 객체가 존재하면, 속성(attribute)을 직접 업데이트합니다.
            print(f"🔄 LoginEntityDB 업데이트: {user_id}")
            existing_user.provider = login_data.get('provider')
            existing_user.access_token = login_data.get('access_token')
            existing_user.refresh_token = login_data.get('refresh_token')
            existing_user.expires_at = login_data.get('expires_at')
            # session.add()는 필요 없습니다. 이미 세션이 추적하고 있습니다.
            return existing_user
        else:
            # 3. 객체가 없으면, 새로 생성하고 세션에 추가합니다.
            print(f"✨ LoginEntityDB 새로 생성: {user_id}")
            new_user = LoginEntityDB(**login_data)
            self.session.add(new_user)
            return new_user