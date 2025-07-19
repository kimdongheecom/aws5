'use client';

import Sidebar from '@/components/Common/Sidebar';
import Navigation from '@/components/Navigation';
import React from 'react';

export default function EsgStorybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="flex min-h-screen bg-white">
        <div className="w-64 border-r bg-white shadow-sm">
          <Sidebar />
        </div>
        
        <div className="flex-1">
          {children}
        </div>
      </div>
    </>
  );
} 