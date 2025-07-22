# company-service/app/common/database/model/company_entity.py

import uuid
from sqlalchemy import String, Text, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.common.database.model.database import Base # gateway에 있던 Base를 가져옵니다.

def generate_uuid():
    return str(uuid.uuid4())

class Company(Base):
    """
    Supabase 'companies' 테이블과 매핑되는 SQLAlchemy 엔티티
    """
    __tablename__ = "companies"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=generate_uuid)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    ceo_name: Mapped[str] = mapped_column(String(100), nullable=True)
    establishment_date: Mapped[Date] = mapped_column(Date, nullable=True)
    employee_count: Mapped[int] = mapped_column(Integer, nullable=True) # int4는 Integer
    company_add: Mapped[str] = mapped_column(Text, nullable=True)
    company_num: Mapped[str] = mapped_column(String(50), nullable=True)
    company_hp: Mapped[str] = mapped_column(Text, nullable=True)
    domestic_business: Mapped[str] = mapped_column(Text, nullable=True)
    overseas_business: Mapped[str] = mapped_column(Text, nullable=True) # 컬럼명 확인 필요

    def __repr__(self):
        return f"<Company(id={self.id}, name='{self.company_name}')>"