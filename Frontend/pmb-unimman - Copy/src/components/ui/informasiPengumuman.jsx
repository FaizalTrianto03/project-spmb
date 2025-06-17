// src/components/ui/informasiPengumuman.jsx
"use client";

import React, { useState, useEffect } from 'react';

const InformasiPengumuman = () => {
    const [informasiData, setInformasiData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Data manual - inisialisasi langsung
    const manualData = [
        {
            id: 1,
            title: "RINCIAN BIAYA PENDIDIKAN UNIMMAN T.A 2025/2026",
            type: "Informasi",
            created_at: "2025-01-31T00:00:00Z"
        },
        {
            id: 2,
            title: "TATA CARA PEMBAYARAN BIAYA FORMULIR PMB UNIMMAN",
            type: "Pengumuman",
            created_at: "2023-03-07T00:00:00Z"
        },
        {
            id: 3,
            title: "Format/Template Berkas Penerimaan Mahasiswa Baru",
            type: "Informasi",
            created_at: "2023-01-24T00:00:00Z"
        }
    ];

    // Load data manual dengan simulasi loading
    useEffect(() => {
        const loadData = () => {
            // Simulasi loading selama 800ms
            setTimeout(() => {
                // Urutkan berdasarkan tanggal terbaru
                const sortedData = manualData
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3); // Ambil 3 data terbaru
                
                setInformasiData(sortedData);
                setLoading(false);
            }, 800);
        };

        loadData();
    }, []);

    // Format tanggal
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    };

    return (
        <section className="pt-8 lg:pt-12 pb-8 lg:pb-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 lg:mb-8">
                    <div>
                        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
                            Informasi & Pengumuman
                        </h2>
                        <p className="text-xs lg:text-sm text-gray-600">
                            Informasi terbaru seputar UNIMMAN
                        </p>
                    </div>
                    <div className="text-[#1a81ca] hover:text-[#1565a0] font-medium text-xs lg:text-sm cursor-pointer transition-colors duration-200 flex items-center gap-1">
                        Lihat Semua Informasi
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-4 lg:py-6">
                        <div className="animate-spin rounded-full h-6 lg:h-8 w-6 lg:w-8 border-b-2 border-[#1a81ca] mx-auto"></div>
                        <p className="text-gray-600 mt-2 lg:mt-3 text-xs lg:text-sm">Memuat informasi...</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-start gap-4 lg:gap-6">
                        {informasiData.map((item, index) => (
                            <div 
                                key={item.id || index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer transition-all duration-300 hover:border-[#1a81ca] overflow-hidden w-full sm:w-80 lg:w-72 xl:w-80 h-80 lg:h-96"
                            >
                                {/* Logo Section - Square but limited height */}
                                <div className="bg-white p-4 lg:p-6 flex items-center justify-center border-b border-gray-100 h-48 lg:h-56 relative">
                                    {/* Type Label - Positioned at top right */}
                                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                                        item.type === 'Informasi' 
                                            ? 'bg-blue-50 text-[#1a81ca]' 
                                            : 'bg-orange-50 text-orange-600'
                                    }`}>
                                        {item.type}
                                    </span>
                                    
                                    <img 
                                        src="/assets/logo.png" 
                                        alt="Logo UNIMMAN"
                                        className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentNode.innerHTML = `
                                                <div class="w-16 h-16 lg:w-20 lg:h-20 bg-[#1a81ca] rounded-full flex items-center justify-center">
                                                    <span class="text-white font-bold text-lg lg:text-xl">U</span>
                                                </div>
                                            `;
                                        }}
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-4 lg:p-5 bg-white h-32 lg:h-40 relative">
                                    {/* Tanggal */}
                                    <p className="text-sm text-gray-500 mb-2">
                                        {formatDate(item.created_at)}
                                    </p>

                                    {/* Judul */}
                                    <h3 className="font-semibold text-gray-800 mb-4 text-sm lg:text-base leading-snug pr-2">
                                        {item.title}
                                    </h3>

                                    {/* Link - Positioned at Bottom Right */}
                                    <div className="absolute bottom-4 lg:bottom-5 right-4 lg:right-5">
                                        <div className="text-[#1a81ca] font-medium text-sm cursor-pointer">
                                            Lihat Detail
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InformasiPengumuman;
