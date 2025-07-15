import { useState } from 'react';
import axios from 'axios';
import {
  RequirementInputs,
  ApprovedStatements,
  EditedStatements,
  GRI_CATEGORIES,
  GRI_DISCLOSURES
} from '../model/gri.model';
import { 
  GRI_2_REQUIREMENTS, 
  GRI_3_REQUIREMENTS, 
  GRI_201_REQUIREMENTS,
  GRI_202_REQUIREMENTS,
  GRI_203_REQUIREMENTS,
  GRI_204_REQUIREMENTS,
  GRI_205_REQUIREMENTS,
  GRI_206_REQUIREMENTS,
  GRI_207_REQUIREMENTS,
  GRI_301_REQUIREMENTS,
  GRI_302_REQUIREMENTS,
  GRI_303_REQUIREMENTS,
  GRI_304_REQUIREMENTS,
  GRI_305_REQUIREMENTS,
  GRI_306_REQUIREMENTS,
  GRI_308_REQUIREMENTS,
  GRI_401_REQUIREMENTS,
  GRI_402_REQUIREMENTS,
  GRI_403_REQUIREMENTS,
  GRI_404_REQUIREMENTS,
  GRI_405_REQUIREMENTS,
  GRI_406_REQUIREMENTS,
  GRI_407_REQUIREMENTS,
  GRI_408_REQUIREMENTS,
  GRI_409_REQUIREMENTS,
  GRI_410_REQUIREMENTS,
  GRI_411_REQUIREMENTS,
  GRI_413_REQUIREMENTS,
  GRI_414_REQUIREMENTS,
  GRI_415_REQUIREMENTS,
  GRI_416_REQUIREMENTS,
  GRI_417_REQUIREMENTS,
  GRI_418_REQUIREMENTS,
} from '../model/requirements.model';

