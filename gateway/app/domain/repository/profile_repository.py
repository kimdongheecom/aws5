from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.common.database.model.database import Profile

class ProfileRepository:
    def __init__(self, session: AsyncSession): self.session = session
    async def upsert_profile(self, profile_data: dict) -> Profile:
        user_id = profile_data.get('id')
        if not user_id:
            raise ValueError("upsert_profile에 'id'가 필요합니다.")

        # ✅ [수정] execution_options 제거하고 간단한 select 문 사용
        stmt = select(Profile).where(Profile.id == user_id)

        result = await self.session.execute(stmt)
        existing_profile = result.scalar_one_or_none()

        if existing_profile:
            print(f"🔄 Profile 업데이트: {user_id}")
            existing_profile.name = profile_data.get('name')
            existing_profile.email = profile_data.get('email')
            existing_profile.picture = profile_data.get('picture')
            return existing_profile
        else:
            print(f"✨ Profile 새로 생성: {user_id}")
            new_profile = Profile(**profile_data)
            self.session.add(new_profile)
            return new_profile