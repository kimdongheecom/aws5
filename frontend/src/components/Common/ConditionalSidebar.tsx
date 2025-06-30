"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Common/Sidebar';

export default function ConditionalSidebar() {
  const pathname = usePathname();
  
  // 특정 페이지들에서는 Sidebar를 숨깁니다
  const shouldHideSidebar = pathname === '/' || 
                           pathname === '/contact' ||
                           pathname === '/stock-price' ||
                           pathname === '/watchdog' ||
                           pathname === '/gri' ||
                           pathname === '/thesis' ||
                           pathname === '/profile';
  
  if (shouldHideSidebar) {
    return null;
  }
  
  return <Sidebar />;
} 