export const useSaveRequirements = () => {
  // 데이터베이스 관리 상태
  const [showCategories, setShowCategories] = useState(false);
  const [showDisclosures, setShowDisclosures] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showSuggestedStatement, setShowSuggestedStatement] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedDisclosureId, setSelectedDisclosureId] = useState('');
  const [requirementInputs, setRequirementInputs] = useState<RequirementInputs>({});
  const [editingStatement, setEditingStatement] = useState<string | null>(null);
  const [editedStatements, setEditedStatements] = useState<EditedStatements>({});
  const [generatingStatement, setGeneratingStatement] = useState<string | null>(null);
  const [approvedStatements, setApprovedStatements] = useState<ApprovedStatements>({});

  // Categories와 Disclosures 데이터
  const categories = GRI_CATEGORIES;
  const disclosures = GRI_DISCLOSURES;

  // Requirements 데이터 (모든 주요 GRI 공시용)
  const requirements = {
    ...GRI_2_REQUIREMENTS,
    ...GRI_3_REQUIREMENTS,
    ...GRI_201_REQUIREMENTS,
    ...GRI_202_REQUIREMENTS,
    ...GRI_203_REQUIREMENTS,
    ...GRI_204_REQUIREMENTS,
    ...GRI_205_REQUIREMENTS,
    ...GRI_206_REQUIREMENTS,
    ...GRI_207_REQUIREMENTS,
    ...GRI_301_REQUIREMENTS,
    ...GRI_302_REQUIREMENTS,
    ...GRI_303_REQUIREMENTS,
    ...GRI_304_REQUIREMENTS,
    ...GRI_305_REQUIREMENTS,
    ...GRI_306_REQUIREMENTS,
    ...GRI_308_REQUIREMENTS,
    ...GRI_401_REQUIREMENTS,
    ...GRI_402_REQUIREMENTS,
    ...GRI_403_REQUIREMENTS,
    ...GRI_404_REQUIREMENTS,
    ...GRI_405_REQUIREMENTS,
    ...GRI_406_REQUIREMENTS,
    ...GRI_407_REQUIREMENTS,
    ...GRI_408_REQUIREMENTS,
    ...GRI_409_REQUIREMENTS,
    ...GRI_410_REQUIREMENTS,
    ...GRI_411_REQUIREMENTS,
    ...GRI_413_REQUIREMENTS,
    ...GRI_414_REQUIREMENTS,
    ...GRI_415_REQUIREMENTS,
    ...GRI_416_REQUIREMENTS,
    ...GRI_417_REQUIREMENTS,
    ...GRI_418_REQUIREMENTS,
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

  // 선택된 disclosure의 Suggested Statement 가져오기
  const getSuggestedStatementForDisclosure = (disclosureId: string) => {
    return suggestedStatements[disclosureId] || null;
  };

  // 선택된 카테고리의 Disclosures 필터링
  const getDisclosuresForCategory = (categoryId: string) => {
    return disclosures.filter(disclosure => disclosure.category_id === categoryId);
  };

  // 선택된 disclosure의 Requirements 가져오기
  const getRequirementsForDisclosure = (disclosureId: string) => {
    return requirements[disclosureId] || [];
  };

  // Requirements input 값 변경 핸들러
  const handleRequirementInputChange = (requirementId: string, value: string) => {
    console.log('Input changed:', { requirementId, value }); // 디버깅용 로그 추가
    setRequirementInputs(prev => ({
      ...prev,
      [requirementId]: value
    }));
  };

  // Suggested Statement 수정 관련 핸들러
  const handleEditStatement = (disclosureId: string) => {
    setEditingStatement(disclosureId);
    const currentStatement = getSuggestedStatementForDisclosure(disclosureId);
    if (currentStatement) {
      setEditedStatements(prev => ({
        ...prev,
        [disclosureId]: currentStatement.statement
      }));
    }
  };

  const handleSaveStatement = (disclosureId: string) => {
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

  const handleStatementChange = (disclosureId: string, value: string) => {
    setEditedStatements(prev => ({
      ...prev,
      [disclosureId]: value
    }));
  };

  // 최종 승인 핸들러
  const handleApproveStatement = (disclosureId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setApprovedStatements(prev => ({
      ...prev,
      [disclosureId]: {
        approvedDate: today,
        status: 'final'
      }
    }));
    alert(`${disclosureId} Suggested Statement가 최종 승인되었습니다.`);
  };

  // Requirements 답변을 기반으로 Suggested Statement 생성
  const handleSaveRequirements = async (disclosureId: string) => {
    console.log('Save Requirements clicked:', { 
      disclosureId,
      requirements: getRequirementsForDisclosure(disclosureId),
      requirementInputs
    });
    
    // 현재 disclosure의 모든 requirements에 대한 답변 수집
    const requirementsData = getRequirementsForDisclosure(disclosureId);
    const answers = requirementsData.map(req => ({
      questionId: req.id,
      question: req.question,
      answer: requirementInputs[req.id] || ''
    })).filter(item => item.answer.trim() !== ''); // 빈 답변 제외

    if (answers.length === 0) {
      alert('저장할 답변이 없습니다. 최소 하나의 요구사항에 답변을 입력해주세요.');
      return;
    }

    // GPT 프롬프트 형식의 JSON 데이터 생성
    const promptData = {
      prompt: `You are an expert ESG report writer. Based on the following structured data, synthesize the information into a single, cohesive, and professional Korean paragraph for a sustainability report.

### Data:
${JSON.stringify({
  company_info: {
    name: "xx기업",
    id: "company_01"
  },
  g_standard: "GRI 301: Materials 2016",
  disclosure_item: disclosureId,
  requirements_and_data: answers.map(answer => ({
    id: answer.questionId,
    question: answer.question,
    raw_answer: answer.answer
  }))
}, null, 2)}

### Polished Report Paragraph:`
    };

    // 전체 프롬프트 데이터를 alert로 표시
    alert(JSON.stringify(promptData, null, 2));

    try {
      // Next.js API 라우트를 통해 GRI 서비스 호출
      const response = await axios.post('/api/gri/generate', promptData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000 // 60초 타임아웃 설정
      });

      console.log('API 응답:', response.data);
      
      if (response.data) {
        // 성공 메시지 표시
        alert('데이터가 성공적으로 전송되었습니다.');
        
        // 응답 데이터가 있으면 처리
        if (response.data.answer) {  // GRI 서비스의 응답 형식에 맞춰 수정
          setEditedStatements(prev => ({
            ...prev,
            [disclosureId]: response.data.answer
          }));
        }
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert(`데이터 전송 중 오류가 발생했습니다: ${error.message}`);
    }

    // Suggested Statement 자동 생성 시작
    setGeneratingStatement(disclosureId);
    setShowSuggestedStatement(true); // Suggested Statement 카드 자동으로 열기

    try {
      // 현재는 모의 응답으로 처리
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 모의 지연

      // 모의 생성된 문장 (실제로는 백엔드에서 받아옴)
      const mockGeneratedStatement = `[AI 생성] ${disclosureId}에 대한 답변을 바탕으로 생성된 보고서용 문장입니다.\n\n` +
        `수집된 ${answers.length}개의 요구사항 답변을 종합하여 다음과 같이 보고합니다:\n\n` +
        answers.map((answer, index) => `${index + 1}. ${answer.answer}`).join('\n\n') +
        `\n\n위 내용을 바탕으로 당사는 ${disclosureId} 공시 요구사항을 충족하고 있으며, 지속적인 개선을 위해 노력하고 있습니다.`;

      // 생성된 문장을 editedStatements에 저장
      setEditedStatements(prev => ({
        ...prev,
        [disclosureId]: mockGeneratedStatement
      }));

      alert(`Requirements 답변이 저장되었고, ${disclosureId}에 대한 Suggested Statement가 생성되었습니다!`);
      
    } catch (error) {
      console.error('Suggested Statement 생성 오류:', error);
      alert('Requirements는 저장되었으나 Suggested Statement 생성 중 오류가 발생했습니다.');
    } finally {
      setGeneratingStatement(null);
    }
  };

  // AI로 문장 생성하기 (Suggested Statement에서 직접 호출)
  const handleGenerateStatement = async (disclosureId: string) => {
    const requirementsData = getRequirementsForDisclosure(disclosureId);
    const answers = requirementsData.map(req => ({
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

  return {
    // 상태
    showCategories,
    showDisclosures,
    showRequirements,
    showSuggestedStatement,
    selectedCategoryId,
    selectedDisclosureId,
    requirementInputs,
    editingStatement,
    editedStatements,
    generatingStatement,
    approvedStatements,
    
    // 데이터
    categories,
    disclosures,
    requirements,
    suggestedStatements,
    
    // 상태 설정 함수
    setShowCategories,
    setShowDisclosures,
    setShowRequirements,
    setShowSuggestedStatement,
    setSelectedCategoryId,
    setSelectedDisclosureId,
    
    // 비즈니스 로직 함수
    getSuggestedStatementForDisclosure,
    getDisclosuresForCategory,
    getRequirementsForDisclosure,
    handleRequirementInputChange,
    handleEditStatement,
    handleSaveStatement,
    handleCancelEdit,
    handleStatementChange,
    handleApproveStatement,
    handleSaveRequirements,
    handleGenerateStatement,
  };
};
