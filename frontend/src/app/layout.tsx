import '@/app/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ClientLayout from "@/components/Common/ClientLayout";
import ToastProvider from "@/components/Providers/ToastProvider";
import ConditionalSidebar from "@/components/Common/ConditionalSidebar";
import AuthInitializer from './AuthInitializer';

const inter = Inter({ subsets: ["latin"], display: 'swap'});

export const metadata: Metadata = {
  title: 'LIF ESG Report',
  description: 'LIF ESG Report Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100`}>
        <ClientLayout>
          <AuthInitializer />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

