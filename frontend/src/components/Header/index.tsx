"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

import ThemeToggler from "@/components/Header/ThemeToggler";
// import menuData from "@/components/Header/menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathUrl = usePathname();
  const router = useRouter();
  
  // useAuthStore 사용
  const { userId, name, email, accessToken, resetAuth, signout } = useAuthStore();
  const isAuthenticated = !!userId && !!accessToken;

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  const handleLogout = () => {
    signout();
    router.push('/');
    setUserMenuOpen(false);
  };

  // return (
    // <header
    //   className={`fixed left-0 top-0 z-99999 w-full py-7 ${
    //     stickyMenu
    //       ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
    //       : "bg-white dark:bg-black"
    //   }`}
    // >
    //   <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
    //     <div className="flex w-full items-center justify-between xl:w-1/4">
    //       <a href="/">
    //         <Image
    //           src="/images/logo/lif-logo.svg"
    //           alt="LIF 로고"
    //           width={120}
    //           height={60}
    //           priority
    //           style={{ height: 'auto' }}
    //           className="w-full"
    //         />
    //       </a>

    //       {/* <!-- Hamburger Toggle BTN --> */}
    //       <button
    //         aria-label="hamburger Toggler"
    //         className="block xl:hidden"
    //         onClick={() => setNavigationOpen(!navigationOpen)}
    //       >
    //         <span className="relative block h-5.5 w-5.5 cursor-pointer">
    //           <span className="absolute right-0 block h-full w-full">
    //             <span
    //               className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
    //                 !navigationOpen ? "!w-full delay-300" : "w-0"
    //               }`}
    //             ></span>
    //             <span
    //               className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
    //                 !navigationOpen ? "delay-400 !w-full" : "w-0"
    //               }`}
    //             ></span>
    //             <span
    //               className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
    //                 !navigationOpen ? "!w-full delay-500" : "w-0"
    //               }`}
    //             ></span>
    //           </span>
    //           <span className="du-block absolute right-0 h-full w-full rotate-45">
    //             <span
    //               className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
    //                 !navigationOpen ? "!h-0 delay-[0]" : "h-full"
    //               }`}
    //             ></span>
    //             <span
    //               className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
    //                 !navigationOpen ? "!h-0 delay-200" : "h-0.5"
    //               }`}
    //             ></span>
    //           </span>
    //         </span>
    //       </button>
    //       {/* <!-- Hamburger Toggle BTN --> */}
    //     </div>

    //     {/* Nav Menu Start   */}
    //     <div
    //       className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
    //         navigationOpen &&
    //         "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
    //       }`}
    //     >
    //       <nav>
    //         <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              /* {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button> */}

                      {/* <ul
                        className={`dropdown ${dropdownToggler ? "flex" : ""}`}
                      >
                        {menuItem.submenu.map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link href={item.path || "#"}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? "text-primary hover:text-primary"
                          : "hover:text-primary"
                      }
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <ThemeToggler />

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-regular font-medium text-waterloo hover:text-primary"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
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
                  <span>{name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-blacksection">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      내 정보
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-md bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

// export default Header; */}
