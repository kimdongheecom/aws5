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
      <body className={`${inter.className} bg-white dark:bg-gray-900`} style={{ backgroundColor: 'white' }}>
        <ClientLayout>
          <AuthInitializer />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

