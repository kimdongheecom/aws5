"use client";

import React, { useState } from 'react';
import Navigation from "../../components/Navigation";
import Sidebar from '@/components/Common/Sidebar';

export default function EsgReport(){
  return (
    <>
      <Navigation />
      <div className="flex min-h-screen bg-white">
        {/* 왼쪽 사이드바 */}
        <div className="w-64 border-r bg-white shadow-sm">
          <Sidebar />
        </div>
        
        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          <div className="container mx-auto px-8 py-8">
            <h1 className="text-3xl font-bold mb-10 text-blue-600">Sustainability Report</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">ESG Overview</h2>
                <p className="text-gray-600">
                  지속가능한 미래를 위한 우리의 ESG 활동과 성과를 확인하세요.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
                <p className="text-gray-600">
                  최신 ESG 활동과 성과 데이터를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



