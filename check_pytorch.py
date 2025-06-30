import torch

print("=== PyTorch Nightly 빌드 확인 ===")
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")

if torch.cuda.is_available():
    print(f"CUDA device count: {torch.cuda.device_count()}")
    print(f"Current device: {torch.cuda.current_device()}")
    print(f"Device name: {torch.cuda.get_device_name(0)}")
    
    # CUDA capability 확인
    device = torch.device('cuda')
    capability = torch.cuda.get_device_capability(device)
    print(f"CUDA capability: sm_{capability[0]}{capability[1]}")
    
    # 간단한 텐서 테스트
    print("\n=== GPU 텐서 테스트 ===")
    x = torch.randn(3, 3).cuda()
    y = torch.randn(3, 3).cuda()
    z = x @ y
    print(f"GPU 행렬 곱셈 테스트 성공: {z.shape}")
else:
    print("CUDA가 사용 불가능합니다.") 