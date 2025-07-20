import { Metadata } from "next";
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  GitBranch, 
  Award, 
  BookOpen, 
  Cpu, 
  Code, 
  Database, 
  Cloud, 
  Languages, 
  Star, 
  TrendingUp, 
  Users, 
  Target,
  BrainCircuit,
  Server,
  Container,
  ShipWheel,
  Search,
  ClipboardList,
  Rocket,
  ImageIcon,
  Code2,
  UserCircle,
  Zap,
  BatteryCharging,
  Computer,
  Cookie,
  GraduationCap,
  User,
  Sparkles,
  FileText
} from 'lucide-react';

// 기술 스택 아이콘을 위한 재사용 가능한 컴포넌트입니다.
const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div className="flex flex-col items-center justify-center text-center gap-2 p-3 bg-gray-50 rounded-lg transition-transform hover:scale-105 hover:shadow-md border border-gray-200/80">
    <div className="text-3xl text-gray-600">{icon}</div>
    <span className="text-xs font-medium text-gray-700">{name}</span>
  </div>
);

// 경력 타임라인의 각 항목을 구성하는 컴포넌트입니다.
const TimelineItem = ({ icon, title, period, children }: { icon: React.ReactNode; title: string; period: string; children: React.ReactNode; }) => (
  <div className="flex gap-x-4">
    <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:bg-gray-200">
      <div className="relative z-10 size-8 flex justify-center items-center">
        <div className="size-8 rounded-full bg-white border-2 border-blue-500 flex justify-center items-center">
          {icon}
        </div>
      </div>
    </div>
    <div className="grow pt-1 pb-8">
      <h3 className="flex gap-x-1.5 font-semibold text-gray-800 text-lg">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{period}</p>
      <div className="mt-3 space-y-2 text-gray-600">
        {children}
      </div>
    </div>
  </div>
);

// 페이지의 메타데이터입니다.
export const metadata: Metadata = {
  title: "Profile | KIM DONGHEE",
  description: "ESG-Tech Pioneer & Financial Analyst, KIM DONGHEE's Professional Profile",
};

