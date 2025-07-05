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
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                Beranda
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">Program Studi</span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Header Section - Lebih menarik dengan gradient */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            Informasi Program Studi
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Temukan program studi yang tepat untuk masa depan Anda di Universitas Muhammadiyah Manado
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    {/* Filter dan Search - Design yang lebih modern */}
                    <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
                        <div className="flex flex-col space-y-6">
                            {/* Tab Navigation dengan design yang lebih menarik */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                {/* Pilihan Level Program Studi */}
                                <div className="bg-gray-100 rounded-xl p-1.5 w-full">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => setActiveTab('D3')}
                                            className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 text-center ${activeTab === 'D3'
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            D3 - Diploma 3
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('S1')}
                                            className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 text-center ${activeTab === 'S1'
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            S1 - Strata 1
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('PROFESI')}
                                            className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 text-center ${activeTab === 'PROFESI'
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            Prof - Profesi
                                        </button>
                                    </div>
                                </div>


                                {/* Search Box dengan design yang lebih menarik */}
                                <div className="relative w-full lg:w-auto lg:min-w-[350px] xl:min-w-[400px]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari program studi..."
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
                            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                                <span className="flex items-center gap-2 mb-2 md:mb-0">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        Menampilkan program studi jenjang
                                        <span className="font-semibold text-gray-900 rounded-md px-1">{activeTab}</span>
                                    </span>
                                </span>
                                <span className="font-semibold text-blue-600">
                                    {filteredPrograms.length} Program Tersedia
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Program List dengan design yang lebih menarik */}
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                            <p className="text-gray-600 mt-4 text-lg">Memuat data program studi...</p>
                        </div>
                    ) : filteredPrograms.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-xl shadow-lg border p-12 max-w-lg mx-auto">
                                <div className="text-gray-400 mb-6">
                                    <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {searchQuery ? 'Tidak ditemukan' : 'Tidak ada data'}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {searchQuery
                                        ? `Tidak ada program studi yang cocok dengan pencarian "${searchQuery}"`
                                        : `Belum ada program studi untuk jenjang ${activeTab}`
                                    }
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                                    >
                                        Hapus pencarian
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {filteredPrograms.map((program, index) => (
                                <div
                                    key={program.id}
                                    className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 p-6 group transform hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {program.level}
                                                </div>
                                                <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                                <span className="text-gray-500 text-sm">{program.faculty}</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                                                {program.name.toUpperCase()}
                                            </h3>

                                            <div className="flex items-center gap-2 mb-4">
                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-green-600 font-semibold">
                                                    Tersedia 5 Jalur Pendaftaran
                                                </span>
                                            </div>

                                            {program.description && (
                                                <p className="text-gray-600 leading-relaxed line-clamp-2">
                                                    {program.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() => handleProgramDetail(program.id)}
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                Lihat Detail
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProgramStudiPage;
