// src/components/layouts/header.jsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  /**
   * Menu configuration - dapat disesuaikan sesuai kebutuhan
   */
  const menuItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      link: '/',
      hasDropdown: false
    },
    {
      id: 'program-studi',
      label: 'Program Studi',
      link: '/program-studi',
      hasDropdown: false
    },
    {
      id: 'jalur-pendaftaran',
      label: 'Jalur Pendaftaran',
      link: '/jalur-pendaftaran',
      hasDropdown: false
    },
    {
      id: 'informasi',
      label: 'Informasi',
      link: '#',
      hasDropdown: true,
      dropdownItems: [
        {
          id: 'info-pengumuman',
          label: 'Informasi dan Pengumuman',
          link: '/informasi'
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
      if (window.innerWidth >= 1024) {
        if (infoDropdownRef.current && !infoDropdownRef.current.contains(event.target)) {
          setIsInfoOpen(false);
        }
      }

      // Mobile menu
      if (window.innerWidth < 1024) {
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
      if (window.innerWidth >= 1024) {
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

  const handleMobileMenuItemClick = (menuId) => {
    setActiveMenu(menuId);
    setIsMobileMenuOpen(false);
    setIsInfoOpen(false);
  };

  const handleDesktopMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  /**
   * Handle navigation menggunakan Next.js router
   */
  const handleNavigation = (link, menuId) => {
    if (link !== '#') {
      router.push(link);
    }
    handleDesktopMenuClick(menuId);
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

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[9999] bg-white border-b transition-all duration-300 ${
          isScrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="w-12 h-12 p-1.5 bg-blue-50 rounded-xl">
                <img
                  src="/assets/logo.png"
                  alt="Logo UNIMMAN"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                  Penerimaan Mahasiswa Baru
                </p>
                <h1 className="text-gray-900 text-base font-bold">
                  Universitas Muhammadiyah Manado
                </h1>
              </div>
              <div className="sm:hidden">
                <h1 className="text-gray-900 text-base font-bold">
                  UNIMMAN
                </h1>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.id} className={item.hasDropdown ? "relative" : ""} ref={item.hasDropdown ? infoDropdownRef : null}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`font-medium text-sm transition-all duration-200 flex items-center space-x-1 px-3 py-2 rounded-lg ${
                        activeMenu === item.id || (item.id === 'informasi' && isInfoOpen)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          (item.id === 'informasi' && isInfoOpen) ? 'rotate-180' : ''
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
                      className={`font-medium text-sm transition-all duration-200 px-3 py-2 rounded-lg ${
                        activeMenu === item.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Desktop Dropdown Content */}
                  {item.hasDropdown && item.id === 'informasi' && isInfoOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[9998]">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.id}
                          href={dropdownItem.link}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
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
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLoginClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm"
              >
                Masuk
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
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
            className={`lg:hidden border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
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
                        className={`w-full text-left font-medium text-sm transition-all duration-200 flex items-center justify-between py-3 px-4 rounded-lg ${
                          activeMenu === item.id || (item.id === 'informasi' && isInfoOpen)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                            (item.id === 'informasi' && isInfoOpen) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Dropdown Content */}
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        item.id === 'informasi' && isInfoOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="mt-2 ml-4 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.id}
                              href={dropdownItem.link}
                              className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 text-sm py-2.5 px-4 rounded-lg transition-all duration-200"
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
                      className={`block font-medium text-sm transition-all duration-200 py-3 px-4 rounded-lg ${
                        activeMenu === item.id
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
