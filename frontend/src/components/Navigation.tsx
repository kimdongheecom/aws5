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
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
    signout();
    setDropdownOpen(false);
    router.push('/auth/login');
  };

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
            <span className="text-blue-600 mr-2">🌐</span>
            <span className="text-gray-700 font-medium">{user?.name || 'KIM DONGHEE'}</span>
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

          {/* Right - Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors">
                  <Image
                    src="/images/profile-icon.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      대시보드
                    </Link>
                    <Link href="/notifications" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                      <Bell className="w-4 h-4 mr-2" />
                      알림
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <LogOut className="w-4 h-4 mr-2" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 