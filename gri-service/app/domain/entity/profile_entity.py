# entities/profile_entity.py

from typing import List, TYPE_CHECKING
from sqlalchemy import String, Text, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.common.database.model.database import Base
from app.domain.entity.company_entity import Company

if TYPE_CHECKING:
    from app.domain.entity.answer_entity import AnswerEntity

class ProfileEntity(Base):
    __tablename__ = "profiles"

    # ERD 및 기존 코드를 참조하여 SQLAlchemy ORM 모델로 정의
    id: Mapped[str] = mapped_column(String(30), primary_key=True)
    name: Mapped[str] = mapped_column(String(30), nullable=True)
    picture: Mapped[str] = mapped_column(String(70), nullable=True)
    email: Mapped[str] = mapped_column(String(70), unique=True, nullable=True) # email은 고유해야 할 수 있음
    email_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default='false')
    locale: Mapped[str] = mapped_column(String(10), nullable=True)
    department: Mapped[str] = mapped_column(String(20), nullable=True)
    role: Mapped[str] = mapped_column(String(20), nullable=True)

    # 부모(companies)를 참조하는 외래 키
    company_id: Mapped[str] = mapped_column(ForeignKey("companies.id"), nullable=True)

    # --- 관계 설정 추가 ---
    # 1. 부모 관계 설정 (Profile N : 1 Company)
    # 'company'는 Company 클래스의 'profiles'와 연결됩니다.
    company: Mapped["Company"] = relationship(back_populates="profiles")

    # 2. 자식 관계 설정 (Profile 1 : N Answers)
    # 'answers'는 AnswerEntity의 'user'와 연결됩니다.
    answers: Mapped[List["AnswerEntity"]] = relationship(back_populates="user")
    # --- 관계 설정 추가 완료 ---

    def __repr__(self):
        return f"<ProfileEntity(id={self.id}, name='{self.name}')>"