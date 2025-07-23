# company-service/app/common/database/model/company_entity.py

import uuid
from typing import List # List 임포트 추가
from sqlalchemy import String, Text, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship # relationship 임포트 추가
from app.common.database.model.database import Base
from app.domain.entity.profile_entity import ProfileEntity
from app.domain.entity.sample_entity import SampleEntity

def generate_uuid():
    return str(uuid.uuid4())

class Company(Base):
    __tablename__ = "companies"

    # --- 기존 코드 유지 ---
    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=generate_uuid)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    ceo_name: Mapped[str] = mapped_column(String(100), nullable=True)
    establishment_date: Mapped[Date] = mapped_column(Date, nullable=True)
    employee_count: Mapped[int] = mapped_column(Integer, nullable=True)
    company_add: Mapped[str] = mapped_column(Text, nullable=True)
    company_num: Mapped[str] = mapped_column(String(50), nullable=True)
    company_hp: Mapped[str] = mapped_column(Text, nullable=True)
    domestic_business: Mapped[str] = mapped_column(Text, nullable=True)
    overseas_business: Mapped[str] = mapped_column(Text, nullable=True)

    # --- 관계 설정 추가 ---
    # 1. Company 1 : N Profiles
    # 'profiles'는 ProfileEntity의 'company'와 연결됩니다.
    profiles: Mapped[List["ProfileEntity"]] = relationship(
        "ProfileEntity", back_populates="company"
    )

    # 2. Company 1 : N Samples
    # 'samples'는 SampleEntity의 'company'와 연결됩니다.
    samples: Mapped[List["SampleEntity"]] = relationship(
        "SampleEntity", back_populates="company"
    )
    # --- 관계 설정 추가 완료 ---

    def __repr__(self):
        return f"<Company(id={self.id}, name='{self.company_name}')>"