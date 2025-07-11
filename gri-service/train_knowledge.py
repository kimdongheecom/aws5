import pandas as pd  # type: ignore
import os
import re
import json
# train_knowledge.py 상단에 추가
from app.foundation.config import BASE_DIR

class KnowledgeTrainer:
    def __init__(self):
        # knowledge 폴더에서 Excel 파일 자동 탐지
        knowledge_dir = BASE_DIR / "data" / "knowledge"
        excel_files = list(knowledge_dir.glob("*.xlsx"))
        
        if not excel_files:
            raise FileNotFoundError(f"'{knowledge_dir}' 폴더에서 Excel 파일을 찾을 수 없습니다.")
            
        # 첫 번째 Excel 파일 사용
        self.gri_file_path = excel_files[0]
    
    def new_file(self):
        """기존 코드의 new_file() 메서드를 위한 placeholder"""
        return self.gri_file_path
    
    def xls_to_dframe(self, header=0, usecols=None) -> pd.DataFrame:
        """
        Excel 파일을 pandas DataFrame으로 읽어오는 메서드
        
        Args:
            header (int): 헤더로 사용할 행 번호 (기본값: 0)
            usecols (list or str): 읽어올 컬럼 지정 (기본값: None, 모든 컬럼)
        
        Returns:
            pd.DataFrame: Excel 데이터를 담은 DataFrame
        """
        file = self.new_file()
        return pd.read_excel(file, header=header, usecols=usecols)
    
    def load_gri_data(self, skiprows=5, nrows=117, usecols=[6, 8]) -> pd.DataFrame:
        """
        GRI content index Excel 파일을 로드하는 메서드
        
        Args:
            skiprows (int): 건너뛸 행 수 (기본값: 5, 1-5행 제외)
            nrows (int): 읽을 행 수 (기본값: 117, 6-122행)
            usecols (list): 읽어올 컬럼 지정 (기본값: [6,8], G열과 I열)
        
        Returns:
            pd.DataFrame: GRI 데이터를 담은 DataFrame
        """
        if not os.path.exists(self.gri_file_path):
            raise FileNotFoundError(f"파일을 찾을 수 없습니다: {self.gri_file_path}")
        
        df = pd.read_excel(
            self.gri_file_path, 
            skiprows=skiprows, 
            nrows=nrows,
            usecols=usecols,
            header=None  # 헤더 없이 읽기
        )
        
        # 컬럼명 설정
        df.columns = ['공시사항', '요구사항']
        return df

    def parse_to_json(self, text):
        """
        요구사항 텍스트를 JSON 형태로 파싱하는 메서드
        
        Args:
            text (str): 파싱할 요구사항 텍스트
        
        Returns:
            dict: JSON 형태로 변환된 데이터
        """
        result = {}
        
        # 텍스트를 줄 단위로 분리
        lines = text.strip().split('\n')
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # 점(.)으로 구분되는 패턴 찾기 - 더 간단한 방법
            if '.' in line and len(line.split('.')) >= 2:
                parts = line.split('.', 1)  # 첫 번째 점에서만 분리
                potential_key = parts[0].strip()
                
                # 키가 유효한지 확인 (문자 또는 로마숫자)
                if re.match(r'^[a-z]+$|^i{1,3}$|^ii{1,2}$|^iii$|^iv$|^v$|^vi{1,3}$|^ix$|^x$', potential_key, re.IGNORECASE):
                    key = potential_key.lower()
                    value = parts[1].strip()
                    result[key] = value
        
        return result

    def search_gri(self, search_term, return_json=False):
        """
        GRI 번호로 검색하여 해당 요구사항을 반환하는 메서드
        
        Args:
            search_term (str): 검색할 GRI 번호 (예: "418-1")
            return_json (bool): JSON 형태로 반환할지 여부
        
        Returns:
            str or dict: 해당 요구사항 내용 또는 JSON 형태의 데이터
        """
        try:
            df = self.load_gri_data()
            
            # 검색어와 일치하는 행 찾기
            for index, row in df.iterrows():
                gongsi_raw = row['공시사항']
                yogusahang_raw = row['요구사항']
                
                # pandas 타입 체크 문제 해결을 위한 안전한 변환
                gongsi = str(gongsi_raw) if not pd.isna(gongsi_raw) else ""  # type: ignore
                yogusahang = str(yogusahang_raw) if not pd.isna(yogusahang_raw) else ""  # type: ignore
                
                # 공시사항에서 숫자 부분 추출
                gongsi_number = re.search(r'\d+[-\d]*', gongsi)
                if gongsi_number and gongsi_number.group() == search_term:
                    if return_json:
                        # JSON 형태로 반환
                        return self.parse_to_json(yogusahang)
                    else:
                        # 원본 요구사항을 그대로 반환
                        return yogusahang
            
            return f"'{search_term}'에 해당하는 요구사항을 찾을 수 없습니다."
            
        except Exception as e:
            return f"검색 중 오류가 발생했습니다: {e}"

    def interactive_search(self):
        """
        대화형 검색 기능
        """
        print("\n=== GRI 요구사항 검색 시스템 ===")
        print("GRI 번호를 입력하세요 (예: 418-1)")
        print("원본 텍스트로 보려면 번호 뒤에 ' raw'를 추가하세요 (예: 201-1 raw)")
        print("'adapter' 를 입력하면 LoRA 어댑터 정보를 확인할 수 있습니다")
        print("'ai' 를 입력하면 AI 질답 모드로 전환됩니다 (LoRA 어댑터 적용)")
        print("종료하려면 'quit', 'exit', 또는 'q'를 입력하세요.")
        print()
        
        while True:
            try:
                user_input = input("GRI 번호를 입력하세요: ").strip()
                
                if user_input.lower() in ['quit', 'exit', 'q']:
                    print("검색을 종료합니다.")
                    break
                
                if not user_input:
                    print("GRI 번호를 입력해주세요.")
                    continue
                
                # 특별 명령어 처리
                if user_input.lower() == 'adapter':
                    self.show_adapter_info()
                    continue
                
                if user_input.lower() == 'ai':
                    self.switch_to_ai_mode()
                    continue
                
                # RAW 옵션 확인 (기본은 JSON)
                parts = user_input.split()
                search_term = parts[0]
                return_json = not (len(parts) > 1 and parts[1].lower() == 'raw')
                
                print(f"\n[{search_term}] 검색 중...")
                result = self.search_gri(search_term, return_json=return_json)
                
                print(f"\n[{search_term}] 요구사항:")
                print("=" * 60)
                
                if return_json and isinstance(result, dict):
                    # JSON 형태로 예쁘게 출력
                    print(json.dumps(result, ensure_ascii=False, indent=2))
                else:
                    print(result)
                
                print("=" * 60)
                print()
                
            except KeyboardInterrupt:
                print("\n\n검색을 종료합니다.")
                break
            except Exception as e:
                print(f"오류가 발생했습니다: {e}")

    def show_adapter_info(self):
        """현재 LoRA 어댑터 정보를 표시합니다."""
        try:
            from app.domain.service.model_loader_service import ModelLoaderService
            
            # 모델 서비스 인스턴스 가져오기
            model_service = ModelLoaderService()
            
            if not model_service.model:
                print("⚠️ AI 모델이 로딩되지 않았습니다.")
                print("💡 'ai' 명령으로 AI 모드에 진입하면 모델이 자동으로 로딩됩니다.")
                return
            
            adapter_info = model_service.get_adapter_info()
            
            print("\n🔧 LoRA 어댑터 상태")
            print("=" * 40)
            print(f"현재 어댑터: {adapter_info['current_adapter'] or '없음 (베이스 모델)'}")
            print(f"로딩된 어댑터: {adapter_info['available_adapters'] or '없음'}")
            
            if adapter_info['adapter_config']:
                config = adapter_info['adapter_config']
                print(f"어댑터 이름: {config['name']}")
                print(f"설명: {config['description']}")
                print(f"활성화: {config['enabled']}")
            
            print("=" * 40)
            
        except Exception as e:
            print(f"❌ 어댑터 정보 조회 실패: {e}")

    def switch_to_ai_mode(self):
        """LoRA 어댑터와 함께 AI 질답 모드를 시작합니다."""
        try:
            from app.domain.service.model_loader_service import ModelLoaderService
            
            model_service = ModelLoaderService()
            
            if not model_service.model:
                print("🤖 AI 모델을 로딩 중...")
                model_service.load_model()
            
            print("\n🤖 AI 질답 모드 (LoRA 어댑터 적용)")
            print("=" * 50)
            print("사용법:")
            print("- 자연어로 질문하세요")
            print("- 'back' 을 입력하면 검색 모드로 돌아갑니다") 
            print("- 'quit' 또는 'q'를 입력하면 종료됩니다")
            print("=" * 50)
            
            # 현재 어댑터 상태 표시
            adapter_info = model_service.get_adapter_info()
            current_adapter = adapter_info['current_adapter']
            if current_adapter:
                print(f"🔧 현재 어댑터: {current_adapter}")
            else:
                print("🔧 베이스 모델 사용 중 (어댑터 없음)")
            print()
            
            while True:
                user_input = input("💬 질문을 입력하세요: ").strip()
                
                if user_input.lower() in ['quit', 'q', 'exit']:
                    print("👋 AI 질답을 종료합니다.")
                    break
                
                if user_input.lower() == 'back':
                    print("🔍 검색 모드로 돌아갑니다.")
                    return
                
                if not user_input:
                    continue
                
                print(f"\n🤖 AI 답변 생성 중...")
                try:
                    response = model_service.generate(user_input, max_new_tokens=300)
                    print(f"\n🤖 답변:")
                    print("-" * 30)
                    print(response)
                    print("-" * 30)
                except Exception as e:
                    print(f"❌ AI 답변 생성 실패: {e}")
                    
        except Exception as e:
            print(f"❌ AI 모드 시작 실패: {e}")

