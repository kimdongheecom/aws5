'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import axios from 'axios';

export default function GRIPage() {
  const [griData, setGriData] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // 데이터베이스 관리 상태
  const [showCategories, setShowCategories] = useState(false);
  const [showDisclosures, setShowDisclosures] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showSuggestedStatement, setShowSuggestedStatement] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedDisclosureId, setSelectedDisclosureId] = useState('');
  const [requirementInputs, setRequirementInputs] = useState({});
  const [editingStatement, setEditingStatement] = useState<string | null>(null);
  const [editedStatements, setEditedStatements] = useState<{[key: string]: string}>({});
  const [generatingStatement, setGeneratingStatement] = useState<string | null>(null);
  const [approvedStatements, setApprovedStatements] = useState<{[key: string]: {approvedDate: string, status: string}}>({});
  

  
  // Categories 데이터
  const categories = [
    { id: 'GRI 2', title: 'General Disclosures', year: '2021' },
    { id: 'GRI 3', title: 'Material Topics', year: '2021' },
    { id: 'GRI 201', title: 'Economic Performance', year: '2016' },
    { id: 'GRI 202', title: 'Market Presence', year: '2016' },
    { id: 'GRI 203', title: 'Indirect Economic Impacts', year: '2016' },
    { id: 'GRI 204', title: 'Procurement Practices', year: '2016' },
    { id: 'GRI 205', title: 'Anti-corruption', year: '2016' },
    { id: 'GRI 206', title: 'Anti-competitive Behavior', year: '2016' },
    { id: 'GRI 207', title: 'Tax', year: '2019' },
    { id: 'GRI 301', title: 'Materials', year: '2016' },
    { id: 'GRI 302', title: 'Energy', year: '2016' },
    { id: 'GRI 303', title: 'Water and Effluents', year: '2018' },
    { id: 'GRI 304', title: 'Biodiversity', year: '2016' },
    { id: 'GRI 305', title: 'Emissions', year: '2016' },
    { id: 'GRI 306', title: 'Waste', year: '2020' },
    { id: 'GRI 308', title: 'Supplier Environmental Assessment', year: '2016' },
    { id: 'GRI 401', title: 'Employment', year: '2016' },
    { id: 'GRI 402', title: 'Labor/Management Relations', year: '2016' },
    { id: 'GRI 403', title: 'Occupational Health and Safety', year: '2018' },
    { id: 'GRI 404', title: 'Training and Education', year: '2016' },
    { id: 'GRI 405', title: 'Diversity and Equal Opportunity', year: '2016' },
    { id: 'GRI 406', title: 'Non-discrimination', year: '2016' },
    { id: 'GRI 407', title: 'Freedom of Association and Collective Bargaining', year: '2016' },
    { id: 'GRI 408', title: 'Child Labor', year: '2016' },
    { id: 'GRI 409', title: 'Forced or Compulsory Labor', year: '2016' },
    { id: 'GRI 410', title: 'Security Practices', year: '2016' },
    { id: 'GRI 411', title: 'Rights of Indigenous Peoples', year: '2016' },
    { id: 'GRI 413', title: 'Local Communities', year: '2016' },
    { id: 'GRI 414', title: 'Supplier Social Assessment', year: '2016' },
    { id: 'GRI 415', title: 'Public Policy', year: '2016' },
    { id: 'GRI 416', title: 'Customer Health and Safety', year: '2016' },
    { id: 'GRI 417', title: 'Marketing and Labeling', year: '2016' },
    { id: 'GRI 418', title: 'Customer Privacy', year: '2016' }
  ];

  // Disclosures 데이터 (disclosures.sql 기반)
  const disclosures = [
    // GRI 2 Disclosures (2-1부터 2-30까지)
    { id: '2-1', title: '조직 세부 정보', category_id: 'GRI 2' },
    { id: '2-2', title: '조직의 지속 가능성 보고에 포함된 엔티티', category_id: 'GRI 2' },
    { id: '2-3', title: '보고서 보고기간, 보고주기 및 문의처', category_id: 'GRI 2' },
    { id: '2-4', title: '정보 재진술', category_id: 'GRI 2' },
    { id: '2-5', title: '외부 검증', category_id: 'GRI 2' },
    { id: '2-6', title: '활동, 가치 사슬 및 기타 비즈니스 관계', category_id: 'GRI 2' },
    { id: '2-7', title: '근로자', category_id: 'GRI 2' },
    { id: '2-8', title: '기타 근로자', category_id: 'GRI 2' },
    { id: '2-9', title: '지배구조', category_id: 'GRI 2' },
    { id: '2-10', title: '최고 거버넌스 기구의 지명 및 선정', category_id: 'GRI 2' },
    { id: '2-11', title: '최고의사결정기구 의장', category_id: 'GRI 2' },
    { id: '2-12', title: '영향 관리를 감독하는 최고의사결정기구의 역할', category_id: 'GRI 2' },
    { id: '2-13', title: '영향 관리에 대한 책임 위임', category_id: 'GRI 2' },
    { id: '2-14', title: '지속가능성 보고에 대한 최고의사결정기구 역할', category_id: 'GRI 2' },
    { id: '2-15', title: '이해관계 상충', category_id: 'GRI 2' },
    { id: '2-16', title: '중요 문제에 대한 커뮤니케이션', category_id: 'GRI 2' },
    { id: '2-17', title: '최고의사결정기구의 집단지식', category_id: 'GRI 2' },
    { id: '2-18', title: '최고의사결정기구의 성과 평가', category_id: 'GRI 2' },
    { id: '2-19', title: '보수정책', category_id: 'GRI 2' },
    { id: '2-20', title: '보수 결정 절차', category_id: 'GRI 2' },
    { id: '2-21', title: '연간 총 보상 비율', category_id: 'GRI 2' },
    { id: '2-22', title: '지속가능한 개발전략에 관한 성명서', category_id: 'GRI 2' },
    { id: '2-23', title: '정책 선언문', category_id: 'GRI 2' },
    { id: '2-24', title: '정책 공약 책임', category_id: 'GRI 2' },
    { id: '2-25', title: '부정적인 영향을 해결하기 위한 프로세스', category_id: 'GRI 2' },
    { id: '2-26', title: '제기된 우려사항 및 조언에 대한 메커니즘', category_id: 'GRI 2' },
    { id: '2-27', title: '법규제에 대한 컴플라이언스', category_id: 'GRI 2' },
    { id: '2-28', title: '멤버십 조직', category_id: 'GRI 2' },
    { id: '2-29', title: '이해관계자 참여 방식', category_id: 'GRI 2' },
    { id: '2-30', title: '단체협약', category_id: 'GRI 2' },
    
    // GRI 3 Disclosures
    { id: '3-1', title: '중요 주제 결정 과정', category_id: 'GRI 3' },
    { id: '3-2', title: '중요 주제 목록', category_id: 'GRI 3' },
    { id: '3-3', title: '중요 주제 관리', category_id: 'GRI 3' },
    
    // GRI 200 Series Disclosures (Economic) - disclosures.sql 기반
    // GRI 201 - Economic Performance
    { id: '201-1', title: '직접적인 경제적 가치의 창출과 분배', category_id: 'GRI 201' },
    { id: '201-2', title: '기후변화에 따른 재무적 영향 및 기타 위험과 기회', category_id: 'GRI 201' },
    { id: '201-3', title: '확정급여형 연금 채무 및 기타 퇴직연금안', category_id: 'GRI 201' },
    { id: '201-4', title: '정부 재정지원', category_id: 'GRI 201' },
    
    // GRI 202 - Market Presence
    { id: '202-1', title: '사업장 소재 지역의 최저 임금 대비 초임 임금의 비율', category_id: 'GRI 202' },
    { id: '202-2', title: '사업장이 소재한 지역사회에서 고용된 고위 임원의 비율', category_id: 'GRI 202' },
    
    // GRI 203 - Indirect Economic Impacts
    { id: '203-1', title: '사회기반시설 투자 및 서비스 지원', category_id: 'GRI 203' },
    { id: '203-2', title: '중요한 간접 경제 영향', category_id: 'GRI 203' },
    
    // GRI 204 - Procurement Practices
    { id: '204-1', title: '지역 공급업체에 지출하는 비용의 비중', category_id: 'GRI 204' },
    
    // GRI 205 - Anti-corruption
    { id: '205-1', title: '사업장 부패 위험 평가', category_id: 'GRI 205' },
    { id: '205-2', title: '반부패 정책 및 절차에 관한 공지와 교육', category_id: 'GRI 205' },
    { id: '205-3', title: '확인된 부패사례와 이에 대한 조치', category_id: 'GRI 205' },
    
    // GRI 206 - Anti-competitive Behavior
    { id: '206-1', title: '경쟁 저해 행위, 독과점 등 불공정 거래 행위에 대한 법적 조치', category_id: 'GRI 206' },
    
    // GRI 207 - Tax
    { id: '207-1', title: '조세 접근법', category_id: 'GRI 207' },
    { id: '207-2', title: '조세 전략을 책임지는 지배기구, 통제 및 리스크 관리', category_id: 'GRI 207' },
    { id: '207-3', title: '조세 관련 이해관계자의 참여 및 관리', category_id: 'GRI 207' },
    { id: '207-4', title: '국가별 리포팅', category_id: 'GRI 207' },

    // GRI 300 Series Disclosures (Environmental) - disclosures.sql 기반
    // GRI 301 - Materials
    { id: '301-1', title: '원재료의 중량이나 부피', category_id: 'GRI 301' },
    { id: '301-2', title: '재생투입 원재료 사용 비율', category_id: 'GRI 301' },
    { id: '301-3', title: '재생된 제품 및 포장재', category_id: 'GRI 301' },
    
    // GRI 302 - Energy
    { id: '302-1', title: '조직 내부 에너지 소비', category_id: 'GRI 302' },
    { id: '302-2', title: '조직 외부 에너지 소비', category_id: 'GRI 302' },
    { id: '302-3', title: '에너지 집약도', category_id: 'GRI 302' },
    { id: '302-4', title: '에너지 소비 감축', category_id: 'GRI 302' },
    { id: '302-5', title: '제품 및 서비스의 에너지 요구량 감축', category_id: 'GRI 302' },
    
    // GRI 303 - Water and Effluents
    { id: '303-1', title: '용수 공유 자원 활용 및 교류', category_id: 'GRI 303' },
    { id: '303-2', title: '방수 관련 영향 관리', category_id: 'GRI 303' },
    { id: '303-3', title: '용수 취수량', category_id: 'GRI 303' },
    { id: '303-4', title: '용수 방류량', category_id: 'GRI 303' },
    { id: '303-5', title: '용수 소비량', category_id: 'GRI 303' },
    
    // GRI 304 - Biodiversity
    { id: '304-1', title: '보호지역 및 생물다양성 가치가 높은 지역 내 또는 그 인근에서 소유/임대/운영되는 사업장', category_id: 'GRI 304' },
    { id: '304-2', title: '조직의 사업활동, 제품, 서비스가 생물다양성에 미치는 영향', category_id: 'GRI 304' },
    { id: '304-3', title: '서식지 보호 또는 복구', category_id: 'GRI 304' },
    { id: '304-4', title: 'IUCN 적색목록 및 조직 사업의 영향을 받는 지역 내에 서식하는 국가보호종 목록', category_id: 'GRI 304' },
    
    // GRI 305 - Emissions
    { id: '305-1', title: '직접 온실가스 배출량 (Scope1)', category_id: 'GRI 305' },
    { id: '305-2', title: '간접 온실가스 배출량 (Scope2)', category_id: 'GRI 305' },
    { id: '305-3', title: '기타 간접 온실가스 배출량 (Scope3)', category_id: 'GRI 305' },
    { id: '305-4', title: '온실가스 배출 집약도', category_id: 'GRI 305' },
    { id: '305-5', title: '온실가스 배출 감축', category_id: 'GRI 305' },
    { id: '305-6', title: '오존층 파괴 물질 (ODS) 배출량', category_id: 'GRI 305' },
    { id: '305-7', title: '질소산화물(NOx), 황산화물(SOx) 및 기타 중요한 대기 배출량', category_id: 'GRI 305' },
    
    // GRI 306 - Waste
    { id: '306-1', title: '폐기물 발생 및 중대 폐기물 관련 영향', category_id: 'GRI 306' },
    { id: '306-2', title: '폐기물 관련 중대 영향 관리', category_id: 'GRI 306' },
    { id: '306-3', title: '폐기물 발생', category_id: 'GRI 306' },
    { id: '306-4', title: '폐기되지 않은 폐기물', category_id: 'GRI 306' },
    { id: '306-5', title: '처분 대상 폐기물', category_id: 'GRI 306' },
    
    // GRI 308 - Supplier Environmental Assessment
    { id: '308-1', title: '환경 기준 심사를 거친 신규 공급업체', category_id: 'GRI 308' },
    { id: '308-2', title: '공급망의 부정적 환경 영향 및 이에 대한 조치', category_id: 'GRI 308' },

    // GRI 400 Series Disclosures (Social) - disclosures.sql 기반
    // GRI 401 - Employment
    { id: '401-1', title: '신규채용 및 이직', category_id: 'GRI 401' },
    { id: '401-2', title: '비정규직 근로자에게는 제공되지 않는 정규직 근로자를 위한 복리후생', category_id: 'GRI 401' },
    { id: '401-3', title: '육아휴직', category_id: 'GRI 401' },
    
    // GRI 402 - Labor/Management Relations
    { id: '402-1', title: '운영상의 변화와 관련한 최소 공지기간', category_id: 'GRI 402' },
    
    // GRI 403 - Occupational Health and Safety
    { id: '403-1', title: '산업안전보건경영시스템', category_id: 'GRI 403' },
    { id: '403-2', title: '유해 요인 식별, 위험성 평가 및 사고 조사', category_id: 'GRI 403' },
    { id: '403-3', title: '산업보건 서비스', category_id: 'GRI 403' },
    { id: '403-4', title: '직업안전보건에 대한 근로자 참여, 협의 및 의사소통', category_id: 'GRI 403' },
    { id: '403-5', title: '산업안전보건 근로자 교육', category_id: 'GRI 403' },
    { id: '403-6', title: '근로자 건강 증진', category_id: 'GRI 403' },
    { id: '403-7', title: '경영 관계에 의해 직접적으로 연계된 산업안전보건 영향의 예방 및 저감', category_id: 'GRI 403' },
    { id: '403-8', title: '산업안전보건경영시스템의 적용을 받는 근로자', category_id: 'GRI 403' },
    { id: '403-9', title: '업무 관련 상해', category_id: 'GRI 403' },
    { id: '403-10', title: '업무 관련 질병', category_id: 'GRI 403' },
    
    // GRI 404 - Training and Education
    { id: '404-1', title: '근로자 1인당 평균 교육 시간', category_id: 'GRI 404' },
    { id: '404-2', title: '직원 역량강화 및 평생교육 프로그램', category_id: 'GRI 404' },
    { id: '404-3', title: '정기적으로 성과 및 경력 개발 검토를 받는 직원 비율', category_id: 'GRI 404' },
    
    // GRI 405 - Diversity and Equal Opportunity
    { id: '405-1', title: '지배구조 기구와 직원의 다양성', category_id: 'GRI 405' },
    { id: '405-2', title: '남성 대비 여성의 기본급 및 보수 비율', category_id: 'GRI 405' },
    
    // GRI 406 - Non-discrimination
    { id: '406-1', title: '차별 사례 및 이에 대한 시정조치', category_id: 'GRI 406' },
    
    // GRI 407 - Freedom of Association and Collective Bargaining
    { id: '407-1', title: '집회결사 및 단체교섭권 훼손 위험이 있는 사업장 및 공급업체', category_id: 'GRI 407' },
    
    // GRI 408 - Child Labor
    { id: '408-1', title: '아동노동 발생 위험이 높은 사업장 및 공급업체', category_id: 'GRI 408' },
    
    // GRI 409 - Forced or Compulsory Labor
    { id: '409-1', title: '강제 노역 발생 위험이 높은 사업장 및 공급업체', category_id: 'GRI 409' },
    
    // GRI 410 - Security Practices
    { id: '410-1', title: '인권 정책 및 절차에 관한 교육을 받은 보안 담당자', category_id: 'GRI 410' },
    
    // GRI 411 - Rights of Indigenous Peoples
    { id: '411-1', title: '토착민 권리 침해 사례', category_id: 'GRI 411' },
    
    // GRI 413 - Local Communities
    { id: '413-1', title: '지역사회 참여, 영향 평가 및 개발 프로그램 운영 사업장', category_id: 'GRI 413' },
    { id: '413-2', title: '지역사회에 중대한 실제적/잠재적 부정적 영향을 미치는 사업장', category_id: 'GRI 413' },
    
    // GRI 414 - Supplier Social Assessment
    { id: '414-1', title: '사회적 기준에 따른 심사를 거친 신규 공급업체', category_id: 'GRI 414' },
    { id: '414-2', title: '공급망 내 부정적 사회적 영향 및 그에 대한 대응조치', category_id: 'GRI 414' },
    
    // GRI 415 - Public Policy
    { id: '415-1', title: '정치 기부금', category_id: 'GRI 415' },
    
    // GRI 416 - Customer Health and Safety
    { id: '416-1', title: '제품/서비스의 건강 및 안전 영향 평가', category_id: 'GRI 416' },
    { id: '416-2', title: '제품/서비스의 건강 및 안전 영향 관련 위반', category_id: 'GRI 416' },
    
    // GRI 417 - Marketing and Labeling
    { id: '417-1', title: '제품/서비스 관련 정보 및 라벨링 요건', category_id: 'GRI 417' },
    { id: '417-2', title: '제품/서비스 정보 및 라벨링 관련 위반', category_id: 'GRI 417' },
    { id: '417-3', title: '마케팅 커뮤니케이션 관련 위반', category_id: 'GRI 417' },
    
    // GRI 418 - Customer Privacy
    { id: '418-1', title: '고객 개인정보보호 위반 및 고객정보 분실 관련 입증된 민원', category_id: 'GRI 418' }
  ];

  // Requirements 데이터 (모든 주요 GRI 공시용)
  const requirements = {
    // GRI 2 General Disclosures
    '2-1': [
      { id: 'gri2-1-a', question: 'a. 법적 명칭 보고해주세요.' },
      { id: 'gri2-1-b', question: 'b. 소유권 및 법인 구분 보고해주세요.' },
      { id: 'gri2-1-c', question: 'c. 본사 위치 보고해주세요.' },
      { id: 'gri2-1-d', question: 'd. 운영 국가(들) 보고해주세요.' }
    ],
    '2-2': [
      { id: 'gri2-2-a', question: 'a. 지속 가능성 보고에 포함된 모든 엔티티 나열해주세요.' },
      { id: 'gri2-2-b', question: 'b. 조직이 공개 기록에 제출된 연결 재무제표 또는 재무 정보를 감사한 경우, 재무 보고에 포함된 기업 목록과 지속 가능성 보고에 포함된 목록 간의 차이점을 명시해주세요.' },
      { id: 'gri2-2-c', question: 'c. 조직이 여러 엔터티로 구성된 경우, 정보 통합에 사용된 접근 방식을 설명해주세요.\n\ni. 접근법이 소수의 이익을 위한 정보 조정을 포함하는지 여부\n\nii. 접근법이 법인 또는 법인의 일부에 대한 합병, 인수 및 처분을 고려하는 방법\n\niii. 접근 방식이 이 표준의 공개와 중요한 주제에 따라 다른지 그 여부와 방법' }
    ],
    '2-3': [
      { id: 'gri2-3-a', question: 'a. 지속 가능성 보고의 보고 기간 및 빈도를 지정해주세요.' },
      { id: 'gri2-3-b', question: 'b. 재무 보고의 보고 기간을 지정하고 지속 가능성 보고 기간과 일치하지 않는 경우 그 이유를 설명해주세요.' },
      { id: 'gri2-3-c', question: 'c. 보고서 또는 보고된 정보의 발행일을 보고해주세요.' },
      { id: 'gri2-3-d', question: 'd. 보고서 또는 보고서 내용에 대한 문의처를 명시해주세요.' }
    ],
    '2-4': [
      { id: 'gri2-4-a', question: 'a. 이전 보고 기간에 작성된 정보의 재작성을 보고하고 설명해주세요.\n\ni. 재작성의 이유\n\nii. 재작성의 효과' }
    ],
    '2-5': [
      { id: 'gri2-5-a', question: 'a. 최고 거버넌스 기구 및 고위 경영진의 참여 여부와 방법을 포함하여 외부 보증을 추구하기 위한 정책 및 관행을 설명해주세요.' },
      { id: 'gri2-5-b', question: 'b. 조직의 지속가능성 보고가 외부적으로 검증된 경우 다음을 포함해주세요.\n\ni. 외부 검증 보고서 또는 검증에 대한 링크 또는 참조를 제공\n\nii. 사용된 보증 표준, 획득한 보증 수준 및 보증 프로세스의 제한 사항을 포함하여 무엇을 보증하고 어떤 기반으로 했는지 설명\n\niii. 조직과 보증 공급자 간의 관계를 설명' }
    ],
    '2-6': [
      { id: 'gri2-6-a', question: 'a. 활동 중인 산업 영역을 보고해주세요.' },
      { id: 'gri2-6-b', question: 'b. 가치 사슬을 다음을 포함하여 설명해주세요.\n\ni. 조직의 활동, 제품, 서비스 및 시장\n\nii. 조직의 공급망\n\niii. 조직 및 해당 활동의 다운스트림 엔티티' },
      { id: 'gri2-6-c', question: 'c. 기타 관련 비즈니스 관계를 보고해주세요.' },
      { id: 'gri2-6-d', question: 'd. 이전의 보고 기간과 비교하여 중요한 변경 사항을 설명해주세요.' }
    ],
    '2-7': [
      { id: 'gri2-7-a', question: 'a. 총 직원 수와 이 합계를 성별 및 지역별 내역으로 나누어 보고해주세요.' },
      { id: 'gri2-7-b', question: 'b. 정규직, 비정규직, 시간제 직원 등의 총 수를 다음으로 분류해 보고해주세요.\n\ni. 정규직, 성별 및 지역별 분류\n\nii. 비정규직, 성별 및 지역별 분류\n\niii. 영시간 계약자, 성별 및 지역별 분류\n\niv. 계약직 직원, 성별 및 지역별 분류\n\nv. 시간제 직원 및 성별 및 지역별 분류' },
      { id: 'gri2-7-c', question: 'c. 데이터를 수집하는 데 사용되는 방법론 및 가정을 다음을 포함하여 설명해주세요.\n\ni. 인원수, FTE(Full-Time Equivalent) 또는 다른 방법론 사용\n\nii. 보고 기간 말에 보고 기간 전체의 평균, 또는 다른 방법론 사용' },
      { id: 'gri2-7-d', question: 'd. 보고한 데이터를 이해하는 데 필요한 배경 정보를 함께 제공해주세요.' },
      { id: 'gri2-7-e', question: 'e. 보고 기간 동안 직원 수의 중요한 변동을 설명해주세요.' }
    ],
    '2-8': [
      { id: 'gri2-8-a', question: 'a. 피고용인이 아니고 조직에서 작업을 통제하는 총 근로자 수를 다음을 포함하여 보고해주세요.\n\ni. 가장 일반적인 근로자 유형 및 조직과의 계약 관계\n\nii. 그들이 수행하는 작업 유형' },
      { id: 'gri2-8-b', question: 'b. 직원이 아닌 근로자의 수가 보고되는 데이터 수집 방법론 및 가정을 다음을 포함하여 설명해주세요.\n\ni. 인원수, FTE(Full-Time Equivalent) 또는 다른 방법론 사용\n\nii. 보고 기간 말에 보고 기간 전체의 평균 또는 다른 방법론 사용' },
      { id: 'gri2-8-c', question: 'c. 보고 기간 동안 직원이 아닌 근로자 수의 주요한 변동을 설명해주세요.' }
    ],
    '2-9': [
      { id: 'gri2-9-a', question: 'a. 최고 거버넌스 기구의 위원회를 포함한 거버넌스 구조를 설명해주세요.' },
      { id: 'gri2-9-b', question: 'b. 경제, 환경 및 사람에 대한 조직의 영향 관리를 감독하고 의사 결정을 담당하는 최고 거버넌스 기구의 위원회를 나열해주세요.' },
      { id: 'gri2-9-c', question: 'c. 최고 거버넌스 기구와 그 위원회의 구성을 다음을 포함하여 설명해주세요.\n\ni. 임원 및 비상임 회원\n\nii. 독립성\n\niii. 거버넌스 기구 구성원의 임기\n\niv. 각 구성원이 보유한 다른 중요한 직위 및 공약의 수와 공약의 성격\n\nv. 성별\n\nvi. 과소 대표 사회 집단\n\nvii. 조직의 영향과 관련된 역량\n\nviii. 이해관계자 대표' }
    ],
    '2-10': [
      { id: 'gri2-10-a', question: 'a. 최고 거버넌스 기구와 그 위원회의 지명 및 선정 과정을 설명해주세요.' },
      { id: 'gri2-10-b', question: 'b. 최고 거버넌스 기구 구성원을 지명하고 선정하는 데 사용되는 기준을 다음을 포함하여 설명해주세요.\n\ni. 이해관계자(주주 포함)의 견해\n\nii. 다양성\n\niii. 독립성\n\niv. 조직의 영향과 관련된 역량' }
    ],
    '2-11': [
      { id: 'gri2-11-a', question: 'a. 최고 거버넌스 기구의 의장이 조직의 고위 임원이기도 한 지 여부를 기술해주세요.' },
      { id: 'gri2-11-b', question: 'b. 의장이 고위 임원이기도 한 경우, 이해 상충을 예방하고 완화하는 방법을 설명해주세요.' }
    ],
    '2-12': [
      { id: 'gri2-12-a', question: 'a. 지속 가능한 개발과 관련된 조직의 목적, 가치 또는 임무 진술, 전략, 정책 및 목표를 개발, 승인 및 업데이트하는 최고 거버넌스 기구와 고위 임원의 역할을 설명해주세요.' },
      { id: 'gri2-12-b', question: 'b. 조직의 실사 및 경제, 환경 및 사람에 대한 조직의 영향을 식별하고 관리하기 위한 기타 프로세스를 감독하는 최고 거버넌스 기구의 역할을 다음을 포함하여 설명해주세요.\n\ni. 최고 거버넌스 기구가 이해관계자와 협력하여 이러한 프로세스를 지원하는지 여부 및 방법\n\nii. 최고 거버넌스 기구가 이러한 프로세스의 결과를 고려하는 방법' },
      { id: 'gri2-12-c', question: 'c. 조직 프로세스의 효율성을 검토하는 데 있어 최고 거버넌스 기구의 역할을 설명해주세요.' }
    ],
    '2-13': [
      { id: 'gri2-13-a', question: 'a. 최고 거버넌스 기구가 경제, 환경 및 사람들에 대한 조직의 영향을 관리하는 책임을 다음을 포함하여 위임하는 방법을 설명해주세요.\n\ni. 영향 관리 책임이 있는 고위 임원을 임명했는지 여부\n\nii. 영향 관리 책임을 다른 직원에게 위임했는지 여부' },
      { id: 'gri2-13-b', question: 'b. 고위 임원 또는 기타 직원이 조직이 경제, 환경 및 사람에 미치는 영향의 관리에 대해 최고 거버넌스 기구에 보고하는 과정과 빈도를 기술해주세요.' }
    ],
    '2-14': [
      { id: 'gri2-14-a', question: 'a. 최고 거버넌스 기구가 조직의 중요한 주제를 포함하여 보고된 정보를 검토하고 승인할 책임이 있는지 여부를 보고해주세요.' },
      { id: 'gri2-14-b', question: 'b. 최고 거버넌스 기구가 검토하고 승인할 책임이 없는 경우, 그 이유를 설명해주세요.' }
    ],
    '2-15': [
      { id: 'gri2-15-a', question: 'a. 이해 상충을 방지하고 완화하기 위한 최고 거버넌스 기구의 프로세스를 다음을 포함하여 설명해주세요.\n\ni. 크로스보드 멤버십\n\nii. 공급자 및 기타 이해관계자와의 상호출자\n\niii. 지배주주의 존재\n\niv. 특수관계자, 그 관계, 거래 및 미지급잔액' },
      { id: 'gri2-15-b', question: 'b. 이해충돌이 이해관계자에게 공개되는지 여부를 기술해주세요.' }
    ],
    '2-16': [
      { id: 'gri2-16-a', question: 'a. 중대한 사안이 최고 의사결정기구에 어떻게 전달되는지를 설명해주세요.' },
      { id: 'gri2-16-b', question: 'b. 보고 기간 동안 최고 의사결정기구에 전달된 중대한 사안의 총 건수와 내용을 보고해주세요.' }
    ],
    '2-17': [
      { id: 'gri2-17-a', question: 'a. 지속 가능한 개발에 대한 최고 거버넌스 기구의 집단적 지식, 기술 및 경험을 향상시키기 위해 취한 조치를 보고해주세요.' }
    ],
    '2-18': [
      { id: 'gri2-18-a', question: 'a. 최고 거버넌스 기구의 성과를 평가하는 프로세스를 설명해주세요.' },
      { id: 'gri2-18-b', question: 'b. 평가의 독립성 여부 및 평가 빈도를 보고해주세요.' },
      { id: 'gri2-18-c', question: 'c. 평가에 대응하여 취한 조치를 설명해주세요.' }
    ],
    '2-19': [
      { id: 'gri2-19-a', question: 'a. 최고 거버넌스 기구의 구성원과 고위 임원에 대한 보수 정책을 다음을 포함하여 설명해주세요.\n\ni. 고정급 및 변동급\n\nii. 사인온 보너스 또는 채용 장려금 지급\n\niii. 해지 지급\n\niv. 클로백\n\nv. 퇴직급여' },
      { id: 'gri2-19-b', question: 'b. 보수 정책이 경제, 환경 및 국민에 대한 조직의 영향 관리와 어떻게 관련이 있는지 기술해주세요.' }
    ],
    '2-20': [
      { id: 'gri2-20-a', question: 'a. 보수 정책을 설계하고 보수를 결정하는 프로세스를 다음을 포함하여 설명해주세요.\n\ni. 독립적인 최고 거버넌스 기구 위원 또는 독립적인 보수 위원회가 보수 결정 과정을 감독하는지 여부\n\nii. 보수에 관한 이해관계자(주주 포함)의 견해를 어떻게 추구하고 고려하는지\n\niii. 보수 컨설턴트가 보수를 결정하는 데 관여하는지 여부 및 만약 그렇다면 조직, 최고 거버넌스 기구 및 고위 임원으로부터 독립적인지 여부' },
      { id: 'gri2-20-b', question: 'b. 해당되는 경우 보수 정책 및 제안에 대한 이해관계자의 투표 결과를 보고해주세요.' }
    ],
    '2-21': [
      { id: 'gri2-21-a', question: 'a. 조직의 최고 연봉자에 대한 연간 총 보상액이 전체 직원에 대한 중간 연봉자에 대한 비율을 보고해주세요.' },
      { id: 'gri2-21-b', question: 'b. 조직의 최고 연봉자에 대한 연간 총 보상액 증가율과 전체 직원에 대한 연간 총 보상액 증가율의 중간값 비율을 보고해주세요.' },
      { id: 'gri2-21-c', question: 'c. 데이터를 이해하는 데 필요한 상황 정보와 데이터가 어떻게 작성되었는지 보고해주세요.' }
    ],
    '2-22': [
      { id: 'gri2-22-a', question: 'a. 조직에 대한 지속 가능한 개발의 관련성과 지속 가능한개발에 기여하기 위한 전략에 대한 최고 거버넌스 기구 또는 조직의 가장 고위 임원의 성명서를 보고해주세요.' }
    ],
    '2-23': [
      { id: 'gri2-23-a', question: 'a. 책임 있는 비즈니스 행위에 대한 정책 공약을 다음을 포함하여 설명해주세요.\n\ni. 공약이 참조하는 정부 간 권위 있는 수단\n\nii. 공약이 실사 수행을 규정하는지 여부\n\niii. 공약이 예방 원칙의 적용을 규정하는지 여부\n\niv. 공약이 인권 존중을 규정하는지 여부' },
      { id: 'gri2-23-b', question: 'b. 인권을 존중하기 위한 구체적인 정책 공약을 다음을 포함하여 설명해주세요.\n\ni. 공약이 다루는 국제적으로 인정된 인권; 조직이 공약에서 특히 주의를 기울이는 위험에 처한 그룹 또는 취약한 그룹을 포함한 이해관계자의 범주' },
      { id: 'gri2-23-c', question: 'c. 공개적으로 이용 가능한 경우 정책 공약에 대한 링크를 제공하거나, 정책 공약이 공개적으로 이용 가능하지 않은 경우, 그 이유를 설명해주세요.' },
      { id: 'gri2-23-d', question: 'd. 각 정책 공약이 조직 내에서 승인된 수준을 보고해주세요.' },
      { id: 'gri2-23-e', question: 'e. 정책 공약이 조직의 활동과 비즈니스 관계에 적용되는 범위를 보고해주세요.' },
      { id: 'gri2-23-f', question: 'f. 정책 공약이 근로자, 비즈니스 파트너 및 기타 관련 당사자에게 어떻게 전달되는지 설명해주세요.' }
    ],
    '2-24': [
      { id: 'gri2-24-a', question: 'a. 활동 및 비즈니스 관계 전반에 걸쳐 책임 있는 비즈니스 수행을 위한 각 정책 공약을 다음을 포함하는 방법을 설명해주세요.\n\ni. 조직 내 다양한 수준에 걸쳐 공약을 이행하기 위해 책임을 할당하는 방법\n\nii. 조직 전략, 운영 정책 및 운영 절차에 대한 공약을 통합하는 방법\n\niii. 비즈니스 관계를 통해 공약을 이행하는 방법\n\niv. 조직이 공약 이행에 대해 제공하는 교육' }
    ],
    '2-25': [
      { id: 'gri2-25-a', question: 'a. 조직이 야기하거나 기여한 것으로 확인된 부정적 영향의 시정을 제공하거나 협력하기 위한 공약을 설명해주세요.' },
      { id: 'gri2-25-b', question: 'b. 고충을 식별하고 해결하기 위한 접근방식을 설명해주세요.' },
      { id: 'gri2-25-c', question: 'c. 부정적 영향의 교정조치를 제공하거나 협력하는 기타 프로세스를 설명해주세요.' },
      { id: 'gri2-25-d', question: 'd. 고충처리 메커니즘의 의도된 사용자인 이해관계자가 이러한 메커니즘의 설계, 검토, 운영 및 개선에 어떻게 관여하는지 설명해주세요.' },
      { id: 'gri2-25-e', question: 'e. 조직이 고충처리 메커니즘 및 기타 교정조치 프로세스의 효과를 추적하는 방법을 설명해주세요.' }
    ],
    '2-26': [
      { id: 'gri2-26-a', question: 'a. 개인이 다음을 할 수 있는 메커니즘을 설명해주세요.\n\ni. 책임 있는 사업 수행을 위한 조직의 정책 및 관행의 이행에 대한 조언을 구하는지에 대한 설명\n\nii. 조직의 사업 행위에 대한 우려를 제기' }
    ],
    '2-27': [
      { id: 'gri2-27-a', question: 'a. 보고 기간 동안 법률 및 규정을 준수하지 않은 중요한 사례의 총 수를 다음으로 나누어 보고해주세요.\n\ni. 벌금이 부과된 경우\n\nii. 비금전적 제재가 발생한 경우' },
      { id: 'gri2-27-b', question: 'b. 보고 기간 동안 지불된 법률 및 규정을 준수하지 않은 사례에 대한 벌금의 총 수와 금전적 가치를 다음으로 나누어 보고해주세요.\n\ni. 현재 보고 기간에 발생한 법률 및 규정을 준수하지 않은 사례에 대한 벌금\n\nii. 이전 보고 기간에 발생한 법률 및 규정을 준수하지 않은 경우에 대한 벌금' },
      { id: 'gri2-27-c', question: 'c. 규정 미준수의 중요한 사례를 설명해주세요.' },
      { id: 'gri2-27-d', question: 'd. 중요한 규정 위반 사례를 어떻게 결정했는지 설명해주세요.' }
    ],
    '2-28': [
      { id: 'gri2-28-a', question: 'a. 중요한 역할에 참여하는 산업 협회, 기타 회원 협회, 국가 또는 국제 옹호 단체를 보고해주세요.' }
    ],
    '2-29': [
      { id: 'gri2-29-a', question: 'a. 이해관계자와의 관계에 대한 접근 방식을 다음을 포함하여 설명해주세요.\n\ni. 이해관계자의 범주 및 이해관계자의 식별 방법\n\nii. 이해관계자 참여의 목적\n\niii. 이해관계자와의 의미 있는 소통을 보장하기 위해 조직이 추구하는 방법' }
    ],
    '2-30': [
      { id: 'gri2-30-a', question: 'a. 단체 교섭 협약이 적용되는 총 직원의 비율을 보고해주세요.' },
      { id: 'gri2-30-b', question: 'b. 단체 교섭 협약의 적용을 받지 않는 직원의 경우, 조직이 다른 직원을 대상으로 하는 단체 교섭 협약 또는 다른 조직의 단체 교섭 협약을 기반으로 직원의 근로 조건 및 고용 조건을 결정하는지 여부를 기술해주세요.' }
    ],

    // GRI 3 Material Topics
    '3-1': [
      { id: 'gri3-1-a', question: 'a. 중요 주제를 결정하기 위해 따랐던 프로세스를 다음을 포함하여 설명해주세요.\n\ni. 활동 및 비즈니스 관계 전반에 걸쳐 인권에 대한 영향을 포함하여 경제, 환경 및 사람에 대한 실제 및 잠재적, 부정적 및 긍정적 영향을 식별한 방법\n\nii. 중요도에 따라 보고에 미치는 영향의 우선순위를 정하는 방법' },
      { id: 'gri3-1-b', question: 'b. 중요한 주제를 결정하는 과정에 견해를 제공한 이해관계자와 전문가를 기입해주세요.' }
    ],
    '3-2': [
      { id: 'gri3-2-a', question: 'a. 중요한 주제를 나열해주세요.' },
      { id: 'gri3-2-b', question: 'b. 이전 보고 기간과 비교하여 중요한 주제 목록의 변경 사항을 보고해주세요.' }
    ],
    '3-3': [
      { id: 'gri3-3-a', question: 'a. 경제, 환경 및 사람들의 인권에 미치는 영향을 포함하여 실제적, 잠재적, 부정적, 긍정적 영향을 기술해주세요.' },
      { id: 'gri3-3-b', question: 'b. 조직의 활동 또는 비즈니스 관계로 인해 부정적인 영향과 관련이 되어있는지 보고하고 그 활동 또는 비즈니스 관계를 기술해주세요.' },
      { id: 'gri3-3-c', question: 'c. 중요한 주제에 관한 정책 또는 약속을 보고해주세요.' },
      { id: 'gri3-3-d', question: 'd. 주제 및 관련 영향을 관리하기 위해 취한 조치를 다음을 포함하여 보고해주세요.\n\ni. 잠재적인 부정적 영향을 방지하거나 완화하기 위한 조치\n\nii. 교정조치를 제공하거나 협력하는 조치를 포함하여 실제 부정적 영향을 해결하기 위한 조치\n\niii. 실제 및 잠재적 긍정적 영향을 관리하기 위한 조치' },
      { id: 'gri3-3-e', question: 'e. 취한 조치의 효과 추적에 대한 정보를 다음을 포함하여 보고해주세요.\n\ni. 조치의 효과를 추적하는 데 사용되는 프로세스\n\nii. 진척도 평가에 사용되는 목표, 타겟 및 지표\n\niii. 진전을 포함한, 목표 및 타겟을 향한 조치의 효과\n\niv. 배운 교훈과 이러한 교훈이 조직의 운영 정책 및 절차에 어떻게 포함되었는지에 대한 설명' },
      { id: 'gri3-3-f', question: 'f. 이해관계자와의 참여가 취한 조치를 어떻게 알려주었는지를 설명해주세요.' }
    ],

    // GRI 201 Economic Performance
    '201-1': [
      { id: 'gri201-1-a', question: 'a. 발생주의 회계기준에 따른 직접적인 경제적 가치의 창출과 분배(EVG&D)를 다음을 포함하여 보고해주세요.\n\ni. 발생된 직접적 경제가치: 매출\n\nii. 분배된 경제가치: 운영비, 직원 임금 및 복지비, 자본조달비용, 국가별 세금, 지역사회 투자비\n\niii. 유보된 경제가치: "발생된 직접적 경제가치"에서 "분배된 경제가치"를 뺀 값' },
      { id: 'gri201-1-b', question: 'b. 규모가 큰 경우, EVG&D를 국가별, 지역별, 마켓별로 각각 별도 보고해주세요.' }
    ],
    '201-2': [
      { id: 'gri201-2-a', question: 'a. 조직 운영과 매출 또는 비용에 실질적인 변화를 가져올 수 있는 잠재력이 있는 기후변화에 따른 리스크와 기회를 다음을 포함하여 보고해주세요.\n\ni. 리스크와 기회에 대한 설명과 이를 물리적 리스크/기회인지, 규제관련 리스크/기회인지, 혹은 다른 종류의 리스크/기회인지로 분류\n\nii. 이러한 리스크와 기회 관련 영향에 대한 설명\n\niii. 대응조치를 취하기 전 이러한 리스크와 기회가 미치는 재무적 영향\n\niv. 이러한 리스크와 기회를 관리하는데 사용한 방법' },
      { id: 'gri201-2-a-v', question: 'v. 이러한 리스크와 기회를 관리하기 위해 취한 조치에 든 비용' }
    ],
    '201-3': [
      { id: 'gri201-3-a', question: 'a. 연금채무를 조직의 재원으로 충당할 수 있는 경우, 해당 채무의 예상가액을 보고해주세요.' },
      { id: 'gri201-3-b', question: 'b. 연금채무를 지급하기 위한 별도의 기금이 있는 경우, 다음을 포함한 관련 정보를 보고해주세요.\n\ni. 해당 기금으로 연금부채를 얼마만큼 충당할 수 있는지에 대한 추정치\n\nii. 해당 추정치에 대한 근거\n\niii. 해당 추정치를 산정한 시점' },
      { id: 'gri201-3-c', question: 'c. 별도로 설립한 기금으로 연금채무를 전액 충당할 수 없는 경우, 고용주가 전액을 충당하기 위해 채택한 전략을 보고해주세요.' },
      { id: 'gri201-3-d', question: 'd. 피고용인 또는 고용주가 낸 퇴직연금 납입액이 급여에서 차지하는 비율을 보고해주세요.' },
      { id: 'gri201-3-e', question: 'e. 퇴직연금안 가입 수준을 보고해주세요.' }
    ],
    '201-4': [
      { id: 'gri201-4-a', question: 'a. 조직이 보고기간 동안 정부로부터 수령한 재정지원의 총 금전적 가치를 다음을 포함하여 보고해주세요.\n\ni. 세제 혜택\n\nii. 세액 공제\n\niii. 보조금\n\niv. 투자 교부금, 연구개발 교부금 및 기타 관련 유형의 교부금\n\nv. 상, 로열티 휴일\n\nvi. 수출 신용 기관(ECA)으로부터의 재정적 지원\n\nvii. 재정적 인센티브\n\nviii. 기타 재정적 혜택이 조직이 받았거나 받을 수 있도록 정부에서 제공한 기타 재정적 혜택' },
      { id: 'gri201-4-b', question: 'b. 국가별로 201-4-a에 명시한 정보를 보고해주세요.' },
      { id: 'gri201-4-c', question: 'c. 정부가 해당 조직의 주식지분을 보유하고 있는지 여부와 보유한다면 보유량을 보고해주세요.' }
    ],

    // GRI 202 Market Presence
    '202-1': [
      { id: 'gri202-1-a', question: 'a. 근로자의 상당수가 최저임금법에 따라 급여를 받는 경우, 이 최저임금 대비 초임 임금의 비율을 성별에 따라 파악해주세요.' },
      { id: 'gri202-1-b', question: 'b. 직원을 제외하고 해당 조직의 활동을 수행하는 근로자 상당수가 최저임금법에 따라 급여를 받는 경우, 이러한 근로자가 상기한 최저임금을 지급받는지 여부를 판별하기 위해 취한 조치를 보고해주세요.' },
      { id: 'gri202-1-c', question: 'c. 성별에 따라 최저임금이 없거나 중요 사업장 소재 지역별로 변동되는지 여부. 서로 다른 최저임금을 기준으로 사용하는 경우, 어떤 최저임금을 사용하는지 보고해주세요.' },
      { id: 'gri202-1-d', question: 'd. \'중요 사업장 소재 지역\'에 대해 정의를 명시해주세요.' }
    ],
    '202-2': [
      { id: 'gri202-2-a', question: 'a. 중요 사업장이 소재한 지역사회 (local community)에서 고용된 고위 임원의 비율을 보고해주세요.' },
      { id: 'gri202-2-b', question: 'b. \'고위 임원\'의 정의를 명시해주세요.' },
      { id: 'gri202-2-c', question: 'c. 조직이 \'지역 (local)\'에 대해 가지고 있는 지리적 정의에 대해 명시해주세요.' },
      { id: 'gri202-2-d', question: 'd. \'중요 사업장 소재 지역\'의 정의를 명시해주세요.' }
    ],

    // GRI 203 Indirect Economic Impacts
    '203-1': [
      { id: 'gri203-1-a', question: 'a. 중요 사회기반시설 투자와 서비스 진행 수준을 보고해주세요.' },
      { id: 'gri203-1-b', question: 'b. 지역사회 및 지역 경제에 미치는 현재 혹은 향후 영향 (해당되는 바에 따라 긍정적 영향과 부정적 영향을 포함)을 보고해주세요.' },
      { id: 'gri203-1-c', question: 'c. 이러한 투자 및 서비스가 상업적 투자/서비스인지, 현물 기부 투자/서비스인지, 또는 공익 목적 기부인지 여부를 보고해주세요.' }
    ],
    '203-2': [
      { id: 'gri203-2-a', question: 'a. 조직이 미치는 간접적 경제 영향의 예시 (긍정적 영향과 부정적 영향 포함)를 보고해주세요.' },
      { id: 'gri203-2-b', question: 'b. 국내/외 표준, 프로토콜, 정책 어젠다 등 외부 벤치마크와 이해관계자들의 우선순위사항과 같은 맥락에서 조직이 미치는 간접적 경제 영향을 보고해주세요.' }
    ],

    // GRI 204 Procurement Practices
    '204-1': [
      { id: 'gri204-1-a', question: 'a. 중요 사업장 소재 지역에서 현지 지역 공급업체에 (local supplier) 지출하는 조달예산 비율 (예: 현지 지역에서 구매한 제품과 서비스 비율)을 보고해주세요.' },
      { id: 'gri204-1-b', question: 'b. 조직이 \'지역 (local)\'에 대해 가지고 있는 지리적 정의를 기술해주세요.' },
      { id: 'gri204-1-c', question: 'c. \'중요 사업장 소재 지역\'의 정의를 기술해주세요.' }
    ],

    // GRI 205 Anti-corruption
    '205-1': [
      { id: 'gri205-1-a', question: 'a. 부패 관련 리스크 평가가 이뤄진 사업장 총 수와 비율을 보고해주세요.' },
      { id: 'gri205-1-b', question: 'b. 부패 리스크 평가에서 확인된 중대한 리스크를 보고해주세요.' }
    ],
    '205-2': [
      { id: 'gri205-2-a', question: 'a. 조직의 반부패 정책과 절차에 관해 커뮤니케이션을 완료한 지배구조 기구 구성원의 총 수와 비율 (지역별로 분석)을 보고해주세요.' },
      { id: 'gri205-2-b', question: 'b. 조직의 반부패 정책과 절차에 관해 커뮤니케이션을 완료한 직원 총 수와 비율 (직원 카테고리별 그리고 지역별로 분석)을 보고해주세요.' },
      { id: 'gri205-2-c', question: 'c. 조직의 반부패 정책과 절차에 관해 커뮤니케이션을 완료한 비즈니스 파트너 총 수와 비율 (비즈니스 파트너 유형별 그리고 지역별로 분석). 해당 반부패 정책과 절차에 대해 다른 사람이나 조직에게 커뮤니케이션을 완료한 경우에는 그에 대한 설명해주세요.' },
      { id: 'gri205-2-d', question: 'd. 반부패 연수를 받은 지배구조 기구 구성원의 총 수와 비율 (지역별로 분석)을 보고해주세요.' },
      { id: 'gri205-2-e', question: 'e. 반부패 연수를 받은 직원 총 수와 비율 (직원 카테고리별 그리고 지역별로 분석)을 보고해주세요.' }
    ],
    '205-3': [
      { id: 'gri205-3-a', question: 'a. 확인된 부패 사건의 총 수와 특징을 보고해주세요.' },
      { id: 'gri205-3-b', question: 'b. 부패 관련 직원이 해고되거나 징계받은 사건 총 수를 보고해주세요.' },
      { id: 'gri205-3-c', question: 'c. 부패로 인해 비즈니스 파트너와의 계약이 종료되거나 계약 갱신이 취소된 사건 총 수를 보고해주세요.' },
      { id: 'gri205-3-d', question: 'd. 보고기간 동안 부패 관련하여 조직 또는 조직의 직원을 대상으로 제기된 소송과 소송 결과를 보고해주세요.' }
    ],

    // GRI 206 Anti-competitive Behavior
    '206-1': [
      { id: 'gri206-1-a', question: 'a. 보고기간 동안 경쟁저해 및 독과점금지 위반 관련하여 계류 중이거나 완료된 소송 건수를 보고해주세요.' },
      { id: 'gri206-1-b', question: 'b. 완료된 소송의 주요 결과 (판결내용 포함)를 보고해주세요.' }
    ],

    // GRI 207 Tax
    '207-1': [
      { id: 'gri207-1-a', question: 'a. 조세 접근방법을 다음과 같이 보고해주세요.\n\ni. 조세 전략 유무 및 공개적 사용 가능 시 전략에 대한 링크\n\nii. 조세 전략을 공식 승인·검토하는 거버넌스 또는 임원과 검토의 빈도\n\niii. 조세 규제 접근방법\n\niv. 조세 접근방법과 조직의 경영 전략 및 지속 가능한 개발 전략과의 연관성' }
    ],

    // GRI 301 Materials
    '301-1': [
      { id: 'gri301-1-a', question: 'a. 보고기간 동안 조직의 주요 제품이나 서비스를 생산하거나 포장하는데 사용된 원재료의 총 중량 또는 용량을 재생 불가 원재료와 재생 가능 원재료로 구분하여 보고해주세요.' }
    ],
    '301-2': [
      { id: 'gri301-2-a', question: 'a. 조직의 주요 제품과 서비스를 생산하는데 사용된 재생 투입 원재료의 비율을 보고해주세요.' }
    ],
    '301-3': [
      { id: 'gri301-3-a', question: 'a. 각 제품 카테고리별로 재생된 제품과 포장재 비율을 보고해주세요.' },
      { id: 'gri301-3-b', question: 'b. 해당 정보 공시를 위해 데이터를 수집한 방법을 보고해주세요.' }
    ],

    // GRI 302 Energy
    '302-1': [
      { id: 'gri302-1-a', question: 'a. 비재생에너지원에서 나온 연료 총 소비량 (줄 (joules) 단위 또는 배수 (multiple)로 표시, 사용된 연료 유형 포함)을 보고해주세요.' },
      { id: 'gri302-1-b', question: 'b. 재생에너지원에서 나온 연료 총 소비량 (줄 (joules) 단위 또는 배수 (multiple)로 표시, 사용된 연료 유형 포함)을 보고해주세요.' },
      { id: 'gri302-1-c', question: 'c. 단위별 총 에너지 소비량을 다음과 같이 보고해주세요.\n\ni. 전력 소비량\n\nii. 난방 소비량\n\niii. 냉방 소비량\n\niv. 증기 소비량' },
      { id: 'gri302-1-d', question: 'd. 단위별 총 에너지 판매량을 다음과 같이 보고해주세요.\n\ni. 전력 판매량\n\nii. 난방 판매량\n\niii. 냉방 판매량\n\niv. 증기 판매량' },
      { id: 'gri302-1-e', question: 'e. 조직 내 총 에너지 소비량 (줄 (joules) 단위 또는 배수 (multiple)로 표시)을 보고해주세요.' },
      { id: 'gri302-1-f', question: 'f. 사용된 표준, 방법, 가정, 측정 도구를 보고해주세요.' },
      { id: 'gri302-1-g', question: 'g. 사용된 변환계수의 출처를 보고해주세요.' }
    ],
    '302-2': [
      { id: 'gri302-2-a', question: 'a. 조직 외부에서의 에너지 소비량을 보고해주세요.' },
      { id: 'gri302-2-b', question: 'b. 사용된 표준, 방법, 가정, 측정 도구를 보고해주세요.' },
      { id: 'gri302-2-c', question: 'c. 사용된 변환계수의 출처를 보고해주세요.' }
    ],
    '302-3': [
      { id: 'gri302-3-a', question: 'a. 조직의 에너지 집약도 비율을 보고해주세요.' },
      { id: 'gri302-3-b', question: 'b. 에너지 집약도 측정을 위해 선택한 측정 항목(분모)을 보고해주세요.' },
      { id: 'gri302-3-c', question: 'c. 에너지 집약도 측정에 포함된 에너지 종류를 보고해주세요.' },
      { id: 'gri302-3-d', question: 'd. 에너지 집약도 계산에 사용되는 에너지 소비량이 조직 내부인지 외부인지 둘다 인지 여부를 기술해주세요.' }
    ],
    '302-4': [
      { id: 'gri302-4-a', question: 'a. 에너지 절약과 효율적 사용을 통해 감축된 에너지 소비량을 보고해주세요.' },
      { id: 'gri302-4-b', question: 'b. 감축된 에너지의 종류를 보고해주세요.' },
      { id: 'gri302-4-c', question: 'c. 에너지 소비 감소량 계산에 사용된 기준을 보고해주세요.' },
      { id: 'gri302-4-d', question: 'd. 사용된 표준, 방법, 가정, 측정 도구 등을 보고해주세요.' }
    ],
    '302-5': [
      { id: 'gri302-5-a', question: 'a. 보고기간 동안 판매된 제품과 서비스의 감축된 에너지 필요량을 보고해주세요.' },
      { id: 'gri302-5-b', question: 'b. 에너지 소비 감소량 계산에 사용된 기준을 보고해주세요.' },
      { id: 'gri302-5-c', question: 'c. 사용된 표준, 방법, 가정, 측정 도구 등을 보고해주세요.' }
    ],

    // GRI 303 Water and Effluents
    '303-1': [
      { id: 'gri303-1-a', question: 'a. 조직이 물과 상호작용하는 과정(배출, 소비, 방류 등)과 조직의 활동, 제품, 서비스 등으로 인한 물 관련 영향을 보고해주세요.' },
      { id: 'gri303-1-b', question: 'b. 물 관련 영향을 파악하는데 사용하는 방법: 평가의 범위, 기간, 사용하는 도구나 방법론을 보고해주세요.' },
      { id: 'gri303-1-c', question: 'c. 조직이 물 관련 영향을 다루는 방법: 어떤 식으로 이해관계자와 협력해 공유자원으로서 물을 관리하는지, 어떤 식으로 협력사나 고객과 협력해 물 관련 중대 영향을 다루는지 등을 보고해주세요.' },
      { id: 'gri303-1-d', question: 'd. 조직이 물 관련 목표를 설정하는 과정, 그리고 물 부족 문제와 관련해 이러한 목표 설정을 공공정책 및 지역사회 맥락에서 어떻게 반영하는지에 대한 설명해주세요.' }
    ],
    '303-2': [
      { id: 'gri303-2-a', question: 'a. 배출되는 폐수 품질에 대해 정한 최소한의 기준과 이러한 최소한의 품질기준을 정하는 방법을 다음과 같이 보고해주세요.\n\ni. 방류 제한기준이 없는 지역에 있는 설비에 대해 최소 품질기준을 정하는 방법\n\nii. 내부적으로 만든 수질 기준 또는 지침\n\niii. 업종별로 고려한 기준\n\niv. 폐수가 방류되는 수역의 특성을 고려했는지 여부' }
    ],

    '303-3': [
      { id: 'gri303-3-a', question: 'a. 모든 사업장의 총 취수량 (단위 : 리터)과 이를 다음 출처별로 상세 분류해주세요.\n\ni. 지표수\n\nii. 지하수\n\niii. 바닷물\n\niv. 생산수 (produced water)\n\nv. 제3자 공급수 (third party water)' },
      { id: 'gri303-3-b', question: 'b. 물 부족 이슈가 있는 모든 사업장의 총 취수량 (단위 : 리터)과 이를 다음 출처별 상세 분류해주세요.\n\ni. 지표수\n\nii. 지하수\n\niii. 바닷물\n\niv. 생산수 (produced water)\n\nv. 제3자 공급수 (third party water)와 이를 위에 나열된 취수원별로 상세 분류' },
      { id: 'gri303-3-c', question: 'c. 다음 카테고리를 기준으로 303-3-a와 303-3-b에 나열된 각 취수원별 총 취수량 상세 분류해주세요.\n\ni. 담수 (≤1,000mg/L 총 용존 고형물)\n\nii. 기타 물 (> 1,000 mg/L 총 용존 고형물)' },
      { id: 'gri303-3-d', question: 'd. 데이터 취합 방식을 이해하는데 필요한 배경 정보: 사용된 표준, 방법론, 가정 등을 보고해주세요.' }
    ],

    '303-4': [
      { id: 'gri303-4-a', question: 'a. 모든 사업장의 총 방류량 (단위 : 리터)과 이를 다음 출처별로 상세 분류해주세요.\n\ni. 지표수\n\nii. 지하수\n\niii. 바닷물\n\niv. 생산수 (produced water)\n\nv. 제3자 공급수 (third party water), 그리고 다른 조직에게 사용하도록 보낸 총량' },
      { id: 'gri303-4-b', question: 'b. 다음 카테고리를 기준으로 모든 사업장의 총 방류량 상세 분류(단위 : 리터)해주세요.\n\ni. 담수 (≤1,000mg/L 총 용존 고형물)\n\nii. 기타 물 (> 1,000 mg/L 총 용존 고형물)' },
      { id: 'gri303-4-c', question: 'c. 물 부족 이슈가 있는 모든 사업장의 총 방수량 (단위 : 리터)과 이를 다음 카테고리를 기준으로 상세 분류해주세요.\n\ni. 담수 (≤1,000mg/L 총 용존 고형물)\n\nii. 기타 물 (> 1,000 mg/L 총 용존 고형물)' },
      { id: 'gri303-4-d', question: 'd. 방류되는 물을 처리하는데 사용되는 물질 중 우려도가 가장 높은 물질을 보고해주세요.\n\ni. 이러한 물질을 어떻게 정의하는지와 이에 사용되는 국제 표준이나 기준\n\nii. 이러한 물질에 대해 배출 한도를 정하는 방법\n\niii. 이러한 배출 한도를 준수하지 않은 건수' },
      { id: 'gri303-4-e', question: 'e. 데이터 취합 방식을 이해하는데 필요한 배경 정보: 사용된 표준, 방법론, 가정 등을 보고해주세요.' }
    ],

    '303-5': [
      { id: 'gri303-5-a', question: 'a. 모든 사업장의 물 총 소비량 (단위 : 리터)을 보고해주세요.' },
      { id: 'gri303-5-b', question: 'b. 물 부족 이슈가 있는 모든 사업장의 물 총 소비량 (단위 : 리터)을 보고해주세요.' },
      { id: 'gri303-5-c', question: 'c. 물 저장량이 상당한 물 관련 영향을 미치는 것으로 확인되는 경우, 물 저장량 변화 (단위 : 리터)를 보고해주세요.' },
      { id: 'gri303-5-d', question: 'd. 데이터 취합 방식을 이해하는데 필요한 배경 정보: 사용된 표준, 방법론, 가정 등 (해당 정보가 계산, 추정, 모델링, 또는 직접 측정을 통해 얻었는지 여부, 데이터 취합 방식에 업종별 요소를 사용했는지 여부 등)을 보고해주세요.' }
    ],

    // GRI 304 Biodiversity
    '304-1': [
      { id: 'gri304-1-a', question: 'a. 보호지역 및 생물다양성 가치가 높은 지역 내 또는 그 인근에서 소유/임대/운영되는 사업장 각각에 대해 보고해주세요.\n\ni. 지리적 위치\n\nii. 조직이 소유/임대/운영할 수 있는 지하 토지\n\niii. 보호지역 (보호지역 내, 보호지역 인근, 또는 보호지역 일부를 포함하는 지역) 또는 생물다양성 가치가 높은 지역 대비 포지션\n\niv. 용도 (사무용, 제조/생산용, 추출용 등)\n\nv. 사업장 크기 (km2 또는 다른 단위)\n\nvi. 보호지역 또는 생물다양성 가치가 높은 지역이 가진 특성에서 비롯되는 생물다양성 가치 (육상 또는 해양 생태계 등)\n\nvii. 보호 대상 등록으로 (IUCN 보호지역관리체계, 람사르협약, 국내 법률 등) 특징되는 생물다양성 가치' }
    ],

    '304-2': [
      { id: 'gri304-2-a', question: 'a. 다음 중 하나 이상과 관련해 생물다양성에 직간접적으로 미치는 중대한 영향의 특징을 보고해주세요.\n\ni. 제조공장, 광산, 운송 인프라의 설립 또는 사용\n\nii. 오염 (서식지에서 자연적으로 발생하지 않는 물질의 발생)\n\niii. 침입종, 해충, 병충의 등장\n\niv. 종의 감소\n\nv. 서식지 변화\n\nvi. 자연적인 변화 범위를 넘어선 생태학적 변화 (염분 변화 또는 지하수위 변화)' },
      { id: 'gri304-2-b', question: 'b. 다음과 관련해 발생하는 중대한 직간접적 긍/부정적 영향을 보고해주세요.\n\ni. 영향을 받는 종\n\nii. 영향을 받는 영역의 범위\n\niii. 영향 받는 기간\n\niv. 영향의 가역성 또는 비가역성' }
    ],

    '304-3': [
      { id: 'gri304-3-a', question: 'a. 보호 대상이거나 복원된 모든 서식지의 크기와 위치, 그리고 복원 조치가 독립된 외부 전문가들로부터 성공적이었다는 평가를 받았는지 여부를 기술해주세요.' },
      { id: 'gri304-3-b', question: 'b. 조직이 보호/복원 조치를 감독하고 이행한 경우와 별도로 다른 제3자와 함께 서식지를 보호하거나 복원하기 위해 맺은 파트너십이 존재하는지 여부를 기술해주세요.' },
      { id: 'gri304-3-c', question: 'c. 보고기간 종료 시점에 각 보호/복원 지역의 상태를 보고해주세요.' },
      { id: 'gri304-3-d', question: 'd. 사용된 표준, 방법론, 가정을 보고해주세요.' }
    ],

    '304-4': [
      { id: 'gri304-4-a', question: 'a. IUCN 적색목록에 등재된 종과 조직 사업의 영향을 받는 지역 내에 서식하는 국가보호종 총 수 (멸종 위기의 심각도를 기준으로)를 보고해주세요.\n\ni. 심각한 멸종 위기에 처한 종\n\nii. 멸종 위기에 처한 종\n\niii. 취약한 종\n\niv. 멸종 위협에 근접한 종\n\nv. 멸종 우려가 낮은 종' }
    ],

    // GRI 305 Emissions
    '305-1': [
      { id: 'gri305-1-a', question: 'a. 직접 (Scope 1) 온실가스 배출 총량 (CO2 측정 단위로 미터 톤 (metric tone) 사용)을 보고해주세요.' },
      { id: 'gri305-1-b', question: 'b. 측정된 가스 중에 CO2, CH4, N2O, HFC, PFC, SF6, NF3가 있는지 여부 또는 모두 포함되는지 여부를 기술해주세요.' },
      { id: 'gri305-1-c', question: 'c. 생체 CO2 배출량 (CO2 측정 단위로 미터 톤 사용)을 보고해주세요.' },
      { id: 'gri305-1-d', question: 'd. 측정 기준연도 (해당되는 경우 다음을 포함)를 보고해주세요.\n\ni. 해당 연도를 기준연도로 선택한 이유\n\nii. 기준연도의 배출량\n\niii. 기준연도 배출량의 재측정을 야기한 중대한 배출량 변화의 배경' },
      { id: 'gri305-1-e', question: 'e. 사용된 배출계수 및 지구온난화지수 (GWP) 비율의 출처 또는 GWP 출처에 대한 언급해주세요.' },
      { id: 'gri305-1-f', question: 'f. 온실가스 배출량 통합법: 지분비중에 따른 방식, 재무적 통제권에 따른 방식, 운영권에 따른 방식을 보고해주세요.' },
      { id: 'gri305-1-g', question: 'g. 사용된 표준, 방법론, 가정, 또는 측정도구를 보고해주세요.' }
    ],

    '305-2': [
      { id: 'gri305-2-a', question: 'a. 간접 (Scope 2) 온실가스 배출 총량 (CO2 측정 단위로 미터 톤 (metric tone) 사용)을 보고해주세요.' },
      { id: 'gri305-2-b', question: 'b. 측정된 가스 중에 CO2, CH4, N2O, HFC, PFC, SF6, NF3가 있는지 여부 또는 모두 포함되는지 여부를 말씀해주세요.' },
      { id: 'gri305-2-c', question: 'c. 생체 CO2 배출량 (CO2 측정 단위로 미터 톤 사용)을 보고해주세요.' },
      { id: 'gri305-2-d', question: 'd. 측정 기준연도 (해당되는 경우 다음을 포함)를 보고해주세요.\n\ni. 해당 연도를 기준연도로 선택한 이유\n\nii. 기준연도의 배출량\n\niii. 기준연도 배출량의 재측정을 야기한 중대한 배출량 변화의 배경' },
      { id: 'gri305-2-e', question: 'e. 사용된 배출계수 및 지구온난화지수 (GWP) 비율의 출처 또는 GWP 출처에 대한 언급해주세요.' },
      { id: 'gri305-2-f', question: 'f. 온실가스 배출량 통합법: 지분비중에 따른 방식, 재무적 통제권에 따른 방식, 운영권에 따른 방식을 보고해주세요.' },
      { id: 'gri305-2-g', question: 'g. 사용된 표준, 방법론, 가정, 또는 측정도구를 보고해주세요.' }
    ],

    '305-3': [
      { id: 'gri305-3-a', question: 'a. 기타 직접 (Scope 3) 온실가스 배출 총량 (CO2 측정 단위로 미터 톤 사용)을 보고해주세요.' },
      { id: 'gri305-3-b', question: 'b. 측정된 가스 중에 CO2, CH4, N2O, HFC, PFC, SF6, NF3가 있는지 여부 또는 모두 포함되는지 여부를 보고해주세요.' },
      { id: 'gri305-3-c', question: 'c. 생체 CO2 배출량 (CO2 측정 단위로 미터 톤 사용)을 보고해주세요.' },
      { id: 'gri305-3-d', question: 'd. 측정에 포함된 기타 다른 간접 (Scope 3) 온실가스 배출량 범주 및 활동을 보고해주세요.' },
      { id: 'gri305-3-e', question: 'e. 측정 기준연도 (해당되는 경우 다음을 포함)를 보고해주세요.' },
      { id: 'gri305-3-e-i', question: 'i. 해당 연도를 기준연도로 선택한 이유' },
      { id: 'gri305-3-e-ii', question: 'ii. 기준연도의 배출량' },
      { id: 'gri305-3-e-iii', question: 'iii. 기준연도 배출량의 재측정을 야기한 중대한 배출량 변화의 배경' },
      { id: 'gri305-3-f', question: 'f. 사용된 배출계수 및 지구온난화지수 (GWP) 비율의 출처 또는 GWP 출처에 대한 언급해주세요.' },
      { id: 'gri305-3-g', question: 'g. 사용된 표준, 방법론, 가정 또는 측정도구를 보고해주세요.' }
    ],

    '305-4': [
      { id: 'gri305-4-a', question: 'a. 조직의 온실가스 배출 집적도를 보고해주세요.' },
      { id: 'gri305-4-b', question: 'b. 이 집적도를 계산하기 위해 선택한 측정단위 (분모)를 말씀해주세요.' },
      { id: 'gri305-4-c', question: 'c. 집적도에 포함된 온실가스 배출 종류: 직접 온실가스 (Scope1), 간접 온실가스 (Scope2), 기타 온실가스 (Scope3)를 보고해주세요.' },
      { id: 'gri305-4-d', question: 'd. 측정된 가스 중에 CO2, CH4, N2O, HFC, PFC, SF6, NF3가 있는지 여부 또는 모두 포함되는지 여부를 말씀해주세요.' }
    ],

    '305-5': [
      { id: 'gri305-5-a', question: 'a. 감축 이니셔티브의 직접적인 결과로 감소한 GHG 배출량 (CO2 측정 단위로 미터 톤 사용)을 보고해주세요.' },
      { id: 'gri305-5-b', question: 'b. 측정된 가스 중에 CO2, CH4, N2O, HFC, PFC, SF6, NF3가 있는지 여부 또는 모두 포함되는지 여부를 보고해주세요.' },
      { id: 'gri305-5-c', question: 'c. 측정 기준연도 또는 기준선 (선택 이유 포함)을 보고해주세요.' },
      { id: 'gri305-5-d', question: 'd. 감축량 범위: 직접 온실가스 (Scope1), 간접 온실가스 (Scope2), 기타 온실가스 (Scope3)를 보고해주세요.' },
      { id: 'gri305-5-e', question: 'e. 사용된 표준, 방법론, 가정 또는 측정도구를 보고해주세요.' }
    ],

    '305-6': [
      { id: 'gri305-6-a', question: 'a. ODS의 생산, 수입, 수출량 (CFC-11 (트리클로로 플루오로 메탄) 측정단위로 미터 톤 사용)을 보고해주세요.' },
      { id: 'gri305-6-b', question: 'b. 측정 대상에 포함된 물질을 보고해주세요.' },
      { id: 'gri305-6-c', question: 'c. 사용된 배출계수의 출처를 보고해주세요.' },
      { id: 'gri305-6-d', question: 'd. 사용된 표준, 방법론, 가정 또는 측정도구를 보고해주세요.' }
    ],

    '305-7': [
      { id: 'gri305-7-a', question: 'a. 다음 항목별 대기 배출량 (킬로그램 또는 배수 (multiple) 사용)을 보고해주세요.\n\ni. Nox\n\nii. Sox\n\niii. 잔류 유기 오염물 (POP)\n\niv. 휘발성 유기 화합물 (VOC)\n\nv. 유해 대기 오염물 (HAP)\n\nvi. 입자성 물질 (PM)\n\nvii. 관련 규정에서 확인된 기타 대기 배출 표준 범주' },
      { id: 'gri305-7-b', question: 'b. 사용된 배출계수의 출처를 보고해주세요.' },
      { id: 'gri305-7-c', question: 'c. 사용된 표준, 방법론, 가정 또는 측정도구를 보고해주세요.' }
    ],

    // GRI 306 Waste
    '306-1': [
      { id: 'gri306-1-a', question: 'a. 보고 조직의 실제·잠재적 폐기물 관련 중대 영향을 다음과 같이 보고해주세요.\n\ni. 중대한 영향을 유발 또는 초래할 수 있는 투입물, 활동, 산출물을 보고\n\nii. 중대한 영향이 조직 내 활동과의 관련성 및 가치사슬의 업스트림 또는 다운스트림 활동과의 관련성을 보고' }
    ],

    '306-2': [
      { id: 'gri306-2-a', question: 'a. 조직 및 가치사슬의 활동에서 폐기물 발생을 방지하고, 폐기물 관련 영향을 관리하기 위한 조치(순환성 조치 포함)를 보고해주세요.' },
      { id: 'gri306-2-b', question: 'b. 발생한 폐기물이 제3자에 의해 관리되고 있는 경우, 제3자가 계약상 또는 법적 의무에 따라 폐기물을 관리하는지 여부를 판단하기 위해 사용되는 프로세스에 대한 설명해주세요.' },
      { id: 'gri306-2-c', question: 'c. 폐기물 관련 데이터를 수집하고 모니터링 하는데 사용되는 프로세스를 보고해주세요.' }
    ],

    '306-3': [
      { id: 'gri306-3-a', question: 'a. 폐기물의 총 중량(단위 : 미터톤) 및 폐기물 구성 별 총 폐기물을 보고해주세요.' },
      { id: 'gri306-3-b', question: 'b. 데이터 및 데이터 편찬방법을 이해하는데 필요한 정보를 보고해주세요.' }
    ],

    '306-4': [
      { id: 'gri306-4-a', question: 'a. 처리에서 전용된 폐기물의 총 중량(단위 : 미터톤) 및 폐기물 구성 별 총 중량을 보고해주세요.' },
      { id: 'gri306-4-b', question: 'b. 처리된 유해 폐기물의 총 중량 및 다음 처리 작업에 따른 합계 내역(단위 : 미터톤)을 보고해주세요.\n\ni. 소각 (에너지 회수 포함)\n\nii. 소각 (에너지 회수 미포함)\n\niii. 매립\n\niv. 기타 폐기 작업' },
      { id: 'gri306-4-c', question: 'c. 처리에서 전용된 비유해 폐기물의 총 중량(단위 : 미터톤) 및 다음 회수 작업에 의한 총 중량 분석을 보고해주세요.\n\ni. 재사용 준비\n\nii. 재활용\n\niii. 기타 복구 작업' },
      { id: 'gri306-4-d', question: 'd. 306-4-b 및 306-4-c에 규정된 각 회수 작업에 대하여,처리에서 전용된 유해 폐기물 및 비유해 폐기물(단위 : 미터톤)의 총 중량 분석을 보고해주세요.\n\ni. 온사이트\n\nii. 오프사이트' },
      { id: 'gri306-4-e', question: 'e. 사용된 모든 표준, 방법론 (데이터 편집과정을 이해하는데 필요한 정보 또는 섹터별 요인 및 접근방법 포함)을 보고해주세요.' }
    ],

    '306-5': [
      { id: 'gri306-5-a', question: 'a. 처리된 폐기물의 총 중량 및 폐기물 구성별 총 중량(단위 : 미터톤)을 보고해주세요.' },
      { id: 'gri306-5-b', question: 'b. 처리된 유해 폐기물의 총 중량 및 다음 처리 작업에 따른 합계 내역(단위 : 미터톤)을 보고해주세요.\n\ni. 소각 (에너지 회수 포함)\n\nii. 소각 (에너지 회수 미포함)\n\niii. 매립\n\niv. 기타 폐기 작업' },
      { id: 'gri306-5-c', question: 'c. 처리된 비유해 폐기물의 총 중량 및 다음 처리 작업에 따른 합계(단위 : 미터톤)를 보고해주세요.\n\ni. 소각 (에너지 회수 포함)\n\nii. 소각 (에너지 회수 미포함)\n\niii. 매립\n\niv. 기타 폐기 작업' },
      { id: 'gri306-5-d', question: 'd. 306-5-b와 306-5-c에 기재된 각 처리작업에 대하여, 유해 폐기물의 총 중량과 처분으로 향하는 비유해 폐기물의 총 중량에 대한 분석(단위 : 미터톤)을 보고해주세요.\n\ni. 온사이트\n\nii. 오프사이트' },
      { id: 'gri306-5-e', question: 'e. 사용된 모든 표준, 방법론 (데이터 편집과정을 이해하는데 필요한 정보 또는 섹터별 요인 및 접근방법 포함)을 보고해주세요.' }
    ],

    // GRI 308 Supplier Environmental Assessment
    '308-1': [
      { id: 'gri308-1-a', question: 'a. 환경 기준 심사를 거친 신규 공급업체의 비율을 보고해주세요.' }
    ],

    '308-2': [
      { id: 'gri308-2-a', question: 'a. 환경 영향 평가를 받은 공급업체 수를 보고해주세요.' },
      { id: 'gri308-2-b', question: 'b. 실제적, 잠재적으로 환경에 중대한 부정적 영향을 미치는 것으로 확인된 공급업체 수를 보고해주세요.' },
      { id: 'gri308-2-c', question: 'c. 공급망에서 확인된 중대한 실제적, 잠재적 부정적 환경 영향을 보고해주세요.' },
      { id: 'gri308-2-d', question: 'd. 실제적, 잠재적으로 중대한 부정적 환경 영향을 미치는 것으로 확인되고 이러한 평가결과를 기반으로 개선안 마련에 합의한 공급업체 비율을 보고해주세요.' },
      { id: 'gri308-2-e', question: 'e. 실제적, 잠재적으로 중대한 부정적 환경 영향을 미치는 것으로 확인되고 이러한 평가결과에 따라 계약관계가 종료된 공급업체 비율 (사유 포함)을 보고해주세요.' }
    ],

    // GRI 401 Employment
    '401-1': [
      { id: 'gri401-1-a', question: 'a. 신규 채용자 수를 연령별, 성별, 지역별로 보고해주세요.' },
      { id: 'gri401-1-b', question: 'b. 이직자 수를 연령별, 성별, 지역별로 보고해주세요.' },
      { id: 'gri401-1-c', question: 'c. 이직률을 계산하여 보고해주세요.' }
    ],

    // GRI 402 Labor/Management Relations
    '402-1': [
      { id: 'gri402-1-a', question: 'a. 중대한 경영상의 변화를 실행하기 전에 이 사실을 직원 및 그 대리인에게 알리기 위한 최소한의 공지기간을 보고해주세요.' },
      { id: 'gri402-1-b', question: 'b. 단체교섭협약을 맺고 있는 조직의 경우, 협상 관련 고지기간과 조항들이 해당 협약에 명시되어 있는지 여부를 기술해주세요.' }
    ],
    '401-2': [
      { id: 'gri401-2-a', question: 'a. 중요 사업장 소재지역에서 임시직 또는 비정규직 직원에게는 제공되지 않으나 정규직 직원에게는 제공되는 복리후생 (다음이 포함됨)을 보고해주세요.\n\ni. 생명보험\n\nii. 의료 서비스\n\niii. 장애 및 질병 보험\n\niv. 육아휴직\n\nv. 퇴직연금\n\nvi. 주식\n\nvii. 기타' },
      { id: 'gri401-2-b', question: 'b. \'중요 사업장 소재지역\'에 대한 정의를 명시해주세요.' }
    ],
    '401-3': [
      { id: 'gri401-3-a', question: 'a. 육아휴직을 받을 자격이 있는 총 직원 수를 성별로 보고해주세요.' },
      { id: 'gri401-3-b', question: 'b. 육아휴직을 사용한 총 직원 수를 성별로 보고해주세요.' },
      { id: 'gri401-3-c', question: 'c. 육아휴직 후 복직한 총 직원 수를 성별로 보고해주세요.' },
      { id: 'gri401-3-d', question: 'd. 육아휴직 후 복직하여 12개월 후에도 계속 근무하고 있는 직원 수를 성별로 보고해주세요.' },
      { id: 'gri401-3-e', question: 'e. 육아휴직 복직률 및 유지율을 성별로 보고해주세요.' }
    ],

    // GRI 403 Occupational Health and Safety
    '403-1': [
      { id: 'gri403-1-a', question: 'a. 직장 건강 및 안전 관리 시스템 운영 여부를 기술 (다음 내용 포함)해주세요.\n\ni. 법률에 따라 이러한 시스템을 운영하는 경우, 해당 법률 목록\n\nii. 관리 시스템 표준/지침에 따라 이러한 시스템을 운영하는 경우, 해당 표준/지침 목록' },
      { id: 'gri403-1-b', question: 'b. 직장 건강 및 안전 관리 시스템의 적용 대상이 되는 작업장과 활동 및 근로자의 범위를 기술하고, 적용 대상에서 제외되는 작업장, 활동, 근로자가 있는지 여부와 제외된다면 그 이유를 기술해주세요.' }
    ],
    '403-2': [
      { id: 'gri403-2-a', question: 'a. 정례적으로 그리고 비-정례적으로 작업 관련 위험요인을 파악하고 리스크를 평가하는데 사용되는 프로세스에 대한 설명, 그리고 위험요인을 제거하고 리스크를 최소화하기 위한 관리체계 적용 프로세스에 대한 설명해주세요.\n\ni. 조직이 이러한 프로세스의 품질과 프로세스 이행 담당자의 역량을 어떻게 유지/관리하는지에 대한 설명\n\nii. 직장 건강 및 안전 관리 시스템을 평가하고 이를 지속적으로 개선하기 위해 이러한 프로세스의 결과를 어떻게 활용하는지에 대한 설명' },
      { id: 'gri403-2-b', question: 'b. 근로자가 작업 관련 위험요인과 위험상황을 보고하는 프로세스에 대한 설명, 그리고 근로자를 보복으로부터 보호하기 위해 마련된 프로세스에 대한 설명해주세요.' },
      { id: 'gri403-2-c', question: 'c. 근로자가 부상이나 건강악화를 초래할 수 있다고 판단한 작업을 중단할 수 있게 해주는 정책 및 프로세스에 대한 설명, 그리고 근로자를 보복으로부터 보호하기 위해 마련된 프로세스에 대한 설명해주세요.' },
      { id: 'gri403-2-d', question: 'd. 작업 관련 재해 조사 프로세스 (재해 관련 위험요인을 파악하고 리스크를 평가하는 프로세스 포함)와 관리체계를 통한 시정조치 이행 프로세스, 그리고 직장 건강 및 안전 관리 시스템에 어떤 개선사항이 필요한지 판단하는 프로세스에 대한 설명해주세요.' }
    ],
    '403-3': [
      { id: 'gri403-3-a', question: 'a. 위험요인을 제거하고 리스크를 최소화하는데 기여하는 직장 의료 서비스의 기능을 설명하고, 조직이 어떻게 이러한 서비스의 품질을 유지하고 근로자의 의료 서비스 이용도를 촉진하는지 기술해주세요.' }
    ],
    '403-4': [
      { id: 'gri403-4-a', question: 'a. 직장 건강 및 안전 관리 시스템 개발과 이행 및 평가 시 근로자 참여와 자문이 어떻게 이뤄지는지 그 프로세스에 대한 설명, 그리고 직장 건강 및 안전 관련 정보를 근로자들에게 전달하는 프로세스에 대한 설명해주세요.' },
      { id: 'gri403-4-b', question: 'b. 공식적인 노사 공동 건강 및 안전 위원회가 있는 곳의 경우, 이러한 위원회의 책임과 회의빈도 및 의사결정 권한을 설명하고, 이러한 위원회가 근로자들을 대변하는지 여부와 대변하지 않는다면 그 이유를 기재해주세요.' },
    ],
    '403-5': [
      { id: 'gri403-5-a', question: 'a. 일반 교육 그리고 특정 작업 관련 위험요인이나 위험 활동 또는 위험 상황에 관한 교육을 포함해 근로자에게 제공하는 직장 건강 및 안전 교육에 대한 설명해주세요.' }
    ],
    '403-6': [
      { id: 'gri403-6-a', question: 'a. 근로자의 비-업무 관련 의료복지서비스 접근권을 촉진하는 방법 및 이러한 서비스 제공 범위에 대한 설명해주세요.' },
      { id: 'gri403-6-b', question: 'b. 비-업무 관련 주요 건강위험을 해결하기 위해 근로자에게 제공하는 자발적 건강증진 서비스 및 프로그램에 대한 설명, 그리고 조직이 이러한 서비스 및 프로그램에 대한 근로자의 접근권을 어떻게 촉진하는지에 대한 설명해주세요.' }
    ],
    '403-7': [
      { id: 'gri403-7-a', question: 'a. 조직의 운영, 조직의 비즈니스 관계에 따른 제품과 서비스, 그리고 관련 위험요인과 리스크와 직접적으로 연계된 직장 건강 및 안전 관련 심각한 부정적 영향을 예방 또는 완화하기 위한 접근법을 보고해주세요.' }
    ],
    '403-8': [
      { id: 'gri403-8-a', question: 'a. 조직이 법률이나 관련 기준/지침에 따라 직장 건강 및 안전 관리 시스템을 운용 중인 경우 다음을 보고해주세요.\n\ni. 이러한 시스템의 적용을 받는 직원과 직원 외 근로자 (직원은 아니지만 조직으로부터 업무 지시를 받고/받거나 조직의 통제를 받는 근무장소에서 일하는 근로자) 수와 비율\n\nii. 내부감사를 받은 이러한 시스템의 적용을 받는 직원과 직원 외 근로자 (직원은 아니지만 조직으로부터 업무 지시를 받고/받거나 조직의 통제를 받는 근무장소에서 일하는 근로자) 수와 비율\n\niii. 외부감사나 외부인증을 받은 이러한 시스템의 적용을 받는 직원과 직원 외 근로자 (직원은 아니지만 조직으로부터 업무 지시를 받고/받거나 조직의 통제를 받는 근무장소에서 일하는 근로자) 수와 비율' },
      { id: 'gri403-8-b', question: 'b. 상기 내용 보고 시 제외된 근로자가 있는지 여부와 그 이유 (제외된 근로자 유형에 대한 정보도 포함)를 기술해주세요.' },
      { id: 'gri403-8-c', question: 'c. 표준, 방법론, 가정 등 이러한 데이터를 취합한 방식을 이해하는데 필요한 배경 정보를 제공해주세요.' }
    ],
    '403-9': [
      { id: 'gri403-9-a', question: 'a. 모든 직원에 대해 다음과 같이 보고해주세요.\n\ni. 업무 관련 부상으로 인한 사망 건수와 비율\n\nii. 업무 관련 심각한 부상 건수와 비율 (사망 건수 제외)\n\niii. 기록된 업무 관련 부상 건수와 비율\n\niv. 업무 관련 부상의 주요 유형\n\nv. 근무 시간' },
      { id: 'gri403-9-b', question: 'b. 직원은 아니지만 조직으로부터 업무 지시를 받고/받거나 조직의 통제를 받는 근무장소에서 일하는 근로자에 대해 다음과 같이 보고해주세요.\n\ni. 업무 관련 부상으로 인한 사망 건수와 비율\n\nii. 업무 관련 심각한 부상 건수와 비율 (사망 건수 제외)\n\niii. 기록된 업무 관련 부상 건수와 비율\n\niv. 업무 관련 부상의 주요 유형\n\nv. 근무시간' },
      { id: 'gri403-9-c', question: 'c. 심각한 부상 리스크를 초래하는 업무 관련 위험요인을 다음과 같이 보고해주세요.\n\ni. 이러한 위험요인을 파악한 방법\n\nii. 이러한 위험요인 중 어떤 요인이 보고기간 중 심각한 부상을 초래한 원인이 되었는지 기술\n\niii. 관리체계를 통해 이러한 위험요인을 제거하고 리스크를 최소화하기 위해 이미 취한 조치 또는 현재 진행 중인 조치' },
      { id: 'gri403-9-d', question: 'd. 관리체계를 통해 기타 다른 업무 관련 위험요인을 제거하고 리스크를 최소화하기 위해 이미 취한 조치 또는 현재 진행 중인 조치를 보고해주세요.' },
      { id: 'gri403-9-e', question: 'e. 상기한 비율들을 계산할 때 근무시간 20만시간을 기준으로 삼았는지 아니면 1백만 시간을 기준으로 삼았는지 여부를 기술해주세요.' },
      { id: 'gri403-9-f', question: 'f. 상기 내용 보고 시 제외된 근로자가 있는지 여부와 그 이유 (제외된 근로자 유형에 대한 정보도 포함)를 기재해주세요.' },
      { id: 'gri403-9-g', question: 'g. 표준, 방법론, 가정 등 이러한 데이터를 취합한 방식을 이해하는데 필요한 배경 정보를 제공해주세요.' }
    ],
    '403-10': [
      { id: 'gri403-10-a', question: 'a. 모든 직원에 대해 다음을 보고해주세요.\n\ni. 업무 관련 질병으로 인한 사망 건수\n\nii. 기록된 업무 관련 질병 발병 사례 건수\n\niii. 업무 관련 질병의 주요 유형' },
      { id: 'gri403-10-b', question: 'b. 직원은 아니지만 조직으로부터 업무 지시를 받고/받거나 조직의 통제를 받는 근무장소에서 일하는 근로자에 대해 보고해주세요.\n\ni. 업무 관련 질병으로 인한 사망자 수\n\nii. 기록된 업무 관련 질병 발병 사례 건수\n\niii. 업무 관련 질병의 주요 유형' },
      { id: 'gri403-10-c', question: 'c. 발병 리스크를 초래하는 업무 관련 위험요인을 보고해주세요.\n\ni. 이러한 위험요인을 파악한 방법\n\nii. 이러한 위험요인 중 어떤 요인이 보고기간 중 발병 원인이 되었는지 기술\n\niii. 관리체계를 통해 이러한 위험요인을 제거하고 리스크를 최소화 하기 위해 이미 취한 조치 또는 현재 진행 중인 조치' }
    ],

    // GRI 404 Training and Education
    '404-1': [
      { id: 'gri404-1-a', question: 'a. 아래 항목별로 보고기간 동안 직원들이 이수한 평균 교육시간을 보고해주세요.\n\ni. 성별\n\nii. 직원 카테고리' }
    ],
    '404-2': [
      { id: 'gri404-2-a', question: 'a. 직원 역량강화를 위해 제공된 지원과 실행된 프로그램의 유형과 범위를 보고해주세요.' },
      { id: 'gri404-2-b', question: 'b. 은퇴나 퇴사로 인한 경력단절을 관리하고 지속적 고용을 촉진하기 위해 제공되는 이직 지원 프로그램을 보고해주세요.' }
    ],
    '404-3': [
      { id: 'gri404-3-a', question: 'a. 보고기간 중 정기적인 성과 및 경력 개발 검토를 받은 직원들의 비율 (성별 기준, 직원 카테고리 기준으로 각각 그 비율 산출)을 보고해주세요.' }
    ],

    // GRI 405 Diversity and Equal Opportunity
    '405-1': [
      { id: 'gri405-1-a', question: 'a. 다양성 관련 항목별로 조직의 지배구조 기구 내 구성원 비율을 다음과 같이 보고해주세요.\n\ni. 성별\n\nii. 연령: 30세 미만, 30~50세, 50세 이상\n\niii. 기타 해당되는 다양성 지표(예: 소수집단, 취약계층)' },
      { id: 'gri405-1-b', question: 'b. 다양성 관련 항목별로 직원 카테고리별 직원 비율을 다음과 같이 보고해주세요.\n\ni. 성별\n\nii. 연령: 30세 미만, 30~50세, 50세 이상\n\niii. 기타 해당되는 다양성 지표(예: 소수집단, 취약계층)' }
    ],
    '405-2': [
      { id: 'gri405-2-a', question: 'a. 중요 사업장 소재 지역별로 각 직원 카테고리에 대해 남성 대 여성의 기본급과 보수 비율을 보고해주세요.' },
      { id: 'gri405-2-b', question: 'b. \'중요 사업장 소재 지역\'의 정의를 명시해주세요.' }
    ],

    // GRI 406 Non-discrimination
    '406-1': [
      { id: 'gri406-1-a', question: 'a. 보고기간 중 차별 사례 총 건수를 보고해주세요.' },
      { id: 'gri406-1-b', question: 'b. 해당 차별 사례 현황 및 이와 관련해 취한 조치를 보고해주세요.\n\ni. 조직에서 검토한 사례\n\nii. 실행 중인 개선계획\n\niii. 실행된 개선계획과 그 결과를 일상적 내부관리 검토 프로세스를 통해 검토\n\niv. 더 이상 시정조치 대상이 아닌 사례' }
    ],

    // GRI 407 Freedom of Association and Collective Bargaining
    '407-1': [
      { id: 'gri407-1-a', question: 'a. 집회결사 및 단체교섭권 훼손 위험이 있는 사업장 및 공급업체와 관련하여 보고해주세요.\n\ni. 사업장 (제조공장 등) 및 공급업체 유형\n\nii. 이러한 위험이 있는 사업장 및 공급업체가 위치한 국가나 지역' },
      { id: 'gri407-1-b', question: 'b. 보고기간 동안 집회결사 및 단체교섭권을 지원하기 위해 조직이 취한 조치를 보고해주세요.' }
    ],

    // GRI 408 Child Labor
    '408-1': [
      { id: 'gri408-1-a', question: 'a. 사고 발생 위험이 높은 사업장 및 공급업체를 다음과 같이 보고해주세요.\n\ni. 아동노동\n\nii. 위험한 작업에 노출된 어린 연령의 근로자' },
      { id: 'gri408-1-b', question: 'b. 아동노동 발생 위험이 높은 사업장 및 공급업체와 관련하여 보고해주세요.\n\ni. 사업장 (제조공장 등) 및 공급업체 유형\n\nii. 이러한 위험이 있는 사업장 및 공급업체가 위치한 국가나 지역' },
      { id: 'gri408-1-c', question: 'c. 보고기간 동안 아동노동의 효과적 근절을 위해 조직이 취한 조치를 보고해주세요.' }
    ],

    // GRI 409 Forced or Compulsory Labor
    '409-1': [
      { id: 'gri409-1-a', question: 'a. 강제 노역 발생 위험이 높은 사업장 및 공급업체와 관련하여 다음과 같이 보고해주세요.\n\ni. 사업장 (제조공장 등) 및 공급업체의 유형\n\nii. 이러한 위험이 있는 사업장 및 공급업체가 위치한 국가나 지역' },
      { id: 'gri409-1-b', question: 'b. 보고기간 동안 모든 형태의 강제 노역을 근절하기 위해 조직이 취한 조치를 보고해주세요.' }
    ],

    // GRI 410 Security Practices
    '410-1': [
      { id: 'gri410-1-a', question: 'a. 인권 정책이나 절차 및 이의 적용에 대한 조직의 공식 교육을 받은 보안 담당자의 비율을 보고해주세요.' },
      { id: 'gri410-1-b', question: 'b. 외부 보안용역업체에도 이러한 교육 이수가 요구되는지 여부를 기술해주세요.' }
    ],

    // GRI 411 Rights of Indigenous Peoples
    '411-1': [
      { id: 'gri411-1-a', question: 'a. 보고기간 중 원주민의 권리를 침해한 것으로 확인된 사례 총 수를 보고해주세요.' },
      { id: 'gri411-1-b', question: 'b. 해당 사례의 현황 및 아래와 관련해 취한 조치를 보고해주세요.\n\ni. 조직에서 검토한 사례\n\nii. 실행 중인 개선계획\n\niii. 실행된 개선계획과 그 결과를 일상적 내부관리 검토 프로세스를 통해 검토\n\niv. 더 이상 개선조치 대상이 아닌 사례' }
    ],

    // GRI 413 Local Communities
    '413-1': [
      { id: 'gri413-1-a', question: 'a. 아래 항목을 포함해 지역사회 참여, 영향 평가 및 개발 프로그램을 운영하고 있는 사업장 비중을 보고해주세요.\n\ni. 참여 프로세스에 기반한 사회적 영향 평가 (성별 영향 평가 포함)\n\nii. 환경영향평가 및 지속적 모니터링\n\niii. 환경 및 사회적 영향 평가결과를 일반에게 공개\n\niv. 지역사회의 필요에 기반한 지역사회 개발 프로그램\n\nv. 이해관계자 파악을 기반으로 한 이해관계자와의 협력 계획\n\nvi. 취약집단을 포함하는 광범위한 지역사회 협의위원회 및 프로세스\n\nvii. 환경 및 사회적 영향에 대응하기 위한 직장협의회, 직장 건강 및 안전 위원회, 기타 근로자 대표기구\n\nviii. 공식적인 지역사회 고충 처리절차' }
    ],
    '413-2': [
      { id: 'gri413-2-a', question: 'a. 지역사회에 실제적/잠재적으로 중대한 부정적 영향을 미치는 사업장을 보고해주세요.\n\ni. 사업장 위치\n\nii. 중대한 실제적/잠재적 부정적 영향' }
    ],

    // GRI 414 Supplier Social Assessment
    '414-1': [
      { id: 'gri414-1-a', question: 'a. 사회적 기준에 따른 심사를 거친 신규 공급업체들의 비중을 보고해주세요.' }
    ],
    '414-2': [
      { id: 'gri414-2-a', question: 'a. 사회적 영향 평가가 완료된 공급업체 수를 보고해주세요.' },
      { id: 'gri414-2-b', question: 'b. 실제적/잠재적으로 중대한 부정적 사회적 영향을 미치는 것으로 확인된 공급업체 수를 보고해주세요.' },
      { id: 'gri414-2-c', question: 'c. 공급망에서 확인된 중대한 실제적/잠재적 부정적 사회적 영향을 보고해주세요.' },
      { id: 'gri414-2-d', question: 'd. 실제적/잠재적으로 중대한 부정적 사회적 영향을 미치는 것으로 확인되어 이에 대한 개선책을 마련하기로 합의한 공급업체 비중을 보고해주세요.' },
      { id: 'gri414-2-e', question: 'e. 실제적/잠재적으로 중대한 부정적 사회적 영향을 미치는 것으로 확인되어 계약관계가 종료된 공급업체 비중 (계약해지 사유도 함께 기재)을 보고해주세요.' }
    ],

    // GRI 415 Public Policy
    '415-1': [
      { id: 'gri415-1-a', question: 'a. 조직이 직간접적으로 한 현물 및 금전 기부금 총액 (국가별, 수령자별로 기재)을 보고해주세요.' },
      { id: 'gri415-1-b', question: 'b. 해당되는 경우, 현물 기부금의 금전적 가치를 추산한 방법을 보고해주세요.' }
    ],

    // GRI 416 Customer Health and Safety
    '416-1': [
      { id: 'gri416-1-a', question: 'a. 건강 및 안전 영향 평가 결과 개선이 필요한 것으로 파악된 중요 제품/서비스 비중을 보고해주세요.' }
    ],
    '416-2': [
      { id: 'gri416-2-a', question: 'a. 보고기간 중 제품/서비스의 건강 및 안전 영향에 관한 규정 및 자발적 규범을 위반한 총 건수를 보고해주세요.\n\ni. 규정 위반으로 벌금이나 페널티가 부과된 건\n\nii. 규정 위반으로 경고를 받은 건\n\niii. 자발적 규범 위반 건' },
      { id: 'gri416-2-b', question: 'b. 조직이 규정 및 자발적 규범 위반사항을 발견하지 못한 경우에는, 이 점을 간략히 기술하는 것으로 갈음합니다.' }
    ],

    // GRI 417 Marketing and Labeling
    '417-1': [
      { id: 'gri417-1-a', question: 'a. 아래 나온 유형의 정보 각각이 조직의 제품/서비스 정보 및 라벨링 절차에 따라 요구되는지 여부를 기재해주세요.\n\ni. 제품이나 서비스 구성요소들의 소싱\n\nii. 함유물, 특히 환경/사회에 영향을 미치는 물질\n\niii. 제품이나 서비스의 안전한 사용\n\niv. 제품 폐기 및 환경/사회적 영향\n\nv. 기타 (설명을 제공할 것)' },
      { id: 'gri417-1-b', question: 'b. 조직의 제품/서비스 정보 및 라벨링 절차의 적용대상이되고 이러한 절차의 준수여부를 평가하는 대상이 되는 주요 제품이나 서비스의 비율을 보고해주세요.' }
    ],
    '417-2': [
      { id: 'gri417-2-a', question: 'a. 제품/서비스 정보 및 라벨링 관련 규정이나 자발적 규범을 위반한 총 건수를 보고해주세요.\n\ni. 규정 위반으로 벌금이나 페널티가 부과된 건\n\nii. 규정 위반으로 경고를 받은 건\n\niii. 자발적 규범 위반 건' },
      { id: 'gri417-2-b', question: 'b. 조직이 규정 및 자발적 규범 위반사항을 발견하지 못한 경우에는, 이 점을 간략히 기술하는 것으로 갈음합니다.' }
    ],
    '417-3': [
      { id: 'gri417-3-a', question: 'a. 광고/판촉/후원을 포함해 마케팅 커뮤니케이션 관련 규정 또는 자발적 규범을 위반한 총 건수를 보고해주세요.\n\ni. 규정 위반으로 벌금이나 페널티가 부과된 건\n\nii. 규정 위반으로 경고를 받은 건\n\niii. 자발적 규범 위반 건' },
      { id: 'gri417-3-b', question: 'b. 조직이 규정 및 자발적 규범 위반사항을 발견하지 못한 경우에는, 이 점을 간략히 기술하는 것으로 갈음합니다.' }
    ],

    // GRI 418 Customer Privacy
    '418-1': [
      { id: 'gri418-1-a', question: 'a. 고객 개인정보보호 위반과 관련해 접수된 민원 중 입증된 민원 건수를 보고해주세요.\n\ni. 외부로부터 접수되어 조직이 검증한 민원\n\nii. 규제기관이 제기한 민원' },
      { id: 'gri418-1-b', question: 'b. 확인된 고객정보 유출, 도난, 유실 총 건수' },
      { id: 'gri418-1-c', question: 'c. 조직이 입증된 민원을 발견하지 못한 경우에는, 이 점을 간략히 기술하는 것으로 갈음합니다.' }
    ]
  };



  // Sample data (Suggested Statement 용) - sample 테이블 기반
  const suggestedStatements = {
    '2-1': {
      title: '조직 세부 정보',
      statement: `한국서부발전(KOWEPO)은 1982년 설립된 대한민국의 공기업으로, 본사는 태안군 태안읍에 위치해 있습니다. 
회사는 발전사업을 주력으로 하며, 총 12개의 발전소를 통해 전력 공급과 더불어 지역사회와의 상생 발전을 추구하고 있습니다. 
또한 신재생에너지 사업 확대를 통해 지속가능한 에너지 전환에 기여하고 있습니다.`,
      generated_date: '2024-01-15',
      status: 'final'
    },
    '201-1': {
      title: '직접적인 경제적 가치의 창출과 분배',
      statement: `2023년 한국서부발전의 직접적인 경제적 가치는 다음과 같습니다:
- 수익: 8조 2,456억원 (전년 대비 12% 증가)
- 운영비용: 7조 8,234억원 
- 근로자 급여 및 복리후생: 3,245억원
- 정부 납부금: 2,134억원
- 지역사회 투자: 456억원
- 유보 이익: 387억원

회사는 안정적인 전력 공급을 통해 국가 경제 발전에 기여하며, 지역사회와의 상생을 위한 다양한 투자를 지속하고 있습니다.`,
      generated_date: '2024-01-15',
      status: 'draft'
    },
    '305-1': {
      title: '직접 온실가스 배출량 (Scope1)',
      statement: `2023년 한국서부발전의 직접 온실가스 배출량(Scope 1)은 총 45,623,456 tCO2eq입니다.
- 석탄화력발전소: 42,134,567 tCO2eq (92.4%)
- 가스화력발전소: 3,234,567 tCO2eq (7.1%)
- 기타 연료: 254,322 tCO2eq (0.5%)

배출량 산정은 2006 IPCC 가이드라인을 기준으로 하였으며, 제3자 검증을 완료했습니다.
회사는 2030년까지 Scope 1 배출량을 2018년 대비 30% 감축하는 목표를 설정하고 있습니다.`,
      generated_date: '2024-01-15',
      status: 'final'
    },
    '401-1': {
      title: '신규채용 및 이직',
      statement: `2023년 한국서부발전의 신규채용 및 이직 현황:

신규채용:
- 전체 신규채용: 234명
- 30세 미만: 156명 (66.7%)
- 30-50세: 67명 (28.6%)
- 50세 이상: 11명 (4.7%)
- 남성: 145명 (62.0%), 여성: 89명 (38.0%)

이직률:
- 전체 이직률: 3.2%
- 자발적 이직: 45명 (1.8%)
- 정년퇴직: 34명 (1.4%)

회사는 우수 인재 확보와 직원 만족도 향상을 통해 안정적인 조직 운영을 추구하고 있습니다.`,
      generated_date: '2024-01-15',
      status: 'review'
    },
    '403-9': {
      title: '업무 관련 상해',
      statement: `2023년 한국서부발전의 업무 관련 상해 현황:

임직원 상해:
- 기록 가능한 업무 관련 상해: 12건
- 중대한 업무 관련 상해: 1건
- 업무 관련 사망: 0건
- 상해율(200,000 근무시간당): 0.85
- 중대 상해율: 0.07

협력업체 근로자 상해:
- 기록 가능한 업무 관련 상해: 8건
- 중대한 업무 관련 상해: 0건
- 업무 관련 사망: 0건

회사는 무재해 사업장 달성을 목표로 안전관리 시스템을 지속적으로 개선하고 있습니다.`,
      generated_date: '2024-01-15',
      status: 'final'
    }
  };

  // 완성도 계산 함수
  const calculateCompletionStats = () => {
    // 총 질문 수 계산 (모든 requirements의 질문 수)
    const totalQuestions = Object.values(requirements).reduce((total, disclosureRequirements) => {
      return total + disclosureRequirements.length;
    }, 0);

    // 답변이 완료된 질문 수 (입력된 답변이 있는 질문)
    const answeredQuestions = Object.keys(requirementInputs).filter(key => 
      requirementInputs[key] && requirementInputs[key].trim().length > 0
    ).length;

    // Suggested Statement가 생성된 disclosure 수
    const totalDisclosures = Object.keys(requirements).length;
    const completedStatements = Object.keys(suggestedStatements).length;

    // 최종 승인된 statement 수
    const finalApprovedCount = Object.values(approvedStatements).filter(item => 
      item.status === 'final'
    ).length;

    return {
      totalQuestions,
      answeredQuestions,
      totalDisclosures,
      completedStatements,
      finalApprovedCount,
      answerCompletionRate: totalQuestions > 0 ? (answeredQuestions / totalQuestions * 100) : 0,
      statementCompletionRate: totalDisclosures > 0 ? (completedStatements / totalDisclosures * 100) : 0,
      approvalCompletionRate: completedStatements > 0 ? (finalApprovedCount / completedStatements * 100) : 0
    };
  };

  const completionStats = calculateCompletionStats();

  // 선택된 disclosure의 Suggested Statement 가져오기
  const getSuggestedStatementForDisclosure = (disclosureId) => {
    return suggestedStatements[disclosureId] || null;
  };

  // 선택된 카테고리의 Disclosures 필터링
  const getDisclosuresForCategory = (categoryId) => {
    return disclosures.filter(disclosure => disclosure.category_id === categoryId);
  };

  // 선택된 disclosure의 Requirements 가져오기
  const getRequirementsForDisclosure = (disclosureId) => {
    return requirements[disclosureId] || [];
  };

  // Requirements input 값 변경 핸들러
  const handleRequirementInputChange = (requirementId, value) => {
    setRequirementInputs(prev => ({
      ...prev,
      [requirementId]: value
    }));
  };

  // Suggested Statement 수정 관련 핸들러
  const handleEditStatement = (disclosureId) => {
    setEditingStatement(disclosureId);
    const currentStatement = getSuggestedStatementForDisclosure(disclosureId);
    if (currentStatement) {
      setEditedStatements(prev => ({
        ...prev,
        [disclosureId]: currentStatement.statement
      }));
    }
  };

  const handleSaveStatement = (disclosureId) => {
    // 여기서 실제로는 API 호출을 통해 서버에 저장
    console.log('저장할 문장:', editedStatements[disclosureId]);
    setEditingStatement(null);
    // 임시로 로컬 상태 업데이트 (실제로는 서버 응답 후 처리)
    alert('문장이 저장되었습니다.');
  };

  const handleCancelEdit = () => {
    const currentEditingStatement = editingStatement;
    setEditingStatement(null);
    if (currentEditingStatement) {
      setEditedStatements(prev => {
        const newState = { ...prev };
        delete newState[currentEditingStatement];
        return newState;
      });
    }
  };

  const handleStatementChange = (disclosureId, value) => {
    setEditedStatements(prev => ({
      ...prev,
      [disclosureId]: value
    }));
  };

  // 최종 승인 핸들러
  const handleApproveStatement = async (disclosureId) => {
    // 저장할 문장을 editedStatements 상태에서 가져옵니다.
    const statementToApprove = editedStatements[disclosureId];

    if (!statementToApprove) {
      alert('저장할 문장이 없습니다. 문장을 생성하거나 수정한 후 시도해주세요.');
      return;
    }

    if (!confirm(`'${disclosureId}' 항목에 대한 문장을 최종 승인하고 저장하시겠습니까?`)) {
      return;
    }

    try {
      // ✅ axios를 사용하여 백엔드 API 호출
      const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const apiUrl = `${gatewayUrl}/e/v2/gri-service/samples/approve`;
      const requestBody = {
        qual_data: statementToApprove,
        disclosure_id: disclosureId,
        company_id: 'KOMIPO'
      };
      const response = await axios.post(apiUrl, requestBody, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // API 호출이 성공하면, 반환된 데이터를 콘솔에 출력
      console.log('성공적으로 저장되었습니다:', response.data);
      
      // 프론트엔드의 상태를 '최종 승인됨'으로 업데이트하여 UI에 즉시 반영
      const today = new Date().toISOString().split('T')[0];
      setApprovedStatements(prev => ({
        ...prev,
        [disclosureId]: {
          status: 'final',
          approvedDate: today
        }
      }));

      alert(`'${disclosureId}' 항목이 성공적으로 최종 승인 및 저장되었습니다.`);

    } catch (error) {
      console.error('최종 승인 처리 중 오류 발생:', error);
      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      // axios 에러 객체를 사용하여 더 상세한 에러 메시지 추출
      if (axios.isAxiosError && axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          errorMessage = error.response.data.detail || JSON.stringify(error.response.data);
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        try {
          errorMessage = JSON.stringify(error);
        } catch {
          errorMessage = '서버에서 오류가 발생했습니다.';
        }
      }
      alert(`오류가 발생하여 저장에 실패했습니다: ${errorMessage}`);
    }
  };

  // Requirements 답변을 기반으로 Suggested Statement 생성
  const handleSaveRequirements = async (disclosureId) => {
    // 1. 저장할 답변 데이터를 백엔드 스키마에 맞게 구조화된 배열로 만듭니다.
    const requirementsForDisclosure = getRequirementsForDisclosure(disclosureId);
    const answersToSave = requirementsForDisclosure.map(req => ({
      requirement_id: req.id,
      quant_data: requirementInputs[req.id] || ''
    })).filter(item => item.quant_data.trim() !== '');

    if (answersToSave.length === 0) {
      alert('저장할 답변이 없습니다. 최소 하나의 요구사항에 답변을 입력해주세요.');
      return;
    }

    // 2. UI 로딩 상태를 설정합니다.
    setGeneratingStatement(disclosureId);
    setShowSuggestedStatement(true);

    try {
      // 3. 백엔드에 답변 저장을 요청합니다.
      const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const apiUrl = `${gatewayUrl}/e/v2/gri/answers`;

      // TODO: 실제 애플리케이션에서는 로그인 상태에서 사용자 ID를 가져와야 합니다.
      const userId = "103270647320897156958"; 

      const requestBody = {
        user_id: userId,
        answers: answersToSave
      };

      console.log(`요청 URL: ${apiUrl}`);
      console.log('백엔드로 보내는 요청 Body:', JSON.stringify(requestBody, null, 2));

      // axios를 사용하여 백엔드에 POST 요청
      const response = await axios.post(apiUrl, requestBody, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      console.log('서버로부터의 답변 저장 응답:', response.data);
      
      // 4. 답변 저장 성공 후, AI 문장 생성을 시뮬레이션합니다.
      // (이 부분은 프론트엔드 모의 로직이므로 그대로 유지)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockGeneratedStatement =  response.data.message;
      console.log('👌👌👌👌👌mockGeneratedStatement:', mockGeneratedStatement);

      setEditedStatements(prev => ({
        ...prev,
        [disclosureId]: mockGeneratedStatement
      }));
      
      alert(`Requirements 답변이 저장되었고, ${disclosureId}에 대한 Suggested Statement가 생성되었습니다!`);

      // 이 자리에 모델 로더 서비스 호출 로직 추가

    } catch (error) {
      console.error('데이터 저장 또는 문장 생성 오류:', error);
      let errorMessage = '서버와 통신 중 오류가 발생했습니다.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.detail || JSON.stringify(error.response.data);
      }
      alert(`오류 발생: ${errorMessage}`);
    } finally {
      setGeneratingStatement(null);
    }
  };

  // AI로 문장 생성하기 (Suggested Statement에서 직접 호출)
  const handleGenerateStatement = async (disclosureId) => {
    const requirements = getRequirementsForDisclosure(disclosureId);
    const answers = requirements.map(req => ({
      questionId: req.id,
      question: req.question,
      answer: requirementInputs[req.id] || ''
    })).filter(item => item.answer.trim() !== '');

    if (answers.length === 0) {
      alert('먼저 Requirements에서 답변을 입력해주세요.');
      return;
    }

    setGeneratingStatement(disclosureId);

    try {
      // 동일한 로직으로 문장 생성
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockGeneratedStatement = `[AI 재생성] ${disclosureId}에 대한 답변을 바탕으로 재생성된 보고서용 문장입니다.\n\n` +
        `총 ${answers.length}개의 요구사항 답변을 분석하여 다음과 같이 개선된 보고서를 작성했습니다:\n\n` +
        answers.map((answer, index) => `• ${answer.answer}`).join('\n') +
        `\n\n상기 내용에 따라 당사는 ${disclosureId} 관련 모든 요구사항을 체계적으로 관리하고 있습니다.`;

      setEditedStatements(prev => ({
        ...prev,
        [disclosureId]: mockGeneratedStatement
      }));

      alert('새로운 Suggested Statement가 생성되었습니다!');
      
    } catch (error) {
      console.error('문장 생성 오류:', error);
      alert('문장 생성 중 오류가 발생했습니다.');
    } finally {
      setGeneratingStatement(null);
    }
  };

  const handleGenerateGRI = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setGriData(''); // 이전 결과 초기화

    try {
      // ✅ [수정] 게이트웨이 URL을 사용하여 직접 백엔드 서비스 호출
      const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      
      // ✅ [수정] 백엔드 라우터 경로에 맞게 URL 수정 (`/e/v2/<서비스명>/<경로>`)
      // 이전에 `/gri/generate`로 잘못 안내드렸을 수 있습니다. 게이트웨이를 통과하는 최종 경로는
      // `/e/v2/gri/gri/generate`가 되어야 합니다. 
      // 백엔드 gri_router.py의 경로가 `@router.post("/gri/generate", ...)` 이므로 이것이 맞습니다.
      const apiUrl = `${gatewayUrl}/e/v2/gri/gri/generate`;

      const requestBody = {
        prompt: inputText,
      };

      console.log(`[handleGenerateGRI] 요청 URL: ${apiUrl}`);
      console.log('[handleGenerateGRI] 요청 Body:', JSON.stringify(requestBody, null, 2));

      // ✅ [수정] fetch 대신 axios를 사용하여 POST 요청
      const response = await axios.post(apiUrl, requestBody, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // 게이트웨이에서 인증 쿠키 등을 사용할 경우 필요
        timeout: 120000 // AI 모델 응답이 길 수 있으므로 타임아웃을 2분(120초)으로 설정
      });
      
      console.log('[handleGenerateGRI] 서버 응답:', response.data);
      
      // 백엔드의 GenerateResponse 스키마는 { answer: str } 형태입니다.
      setGriData(response.data.answer || 'GRI 분석이 완료되었지만, 응답 내용이 없습니다.');

    } catch (error) {
      console.error('[handleGenerateGRI] 오류:', error);
      let errorMessage = '서버와 통신 중 오류가 발생했습니다.';
      
      // axios 에러 객체를 사용하여 더 상세한 에러 메시지 추출
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버에서 응답이 왔지만, 상태 코드가 2xx가 아닌 경우
          // FastAPI의 HTTPException detail 메시지를 가져옵니다.
          errorMessage = error.response.data?.detail || JSON.stringify(error.response.data);
        } else if (error.request) {
          // 요청은 보냈으나 응답을 받지 못한 경우 (네트워크 오류, 서버 다운 등)
          errorMessage = 'GRI 서비스로부터 응답이 없습니다. 서버가 실행 중인지 확인해주세요.';
        }
      }
      
      setGriData(`GRI 분석 중 오류가 발생했습니다: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        {/* 플로팅 완성도 패널 */}
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200 w-48">
            <div className="text-center mb-3">
              <h4 className="text-sm font-bold text-gray-800">진행 현황</h4>
            </div>
            
            {/* 미니 원형 차트들 */}
            <div className="space-y-3">
              {/* 질문 답변 */}
              <div className="flex items-center">
                <div className="relative w-8 h-8 mr-3">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle 
                      cx="16" cy="16" r="12" 
                      stroke="#3b82f6" strokeWidth="4" fill="none"
                      strokeDasharray={`${completionStats.answerCompletionRate * 0.754} 75.398`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">{Math.round(completionStats.answerCompletionRate)}%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">질문 답변</p>
                  <p className="text-xs text-gray-500">{completionStats.answeredQuestions}/323</p>
                </div>
              </div>

              {/* 문장 생성 */}
              <div className="flex items-center">
                <div className="relative w-8 h-8 mr-3">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle 
                      cx="16" cy="16" r="12" 
                      stroke="#10b981" strokeWidth="4" fill="none"
                      strokeDasharray={`${completionStats.statementCompletionRate * 0.754} 75.398`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">{Math.round(completionStats.statementCompletionRate)}%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">AI 문장</p>
                  <p className="text-xs text-gray-500">{completionStats.completedStatements}/{completionStats.totalDisclosures}</p>
                </div>
              </div>

              {/* 최종 승인 */}
              <div className="flex items-center">
                <div className="relative w-8 h-8 mr-3">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle 
                      cx="16" cy="16" r="12" 
                      stroke="#8b5cf6" strokeWidth="4" fill="none"
                      strokeDasharray={`${completionStats.approvalCompletionRate * 0.754} 75.398`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-600">{Math.round(completionStats.approvalCompletionRate)}%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">최종 승인</p>
                  <p className="text-xs text-gray-500">{completionStats.finalApprovedCount}/{completionStats.completedStatements}</p>
                </div>
              </div>
            </div>

            {/* 전체 진행률 */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-center mb-2">
                <span className="text-sm font-bold text-gray-800">
                  {Math.round((completionStats.answerCompletionRate + completionStats.statementCompletionRate + completionStats.approvalCompletionRate) / 3)}%
                </span>
                <p className="text-xs text-gray-500">전체 완성도</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 h-1.5 rounded-full transition-all duration-700"
                  style={{ 
                    width: `${(completionStats.answerCompletionRate + completionStats.statementCompletionRate + completionStats.approvalCompletionRate) / 3}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-800">GRI 리포트 생성기</h1>
          </div>

                     {/* GRI 설명 */}
           <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
             <h2 className="text-2xl font-semibold text-gray-800 mb-4">GRI 리포트 생성 시스템이란?</h2>
             <div className="text-gray-600 mb-6 space-y-4">
               <p>
                 GRI (Global Reporting Initiative)는 전 세계적으로 가장 널리 사용되는 지속가능성 보고 표준으로, 기업의 경제·환경·사회적 영향에 대한 정보를 투명하게 공시할 수 있도록 지원합니다.
               </p>
               <p>
                 본 시스템은 GRI Standard 2021에 기반하여 보고서 생성을 자동화합니다. 사용자는 요구사항(Requirements)을 입력하면, 시스템이 AI를 활용해 Suggested Statement를 생성하고, 이를 수정 및 승인함으로써 최종 보고 문장을 완성할 수 있습니다.
               </p>
               <p className="mb-6">
                 전체 데이터는 다음과 같은 구조로 연결되어 있습니다:
               </p>
               
               {/* 플로우 차트 */}
               <div className="flex items-center justify-center mb-6 overflow-x-auto">
                 <div className="flex items-center space-x-2 min-w-max">
                   {/* Categories */}
                   <div className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[120px] justify-center">
                     <span className="text-lg">📂</span>
                     <span className="font-semibold text-sm">Categories</span>
                   </div>
                   
                   {/* 화살표 1 */}
                   <div className="text-gray-400 text-xl px-2">
                     →
                   </div>
                   
                   {/* Disclosures */}
                   <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[120px] justify-center">
                     <span className="text-lg">📋</span>
                     <span className="font-semibold text-sm">Disclosures</span>
                   </div>
                   
                   {/* 화살표 2 */}
                   <div className="text-gray-400 text-xl px-2">
                     →
                   </div>
                   
                   {/* Requirements */}
                   <div className="bg-purple-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[130px] justify-center">
                     <span className="text-lg">❓</span>
                     <span className="font-semibold text-sm">Requirements</span>
                   </div>
                   
                   {/* 화살표 3 */}
                   <div className="text-gray-400 text-xl px-2">
                     →
                   </div>
                   
                   {/* Suggested Statement */}
                   <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 min-w-[140px] justify-center">
                     <span className="text-lg">💡</span>
                     <span className="font-semibold text-sm">Suggested Statement</span>
                   </div>
                 </div>
               </div>
               
               
             </div>
           </div>

          {/* GRI 데이터베이스 관리 섹션 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">GRI 표준 데이터베이스 관리</h2>
            <p className="text-gray-600 mb-6">GRI 표준 구조에 따른 Categories, Disclosures, Requirements를 관리합니다</p>
            
            {/* Categories와 Disclosures 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Categories 카드 */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6 text-white">
                  <div className="flex items-center mb-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                      <span className="text-2xl">📂</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Categories</h3>
                      <p className="text-sm opacity-90">최상위 분류 카테고리</p>
                    </div>
                  </div>
                  <div className="mb-4 space-y-1 text-sm opacity-75">
                    <p>• 총 30개 카테고리 (GRI 2-418)</p>
                    <p>• 경제(200대), 환경(300대), 사회(400대)</p>
                  </div>
                  <button 
                    onClick={() => setShowCategories(!showCategories)}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg transition-all font-semibold"
                  >
                    {showCategories ? '카테고리 목록 닫기' : '카테고리 관리하기'}
                  </button>
                </div>
                
                {/* Categories 드롭다운 목록 */}
                {showCategories && (
                  <div className="bg-white rounded-b-xl p-4 border-t border-blue-300">
                    <h4 className="text-gray-800 font-semibold mb-3">📂 카테고리 선택</h4>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {categories.map((category) => (
                        <div 
                          key={category.id}
                          onClick={() => {
                            setSelectedCategoryId(category.id);
                            setShowDisclosures(true);
                          }}
                          className="flex justify-between items-center p-3 bg-gray-50 hover:bg-blue-50 rounded-lg cursor-pointer transition-all border border-transparent hover:border-blue-300"
                        >
                          <div>
                            <span className="font-semibold text-blue-600">{category.id}</span>
                            <p className="text-xs text-gray-600 mt-1">{category.title}</p>
                          </div>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">{category.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Disclosures 카드 */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6 text-white">
                  <div className="flex items-center mb-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Disclosures</h3>
                      <p className="text-sm opacity-90">공시 정보 관리</p>
                    </div>
                  </div>
                  <div className="mb-4 space-y-1 text-sm opacity-75">
                    <p>• 총 100+ 공시 항목</p>
                    <p>• 각 카테고리별 세부 공시</p>
                  </div>
                  <button 
                    onClick={() => setShowDisclosures(!showDisclosures)}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg transition-all font-semibold"
                  >
                    {showDisclosures ? '공시 목록 닫기' : '공시 관리하기'}
                  </button>
                </div>
                
                {/* Disclosures 드롭다운 목록 */}
                {showDisclosures && selectedCategoryId && (
                  <div className="bg-white rounded-b-xl p-4 border-t border-green-300">
                    <h4 className="text-gray-800 font-semibold mb-3">
                      📋 {selectedCategoryId} 공시 항목
                    </h4>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {getDisclosuresForCategory(selectedCategoryId).map((disclosure) => (
                        <div 
                          key={disclosure.id}
                          onClick={() => {
                            setSelectedDisclosureId(disclosure.id);
                            setShowRequirements(true);
                          }}
                          className="flex justify-between items-center p-3 bg-gray-50 hover:bg-green-50 rounded-lg cursor-pointer transition-all border border-transparent hover:border-green-300"
                        >
                          <div>
                            <span className="font-semibold text-green-600">{disclosure.id}</span>
                            <p className="text-xs text-gray-600 mt-1">{disclosure.title}</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {disclosure.category_id}
                          </span>
                        </div>
                      ))}
                    </div>
                    {getDisclosuresForCategory(selectedCategoryId).length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        선택된 카테고리에 해당하는 공시 항목이 없습니다.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Requirements 카드 - 넓은 공간에 단독 배치 */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
              <div className="p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                    <span className="text-2xl">❓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Requirements</h3>
                    <p className="text-sm opacity-90">요구사항 질문 목록</p>
                  </div>
                </div>
                                  <div className="mb-4 space-y-1 text-sm opacity-75">
                    <p>• 총 323개 세부 질문</p>
                    <p>• 답변 완료: {completionStats.answeredQuestions}개 ({Math.round(completionStats.answerCompletionRate)}%)</p>
                  </div>
                <button 
                  onClick={() => setShowRequirements(!showRequirements)}
                  className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg transition-all font-semibold"
                >
                  {showRequirements ? '요구사항 목록 닫기' : '요구사항 관리하기'}
                </button>
              </div>
              
              {/* Requirements 드롭다운 목록 */}
              {showRequirements && selectedDisclosureId && (
                <div className="bg-white rounded-b-xl p-6 border-t border-purple-300">
                  <h4 className="text-gray-800 font-semibold mb-4">
                    ❓ {selectedDisclosureId} 요구사항
                  </h4>
                  <div className="max-h-[500px] overflow-y-auto space-y-4">
                    {getRequirementsForDisclosure(selectedDisclosureId).map((requirement) => (
                      <div 
                        key={requirement.id}
                        className="p-4 bg-gray-50 hover:bg-purple-50 rounded-lg transition-all border border-transparent hover:border-purple-300"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-pre-wrap">
                          {requirement.question}
                        </label>
                        <textarea
                          value={requirementInputs[requirement.id] || ''}
                          onChange={(e) => handleRequirementInputChange(requirement.id, e.target.value)}
                          placeholder="답변을 입력해주세요..."
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 resize-vertical"
                        />
                      </div>
                    ))}
                  </div>
                  {getRequirementsForDisclosure(selectedDisclosureId).length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      선택된 공시에 대한 요구사항이 없습니다.
                    </p>
                  )}
                  
                  {/* 저장 버튼 */}
                  {getRequirementsForDisclosure(selectedDisclosureId).length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => handleSaveRequirements(selectedDisclosureId)}
                        disabled={generatingStatement === selectedDisclosureId}
                        className={`w-full py-3 px-4 rounded-lg transition-all font-semibold ${
                          generatingStatement === selectedDisclosureId
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        {generatingStatement === selectedDisclosureId 
                          ? '답변 저장 및 AI 윤문 작업 중...' 
                          : '답변 저장하기 (AI 윤문 포함)'
                        }
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Suggested Statement 카드 - 넓은 공간에 단독 배치 */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
              <div className="p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Suggested Statement</h3>
                    <p className="text-sm opacity-90">AI 기반 최종 보고서용 문장</p>
                  </div>
                </div>
                <div className="mb-4 space-y-1 text-sm opacity-75">
                  <p>• 요구사항 답변 기반 자동 생성</p>
                  <p>• 최종 보고서용 정제된 문장</p>
                  <p>• 보고서 자동화 핵심 결과물</p>
                </div>
                <button 
                  onClick={() => setShowSuggestedStatement(!showSuggestedStatement)}
                  className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg transition-all font-semibold"
                >
                  {showSuggestedStatement ? '제안 문장 닫기' : 'Suggested Statement 보기'}
                </button>
              </div>
              
              {/* Suggested Statement 드롭다운 내용 */}
              {showSuggestedStatement && selectedDisclosureId && (
                <div className="bg-white rounded-b-xl p-6 border-t border-emerald-300">
                  {(() => {
                    const statement = getSuggestedStatementForDisclosure(selectedDisclosureId);
                    const isGenerating = generatingStatement === selectedDisclosureId;
                    const hasGeneratedStatement = editedStatements[selectedDisclosureId];
                    
                    // AI가 생성 중인 경우
                    if (isGenerating) {
                      return (
                        <div className="text-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                          <p className="text-gray-600 mb-2">AI가 요구사항 답변을 분석하여 보고서용 문장을 생성하고 있습니다...</p>
                          <p className="text-sm text-gray-500">잠시만 기다려주세요.</p>
                        </div>
                      );
                    }
                    
                    // 새로 생성된 문장이 있는 경우 우선 표시
                    if (hasGeneratedStatement) {
                      const approvalInfo = approvedStatements[selectedDisclosureId];
                      const mockStatement = {
                        title: statement?.title || `${selectedDisclosureId} 공시`,
                        statement: hasGeneratedStatement,
                        generated_date: new Date().toISOString().split('T')[0],
                        status: approvalInfo?.status || 'draft',
                        approved_date: approvalInfo?.approvedDate
                      };
                      
                      return (
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-gray-800 font-semibold text-lg">
                              📝 {selectedDisclosureId}: {mockStatement.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                mockStatement.status === 'final' 
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-blue-100 text-blue-800 border-blue-200'
                              }`}>
                                {mockStatement.status === 'final' ? '최종 승인됨' : '새로 생성됨'}
                              </span>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>생성일: {mockStatement.generated_date}</div>
                                {mockStatement.approved_date && (
                                  <div>승인일: {mockStatement.approved_date}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            {editingStatement === selectedDisclosureId ? (
                              <textarea
                                value={editedStatements[selectedDisclosureId]}
                                onChange={(e) => handleStatementChange(selectedDisclosureId, e.target.value)}
                                className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 resize-vertical"
                                placeholder="문장을 수정해주세요..."
                              />
                            ) : (
                              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                {editedStatements[selectedDisclosureId]}
                              </div>
                            )}
                          </div>
                          
                          {editingStatement === selectedDisclosureId ? (
                            <div className="flex space-x-3">
                              <button 
                                onClick={() => handleSaveStatement(selectedDisclosureId)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                              >
                                저장
                              </button>
                              <button 
                                onClick={handleCancelEdit}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                              >
                                취소
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-3">
                              <button 
                                onClick={() => handleGenerateStatement(selectedDisclosureId)}
                                disabled={generatingStatement === selectedDisclosureId}
                                className={`flex-1 py-2 px-4 rounded-lg transition-all font-medium ${
                                  generatingStatement === selectedDisclosureId
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                }`}
                              >
                                {generatingStatement === selectedDisclosureId 
                                  ? 'AI 재생성 중...' 
                                  : '문장 재생성'
                                }
                              </button>
                              <button 
                                onClick={() => handleEditStatement(selectedDisclosureId)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                              >
                                문장 수정
                              </button>
                              {mockStatement.status !== 'final' && (
                                <button 
                                  onClick={() => handleApproveStatement(selectedDisclosureId)}
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                                >
                                  최종 승인
                                </button>
                              )}
                              <button 
                                onClick={() => alert('PDF 다운로드 기능을 개발 중입니다.')}
                                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                              >
                                PDF 다운로드
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    if (!statement) {
                      return (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">
                            선택된 공시 항목에 대한 제안 문장이 아직 생성되지 않았습니다.
                          </p>
                          <button 
                            onClick={() => handleGenerateStatement(selectedDisclosureId)}
                            disabled={generatingStatement === selectedDisclosureId}
                            className={`py-2 px-4 rounded-lg transition-all font-medium ${
                              generatingStatement === selectedDisclosureId
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            {generatingStatement === selectedDisclosureId 
                              ? 'AI 문장 생성 중...' 
                              : 'AI로 문장 생성하기'
                            }
                          </button>
                        </div>
                      );
                    }

                    const getStatusColor = (status) => {
                      switch (status) {
                        case 'final': return 'bg-green-100 text-green-800 border-green-200';
                        case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                        case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
                        default: return 'bg-gray-100 text-gray-800 border-gray-200';
                      }
                    };

                    const getStatusText = (status) => {
                      switch (status) {
                        case 'final': return '최종 승인';
                        case 'review': return '검토 중';
                        case 'draft': return '초안';
                        default: return '미정';
                      }
                    };

                    return (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-gray-800 font-semibold text-lg">
                            📝 {selectedDisclosureId}: {statement.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              approvedStatements[selectedDisclosureId]?.status === 'final' 
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : getStatusColor(statement.status)
                            }`}>
                              {approvedStatements[selectedDisclosureId]?.status === 'final' 
                                ? '최종 승인' 
                                : getStatusText(statement.status)
                              }
                            </span>
                            <div className="text-xs text-gray-500 space-y-1">
                              <div>생성일: {statement.generated_date}</div>
                              {approvedStatements[selectedDisclosureId]?.approvedDate && (
                                <div>승인일: {approvedStatements[selectedDisclosureId].approvedDate}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          {editingStatement === selectedDisclosureId ? (
                            <textarea
                              value={editedStatements[selectedDisclosureId] || statement.statement}
                              onChange={(e) => handleStatementChange(selectedDisclosureId, e.target.value)}
                              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 resize-vertical"
                              placeholder="문장을 수정해주세요..."
                            />
                          ) : (
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                              {editedStatements[selectedDisclosureId] || statement.statement}
                            </div>
                          )}
                        </div>
                        
                        {editingStatement === selectedDisclosureId ? (
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleSaveStatement(selectedDisclosureId)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                            >
                              저장
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleGenerateStatement(selectedDisclosureId)}
                              disabled={generatingStatement === selectedDisclosureId}
                              className={`flex-1 py-2 px-4 rounded-lg transition-all font-medium ${
                                generatingStatement === selectedDisclosureId
                                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              }`}
                            >
                              {generatingStatement === selectedDisclosureId 
                                ? 'AI 재생성 중...' 
                                : '문장 재생성'
                              }
                            </button>
                            <button 
                              onClick={() => handleEditStatement(selectedDisclosureId)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                            >
                              문장 수정
                            </button>
                            {(statement.status !== 'final' && approvedStatements[selectedDisclosureId]?.status !== 'final') && (
                              <button 
                                onClick={() => handleApproveStatement(selectedDisclosureId)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                              >
                                최종 승인
                              </button>
                            )}
                            <button 
                              onClick={() => alert('PDF 다운로드 기능을 개발 중입니다.')}
                              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                            >
                              PDF 다운로드
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>


          </div>



          {/* GRI 생성기 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI 기반 GRI 분석</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                분석하고 싶은 ESG 주제나 질문을 입력하세요
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="예: 당사의 탄소 배출량 감소 정책에 대한 GRI 표준 분석을 해주세요..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                data-testid="gri-input"
              />
            </div>

            <button
              onClick={handleGenerateGRI}
              disabled={loading || !inputText.trim()}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                loading || !inputText.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
              data-testid="generate-gri-button"
            >
              {loading ? '분석 중...' : 'GRI 분석 생성'}
            </button>

            {/* 결과 표시 */}
            {griData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg" data-testid="gri-result">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">GRI 분석 결과:</h3>
                <div className="whitespace-pre-wrap text-gray-700">{griData}</div>
              </div>
            )}
          </div>

          {/* GRI 표준 링크 */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">참고 자료</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://www.globalreporting.org/standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <h3 className="font-semibold text-purple-800">GRI 표준 공식 사이트</h3>
                <p className="text-sm text-gray-600">최신 GRI 표준 및 가이드라인</p>
              </a>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800">AI 모델 정보</h3>
                <p className="text-sm text-gray-600">Llama3 기반 GRI 분석 엔진 활용</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 