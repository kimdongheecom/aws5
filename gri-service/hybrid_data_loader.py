#!/usr/bin/env python3
# hybrid_data_loader.py - Excel + Database 하이브리드 데이터 로더

import os
import pandas as pd
import logging
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)

@dataclass
class DataConfig:
    """데이터 소스 설정"""
    source_type: str  # "excel", "database", "auto"
    excel_path: Optional[str] = None
    db_connection_string: Optional[str] = None
    auto_threshold: int = 1000  # 이 개수 이상이면 DB 사용

class DataLoaderInterface(ABC):
    """데이터 로더 인터페이스"""
    
    @abstractmethod
    def load_training_data(self) -> pd.DataFrame:
        """훈련 데이터 로딩"""
        pass
    
    @abstractmethod
    def get_data_info(self) -> Dict:
        """데이터 정보 반환"""
        pass
    
    @abstractmethod
    def is_available(self) -> bool:
        """데이터 소스 사용 가능 여부"""
        pass

class ExcelDataLoader(DataLoaderInterface):
    """Excel 파일 데이터 로더"""
    
    def __init__(self, file_path: str):
        self.file_path = file_path
        
    def load_training_data(self) -> pd.DataFrame:
        """Excel에서 훈련 데이터 로딩"""
        try:
            from train_knowledge import KnowledgeTrainer
            trainer = KnowledgeTrainer()
            df = trainer.load_gri_data()
            logger.info(f"Excel에서 {len(df)}개 데이터 로딩 완료: {self.file_path}")
            return df
        except Exception as e:
            logger.error(f"Excel 데이터 로딩 실패: {e}")
            raise
    
    def get_data_info(self) -> Dict:
        """Excel 데이터 정보"""
        df = self.load_training_data()
        return {
            "source": "excel",
            "file_path": self.file_path,
            "row_count": len(df),
            "columns": list(df.columns),
            "size_mb": os.path.getsize(self.file_path) / (1024*1024) if os.path.exists(self.file_path) else 0
        }
    
    def is_available(self) -> bool:
        """Excel 파일 존재 확인"""
        return os.path.exists(self.file_path)

class DatabaseDataLoader(DataLoaderInterface):
    """데이터베이스 데이터 로더"""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        
    def load_training_data(self) -> pd.DataFrame:
        """데이터베이스에서 훈련 데이터 로딩"""
        try:
            import sqlalchemy as sa
            
            engine = sa.create_engine(self.connection_string)
            
            # GRI 데이터 쿼리 (예시)
            query = """
            SELECT 
                gri_number as '공시사항',
                requirement_text as '요구사항'
            FROM gri_requirements 
            WHERE is_active = true
            ORDER BY gri_number
            """
            
            df = pd.read_sql(query, engine)
            logger.info(f"데이터베이스에서 {len(df)}개 데이터 로딩 완료")
            return df
            
        except Exception as e:
            logger.error(f"데이터베이스 데이터 로딩 실패: {e}")
            raise
    
    def get_data_info(self) -> Dict:
        """데이터베이스 정보"""
        df = self.load_training_data()
        return {
            "source": "database",
            "connection": self.connection_string.split('@')[1] if '@' in self.connection_string else "***",
            "row_count": len(df),
            "columns": list(df.columns),
            "last_updated": "실시간"
        }
    
    def is_available(self) -> bool:
        """데이터베이스 연결 확인"""
        try:
            import sqlalchemy as sa
            engine = sa.create_engine(self.connection_string)
            with engine.connect() as conn:
                conn.execute(sa.text("SELECT 1"))
            return True
        except:
            return False

