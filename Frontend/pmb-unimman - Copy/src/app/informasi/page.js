// src/app/informasi/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const InformasiPage = () => {
    const router = useRouter();

    /**
     * State management untuk data dan filter
     */
    const [informasiData, setInformasiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * Data manual - inisialisasi langsung
     */
    const manualData = [
        {
            id: 1,
            title: "RINCIAN BIAYA PENDIDIKAN UNIMMAN T.A 2025/2026",
            type: "Informasi",
            created_at: "2025-01-31T00:00:00Z",
            description: "Informasi lengkap mengenai rincian biaya pendidikan untuk tahun akademik 2025/2026 di Universitas Muhammadiyah Manado.",
            is_active: true
        },
        {
            id: 2,
            title: "TATA CARA PEMBAYARAN BIAYA FORMULIR PMB UNIMMAN",
            type: "Pengumuman",
            created_at: "2023-03-07T00:00:00Z",
            description: "Panduan lengkap tata cara pembayaran biaya formulir pendaftaran mahasiswa baru UNIMMAN.",
            is_active: true
        },
        {
            id: 3,
            title: "Format/Template Berkas Penerimaan Mahasiswa Baru",
            type: "Informasi",
            created_at: "2023-01-24T00:00:00Z",
            description: "Template dan format berkas yang diperlukan untuk proses penerimaan mahasiswa baru.",
            is_active: true
        },
        {
            id: 4,
            title: "JADWAL SELEKSI MASUK UNIMMAN 2025",
            type: "Pengumuman",
            created_at: "2025-01-15T00:00:00Z",
            description: "Jadwal lengkap seleksi masuk untuk berbagai jalur pendaftaran di UNIMMAN tahun 2025.",
            is_active: true
        },
        {
            id: 5,
            title: "PANDUAN REGISTRASI ONLINE PMB UNIMMAN",
            type: "Informasi",
            created_at: "2025-01-10T00:00:00Z",
            description: "Panduan step-by-step untuk melakukan registrasi online pendaftaran mahasiswa baru.",
            is_active: true
        },
        {
            id: 6,
            title: "BEASISWA TERSEDIA UNTUK MAHASISWA BARU 2025",
            type: "Pengumuman",
            created_at: "2025-01-05T00:00:00Z",
            description: "Informasi berbagai program beasiswa yang tersedia untuk mahasiswa baru tahun 2025.",
            is_active: true
        }
    ];

    /**
     * Load data manual dengan simulasi loading
     */
    useEffect(() => {
        const loadData = () => {
            setTimeout(() => {
                // Urutkan berdasarkan tanggal terbaru
                const sortedData = manualData
                    .filter(item => item.is_active)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                
                setInformasiData(sortedData);
                setLoading(false);
            }, 800);
        };

        loadData();
    }, []);

    /**
     * Filter data berdasarkan tab dan search query
     */
    useEffect(() => {
        let filtered = informasiData;

        // Filter berdasarkan tab
        if (activeTab !== 'SEMUA') {
            filtered = filtered.filter(item => item.type === activeTab);
        }

        // Filter berdasarkan search query
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase().trim();
            if (searchLower) {
                filtered = filtered.filter(item => {
                    const searchableContent = [
                        item.title,
                        item.description,
                        item.type
                    ]
                        .filter(Boolean)
                        .join(' ')
                        .toLowerCase();

                    const keywords = searchLower.split(/\s+/).filter(k => k.length > 0);
                    return keywords.every(keyword =>
                        searchableContent.includes(keyword)
                    );
                });
            }
        }

        setFilteredData(filtered);
    }, [activeTab, informasiData, searchQuery]);

    /**
     * Handle search input change
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    /**
     * Clear search query
     */
    const clearSearch = () => {
        setSearchQuery('');
    };

    /**
     * Handle detail navigation
     */
    const handleDetailClick = (itemId) => {
        router.push(`/informasi/${itemId}`);
    };

    /**
     * Format tanggal
     */
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

    /**
     * Truncate text untuk deskripsi
     */
    const truncateText = (text, maxLength = 80) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Breadcrumb - Sticky positioning */}
            <div className="bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
                    <nav className="py-2.5 sm:py-3 md:py-4" aria-label="Breadcrumb">
                        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm">
                            <button
                                onClick={() => router.push('/')}
                                className="text-gray-500 hover:text-[#1a81ca] transition-colors duration-200 font-medium truncate"
                            >
                                Beranda
                            </button>
                            <span className="text-gray-400 flex-shrink-0">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="text-gray-800 font-semibold truncate">
                                Informasi & Pengumuman
                            </span>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content - Normal padding */}
            <main className="py-6 sm:py-8 lg:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">

                    {/* Content Container */}
                    <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 transform transition-all duration-300 hover:shadow-md">

                        {/* Page Header */}
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                                Informasi & Pengumuman
                            </h1>
                            <p className="text-sm lg:text-base text-gray-600">
                                Informasi terbaru dan pengumuman penting seputar Universitas Muhammadiyah Manado
                            </p>
                        </div>

                        {/* Tabs and Search Row */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 lg:mb-8">

                            {/* Tabs */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveTab('SEMUA')}
                                    className={`px-4 lg:px-5 py-2.5 lg:py-3 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${activeTab === 'SEMUA'
                                        ? 'bg-[#1a81ca] text-white shadow-sm'
                                        : 'border border-[#1a81ca] bg-white text-[#1a81ca] hover:bg-[#1a81ca] hover:text-white'
                                        }`}
                                >
                                    Semua
                                </button>
                                <button
                                    onClick={() => setActiveTab('Informasi')}
                                    className={`px-4 lg:px-5 py-2.5 lg:py-3 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${activeTab === 'Informasi'
                                        ? 'bg-[#1a81ca] text-white shadow-sm'
                                        : 'border border-[#1a81ca] bg-white text-[#1a81ca] hover:bg-[#1a81ca] hover:text-white'
                                        }`}
                                >
                                    Informasi
                                </button>
                                <button
                                    onClick={() => setActiveTab('Pengumuman')}
                                    className={`px-4 lg:px-5 py-2.5 lg:py-3 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${activeTab === 'Pengumuman'
                                        ? 'bg-[#1a81ca] text-white shadow-sm'
                                        : 'border border-[#1a81ca] bg-white text-[#1a81ca] hover:bg-[#1a81ca] hover:text-white'
                                        }`}
                                >
                                    Pengumuman
                                </button>
                            </div>

                            {/* Search Box */}
                            <div className="relative w-full sm:max-w-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari informasi..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a81ca] focus:border-transparent transition-all duration-200 bg-white text-gray-800 placeholder-gray-500"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        {loading ? (
                            <div className="text-center py-8 lg:py-12">
                                <div className="animate-spin rounded-full h-8 lg:h-10 w-8 lg:w-10 border-b-2 border-[#1a81ca] mx-auto"></div>
                                <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">Memuat informasi...</p>
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="text-center py-8 sm:py-12 lg:py-16">
                                <div className="text-gray-400 mb-4">
                                    <svg className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-2">
                                    {searchQuery ? 'Informasi tidak ditemukan' : 'Tidak ada informasi'}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base px-4 mb-4">
                                    {searchQuery
                                        ? `Tidak ada informasi yang cocok dengan pencarian "${searchQuery}"`
                                        : `Belum ada ${activeTab === 'SEMUA' ? 'informasi' : activeTab.toLowerCase()}`
                                    }
                                </p>
                                {searchQuery && (
                                    <div className="space-y-2">
                                        <button
                                            onClick={clearSearch}
                                            className="text-[#1a81ca] hover:text-[#1565a0] text-sm font-medium transition-colors duration-200"
                                        >
                                            Hapus pencarian
                                        </button>
                                        <p className="text-xs text-gray-500">
                                            Coba kata kunci: biaya, pendaftaran, jadwal, beasiswa
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                                {filteredData.map((item, index) => (
                                    <div 
                                        key={item.id}
                                        className={`bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer transition-all duration-300 hover:border-[#1a81ca] hover:shadow-md overflow-hidden fade-in-up h-[420px] lg:h-[460px] flex flex-col`}
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animationFillMode: 'forwards'
                                        }}
                                        onClick={() => handleDetailClick(item.id)}
                                    >
                                        {/* 1. Foto Section dengan Label - Fixed Height */}
                                        <div className="bg-white p-4 lg:p-6 flex items-center justify-center border-b border-gray-100 h-48 lg:h-56 relative flex-shrink-0">
                                            {/* Type Label - di atas foto */}
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

                                        {/* Content Section - Flex grow untuk mengisi sisa ruang */}
                                        <div className="p-4 lg:p-5 bg-white flex-1 flex flex-col relative">
                                            {/* 2. Date */}
                                            <p className="text-sm text-gray-500 mb-3 flex-shrink-0">
                                                {formatDate(item.created_at)}
                                            </p>

                                            {/* 3. Judul */}
                                            <h3 className="font-semibold text-gray-800 text-sm lg:text-base leading-snug line-clamp-2 mb-3 flex-shrink-0">
                                                {item.title}
                                            </h3>

                                            {/* 4. Deskripsi - Flex grow untuk mengisi ruang */}
                                            <p className="text-xs lg:text-sm text-gray-600 flex-1 mb-4">
                                                {truncateText(item.description)}
                                            </p>

                                            {/* 5. Lihat Detail - Absolute positioned di pojok kanan bawah */}
                                            <div className="absolute bottom-4 lg:bottom-5 right-4 lg:right-5">
                                                <div className="text-[#1a81ca] font-medium text-sm cursor-pointer hover:text-[#1565a0] transition-colors duration-200">
                                                    Lihat Detail
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Results Count */}
                        {!loading && filteredData.length > 0 && (
                            <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-600 text-center">
                                    Menampilkan {filteredData.length} {activeTab === 'SEMUA' ? 'informasi' : activeTab.toLowerCase()}
                                    {searchQuery && (
                                        <span> untuk pencarian "<span className="font-medium">{searchQuery}</span>"</span>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Custom CSS untuk animasi */}
            <style jsx>{`
                .fade-in-up {
                    opacity: 0;
                    transform: translateY(15px);
                    animation-name: fade-in-up;
                    animation-duration: 0.5s;
                    animation-timing-function: ease-out;
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default InformasiPage;
