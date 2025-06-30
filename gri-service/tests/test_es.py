from elasticsearch import Elasticsearch

print("Elasticsearch 연결 테스트를 시작합니다...")

# 1. Elasticsearch 서버에 연결
try:
    es = Elasticsearch('http://localhost:9200')
    # 연결 성공 여부를 확인하기 위해 info() 호출
    if not es.ping():
        raise ConnectionError("서버에 연결할 수 없습니다.")
    print("✅ Elasticsearch에 성공적으로 연결되었습니다!")
except Exception as e:
    print(f"❌ Elasticsearch 연결 실패: {e}")
    exit()

# 2. 샘플 데이터 생성
doc = {
    'indicator': 'GRI 302-1',
    'title': '조직 내부의 에너지 소비량',
    'content': '2023년 총 에너지 소비량은 1,200,000 GJ 이며, 이 중 재생에너지 사용량은 150,000 GJ 입니다.'
}

# 3. 데이터 저장 및 확인
try:
    # 'sustainability_reports'라는 이름의 데이터 공간(index)에 id="1"로 저장
    response = es.index(index="sustainability_reports", id="1", document=doc)
    print("\n✅ 데이터를 성공적으로 저장했습니다. (결과: {})".format(response['result']))

    print("   ... 저장된 데이터를 다시 가져와서 확인합니다.")
    retrieved_doc = es.get(index="sustainability_reports", id="1")
    print("✅ ID 1번으로 가져온 데이터:")
    print(retrieved_doc['_source'])
    print("\n🎉 모든 테스트가 성공적으로 완료되었습니다!")

except Exception as e:
    print(f"\n❌ 데이터 저장 또는 조회 중 오류 발생: {e}")