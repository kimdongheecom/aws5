# check_path.py
try:
    import transformers
    print("--- Transformers 라이브러리 경로 ---")
    print(transformers.__file__)
    print("---------------------------------")
except Exception as e:
    print(f"라이브러리를 임포트하는 중 오류 발생: {e}")