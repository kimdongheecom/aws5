# gateway/app/domain/repository/profile_repository.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.common.database.model.database import Profile

class ProfileRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def upsert_profile(self, profile_data: dict) -> Profile:
        """
        [최종 수정] 가장 단순하고 안정적인 방식으로 UPSERT를 구현합니다.
        """
        user_id = profile_data.get('id')
        if not user_id:
            raise ValueError("upsert_profile에 'id'가 필요합니다.")

        # 1. session.get() 으로 해당 ID의 객체를 직접 가져옵니다.
        existing_profile = await self.session.get(Profile, user_id)

        if existing_profile:
            # 2. 객체가 존재하면, 속성을 직접 업데이트합니다.
            print(f"🔄 Profile 업데이트: {user_id}")
            existing_profile.name = profile_data.get('name')
            existing_profile.email = profile_data.get('email')
            existing_profile.picture = profile_data.get('picture')
            return existing_profile
        else:
            # 3. 객체가 없으면, 새로 생성하고 세션에 추가합니다.
            print(f"✨ Profile 새로 생성: {user_id}")
            new_profile = Profile(**profile_data)
            self.session.add(new_profile)
            return new_profile