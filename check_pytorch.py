import torch

# 1. PyTorch 버전 출력 (뒤에 +cu121이 붙어있는지 확인)
print(f"PyTorch 버전: {torch.__version__}")
print("-" * 40)

# 2. CUDA 사용 가능 여부 확인 (가장 중요!)
is_cuda_available = torch.cuda.is_available()
print(f"CUDA 사용 가능 여부: {is_cuda_available}")

# 3. 사용 가능하다면, 세부 정보 출력
if is_cuda_available:
    print(f"연결된 GPU 개수: {torch.cuda.device_count()}")
    print(f"현재 GPU 이름: {torch.cuda.get_device_name(0)}")
    print("✅ GPU를 사용할 수 있습니다!")
else:
    print("오류: PyTorch가 GPU를 인식하지 못했습니다.")

print("-" * 40)