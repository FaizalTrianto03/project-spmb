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
            is_active: true,
            slug: "rincian-biaya-pendidikan-unimman-ta-2025-2026"
        },
        {
            id: 2,
            title: "TATA CARA PEMBAYARAN BIAYA FORMULIR PMB UNIMMAN",
            type: "Pengumuman",
            created_at: "2023-03-07T00:00:00Z",
            description: "Panduan lengkap tata cara pembayaran biaya formulir pendaftaran mahasiswa baru UNIMMAN.",
            is_active: true,
            slug: "tata-cara-pembayaran-biaya-formulir-pmb-unimman"
        },
        {
            id: 3,
            title: "Format/Template Berkas Penerimaan Mahasiswa Baru",
            type: "Informasi",
            created_at: "2023-01-24T00:00:00Z",
            description: "Template dan format berkas yang diperlukan untuk proses penerimaan mahasiswa baru.",
            is_active: true,
            slug: "format-template-berkas-penerimaan-mahasiswa-baru"
        },
        {
            id: 4,
            title: "JADWAL SELEKSI MASUK UNIMMAN 2025",
            type: "Pengumuman",
            created_at: "2025-01-15T00:00:00Z",
            description: "Jadwal lengkap seleksi masuk untuk berbagai jalur pendaftaran di UNIMMAN tahun 2025.",
            is_active: true,
            slug: "jadwal-seleksi-masuk-unimman-2025"
        },
        {
            id: 5,
            title: "PANDUAN REGISTRASI ONLINE PMB UNIMMAN",
            type: "Informasi",
            created_at: "2025-01-10T00:00:00Z",
            description: "Panduan step-by-step untuk melakukan registrasi online pendaftaran mahasiswa baru.",
            is_active: true,
            slug: "panduan-registrasi-online-pmb-unimman"
        },
        {
            id: 6,
            title: "BEASISWA TERSEDIA UNTUK MAHASISWA BARU 2025",
            type: "Pengumuman",
            created_at: "2025-01-05T00:00:00Z",
            description: "Informasi berbagai program beasiswa yang tersedia untuk mahasiswa baru tahun 2025.",
            is_active: true,
            slug: "beasiswa-tersedia-untuk-mahasiswa-baru-2025"
        },
        {
            id: 7,
            title: "SYARAT DAN KETENTUAN PENDAFTARAN MAHASISWA BARU",
            type: "Informasi",
            created_at: "2024-12-20T00:00:00Z",
            description: "Syarat dan ketentuan lengkap untuk pendaftaran mahasiswa baru di UNIMMAN.",
            is_active: true,
            slug: "syarat-dan-ketentuan-pendaftaran-mahasiswa-baru"
        },
        {
            id: 8,
            title: "PENGUMUMAN HASIL SELEKSI GELOMBANG 1",
            type: "Pengumuman",
            created_at: "2024-12-15T00:00:00Z",
            description: "Pengumuman hasil seleksi gelombang 1 pendaftaran mahasiswa baru UNIMMAN.",
            is_active: true,
            slug: "pengumuman-hasil-seleksi-gelombang-1"
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
    const handleDetailClick = (item) => {
        const identifier = item.slug || item.id;
        router.push(`/informasi/${identifier}`);
    };

    /**
     * Format tanggal Indonesia
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
     * Get time ago string
     */
    const getTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hari ini';
        if (diffDays === 1) return 'Kemarin';
        if (diffDays < 7) return `${diffDays} hari yang lalu`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;
        return `${Math.floor(diffDays / 365)} tahun yang lalu`;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb Section */}
            <section className="bg-white border-b py-3">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <nav aria-label="Breadcrumb">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <button
                                onClick={() => router.push('/')}
                                className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                                Beranda
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">Informasi & Pengumuman</span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            Informasi & Pengumuman
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Informasi terbaru dan pengumuman penting seputar Universitas Muhammadiyah Manado
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content - Background putih bersih */}
            <main className="py-8 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    {/* Filter and Search Section */}
                    <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
                        <div className="flex flex-col space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    Filter Informasi & Pengumuman
                                </h2>
                                <p className="text-gray-600">
                                    Pilih kategori dan cari informasi yang Anda butuhkan
                                </p>
                            </div>

                            {/* Filter Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                {/* Tab Navigation */}
                                <div className="flex bg-gray-100 rounded-xl p-1.5 w-fit gap-2">
                                    {['SEMUA', 'Informasi', 'Pengumuman'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                                activeTab === tab
                                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                            }`}
                                        >
                                            {tab === 'SEMUA' ? 'Semua' : tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Search Box */}
                                <div className="relative flex-1 max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari informasi..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Info Bar */}
                            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Menampilkan {activeTab === 'SEMUA' ? 'semua informasi' : activeTab.toLowerCase()}
                                    {searchQuery && (
                                        <span> untuk pencarian "<span className="font-semibold text-gray-900">{searchQuery}</span>"</span>
                                    )}
                                </span>
                                <span className="font-semibold text-blue-600">
                                    {filteredData.length} Item Tersedia
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="text-center py-16 bg-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                            <p className="text-gray-600 mt-4 text-lg">Memuat informasi...</p>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center py-16 bg-white">
                            <div className="bg-white rounded-xl shadow-lg border p-12 max-w-lg mx-auto">
                                <div className="text-gray-400 mb-6">
                                    <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {searchQuery ? 'Informasi tidak ditemukan' : 'Tidak ada informasi'}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {searchQuery
                                        ? `Tidak ada informasi yang cocok dengan pencarian "${searchQuery}"`
                                        : `Belum ada ${activeTab === 'SEMUA' ? 'informasi' : activeTab.toLowerCase()}`
                                    }
                                </p>
                                {searchQuery && (
                                    <div className="space-y-4">
                                        <button
                                            onClick={clearSearch}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                                        >
                                            Hapus pencarian
                                        </button>
                                        <p className="text-sm text-gray-500">
                                            Coba kata kunci: biaya, pendaftaran, jadwal, beasiswa
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 bg-white">
                            {filteredData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => handleDetailClick(item)}
                                >
                                    <div className="flex flex-col lg:flex-row h-full">
                                        {/* Image Section - Full Height Left Side */}
                                        <div className="w-full lg:w-48 h-48 lg:h-auto bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center relative overflow-hidden group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300 flex-shrink-0">
                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 opacity-20">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12"></div>
                                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
                                                <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-white rounded-full"></div>
                                                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full"></div>
                                            </div>

                                            {/* Type Badge */}
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg ${
                                                item.type === 'Informasi'
                                                    ? 'bg-white/20 text-white backdrop-blur-sm'
                                                    : 'bg-yellow-400 text-blue-900'
                                            }`}>
                                                {item.type}
                                            </div>

                                            {/* Logo */}
                                            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                                               <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
                                            <img
                                                src="/assets/logo.png"
                                                alt="Logo UNIMMAN"
                                                className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentNode.innerHTML = `
                                                            <div class="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center shadow-xl">
                                                                <span class="text-white font-bold text-xl lg:text-2xl">U</span>
                                                            </div>
                                                        `;
                                                }}
                                            />
                                        </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 p-6 flex flex-col justify-between min-h-0 bg-white">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        item.type === 'Informasi'
                                                            ? 'bg-blue-100 text-blue-600'
                                                            : 'bg-yellow-100 text-yellow-600'
                                                    }`}>
                                                        {item.type}
                                                    </div>
                                                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                                    <span className="text-gray-500 text-sm">{formatDate(item.created_at)}</span>
                                                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                                    <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                                                        {getTimeAgo(item.created_at)}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
                                                    {item.description}
                                                </p>

                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span>Klik untuk membaca selengkapnya</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-4 border-t border-gray-100 mt-4">
                                                <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-sm cursor-pointer transition-all duration-200 group-hover:translate-x-1">
                                                    Lihat Detail
                                                    <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Custom CSS untuk animasi */}
            <style jsx>{`
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