export default function ContactPage() {
  // 기술 스택 데이터
  const techStack = {
    languages: [
        { name: 'Python', icon: <Code2 /> },
        { name: 'TypeScript', icon: <Code2 /> },
        { name: 'JavaScript', icon: <Code2 /> },
    ],
    aiData: [
        { name: 'PyTorch', icon: <BrainCircuit /> },
        { name: 'HuggingFace', icon: <Rocket /> },
        { name: 'LangChain', icon: <GitBranch /> },
        { name: 'RAG', icon: <BrainCircuit /> },
        { name: 'PEFT/LoRA', icon: <BrainCircuit /> },
    ],
    backendFrameworks: [
        { name: 'Next.js', icon: <Server /> },
        { name: 'FastAPI', icon: <Server /> },
        { name: 'Node.js', icon: <Server /> },
    ],
    devopsCloud: [
        { name: 'AWS', icon: <Cloud /> },
        { name: 'Docker', icon: <Container /> },
        { name: 'Kubernetes', icon: <ShipWheel /> },
    ],
    databasesTools: [
        { name: 'PostgreSQL', icon: <Database /> },
        { name: 'Elasticsearch', icon: <Search /> },
        { name: 'Jira', icon: <ClipboardList /> },
    ],
  };

  // 컨설팅 프로젝트 데이터
  const consultingProjects = [
    { name: '한국중부발전', icon: <Zap className="text-yellow-500"/>, link: 'https://www.komipo.co.kr/esg/content/95/main.do?mnCd=ESG010201' },
    { name: '두산퓨얼셀', icon: <BatteryCharging className="text-green-500"/>, link: 'https://www.doosanfuelcell.com/kr/sustainability/sust-0103/' },
    { name: 'LG CNS', icon: <Computer className="text-red-500"/>, link: 'https://www.lgcns.com/company/csm/sustainabilityreport/' },
    { name: 'SPC', icon: <Cookie className="text-orange-500"/>, link: 'https://www.spc.co.kr/esg/esgreport' },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
                       
          {/* --- 1. 프로필 헤더 --- */}
          <header className="mb-20">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <UserCircle className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
                    ESG-Tech 개척자 및 금융 분석가
                  </span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                  지속가능성 전략과 AI 기반 자동화를 연결하여 기업의 책임 보고 기준을 재정의합니다.
                </p>
                <p className="mt-2 text-md text-gray-500 max-w-3xl">
                  국내 유수 기업의 지속가능경영 보고서 작성 경험에서 출발하여, 이제는 그 과정을 자동화하는 AI 솔루션을 직접 설계하고 있습니다. 현재 삼정KPMG의 ESG 보고서 자동화 과정을 이수하며, 혁신적인 ESG-AI 솔루션 개발을 이끌고 있습니다.
                </p>
              </div>
            </div>
          </header>

          {/* --- 2. 기본 정보 (수정된 섹션) --- */}
          <section className="mb-20">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">기본 정보</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
                  <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                              <span className="inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-md text-sm font-bold bg-gray-800 text-white">이름</span>
                          </div>
                          <p className="font-semibold text-gray-800 self-center">김동희</p>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                              <span className="inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-md text-sm font-bold bg-gray-800 text-white">이메일</span>
                          </div>
                          <a href="mailto:ehdgml2754@gmail.com" className="font-semibold text-gray-800 hover:underline self-center">ehdgml2754@gmail.com</a>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                              <span className="inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-md text-sm font-bold bg-gray-800 text-white">경력사항</span>
                          </div>
                          <p className="font-semibold text-gray-800 self-center">㈜지속가능경영연구소 연구원 (대기업·민간기업 지속가능경영보고서 기획 및 개발)</p>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                              <span className="inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-md text-sm font-bold bg-gray-800 text-white">핵심 역량</span>
                          </div>
                          <div className="self-center flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">ESG 경영 컨설턴트</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">SLM 개발</span>
                          </div>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                              <span className="inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-md text-sm font-bold bg-gray-800 text-white">최종 학력</span>
                          </div>
                          <p className="font-semibold text-gray-800 self-center">러시아 정부 초청 장학생으로서 Novosibirsk State University 재무관리학 석사 졸업</p>
                      </div>
                      {/* '논문' 항목 추가 */}
                      <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                              <span className="inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-md text-sm font-bold bg-gray-800 text-white">논문</span>
                          </div>
                          <div className="font-semibold text-gray-800">
                              <p className="font-bold">[기업의 지속 가능성을 측정할 수 있는 알고리즘 개발]</p>
                              <p className="mt-1 font-normal text-gray-600 text-sm">
                                  러시아 석사 과정 중, 에너지 기업의 경제적, 사회적, 환경적 성과를 통합적으로 평가하는 논문을 작성했습니다. 이 방법론은 기업의 지속 가능성을 혁신적으로 정량화하여 자체 평가 및 개선 방안 도출을 돕고, 투자자에게는 신뢰도 높은 ESG 투자 지표를 제공합니다.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* --- 3. 핵심 역량 (T-Shaped Skills) --- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">핵심 역량</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">ESG & 금융 전략</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><Star className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span><strong className="font-semibold">지속가능경영 보고서 작성:</strong> GRI Standards 기반 민간기업 및 공공기관 보고서 기획 및 개발</span></li>
                  <li className="flex items-start"><Target className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span><strong className="font-semibold">ESG 전략 및 중대성 평가:</strong> 이중 중대성 평가 및 동종업계 벤치마킹 분석</span></li>
                  <li className="flex items-start"><TrendingUp className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span><strong className="font-semibold">재무 분석:</strong> 재무제표 분석 및 기업회계 기반의 정량 성과 측정</span></li>
                  <li className="flex items-start"><Users className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span><strong className="font-semibold">이해관계자 소통:</strong> FGI 미팅 등 효과적인 커뮤니케이션 및 협업 역량</span></li>
                  <li className="flex items-start"><Languages className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span><strong className="font-semibold">다국어 커뮤니케이션:</strong> 영어 및 러시아어 기반의 글로벌 업무 수행 능력</span></li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <Cpu className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">기술 및 자동화 스택</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 text-sm">AI & Data</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">{techStack.aiData.map(tech => <TechIcon key={tech.name} {...tech} />)}</div>
                  </div>
                   <div>
                    <h4 className="font-semibold text-gray-700 mb-3 text-sm">Languages & Frameworks</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {[...techStack.languages, ...techStack.backendFrameworks].map(tech => <TechIcon key={tech.name} {...tech} />)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 text-sm">DevOps, Cloud & Tools</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {[...techStack.devopsCloud, ...techStack.databasesTools].map(tech => <TechIcon key={tech.name} {...tech} />)}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
                       
          {/* --- 4. 성장 경로 (Interactive Timeline) --- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">성장 경로</h2>
            <div className="max-w-2xl mx-auto">
              <TimelineItem icon={<BookOpen className="w-4 h-4 text-blue-600"/>} title="학문적 기반 - 분석가" period="2021 - 2023">
                <p>러시아 노보시비르스크 국립대 재무경영학 석사과정 중, 기업의 지속가능성을 정량적으로 평가하는 알고리즘 개발 논문을 작성하며 분석적 역량을 다졌습니다.</p>
                <p className="font-medium text-gray-700">🏆 ISSC-2023 국제 과학 학생 콘퍼런스 2위 수상 (영어 발표)</p>
              </TimelineItem>
              <TimelineItem icon={<Briefcase className="w-4 h-4 text-blue-600"/>} title="컨설팅 현장 - 컨설턴트" period="2024">
                <p>㈜지속가능경영연구소에서 ESG 컨설턴트로 근무하며 대기업 및 공공기관의 지속가능경영 보고서 발간 프로젝트를 수행, 현장의 문제를 깊이 이해하고 전략적 해결 능력을 길렀습니다.</p>
                <p className="font-medium text-gray-700">🚀 주요 프로젝트: LG CNS, SPC, 두산퓨얼셀, 한국중부발전</p>
              </TimelineItem>
              <TimelineItem icon={<TrendingUp className="w-4 h-4 text-blue-600"/>} title="기술로의 전환 - 프롬프팅 엔지니어링" period="현재">
                <p>삼정KPMG의 'ESG 보고서 자동화 과정'을 통해 컨설팅 경험에서 발견한 비효율을 기술로 해결하기 위한 전문 역량을 강화하고 있습니다.</p>
                <p className="font-medium text-gray-700">💡 학습 분야: AI 기반 데이터 분석, 생성형 AI, 자동화 플랫폼 구축</p>
              </TimelineItem>
              <TimelineItem icon={<Code className="w-4 h-4 text-blue-600"/>} title="혁신의 실천 - 프롬프팅 엔지니어링" period="현재">
                <p>K-디지털 트레이닝 해커톤에서 'ESG-AI' 팀장으로, 생성형 AI를 활용한 ESG 보고서 자동화 솔루션을 직접 설계하고 개발하며 학습한 기술을 실체적인 가치로 전환하고 있습니다.</p>
                <p className="font-medium text-gray-700">🛠️ 역할: 프로젝트 총괄, 아키텍처 설계, AI 모델 개발 및 백엔드 구현</p>
              </TimelineItem>
            </div>
          </section>

          {/* --- 5. 주요 프로젝트 (Case Studies) --- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">주요 프로젝트</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">ESG 전략 컨설팅 및 보고서 작성</h3>
                <p className="text-sm font-semibold text-blue-600 mb-4">전략 컨설팅</p>
                <p className="text-gray-600 mb-6 flex-grow">민간 대기업 및 공공기관을 대상으로 GRI Standards에 입각한 지속가능경영 보고서 발간 프로젝트를 다수 수행했습니다. 이중 중대성 평가, 동종업계 벤치마킹, 이해관계자 인터뷰 등을 통해 신뢰도 높은 보고서를 완성하고 기업의 ESG 성과를 효과적으로 전달하는 데 기여했습니다.</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 mb-2">주요 참여 기업 보고서</h4>
                  {consultingProjects.map((project) => (
                    <a 
                      key={project.name}
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-6 h-6">{project.icon}</div>
                      <span className="font-semibold text-gray-800 flex-grow">{project.name}</span>
                      <span className="text-xs text-blue-500 hover:underline">보고서 보기 →</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">ESG-AI 보고서 자동화 솔루션</h3>
                <p className="text-sm font-semibold text-green-600 mb-4">기술 리더십 & AI 개발</p>
                <p className="text-gray-600 mb-4 flex-grow">KPMG에서 주관하는 ESG 자동화 보고서 프로젝트에 참여하여 MSA 아키텍처 설계, AI 모델(RAG, LoRA) 개발, 백엔드 구현을 주도하여, 보고서 작성 시간과 비용을 50% 절감할 수 있는 MVP 개발에 성공했습니다. 컨설팅 경험에서 발견한 문제를 기술로 해결하는 능력을 입증했습니다.</p>
                <button disabled className="mt-auto inline-block text-center bg-gray-200 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed">
                  프로젝트 상세 (준비 중)
                </button>
              </div>
            </div>
          </section>

          {/* --- 6. 갤러리 (사진 추가 공간) --- */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-medium">사진 추가 예정</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
} 