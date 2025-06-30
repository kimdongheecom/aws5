import { Metadata, Viewport } from "next"; // Viewport import 추가
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ClientLayout from "@/components/Common/ClientLayout";
import NextAuthSessionProvider from "@/components/Providers/SessionProvier";
import ToastProvider from "@/components/Providers/ToastProvider";
import AuthSessionProvider from "@/components/Providers/AuthSessionProvider";
import ConditionalSidebar from "@/components/Common/ConditionalSidebar";

const inter = Inter({ subsets: ["latin"],display: 'swap'});

export const metadata: Metadata = {
  title: {
    template: '%s | LIF',
    default: 'LIF - Life, Intelligence, Future',
  },
  description: "Life, Intelligence, Future - 금융 서비스 플랫폼",
  manifest: "/manifest.json", // next-pwa가 생성하는 manifest 파일 경로
  icons: {
    apple: "/icons/icon-192x192.png",
  },
  // themeColor: "#000000", // <--- 이 줄을 주석 처리하거나 삭제
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LIF",
  },
};

// viewport 객체 추가
export const viewport: Viewport = {
  themeColor: "#000000", // <--- 여기에 themeColor 정의
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <AuthSessionProvider>
        <html lang="ko" suppressHydrationWarning>
          <head>
            {/* <meta name="theme-color" content="#000000" /> */}
            {/* viewport.themeColor를 사용하므로 <head> 태그 내의 theme-color meta 태그는 중복될 수 있어 제거하거나 주석 처리합니다.
                Next.js가 viewport 설정을 기반으로 적절한 메타 태그를 생성해 줄 것입니다. */}
            <meta name="application-name" content="LIF" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="LIF" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-tap-highlight" content="no" />
            
            {/* PWA 아이콘들 */}
            <link rel="icon" type="image/png" sizes="196x196" href="/icons/favicon-196.png" />
            <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-196.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-196.png" />
          </head>
          <body className={`dark:bg-black ${inter.className} min-h-screen flex flex-col`}>
            <div className="flex-grow">
              <div className="flex flex-col lg:flex-row gap-6">
                <ConditionalSidebar />
                <div className="w-full">
                  <ClientLayout>{children}</ClientLayout>
                </div>
              </div>
            </div>
            <ToastProvider />
            <footer className="bg-gray-800 text-white py-4 mt-auto">
              <div className="container mx-auto px-4 text-center">
                <p>© 2024 ESG Report. All rights reserved.</p>
              </div>
            </footer>
          </body>
        </html>
      </AuthSessionProvider>
    </NextAuthSessionProvider>
  );
}

