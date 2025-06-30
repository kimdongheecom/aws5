#!/bin/bash

echo "🚀 Kubernetes 배포 시작..."

# 1. PostgreSQL 먼저 배포
echo "📦 PostgreSQL 배포 중..."
kubectl apply -f postgres.yaml

# PostgreSQL이 준비될 때까지 대기
echo "⏳ PostgreSQL 준비 대기 중..."
kubectl wait --for=condition=ready pod -l app=postgres --timeout=60s

# 2. 백엔드 서비스들 배포
echo "📦 백엔드 서비스들 배포 중..."
kubectl apply -f gateway.yaml
kubectl apply -f news.yaml
kubectl apply -f sasb.yaml
kubectl apply -f issuepool.yaml
kubectl apply -f report.yaml
kubectl apply -f stock.yaml
kubectl apply -f thesis.yaml

# 백엔드 서비스들이 준비될 때까지 대기
echo "⏳ 백엔드 서비스들 준비 대기 중..."
kubectl wait --for=condition=ready pod -l app=gateway --timeout=60s
kubectl wait --for=condition=ready pod -l app=news-service --timeout=60s
kubectl wait --for=condition=ready pod -l app=sasb-service --timeout=60s
kubectl wait --for=condition=ready pod -l app=issuepool-service --timeout=60s
kubectl wait --for=condition=ready pod -l app=report-service --timeout=60s
kubectl wait --for=condition=ready pod -l app=stock-service --timeout=60s
kubectl wait --for=condition=ready pod -l app=thesis-service --timeout=60s

# 3. 프론트엔드 배포
echo "📦 프론트엔드 배포 중..."
kubectl apply -f frontend.yaml

# 프론트엔드가 준비될 때까지 대기
echo "⏳ 프론트엔드 준비 대기 중..."
kubectl wait --for=condition=ready pod -l app=frontend --timeout=60s

# 4. Ingress 배포
echo "📦 Ingress 배포 중..."
kubectl apply -f ingress.yaml

echo "✅ 배포 완료!"
echo ""
echo "🌐 접속 URL:"
echo "  - Frontend: http://localhost"
echo "  - API Gateway: http://localhost/api"
echo "  - Swagger 문서: http://localhost/docs"
echo ""
echo "📊 상태 확인:"
kubectl get pods
echo ""
kubectl get services
echo ""
kubectl get ingress
