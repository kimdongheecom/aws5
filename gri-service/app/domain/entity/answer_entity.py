# app/domain/entity/answer_entity.py

from sqlalchemy import BigInteger, Text, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

# [경로 수정] database.py의 새 경로에서 Base를 임포트합니다.
from app.common.database.model.database import Base

class AnswerEntity(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    quant_data: Mapped[str] = mapped_column(Text, nullable=False)

    requirement_id: Mapped[str] = mapped_column(ForeignKey("requirements.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[str] = mapped_column(ForeignKey("profiles.id", ondelete="CASCADE"), nullable=True)

    # 부모 관계 설정 - Forward Reference 사용
    requirement: Mapped["RequirementEntity"] = relationship(back_populates="answer")
    user: Mapped["ProfileEntity"] = relationship(back_populates="answers")

    def __repr__(self):
        return f"<AnswerEntity(id={self.id})>"