"use client";

import { useEffect } from "react";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTOp";
import { ThemeProvider } from "next-themes";
import { initializeAuth } from "@/store/authStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 상태 초기화
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <ThemeProvider
      enableSystem={false}
      attribute="class"
      defaultTheme="light"
    >
      <Lines />
      {/* {!isHomePage && <Header />} */}
      {children}
      {/* Footer는 layout.tsx에서 관리하므로 여기서는 제거 */}
      <ScrollToTop />
    </ThemeProvider>
  );
} 