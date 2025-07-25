# entities/disclosure_entity.py

from typing import List
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.common.database.model.database import Base

class DisclosureEntity(Base):
    __tablename__ = "disclosures"

    id: Mapped[str] = mapped_column(String(6), primary_key=True)
    title: Mapped[str] = mapped_column(String(70), nullable=False)

    # 부모(categories)를 참조하는 외래 키
    category_id: Mapped[str] = mapped_column(ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)

    # 부모 관계 설정 - Forward Reference 사용
    category: Mapped["CategoryEntity"] = relationship(back_populates="disclosures")

    # 자식 관계 설정 (Disclosure 1 : N Requirements) - Forward Reference 사용
    requirements: Mapped[List["RequirementEntity"]] = relationship(
        back_populates="disclosure"
    )

    # 1대1 관계 설정 (Disclosure 1 : 1 Sample) - Forward Reference 사용
    # uselist=False로 설정하여 단일 객체와 매핑합니다.
    sample: Mapped["SampleEntity"] = relationship(
        back_populates="disclosure", uselist=False
    )

    def __repr__(self):
        return f"<DisclosureEntity(id={self.id}, title='{self.title}')>"