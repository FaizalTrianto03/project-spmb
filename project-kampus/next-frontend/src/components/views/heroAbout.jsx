// src/components/ui/heroAbout.jsx
"use client";

import React, { useState, useEffect } from 'react';

const HeroAbout = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Visibility animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to registration section
    const scrollToRegistration = () => {
        const element = document.getElementById('portal-pendaftaran');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Navigate to brosur
    const goToBrosur = () => {
        window.open('/brosur-pendaftaran', '_blank');
    };

    // Handle brosur detail
    const handleBrosurDetail = () => {
        window.open('/brosur-pendaftaran', '_blank');
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[65vh] flex items-center overflow-hidden bg-gradient-to-r from-slate-900 to-transparent py-8">
                {/* Background with Banner Image */}
                <div className="absolute inset-0">
                    {/* Banner Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/assets/poster pmb.png')"
                        }}
                    ></div>

                    {/* Simple Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800/70 via-slate-700/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-blue-800/15 to-transparent"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 w-full py-8">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[50vh]">
                            
                            {/* Left Content */}
                            <div className={`transition-all duration-700 ${
                                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}>
                                
                                {/* Main Heading - Ukuran dikecilkan */}
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-white text-left">
                                    <span className="block text-shadow-xl">
                                        Pendaftaran
                                    </span>
                                    <span className="block text-shadow-xl text-blue-300">
                                        Mahasiswa Baru
                                    </span>
                                    <span className="block text-shadow-xl text-xl sm:text-2xl lg:text-3xl font-medium mt-2 text-blue-200">
                                        UNIMMAN 2025
                                    </span>
                                </h1>

                                {/* Subtitle - Ukuran dikecilkan */}
                                <p className="text-lg lg:text-xl font-bold mb-5 text-shadow-lg text-white text-left">
                                    Wujudkan mimpi kuliahmu bersama kami!
                                </p>

                                {/* Description - Ukuran dikecilkan */}
                                <p className="text-sm lg:text-base opacity-95 mb-6 leading-relaxed text-shadow text-white text-left max-w-lg">
                                    Bergabunglah dengan ribuan mahasiswa yang telah mempercayai UNIMMAN 
                                    sebagai tempat menuntut ilmu dan meraih masa depan gemilang.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={scrollToRegistration}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-xl"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            DAFTAR SEKARANG
                                        </span>
                                    </button>
                                    
                                    <button
                                        onClick={goToBrosur}
                                        className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white hover:text-blue-800 transition-all duration-300 shadow-lg"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            INFO LENGKAP
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Content - Cards + Stats dengan Background Solid */}
                            <div className={`hidden lg:flex flex-col items-end justify-center transition-all duration-700 delay-300 ${
                                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                            }`}>
                                
                                {/* Stats dipindah ke atas dengan background solid */}
                                <div className="flex gap-4 w-80 mb-6 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl">
                                    <div className="text-center flex-1">
                                        <div className="text-2xl font-bold text-blue-300 mb-1">9+</div>
                                        <div className="text-xs text-white font-medium">Program Studi</div>
                                    </div>
                                    <div className="text-center flex-1 border-l border-white/20 pl-4">
                                        <div className="text-2xl font-bold text-blue-300 mb-1">5000+</div>
                                        <div className="text-xs text-white font-medium">Mahasiswa</div>
                                    </div>
                                    <div className="text-center flex-1 border-l border-white/20 pl-4">
                                        <div className="text-2xl font-bold text-blue-300 mb-1">150+</div>
                                        <div className="text-xs text-white font-medium">Total Dosen</div>
                                    </div>
                                </div>

                                {/* Cards dengan background yang lebih solid */}
                                <div className="relative space-y-3 w-80">
                                    <div className="bg-slate-900/85 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                                            <span className="text-white font-bold text-sm">Akreditasi Baik</span>
                                        </div>
                                        <p className="text-gray-200 text-xs font-medium">Program studi terakreditasi BAN-PT</p>
                                    </div>

                                    <div className="bg-slate-900/85 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></div>
                                            <span className="text-white font-bold text-sm">Fasilitas Modern</span>
                                        </div>
                                        <p className="text-gray-200 text-xs font-medium">Laboratorium dan perpustakaan lengkap</p>
                                    </div>

                                    <div className="bg-slate-900/85 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm"></div>
                                            <span className="text-white font-bold text-sm">Beasiswa Tersedia</span>
                                        </div>
                                        <p className="text-gray-200 text-xs font-medium">Berbagai program beasiswa menanti</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simple Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1200 120" className="w-full h-12 fill-white/5">
                        <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>

                {/* Simplified CSS */}
                <style jsx>{`
                    .text-shadow {
                        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
                    }
                    .text-shadow-lg {
                        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
                    }
                    .text-shadow-xl {
                        text-shadow: 0 6px 16px rgba(0, 0, 0, 1);
                    }
                `}</style>
            </section>

            {/* Banner Section - Dipindah ke bawah */}
            <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-4 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between text-white">
                        <div className="flex items-center space-x-4 mb-2 md:mb-0">
                            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg">PENDAFTARAN MAHASISWA BARU 2025 DIBUKA!</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                            <span>Daftar sekarang dan dapatkan beasiswa hingga 50%</span>
                            <button
                                onClick={handleBrosurDetail}
                                className="bg-blue-300 text-blue-900 px-4 py-2 rounded-full font-bold hover:bg-blue-200 transition-colors"
                            >
                                Info Lengkap
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroAbout;
