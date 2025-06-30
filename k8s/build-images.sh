#!/bin/bash

echo "🔨 Docker 이미지 빌드 시작..."

# k3d 클러스터 이름
CLUSTER_NAME="mycluster1"

# 1. Frontend 빌드
echo "📦 Frontend 빌드 중..."
docker build -t frontend:local ../frontend
k3d image import frontend:local --cluster $CLUSTER_NAME

# 2. Gateway 서비스 빌드
echo "📦 Gateway 서비스 빌드 중..."
docker build -t gateway:local ../gateway
k3d image import gateway:local --cluster $CLUSTER_NAME

# 3. News 서비스 빌드
echo "📦 News 서비스 빌드 중..."
docker build -t news-service:local ../news-service
k3d image import news-service:local --cluster $CLUSTER_NAME

# 4. SASB 서비스 빌드
echo "📦 SASB 서비스 빌드 중..."
docker build -t sasb-service:local ../sasb-service
k3d image import sasb-service:local --cluster $CLUSTER_NAME

# 5. IssuePool 서비스 빌드
echo "📦 IssuePool 서비스 빌드 중..."
docker build -t issuepool-service:local ../issuepool-service
k3d image import issuepool-service:local --cluster $CLUSTER_NAME

# 6. Report 서비스 빌드
echo "📦 Report 서비스 빌드 중..."
docker build -t report-service:local ../report-service
k3d image import report-service:local --cluster $CLUSTER_NAME

# 7. Stock 서비스 빌드
echo "📦 Stock 서비스 빌드 중..."
docker build -t stock-service:local ../stock-service
k3d image import stock-service:local --cluster $CLUSTER_NAME

# 8. Thesis 서비스 빌드
echo "📦 Thesis 서비스 빌드 중..."
docker build -t thesis-service:local ../thesis-service
k3d image import thesis-service:local --cluster $CLUSTER_NAME

echo "✅ 모든 이미지 빌드 및 k3d 클러스터 import 완료!"
echo ""
echo "📋 빌드된 이미지들:"
echo "  - frontend:local"
echo "  - gateway:local"
echo "  - news-service:local"
echo "  - sasb-service:local"
echo "  - issuepool-service:local"
echo "  - report-service:local"
echo "  - stock-service:local"
echo "  - thesis-service:local"
