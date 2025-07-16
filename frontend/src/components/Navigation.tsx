'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/domain/auth/store/auth.store';

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

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
          <div className="flex items-center space-x-8">
            <Link 
              href="/contact" 
              className={`flex items-center space-x-1 text-sm ${pathname === '/contact' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              <span>✉</span>
              <span>Contact</span>
            </Link>
            <Link 
              href="/esg-report" 
              className={`flex items-center space-x-1 text-sm ${pathname === '/esg-report' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              <span>📊</span>
              <span>ESG Report</span>
            </Link>
            <Link 
              href="/stock-price" 
              className={`flex items-center space-x-1 text-sm ${pathname === '/stock-price' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              <span>📈</span>
              <span>Stock Price</span>
            </Link>
            <Link 
              href="/watchdog" 
              className={`flex items-center space-x-1 text-sm ${pathname === '/watchdog' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              <span>🐕</span>
              <span>Watchdog</span>
            </Link>
            <Link 
              href="/gri" 
              className={`flex items-center space-x-1 text-sm ${pathname === '/gri' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              <span>📄</span>
              <span>GRI</span>
            </Link>
            <Link 
              href="/thesis" 
              className={`flex items-center space-x-1 text-sm ${pathname === '/thesis' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              <span>📝</span>
              <span>Thesis</span>
            </Link>
          </div>

          {/* Right - Login/Profile Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                대시보드
              </Link>
              <button 
                onClick={() => {
                  const { signout } = useAuthStore.getState();
                  signout();
                  router.push('/auth/login');
                }}
                className="bg-red-600 text-white px-4 py-1.5 rounded text-sm hover:bg-red-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 