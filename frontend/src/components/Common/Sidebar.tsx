"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faChevronRight,
  faHome,
  faBuilding,
  faBook,
  faChartBar,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  // 메뉴 열림/닫힘 상태 관리
  const [openMenus, setOpenMenus] = useState({
    overview: false,
    storybook: false,
    performance: false,
    environmental: false,
    social: false,
    governance: false,
    appendix: false
  });

  // 메뉴 토글 함수
  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mt-[20vh] ${className}`}>
      <ul className="space-y-2">
        {/* 홈 */}
        <li className="rounded-lg hover:bg-blue-50">
          <Link href="/home" className="flex items-center px-4 py-2 text-gray-700">
            <FontAwesomeIcon icon={faHome} className="mr-2 text-blue-500" />
            <span>Home</span>
          </Link>
        </li>
        
        {/* Overview */}
        <li className="rounded-lg">
          <div 
            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
            onClick={() => toggleMenu('overview')}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
              <span className="font-medium">Overview</span>
            </div>
            <FontAwesomeIcon 
              icon={openMenus.overview ? faChevronDown : faChevronRight} 
              className="text-gray-500"
            />
          </div>
          {openMenus.overview && (
            <ul className="pl-10 mt-1 space-y-1">
              <li>
                <Link href="/overview/ceo-message" className="block py-1 text-gray-600 hover:text-blue-500">
                  CEO Message
                </Link>
              </li>
              <li>
                <Link href="/overview/company-intro" className="block py-1 text-gray-600 hover:text-blue-500">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/overview/history" className="block py-1 text-gray-600 hover:text-blue-500">
                  주요 연혁
                </Link>
              </li>
              <li>
                <Link href="/overview/business-overview" className="block py-1 text-gray-600 hover:text-blue-500">
                  사업 소개
                </Link>
              </li>
              <li>
                <Link href="/overview/highlights2023" className="block py-1 text-gray-600 hover:text-blue-500">
                  2023년 주요 성과
                </Link>
              </li>
              <li>
                <Link href="/overview/vision-strategy" className="block py-1 text-gray-600 hover:text-blue-500">
                  비전 및 전략
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* ESG Storybook */}
        <li className="rounded-lg">
          <div 
            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
            onClick={() => toggleMenu('storybook')}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
              <span className="font-medium">ESG Storybook</span>
            </div>
            <FontAwesomeIcon 
              icon={openMenus.storybook ? faChevronDown : faChevronRight} 
              className="text-gray-500"
            />
          </div>
          {openMenus.storybook && (
            <ul className="pl-10 mt-1 space-y-1">
              <li>
                <Link href="/esg-storybook/esg-vision-strategy" className="block py-1 text-gray-600 hover:text-blue-500">
                  ESG 비전 및 전략
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/esg-governance" className="block py-1 text-gray-600 hover:text-blue-500">
                  ESG 거버넌스
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/esg-internalization" className="block py-1 text-gray-600 hover:text-blue-500">
                  ESG경영 내재화
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/stakeholder-communication" className="block py-1 text-gray-600 hover:text-blue-500">
                  이해관계자 소통
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/double-materiality" className="block py-1 text-gray-600 hover:text-blue-500">
                  이중중대성 평가
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/materiality-climate" className="block py-1 text-gray-600 hover:text-blue-500">
                  Materiality #1 기후변화 대응
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/materiality-safety" className="block py-1 text-gray-600 hover:text-blue-500">
                  Materiality #2 안전보건
                </Link>
              </li>
              <li>
                <Link href="/esg-storybook/materiality-ethics" className="block py-1 text-gray-600 hover:text-blue-500">
                  Materiality #3 윤리 및 컴플라이언스
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* ESG Performance */}
        <li className="rounded-lg">
          <div 
            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
            onClick={() => toggleMenu('performance')}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faChartBar} className="mr-2 text-blue-500" />
              <span className="font-medium">ESG Performance</span>
            </div>
            <FontAwesomeIcon 
              icon={openMenus.performance ? faChevronDown : faChevronRight} 
              className="text-gray-500"
            />
          </div>
          {openMenus.performance && (
            <ul className="pl-10 mt-1 space-y-1">
              {/* Environmental */}
              <li>
                <div 
                  className="flex items-center justify-between py-1 text-gray-600 hover:text-blue-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu('environmental');
                  }}
                >
                  <span>Environmental</span>
                  <FontAwesomeIcon 
                    icon={openMenus.environmental ? faChevronDown : faChevronRight} 
                    className="text-gray-500 text-xs"
                  />
                </div>
                {openMenus.environmental && (
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <Link href="/esg-performance/environmental/environmental-mgmt" className="block py-1 text-gray-600 hover:text-blue-500">
                        환경경영
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/environmental/environmental-investment" className="block py-1 text-gray-600 hover:text-blue-500">
                        환경투자
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/environmental" className="block py-1 text-gray-600 hover:text-blue-500">
                        자원순환
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/environmental/biodiversity-conservation" className="block py-1 text-gray-600 hover:text-blue-500">
                        생명다양성 보전
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              
              {/* Social */}
              <li>
                <div 
                  className="flex items-center justify-between py-1 text-gray-600 hover:text-blue-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu('social');
                  }}
                >
                  <span>Social</span>
                  <FontAwesomeIcon 
                    icon={openMenus.social ? faChevronDown : faChevronRight} 
                    className="text-gray-500 text-xs"
                  />
                </div>
                {openMenus.social && (
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <Link href="/esg-performance/social/human-rights" className="block py-1 text-gray-600 hover:text-blue-500">
                        인권보호
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/social/diversity-inclusion" className="block py-1 text-gray-600 hover:text-blue-500">
                        다양성 및 포용성
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/social" className="block py-1 text-gray-600 hover:text-blue-500">
                        건전한 노사관계
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/social/community-engagement" className="block py-1 text-gray-600 hover:text-blue-500">
                        지역사회 상생협력
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/social/data-protection" className="block py-1 text-gray-600 hover:text-blue-500">
                        정보보호
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/social/customer-satisfaction" className="block py-1 text-gray-600 hover:text-blue-500">
                        고객만족
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              
              {/* Governance */}
              <li>
                <div 
                  className="flex items-center justify-between py-1 text-gray-600 hover:text-blue-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu('governance');
                  }}
                >
                  <span>Governance</span>
                  <FontAwesomeIcon 
                    icon={openMenus.governance ? faChevronDown : faChevronRight} 
                    className="text-gray-500 text-xs"
                  />
                </div>
                {openMenus.governance && (
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <Link href="/esg-performance/governance/corporate-governance" className="block py-1 text-gray-600 hover:text-blue-500">
                        지배구조
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/governance/fair-trade" className="block py-1 text-gray-600 hover:text-blue-500">
                        공정거래
                      </Link>
                    </li>
                    <li>
                      <Link href="/esg-performance/governance/risk-management" className="block py-1 text-gray-600 hover:text-blue-500">
                        리스크 관리
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        
        {/* Appendix */}
        <li className="rounded-lg">
          <div 
            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
            onClick={() => toggleMenu('appendix')}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-500" />
              <span className="font-medium">Appendix</span>
            </div>
            <FontAwesomeIcon 
              icon={openMenus.appendix ? faChevronDown : faChevronRight} 
              className="text-gray-500"
            />
          </div>
          {openMenus.appendix && (
            <ul className="pl-10 mt-1 space-y-1">
              <li>
                <Link href="/appendix/esg-data" className="block py-1 text-gray-600 hover:text-blue-500">
                  ESG Data
                </Link>
              </li>
              <li>
                <Link href="/appendix/gri-index-2021" className="block py-1 text-gray-600 hover:text-blue-500">
                  GRI Standards 2021 Index
                </Link>
              </li>
              <li>
                <Link href="/appendix/ungc-index" className="block py-1 text-gray-600 hover:text-blue-500">
                  UN Global Compact Index
                </Link>
              </li>
              <li>
                <Link href="/appendix/tcfd-index" className="block py-1 text-gray-600 hover:text-blue-500">
                  TCFD Index
                </Link>
              </li>
              <li>
                <Link href="/appendix/awards-memberships" className="block py-1 text-gray-600 hover:text-blue-500">
                  수상실적 및 가입단체 현황
                </Link>
              </li>
              <li>
                <Link href="/appendix/third-party-verification" className="block py-1 text-gray-600 hover:text-blue-500">
                  제3자 검증의견서
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
