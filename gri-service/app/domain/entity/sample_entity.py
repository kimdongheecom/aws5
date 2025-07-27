# entities/sample_entity.py

from sqlalchemy import BigInteger, Text, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.common.database.model.database import Base    

class SampleEntity(Base):
    __tablename__ = "sample"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    # ✅ [수정] Text 타입의 길이 제한을 제거하여 Supabase와 호환성을 높입니다.
    qual_data: Mapped[str] = mapped_column(Text, nullable=False)
    
    # 부모(companies)를 참조하는 외래 키
    company_id: Mapped[str] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"), nullable=True)

    # 부모(disclosures)를 참조하는 외래 키 (1대1 관계를 위해 unique=True 추가)
    disclosure_id: Mapped[str] = mapped_column(ForeignKey("disclosures.id", ondelete="CASCADE"), unique=True, nullable=False)

    # 부모 관계 설정 (N대1) - Forward Reference 사용
    company: Mapped["Company"] = relationship(back_populates="samples")

    # 부모 관계 설정 (1대1) - Forward Reference 사용
    disclosure: Mapped["DisclosureEntity"] = relationship(back_populates="sample")

    def __repr__(self):
        return f"<SampleEntity(id={self.id})>"