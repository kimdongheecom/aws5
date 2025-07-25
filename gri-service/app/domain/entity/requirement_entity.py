# entities/requirement_entity.py

from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.common.database.model.database import Base

class RequirementEntity(Base):
    __tablename__ = "requirements"

    id: Mapped[str] = mapped_column(String(10), primary_key=True)
    question: Mapped[str] = mapped_column(Text(1000), nullable=False)

    # 부모(disclosures)를 참조하는 외래 키
    disclosure_id: Mapped[str] = mapped_column(ForeignKey("disclosures.id", ondelete="RESTRICT"), nullable=True)

    # 부모 관계 설정 - Forward Reference 사용
    disclosure: Mapped["DisclosureEntity"] = relationship(back_populates="requirements")

    # 1대1 관계 설정 (Requirement 1 : 1 Answer) - Forward Reference 사용
    answer: Mapped["AnswerEntity"] = relationship(
        back_populates="requirement", uselist=False
    )

    def __repr__(self):
        return f"<RequirementEntity(id={self.id})>"