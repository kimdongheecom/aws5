"use client";

import ScrollToTop from "@/components/ScrollToTOp";
import { ThemeProvider } from "next-themes";
import { useAuthStore } from '@/domain/auth/store/auth.store';
import Navigation from "@/components/Navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initializeAuth } = useAuthStore();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ScrollToTop />
      <Navigation />
      <main className="pt-14 !bg-white dark:!bg-gray-900">
        {children}
      </main>
    </ThemeProvider>
  );
} 