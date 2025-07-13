"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/domain/auth/store/auth.store";

import ThemeToggler from "@/components/Header/ThemeToggler";
import menuData from "@/components/Header/menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const pathUrl = usePathname();
  const router = useRouter();
  
  const { user, isAuthenticated, signout } = useAuthStore();

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  const handleLogout = async () => {
    await signout();
    router.push("/auth/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  }, []);

  return (
    <header
      className={`top-0 left-0 z-40 flex w-full items-center bg-transparent ${
        stickyMenu
          ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                stickyMenu ? "py-5 lg:py-2" : "py-8"
              } `}
            >
            <Image
              src="/images/logo/lif-logo.svg"
                alt="logo"
                width={140}
                height={30}
                className="w-full dark:hidden"
              />
              <Image
                src="/images/logo/logo-dark.svg"
                alt="logo"
                width={140}
                height={30}
                className="hidden w-full dark:block"
              />
            </Link>
        </div>
          <div className="flex w-full items-center justify-between px-4">
            <div
              className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white p-4 shadow-card dark:bg-dark-2 sm:static sm:block sm:w-full sm:max-w-full sm:bg-transparent sm:p-0 sm:shadow-none sm:dark:bg-transparent ${
                navigationOpen ? "block" : "hidden"
          }`}
        >
              <nav className="py-4 sm:py-0">
                <ul className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
                  {menuData.map((menuItem, index) => (
                    <li key={index}>
                      <Link
                        href={menuItem.path || "#"}
                        className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 ${
                        pathUrl === menuItem.path
                            ? "text-primary dark:text-white"
                            : "text-dark dark:text-white/70"
                        }`}
                    >
                      {menuItem.title}
                    </Link>
                </li>
              ))}
            </ul>
          </nav>
            </div>
          </div>
          <div className="flex items-center justify-end pr-16 lg:pr-0">
            <div className="flex items-center gap-4">
            <ThemeToggler />

            {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    대시보드
                  </Link>

              <div className="relative">
                <button 
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-gray-200 transition-all hover:ring-primary dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-primary"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-gray-600 dark:text-gray-300"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </button>
                
                    {/* 프로필 드롭다운 메뉴 */}
                    {profileMenuOpen && (
                      <div className="absolute right-0 top-12 z-50 min-w-[200px] rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-200 dark:bg-dark-2 dark:ring-gray-700">
                        <div className="border-b border-gray-100 px-4 py-2 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">로그인됨</p>
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {user.email}
                          </p>
                        </div>
                    <Link
                      href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-white/70 dark:hover:bg-dark-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          마이페이지
                        </Link>
                        <Link
                          href="/notifications"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-white/70 dark:hover:bg-dark-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                          알림
                    </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    <button
                      onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:text-red-400 dark:hover:bg-dark-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                      로그아웃
                    </button>
                  </div>
                )}
                  </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                  className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primaryho"
              >
                로그인
              </Link>
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
