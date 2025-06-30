#!/usr/bin/env python3
import torch

print("=== PyTorch GPU 테스트 ===")
print(f"PyTorch 버전: {torch.__version__}")
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"CUDA 버전: {torch.version.cuda}")
    print(f"GPU 개수: {torch.cuda.device_count()}")
    print(f"현재 GPU: {torch.cuda.current_device()}")
    print(f"GPU 이름: {torch.cuda.get_device_name(0)}")
    print(f"GPU 메모리: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
else:
    print("CUDA를 사용할 수 없습니다!")

# 간단한 CUDA 텐서 테스트
if torch.cuda.is_available():
    try:
        x = torch.randn(3, 3).cuda()
        y = torch.randn(3, 3).cuda()
        z = x + y
        print("✅ CUDA 텐서 연산 성공!")
        print(f"결과 텐서 device: {z.device}")
    except Exception as e:
        print(f"❌ CUDA 텐서 연산 실패: {e}") 