import React, { useState } from 'react';

export default function AnalyzeGri() {
  const [griData, setGriData] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleGenerateGRI = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/gri/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: inputText,
          model: 'gri-analysis'
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGriData(data.generated_text || data.result || 'GRI 분석이 완료되었습니다.');
      } else {
        setGriData(data.error || 'GRI 서비스에 연결할 수 없습니다. 서비스가 실행 중인지 확인해주세요.');
      }
    } catch (error) {
      console.error('GRI 생성 오류:', error);
      setGriData('GRI 생성 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      </div> {/* GRI 생성기 */}
    </div>
  )
}