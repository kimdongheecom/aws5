'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart,
  MessageSquareText
} from 'lucide-react';
import FinanceTab from './FinanceTab';
import EsgTab from './EsgTab';
import AiChatTab from './AiChatTab';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface DashboardTabsProps {
  children?: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('summary');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  const tabItems: TabItem[] = [
    {
      id: 'summary',
      label: '전체 요약',
      icon: <BarChart3 size={18} />,
      content: (
        <div>
          {children}
        </div>
      ),
    },
    {
      id: 'finance',
      label: '재무 분석',
      icon: <LineChart size={18} />,
      content: <FinanceTab />
    },
    {
      id: 'esg',
      label: 'ESG 분석',
      icon: <PieChart size={18} />,
      content: <EsgTab />
    },
    {
      id: 'chatbot',
      label: 'AI 챗봇',
      icon: <MessageSquareText size={18} />,
      content: <AiChatTab />
    },
  ];

  return (
    <div className="w-full">
      {/* 탭 메뉴 */}
      <div className="flex border-b border-stroke dark:border-strokedark">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`inline-flex items-center py-4 px-6 text-sm font-medium transition-colors duration-200 
              ${activeTab === tab.id 
                ? 'text-primary border-b-2 border-primary dark:text-primary' 
                : 'text-waterloo hover:text-black dark:text-manatee dark:hover:text-white'
              }`}
          >
            <span className="mr-2">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="pt-4">
        {tabItems.map((tab) => (
          <div 
            key={tab.id} 
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs;