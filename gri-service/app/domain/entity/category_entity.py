# entities/category_entity.py

from typing import List
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.common.database.model.database import Base # 공통 Base 클래스를 임포트합니다.
from app.domain.entity.disclosure_entity import DisclosureEntity

class CategoryEntity(Base):
    __tablename__ = "categories"

    # ERD를 참조하여 컬럼을 정의합니다.
    id: Mapped[str] = mapped_column(String(6), primary_key=True)
    title: Mapped[str] = mapped_column(String(50), nullable=False)
    year: Mapped[str] = mapped_column(String(4), nullable=True)

    # 자식 관계 설정 (Category 1 : N Disclosures)
    # 'disclosures'는 DisclosureEntity에 있는 'category'와 연결됩니다.
    disclosures: Mapped[List["DisclosureEntity"]] = relationship(
        back_populates="category"
    )

    def __repr__(self):
        return f"<CategoryEntity(id={self.id}, title='{self.title}')>"