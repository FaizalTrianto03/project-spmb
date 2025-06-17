// src/app/program-studi/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProgramStudiPage = () => {
    const router = useRouter();

    /**
     * State management untuk data dan filter
     */
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('D3');
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * Load data dari JSON file
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/realDummyData.json');
                const data = await response.json();
                setStudyPrograms(data.dummy_data.study_programs || []);
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    /**
     * Filter programs berdasarkan tab dan search query
     * Search berdasarkan nama program studi dan fakultas
     */
    useEffect(() => {
        let filtered = studyPrograms.filter(program =>
            program.level === activeTab && program.is_active
        );

        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase().trim();

            if (searchLower) {
                filtered = filtered.filter(program => {
                    const searchableContent = [
                        program.name,
                        program.faculty,
                        program.description,
                        program.code,
                        program.degree,
                        ...(program.keywords || []),
                        ...(program.tags || [])
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

        setFilteredPrograms(filtered);
    }, [activeTab, studyPrograms, searchQuery]);

    /**
     * Handle navigation untuk detail program studi
     */
    const handleProgramDetail = (programId) => {
        router.push(`/program-studi/${programId}`);
    };

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
                                Program Studi
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
                                Informasi Program Studi
                            </h1>
                            <p className="text-sm lg:text-base text-gray-600">
                                Informasi program studi Universitas Muhammadiyah Manado
                            </p>
                        </div>

                        {/* Tabs and Search Row */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 lg:mb-8">

                            {/* Tab Navigation dengan padding yang lebih baik */}
                            <div className="inline-flex bg-gray-100 rounded-xl p-1.5">
                                {['D3', 'S1', 'PROFESI'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setActiveTab(level)}
                                        className={`px-6 lg:px-8 py-3 mx-1 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 ${
                                            activeTab === level
                                                ? 'bg-[#1a81ca] text-white shadow-md'
                                                : 'text-gray-600 hover:text-[#1a81ca]'
                                        }`}
                                    >
                                        {level === 'PROFESI' ? 'Profesi' : level}
                                    </button>
                                ))}
                            </div>

                            {/* Search Box dengan custom dropdown arrow */}
                            <div className="relative w-full sm:max-w-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari program studi..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-10 py-3 text-sm border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a81ca] focus:border-[#1a81ca] transition-all duration-200 bg-white text-gray-800 placeholder-gray-500 font-medium"
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

                        {/* Program List */}
                        {loading ? (
                            <div className="text-center py-8 lg:py-12">
                                <div className="animate-spin rounded-full h-8 lg:h-10 w-8 lg:w-10 border-b-2 border-[#1a81ca] mx-auto"></div>
                                <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">Memuat data program studi...</p>
                            </div>
                        ) : filteredPrograms.length === 0 ? (
                            <div className="text-center py-8 sm:py-12 lg:py-16">
                                <div className="text-gray-400 mb-4">
                                    <svg className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-2">
                                    {searchQuery ? 'Program studi tidak ditemukan' : 'Tidak ada program studi'}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base px-4 mb-4">
                                    {searchQuery
                                        ? `Tidak ada program studi yang cocok dengan pencarian "${searchQuery}"`
                                        : `Belum ada program studi untuk jenjang ${activeTab}`
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
                                            Coba kata kunci: farmasi, teknik, ekonomi, hukum, pendidikan
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredPrograms.map((program, index) => (
                                    <div
                                        key={program.id}
                                        className={`bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#1a81ca] hover:shadow-lg transition-all duration-300 fade-in-up`}
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animationFillMode: 'forwards'
                                        }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="bg-[#1a81ca] text-white px-3 py-1 rounded-lg text-sm font-bold">
                                                        {program.level}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight">
                                                    {program.name}
                                                </h3>
                                                
                                                <p className="text-sm lg:text-base text-gray-600 mb-1">
                                                    Tersedia 5 jalur pendaftaran dengan berbagai keunggulan
                                                </p>
                                                
                                                {program.faculty && (
                                                    <p className="text-xs lg:text-sm text-gray-500">
                                                        Fakultas: {program.faculty}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div className="flex-shrink-0">
                                                <button
                                                    onClick={() => handleProgramDetail(program.id)}
                                                    className="bg-gray-50 text-[#1a81ca] font-semibold px-6 py-3 rounded-lg hover:bg-[#1a81ca] hover:text-white transition-all duration-300 border-2 border-transparent hover:border-[#1a81ca] text-sm lg:text-base"
                                                >
                                                    Lihat Detail Program
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Results Count */}
                        {!loading && filteredPrograms.length > 0 && (
                            <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-600 text-center">
                                    Menampilkan {filteredPrograms.length} program studi
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
            `}</style>
        </div>
    );
};

export default ProgramStudiPage;
