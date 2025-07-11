import torch

print("=== GPU Compute Capability 확인 ===")
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")
print(f"GPU 개수: {torch.cuda.device_count()}")

if torch.cuda.is_available():
    for i in range(torch.cuda.device_count()):
        print(f"\nGPU {i}:")
        print(f"  이름: {torch.cuda.get_device_name(i)}")
        capability = torch.cuda.get_device_capability(i)
        print(f"  Compute Capability: {capability[0]}.{capability[1]}")
        print(f"  SM 아키텍처: sm_{capability[0]}{capability[1]}")
        
        # GPU 메모리 정보
        memory_allocated = torch.cuda.memory_allocated(i) / 1024**3
        memory_reserved = torch.cuda.memory_reserved(i) / 1024**3
        memory_total = torch.cuda.get_device_properties(i).total_memory / 1024**3
        
        print(f"  메모리 사용량: {memory_allocated:.2f} GB")
        print(f"  메모리 예약: {memory_reserved:.2f} GB") 
        print(f"  총 메모리: {memory_total:.2f} GB")
else:
    print("CUDA를 사용할 수 없습니다.") 