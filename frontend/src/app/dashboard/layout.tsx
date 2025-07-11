"use client";

import { useEffect } from "react";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/domain/auth/store/auth.store";
import ScrollToTop from "@/components/ScrollToTOp";
import { ThemeProvider } from "next-themes";
import Lines from "@/components/Lines";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initializeAuth } = useAuthStore();
  
  // 인증 상태 초기화
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="dashboard-layout">
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        defaultTheme="light"
      >
        <Lines />
        {/* <Header /> */}
        {children}
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </div>
  );
} 