"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardTabs from './tabs/DashboardTabs';
import SearchCompanyBox from './search/SearchCompanyBox';
import SummaryTab from './tabs/SummaryTab';
import { useCompanyStore } from '../store/companyStore';

// 애니메이션 설정을 분리하여 재사용성 향상
const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  // Zustand 스토어 사용
  const { setCurrentCompany } = useCompanyStore();

  const handleCompanySearch = (company: string) => {
    setCurrentCompany(company);
  };

  return (
    <section className="pb-15 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="container mx-auto">
        <motion.div
          variants={ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white px-7.5 py-10 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:py-15"
        >
          <DashboardHeader 
            title="대시보드" 
            homeLink="/" 
          />

          {/* 검색 박스 */}
          <CompanySearchSection onSearch={handleCompanySearch} />
      
          {/* 탭 UI */}
          <DashboardTabs>
            <SummaryTab />
          </DashboardTabs>
        </motion.div>
      </div>
    </section>
  );
};

// 대시보드 헤더 컴포넌트
interface DashboardHeaderProps {
  title: string;
  homeLink: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, homeLink }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white md:mb-0 md:text-3xl">
        {title}
      </h2>
      
      <Link
        href={homeLink}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primaryho"
      >
        <span>홈으로</span>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      </Link>
    </div>
  );
};

// 기업 검색 섹션 컴포넌트
interface CompanySearchSectionProps {
  onSearch: (company: string) => void;
}

const CompanySearchSection: React.FC<CompanySearchSectionProps> = ({ onSearch }) => {
  // Zustand 스토어에서 현재 회사 정보 가져오기
  const { currentCompany } = useCompanyStore();
  
  return (
    <div className="mb-6">
      <SearchCompanyBox onSearch={onSearch} />
      {currentCompany && (
        <div className="mt-2 px-4 py-2 bg-primary bg-opacity-10 rounded-lg">
          <h3 className="text-lg font-medium text-primary">
            현재 분석 중인 기업: <span className="font-semibold">{currentCompany}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Dashboard;