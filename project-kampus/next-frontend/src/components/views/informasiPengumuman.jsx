// src/components/ui/informasiPengumuman.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const InformasiPengumuman = () => {
    const router = useRouter();
    const [informasiData, setInformasiData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Data manual dengan struktur yang lebih lengkap
    const manualData = [
        {
            id: 1,
            title: "RINCIAN BIAYA PENDIDIKAN UNIMMAN T.A 2025/2026",
            type: "Informasi",
            description: "Informasi lengkap mengenai rincian biaya pendidikan untuk tahun akademik 2025/2026 di semua program studi.",
            created_at: "2025-01-31T00:00:00Z",
            slug: "rincian-biaya-pendidikan-2025-2026"
        },
        {
            id: 2,
            title: "TATA CARA PEMBAYARAN BIAYA FORMULIR PMB UNIMMAN",
            type: "Pengumuman",
            description: "Panduan lengkap tata cara pembayaran biaya formulir pendaftaran mahasiswa baru UNIMMAN.",
            created_at: "2025-01-15T00:00:00Z",
            slug: "tata-cara-pembayaran-formulir-pmb"
        },
        {
            id: 3,
            title: "Format/Template Berkas Penerimaan Mahasiswa Baru",
            type: "Informasi",
            description: "Download template dan format berkas yang diperlukan untuk pendaftaran mahasiswa baru.",
            created_at: "2025-01-10T00:00:00Z",
            slug: "format-template-berkas-pmb"
        }
    ];

    // Load data dengan error handling yang lebih baik
    useEffect(() => {
        const loadData = async () => {
            try {
                // Simulasi loading yang lebih realistis
                await new Promise(resolve => setTimeout(resolve, 600));

                // Urutkan berdasarkan tanggal terbaru
                const sortedData = manualData
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3);

                setInformasiData(sortedData);
            } catch (error) {
                console.error('Error loading informasi:', error);
                setInformasiData([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Format tanggal yang lebih robust
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                return 'Tanggal tidak valid';
            }

            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];

            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            return `${day} ${month} ${year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Tanggal tidak valid';
        }
    };

    // Handle navigation
    const handleItemClick = (item) => {
        router.push(`/informasi/${item.id}`);
    };

    const handleViewAll = () => {
        router.push('/informasi');
    };

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 h-48 lg:h-56 animate-pulse"></div>
                    <div className="p-5 lg:p-6">
                        <div className="flex items-center mb-3">
                            <div className="w-4 h-4 bg-gray-300 rounded mr-2 animate-pulse"></div>
                            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse ml-auto"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header dengan spacing yang lebih baik */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-12 lg:mb-16">
                    <div className="flex-1">
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-3 lg:mb-4">
                            Informasi & Pengumuman
                        </h2>
                        <p className="text-lg lg:text-xl text-blue-700 leading-relaxed">
                            Dapatkan informasi terbaru seputar UNIMMAN dan pengumuman penting
                        </p>
                    </div>

                    <button
                        onClick={handleViewAll}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-base lg:text-lg cursor-pointer transition-all duration-300 flex items-center gap-2 flex-shrink-0 hover:gap-3 group"
                    >
                        Lihat Semua Informasi
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Content dengan error handling */}
                {loading ? (
                    <LoadingSkeleton />
                ) : informasiData.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">Belum Ada Informasi</h3>
                        <p className="text-blue-700">Informasi terbaru akan segera ditampilkan di sini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {informasiData.map((item, index) => (
                            <article
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className="bg-white rounded-2xl shadow-lg border border-blue-100 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-blue-300 hover:transform hover:-translate-y-2 overflow-hidden group flex flex-col"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Header Section dengan design yang lebih clean */}
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 flex items-center justify-center relative overflow-hidden h-56">
                                    {/* Background Pattern yang lebih subtle */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-10 -translate-x-10"></div>
                                    </div>

                                    {/* Type Badge */}
                                    <span className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300 group-hover:scale-110 z-20 ${item.type === 'Informasi'
                                            ? 'bg-white/20 text-white backdrop-blur-sm border border-white/30'
                                            : 'bg-yellow-400 text-blue-900 shadow-yellow-400/25'
                                        }`}>
                                        {item.type}
                                    </span>

                                    {/* Logo dengan fallback yang lebih baik */}
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

                                {/* Content Section dengan layout yang lebih baik */}
                                <div className="p-6 bg-white flex-1 flex flex-col">
                                    {/* Tanggal */}
                                    <div className="flex items-center mb-4">
                                        <svg className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <time className="text-sm text-blue-600 font-medium">
                                            {formatDate(item.created_at)}
                                        </time>
                                    </div>

                                    {/* Judul */}
                                    <h3 className="font-bold text-blue-900 text-lg leading-tight flex-1 mb-3 line-clamp-3">
                                        {item.title}
                                    </h3>

                                    {/* Deskripsi singkat */}
                                    {item.description && (
                                        <p className="text-blue-700 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}

                                    {/* CTA Button */}
                                    <div className="flex justify-end">
                                        <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-sm cursor-pointer transition-all duration-300 group-hover:gap-3 gap-2">
                                            Lihat Detail
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InformasiPengumuman;
