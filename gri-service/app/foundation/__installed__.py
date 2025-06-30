import torch
import transformers
import peft
import datasets

if __name__ == "__main__":
    print("--------------------------------")
    print("Checking installed packages...")
    print("--------------------------------")

    print("torch:", torch.__version__)
    print("transformers:", transformers.__version__)
    print("peft:", peft.__version__)
    print("datasets:", datasets.__version__)
    print("GPU:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "-")