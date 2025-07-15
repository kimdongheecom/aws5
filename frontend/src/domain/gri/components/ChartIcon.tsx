import React from 'react';

interface ChartIconProps {
  requirements: any;
  requirementInputs: any;
  suggestedStatements: any;
  approvedStatements: any;
}

export default function ChartIcon({ 
  requirements, 
  requirementInputs, 
  suggestedStatements, 
  approvedStatements 
}: ChartIconProps) {
  // 완성도 계산 함수
  const calculateCompletionStats = () => {
    // 총 질문 수 계산 (모든 requirements의 질문 수)
    let totalQuestions = 0;
    Object.values(requirements).forEach((disclosureRequirements: any) => {
      if (disclosureRequirements && Array.isArray(disclosureRequirements)) {
        totalQuestions += disclosureRequirements.length;
      }
    });

    // 답변이 완료된 질문 수 (입력된 답변이 있는 질문)
    const answeredQuestions: number = Object.keys(requirementInputs).filter(key => 
      requirementInputs[key] && requirementInputs[key].trim().length > 0
    ).length;

    // Suggested Statement가 생성된 disclosure 수
    const totalDisclosures = Object.keys(requirements).length;
    const completedStatements = Object.keys(suggestedStatements).length;

    // 최종 승인된 statement 수
    const finalApprovedCount = Object.values(approvedStatements).filter((item: any) => 
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

  return (
    <div>
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
          </div> {/* 미니 원형 차트들 */}

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
    </div>
  )
}