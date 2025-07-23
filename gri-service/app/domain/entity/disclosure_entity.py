# entities/disclosure_entity.py

from typing import List
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.common.database import Base
from app.domain.entity.category_entity import CategoryEntity
from app.domain.entity.requirement_entity import RequirementEntity
from app.domain.entity.sample_entity import SampleEntity

class DisclosureEntity(Base):
    __tablename__ = "disclosures"

    id: Mapped[str] = mapped_column(String(6), primary_key=True)
    title: Mapped[str] = mapped_column(String(70), nullable=False)

    # 부모(categories)를 참조하는 외래 키
    category_id: Mapped[str] = mapped_column(ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)

    # 부모 관계 설정
    # 'category'는 CategoryEntity에 있는 'disclosures'와 연결됩니다.
    category: Mapped["CategoryEntity"] = relationship(back_populates="disclosures")

    # 자식 관계 설정 (Disclosure 1 : N Requirements)
    requirements: Mapped[List["RequirementEntity"]] = relationship(
        back_populates="disclosure"
    )

    # 1대1 관계 설정 (Disclosure 1 : 1 Sample)
    # uselist=False로 설정하여 단일 객체와 매핑합니다.
    sample: Mapped["SampleEntity"] = relationship(
        back_populates="disclosure", uselist=False
    )

    def __repr__(self):
        return f"<DisclosureEntity(id={self.id}, title='{self.title}')>"