# 사용 예시
if __name__ == "__main__":
    # 인스턴스 생성
    trainer = KnowledgeTrainer()
    
    # 현재 설정된 파일 경로 확인
    print(f"현재 설정된 파일 경로: {trainer.gri_file_path}")
    print(f"파일 존재 여부: {os.path.exists(trainer.gri_file_path)}")
    
    # GRI 데이터 로드 테스트
    try:
        df = trainer.load_gri_data()
        print("GRI 데이터 로드 성공!")
        print(f"데이터 형태: {df.shape}")
        print(f"컬럼명: {df.columns.tolist()}")
        
        # JSON 형태로 데이터 출력
        print("\n=== JSON 형태로 데이터 출력 ===")
        
        for index, row in df.iterrows():
            gongsi_raw = row['공시사항'] 
            yogusahang_raw = row['요구사항']
            
            gongsi = str(gongsi_raw) if not pd.isna(gongsi_raw) else ""  # type: ignore
            yogusahang = str(yogusahang_raw) if not pd.isna(yogusahang_raw) else ""  # type: ignore
            
            # 빈 행은 건너뛰기
            if gongsi.strip() == "" and yogusahang.strip() == "":
                continue
            
            # 공시사항에서 숫자 부분만 추출 (예: "2-1 조직 세부 정보" -> "2-1")
            gongsi_number = re.search(r'\d+[-\d]*', gongsi)
            gongsi_clean = gongsi_number.group() if gongsi_number else gongsi
                
            json_data = {
                "공시사항": gongsi_clean,
                "요구사항": yogusahang
            }
            print(json_data)
        
        # 데이터 정보 출력
        print(f"\n실제 데이터 개수: {len(df)} 행")
        print(f"결측치 확인:")
        print(df.isnull().sum())
        
        # 대화형 검색 시작
        trainer.interactive_search()
        
    except FileNotFoundError as e:
        print(f"파일을 찾을 수 없습니다: {e}")
    except Exception as e:
        print(f"데이터 로드 중 오류 발생: {e}")
