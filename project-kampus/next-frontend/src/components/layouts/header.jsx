// src/components/layouts/header.jsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Menu configuration - dapat disesuaikan sesuai kebutuhan
   */
  const menuItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      link: '/',
      hasDropdown: false,
      paths: ['/'] // Exact match untuk beranda
    },
    {
      id: 'program-studi',
      label: 'Program Studi',
      link: '/program-studi',
      hasDropdown: false,
      paths: ['/program-studi'] // Semua path yang dimulai dengan /program-studi
    },
    {
      id: 'jalur-pendaftaran',
      label: 'Jalur Pendaftaran',
      link: '/jalur-pendaftaran',
      hasDropdown: false,
      paths: ['/jalur-pendaftaran'] // Semua path yang dimulai dengan /jalur-pendaftaran
    },
    {
      id: 'informasi',
      label: 'Informasi',
      link: '#',
      hasDropdown: true,
      paths: ['/informasi'], // Parent menu akan aktif jika ada submenu yang aktif
      dropdownItems: [
        {
          id: 'info-pengumuman',
          label: 'Informasi dan Pengumuman',
          link: '/informasi',
          paths: ['/informasi'] // Path untuk submenu
        }
      ]
    }
  ];

  // State management
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('beranda');

  // Refs untuk detect click outside
  const infoDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  /**
   * Function untuk menentukan menu aktif berdasarkan pathname
   */
  const getActiveMenu = (currentPath) => {
    // Cek exact match untuk beranda
    if (currentPath === '/') {
      return 'beranda';
    }

    // Cek untuk setiap menu item
    for (const item of menuItems) {
      // Cek path utama menu
      if (item.paths.some(path => {
        if (path === '/') {
          return currentPath === path; // Exact match untuk beranda
        }
        return currentPath.startsWith(path);
      })) {
        return item.id;
      }

      // Cek submenu jika ada dropdown
      if (item.hasDropdown && item.dropdownItems) {
        for (const subItem of item.dropdownItems) {
          if (subItem.paths && subItem.paths.some(path => {
            if (path === '/') {
              return currentPath === path;
            }
            return currentPath.startsWith(path);
          })) {
            return item.id; // Return parent menu ID jika submenu aktif
          }
        }
      }
    }

    return 'beranda'; // Default fallback
  };

  /**
   * Update active menu ketika pathname berubah
   */
  useEffect(() => {
    const newActiveMenu = getActiveMenu(pathname);
    setActiveMenu(newActiveMenu);
  }, [pathname]);

  /**
   * Handle scroll effect untuk shadow header
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Handle click outside untuk menutup dropdown dan mobile menu
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Desktop dropdown
      if (window.innerWidth >= 1280) {
        if (infoDropdownRef.current && !infoDropdownRef.current.contains(event.target)) {
          setIsInfoOpen(false);
        }
      }

      // Mobile menu
      if (window.innerWidth < 1280) {
        if (headerRef.current && !headerRef.current.contains(event.target)) {
          setIsMobileMenuOpen(false);
          setIsInfoOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Handle ESC key untuk menutup dropdown dan mobile menu
   */
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsInfoOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  /**
   * Close mobile menu when screen size changes to desktop
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (menuId) => {
    if (menuId === 'informasi') {
      setIsInfoOpen(!isInfoOpen);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsInfoOpen(false);
    }
  };

  /**
  * Handle logo/brand click - Navigate to home
  */
  const handleBrandClick = () => {
    router.push('/');
  };

  const handleMobileMenuItemClick = (menuId) => {
    setIsMobileMenuOpen(false);
    setIsInfoOpen(false);
  };

  /**
   * Handle navigation menggunakan Next.js router
   */
  const handleNavigation = (link, menuId) => {
    if (link !== '#') {
      router.push(link);
    }
  };

  const handleMobileNavigation = (link, menuId) => {
    if (link !== '#') {
      router.push(link);
    }
    handleMobileMenuItemClick(menuId);
  };

  /**
   * Handle login navigation
   */
  const handleLoginClick = () => {
    router.push('/login');
  };

  /**
   * Check if submenu is active
   */
  const isSubmenuActive = (subItem) => {
    if (!subItem.paths) return false;
    return subItem.paths.some(path => {
      if (path === '/') {
        return pathname === path;
      }
      return pathname.startsWith(path);
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[9999] bg-white border-b transition-shadow duration-200 ${isScrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo Section - Responsive */}
            <div
              onClick={handleBrandClick}
              className="flex items-center space-x-3 flex-shrink-0 min-w-0 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 p-1.5 bg-blue-50 rounded-lg flex-shrink-0">
                <img
                  src="/assets/logo UM Manado.jpg"
                  alt="Logo UNIMMAN"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden md:block min-w-0">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider leading-tight">
                  Penerimaan Mahasiswa Baru
                </p>
                <h1 className="text-gray-900 text-sm lg:text-base font-bold leading-tight">
                  Universitas Muhammadiyah Manado
                </h1>
              </div>
              <div className="md:hidden min-w-0">
                <h1 className="text-gray-900 text-sm font-bold leading-tight">
                  UNIMMAN
                </h1>
                <p className="text-blue-600 text-xs font-medium leading-tight">
                  PMB 2024
                </p>
              </div>
            </div>

            {/* Desktop Navigation Menu - Responsive Breakpoint */}
            <div className="hidden xl:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={item.id} className={item.hasDropdown ? "relative" : ""} ref={item.hasDropdown ? infoDropdownRef : null}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`font-medium text-sm transition-colors duration-200 flex items-center space-x-1 px-3 py-2.5 rounded-lg whitespace-nowrap ${activeMenu === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${(item.id === 'informasi' && isInfoOpen) ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.link, item.id);
                      }}
                      className={`font-medium text-sm transition-colors duration-200 px-3 py-2.5 rounded-lg whitespace-nowrap ${activeMenu === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Desktop Dropdown Content */}
                  {item.hasDropdown && item.id === 'informasi' && isInfoOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-[9998]">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.id}
                          href={dropdownItem.link}
                          className={`block px-4 py-3 text-sm transition-colors duration-200 ${isSubmenuActive(dropdownItem)
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(dropdownItem.link, item.id);
                            setIsInfoOpen(false);
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - Login Button & Mobile Menu */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleLoginClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
              >
                Masuk
              </button>

              {/* Mobile Menu Button - Show on XL breakpoint and below */}
              <button
                onClick={toggleMobileMenu}
                className="xl:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            ref={mobileMenuRef}
            className={`xl:hidden border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <div>
                      {/* Mobile Dropdown Toggle */}
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className={`w-full text-left font-medium text-sm transition-colors duration-200 flex items-center justify-between py-3 px-4 rounded-lg ${activeMenu === item.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${(item.id === 'informasi' && isInfoOpen) ? 'rotate-180' : ''
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Dropdown Content */}
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${item.id === 'informasi' && isInfoOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="mt-2 ml-4 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.id}
                              href={dropdownItem.link}
                              className={`block text-sm py-2.5 px-4 rounded-lg transition-colors duration-200 ${isSubmenuActive(dropdownItem)
                                ? 'text-blue-600 bg-blue-50 font-medium'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMobileNavigation(dropdownItem.link, item.id);
                              }}
                            >
                              {dropdownItem.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className={`block font-medium text-sm transition-colors duration-200 py-3 px-4 rounded-lg ${activeMenu === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavigation(item.link, item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
