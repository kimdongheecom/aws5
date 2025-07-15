import React from 'react';

interface SaveRequirementsButtonProps {
  disclosureId: string;
  generatingStatement: string | null;
  onSaveRequirements: (disclosureId: string) => void;
}

const SaveRequirementsButton: React.FC<SaveRequirementsButtonProps> = ({
  disclosureId,
  generatingStatement,
  onSaveRequirements
}) => {
  const isGenerating = generatingStatement === disclosureId;

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <button 
        onClick={() => onSaveRequirements(disclosureId)}
        disabled={isGenerating}
        className={`w-full py-3 px-4 rounded-lg transition-all font-semibold ${
          isGenerating
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {isGenerating 
          ? '답변 저장 및 AI 윤문 작업 중...' 
          : '답변 저장하기 (AI 윤문 포함)'
        }
      </button>
    </div>
  );
};

export default SaveRequirementsButton;
