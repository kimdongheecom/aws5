'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bell, LogOut, LayoutDashboard } from 'lucide-react';

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, signout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = async () => {
    try {
      await signout();
      setDropdownOpen(false);
      router.push('/auth/login');
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      // 로그아웃 실패해도 로그인 페이지로 이동
      router.push('/auth/login');
    }
  };

  // 로그인 페이지에서는 버튼 숨기기
  const isLoginPage = pathname === '/auth/login';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          {/* Left - Logo */}
          <button onClick={handleLogoClick} className="flex items-center cursor-pointer">
            <span className="text-gray-700 font-bold hover:text-blue-600 transition-colors">KIM DONGHEE</span>
          </button>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {[
              { href: "/contact", label: "Contact" },
              { href: "/esg-report", label: "ESG Report" },
              { href: "/stock-price", label: "Stock Price" },
              { href: "/watchdog", label: "Watchdog" },
              { href: "/gri", label: "GRI" },
              { href: "/thesis", label: "Thesis" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                  pathname === link.href ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 로그인/프로필 버튼 */}
          {!isLoginPage && (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Image src="/images/profile-icon.svg" alt="Profile" width={20} height={20} />
                    </div>
                    <span className="hidden sm:block font-medium">{user?.name}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <Link href="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Bell className="inline-block w-4 h-4 mr-2" />
                        알림
                      </Link>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
                        대시보드
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  로그인
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 