import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description: string;
  userName?: string;
  role?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  description, 
  userName, 
  role 
}) => {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-stroke pb-5 dark:border-strokedark">
      <div>
        <h2 className="text-3xl font-semibold text-black dark:text-white">{title}</h2>
        <p className="mt-1 text-base text-waterloo dark:text-manatee">{description}</p>
        {userName && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            {userName} {role === 'admin' ? '관리자' : '사용자'}님 환영합니다!
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader; 