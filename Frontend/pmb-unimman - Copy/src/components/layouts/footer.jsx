// src/components/layouts/footer.jsx
"use client";

import React, { useState } from 'react';

const Footer = () => {
    const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

    // Generate WhatsApp URL
    const generateWhatsAppURL = () => {
        const phone = '6282315571956';
        const message = 'Hallo admin.....Saya ingin bertanya terkait pendaftaran Mahasiswa Baru Universitas Muhammadiyah Manado';
        const encodedMessage = encodeURIComponent(message);
        return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    };

    const handleWhatsAppClick = () => {
        window.open(generateWhatsAppURL(), '_blank');
    };

    return (
        <>
            {/* Main Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        
                        {/* Logo & Info */}
                        <div className="lg:col-span-1">
                            <div className="flex items-start space-x-3 mb-6">
                                <div className="w-16 h-16 flex-shrink-0">
                                    <img
                                        src="/assets/logo.png"
                                        alt="Logo UNIMMAN"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-400 text-[10px] leading-tight mb-1">
                                        Seleksi Penerimaan Mahasiswa Baru
                                    </p>
                                    <h3 className="text-gray-800 font-bold text-sm leading-tight">
                                        Universitas Muhammadiyah Manado
                                    </h3>
                                </div>
                            </div>
                            
                            {/* Social Media */}
                            <div className="flex items-center space-x-3">
                                <a
                                    href="#"
                                    className="w-9 h-9 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                                    title="Facebook"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 bg-gray-100 hover:bg-pink-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                                    title="Instagram"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Kontak Kami */}
                        <div className="lg:col-span-1">
                            <h4 className="text-gray-800 font-semibold text-sm mb-5">
                                Kontak Kami
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                        <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Jl. Raya Pangiang, Kel. Pandu, Kec. Bunaken, Kota Manado
                                    </p>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <div className="w-5 h-5 flex-shrink-0">
                                        <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        082315571956
                                    </p>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <div className="w-5 h-5 flex-shrink-0">
                                        <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        unimman@unimman.ac.id
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="lg:col-span-1">
                            <h4 className="text-gray-800 font-semibold text-sm mb-5">
                                Menu
                            </h4>
                            <div className="space-y-3">
                                <a
                                    href="#"
                                    className="block text-gray-600 hover:text-[#1a81ca] text-sm transition-colors duration-300"
                                >
                                    Beranda
                                </a>
                                <a
                                    href="#"
                                    className="block text-gray-600 hover:text-[#1a81ca] text-sm transition-colors duration-300"
                                >
                                    Program Studi
                                </a>
                                <a
                                    href="#"
                                    className="block text-gray-600 hover:text-[#1a81ca] text-sm transition-colors duration-300"
                                >
                                    Informasi dan Pengumuman
                                </a>
                                <a
                                    href="#"
                                    className="block text-gray-600 hover:text-[#1a81ca] text-sm transition-colors duration-300"
                                >
                                    Jalur Pendaftaran
                                </a>
                            </div>
                        </div>

                        {/* Tautan */}
                        <div className="lg:col-span-1">
                            <h4 className="text-gray-800 font-semibold text-sm mb-5">
                                Tautan
                            </h4>
                            <div className="space-y-3">
                                <a
                                    href="#"
                                    className="block text-gray-600 hover:text-[#1a81ca] text-sm transition-colors duration-300"
                                >
                                    Website UNIMMAN
                                </a>
                                <a
                                    href="#"
                                    className="block text-gray-600 hover:text-[#1a81ca] text-sm transition-colors duration-300"
                                >
                                    Cara Bayar Formulir Pendaftaran
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="text-center">
                            <p className="text-gray-500 text-sm">
                                Copyright @ 2025 Universitas Muhammadiyah Manado
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Fixed WhatsApp Button */}
            {isWhatsAppVisible && (
                <>
                    {/* Mobile - Below Copyright */}
                    <div className="block sm:hidden">
                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg"
                        >
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-sm">Butuh Bantuan?</p>
                                <p className="text-xs opacity-90">Hubungi Kami</p>
                            </div>
                        </button>
                    </div>

                    {/* Desktop - Floating */}
                    <div className="hidden sm:block">
                        <div className="fixed bottom-6 right-6 z-50">
                            <button
                                onClick={handleWhatsAppClick}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-xs">Butuh Bantuan?</p>
                                    <p className="text-[10px] opacity-90">Chat Admin</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Footer;
