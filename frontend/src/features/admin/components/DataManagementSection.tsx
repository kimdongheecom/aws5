import React from 'react';

interface DataManagementSectionProps {
  onAddData?: () => void;
}

const DataManagementSection: React.FC<DataManagementSectionProps> = ({ onAddData }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        데이터 등록/수정
      </h4>
      
      <div className="mb-4">
        <button 
          onClick={onAddData}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
        >
          새 데이터 등록
        </button>
      </div>
      
      <p className="text-waterloo dark:text-manatee">
        이 섹션에는 추후 데이터 등록 및 수정 UI가 추가될 예정입니다.
      </p>
    </div>
  );
};

export default DataManagementSection; 