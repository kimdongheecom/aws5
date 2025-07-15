# report-service/app/db.py

import os
from supabase import create_client, Client

# 환경 변수에서 URL과 키를 가져옵니다.
# 환경 변수 로딩은 main.py에서 미리 해야 합니다.
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL과 SUPABASE_KEY 환경 변수가 설정되어야 합니다.")

# Supabase 클라이언트를 생성합니다.
supabase: Client = create_client(url, key)