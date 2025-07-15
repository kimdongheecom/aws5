'use client';

import React from 'react';
import { useSaveRequirements } from '../hooks/useSaveRequirements';

export default function SaveRequirementsButton() {
  const {
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
  } = useSaveRequirements();

    return (
        <div>
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
                    <p>• 답변 완료: {Object.keys(requirementInputs).filter(key => 
                      requirementInputs[key] && requirementInputs[key].trim().length > 0
                    ).length}개</p>
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


          </div> {/* GRI 데이터베이스 관리 섹션 */}
        </div>
    )
}