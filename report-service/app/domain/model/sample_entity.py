from sqlalchemy import String, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.common.database.model.database import Base

class Sample(Base):
    """
    Supabase 'sample' 테이블과 매핑되는 SQLAlchemy 엔티티
    """
    __tablename__ = "sample"

    # 테이블 정의에 맞게 컬럼을 설정합니다.
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    qual_data: Mapped[str] = mapped_column(Text, nullable=True)
    company_id: Mapped[str] = mapped_column(String(255), nullable=True)
    disclosure_id: Mapped[str] = mapped_column(String(255), nullable=True)

    def __repr__(self):
        return f"<Sample(id={self.id}, company_id='{self.company_id}', disclosure_id='{self.disclosure_id}')>"