class HybridDataLoader:
    """Excel + Database 하이브리드 데이터 로더"""
    
    def __init__(self, config: DataConfig):
        self.config = config
        self.current_loader: Optional[DataLoaderInterface] = None
        self._initialize_loader()
    
    def _initialize_loader(self):
        """적절한 데이터 로더 선택"""
        if self.config.source_type == "excel":
            self._use_excel_loader()
        elif self.config.source_type == "database":
            self._use_database_loader()
        elif self.config.source_type == "auto":
            self._auto_select_loader()
        else:
            raise ValueError(f"지원하지 않는 소스 타입: {self.config.source_type}")
    
    def _use_excel_loader(self):
        """Excel 로더 사용"""
        if not self.config.excel_path:
            raise ValueError("Excel 경로가 설정되지 않았습니다")
        
        self.current_loader = ExcelDataLoader(self.config.excel_path)
        
        if not self.current_loader.is_available():
            raise FileNotFoundError(f"Excel 파일을 찾을 수 없습니다: {self.config.excel_path}")
        
        logger.info("📁 Excel 데이터 로더 선택됨")
    
    def _use_database_loader(self):
        """데이터베이스 로더 사용"""
        if not self.config.db_connection_string:
            raise ValueError("데이터베이스 연결 문자열이 설정되지 않았습니다")
        
        self.current_loader = DatabaseDataLoader(self.config.db_connection_string)
        
        if not self.current_loader.is_available():
            raise ConnectionError("데이터베이스에 연결할 수 없습니다")
        
        logger.info("🗄️ 데이터베이스 로더 선택됨")
    
    def _auto_select_loader(self):
        """자동으로 최적 로더 선택"""
        # 1. Excel 시도
        if self.config.excel_path and os.path.exists(self.config.excel_path):
            excel_loader = ExcelDataLoader(self.config.excel_path)
            if excel_loader.is_available():
                data_info = excel_loader.get_data_info()
                row_count = data_info['row_count']
                
                if row_count <= self.config.auto_threshold:
                    self.current_loader = excel_loader
                    logger.info(f"📁 AUTO: Excel 선택 (데이터 {row_count}개 ≤ 임계값 {self.config.auto_threshold})")
                    return
        
        # 2. 데이터베이스 시도
        if self.config.db_connection_string:
            db_loader = DatabaseDataLoader(self.config.db_connection_string)
            if db_loader.is_available():
                self.current_loader = db_loader
                logger.info("🗄️ AUTO: 데이터베이스 선택 (대용량 또는 Excel 불가)")
                return
        
        # 3. 기본값: Excel
        if self.config.excel_path:
            self.current_loader = ExcelDataLoader(self.config.excel_path)
            logger.warning("⚠️ AUTO: Excel 기본 선택 (다른 옵션 없음)")
        else:
            raise RuntimeError("사용 가능한 데이터 소스가 없습니다")
    
    def load_training_data(self) -> pd.DataFrame:
        """훈련 데이터 로딩"""
        if not self.current_loader:
            raise RuntimeError("데이터 로더가 초기화되지 않았습니다")
        
        return self.current_loader.load_training_data()
    
    def get_data_info(self) -> Dict:
        """현재 데이터 소스 정보"""
        if not self.current_loader:
            raise RuntimeError("데이터 로더가 초기화되지 않았습니다")
        
        info = self.current_loader.get_data_info()
        info['auto_threshold'] = self.config.auto_threshold
        return info
    
    def switch_source(self, new_source: str):
        """데이터 소스 변경"""
        self.config.source_type = new_source
        self._initialize_loader()
        
        logger.info(f"🔄 데이터 소스 변경: {new_source}")

# 사용 예시 및 테스트
def main():
    """하이브리드 데이터 로더 테스트"""
    
    print("🔄 하이브리드 데이터 로더 테스트")
    print("="*50)
    
    # Excel 경로 설정 (현재 프로젝트)
    from app.foundation.config import BASE_DIR
    knowledge_dir = BASE_DIR / "data" / "knowledge"
    excel_files = list(knowledge_dir.glob("*.xlsx"))
    excel_path = str(excel_files[0]) if excel_files else None
    
    # 설정 생성
    config = DataConfig(
        source_type="auto",  # 자동 선택
        excel_path=excel_path,
        db_connection_string="postgresql://user:pass@localhost/gri_db",  # 예시
        auto_threshold=500  # 500개 이상이면 DB 사용
    )
    
    try:
        # 하이브리드 로더 생성
        loader = HybridDataLoader(config)
        
        # 데이터 정보 출력
        info = loader.get_data_info()
        print("📊 데이터 소스 정보:")
        for key, value in info.items():
            print(f"  {key}: {value}")
        
        # 데이터 로딩 테스트
        print("\n📥 데이터 로딩 테스트...")
        df = loader.load_training_data()
        print(f"✅ 성공: {len(df)}개 데이터 로딩")
        print(f"컬럼: {list(df.columns)}")
        
        # 첫 3개 행 미리보기
        print("\n👀 데이터 미리보기:")
        print(df.head(3))
        
    except Exception as e:
        print(f"❌ 테스트 실패: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main() 