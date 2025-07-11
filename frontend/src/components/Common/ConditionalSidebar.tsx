'use client';

import React, { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { usePathname } from 'next/navigation';

interface ConditionalSidebarProps {
  children: ReactNode;
}

const ConditionalSidebar: React.FC<ConditionalSidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Navigation />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ConditionalSidebar; 