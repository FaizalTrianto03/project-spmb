// src/app/jalur-pendaftaran/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const JalurPendaftaranPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    /**
     * State management untuk data dan filter
     */
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [admissionPaths, setAdmissionPaths] = useState([]);
    const [filteredPaths, setFilteredPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedSystem, setSelectedSystem] = useState('');
    const [filteredDropdownPrograms, setFilteredDropdownPrograms] = useState([]);
    const [showInstructions, setShowInstructions] = useState(false);
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
                setAdmissionPaths(data.dummy_data.admission_paths || []);
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    /**
     * Handle URL parameters dari main page
     */
    useEffect(() => {
        const level = searchParams.get('level');
        const program = searchParams.get('program');
        const system = searchParams.get('system');

        if (level) setSelectedLevel(level);
        if (program) setSelectedProgram(program);
        if (system) setSelectedSystem(system);
    }, [searchParams]);

    /**
     * Filter programs untuk dropdown
     */
    useEffect(() => {
        if (selectedLevel) {
            const filtered = studyPrograms.filter(program =>
                program.level === selectedLevel && program.is_active
            );
            setFilteredDropdownPrograms(filtered);
        } else {
            setFilteredDropdownPrograms([]);
        }
    }, [selectedLevel, studyPrograms]);

    /**
     * Reset program ketika level berubah
     */
    useEffect(() => {
        setSelectedProgram('');
    }, [selectedLevel]);

    /**
     * Filter jalur pendaftaran berdasarkan kriteria
     */
    useEffect(() => {
        let filtered = admissionPaths.filter(path => path.is_active);

        // Filter berdasarkan sistem kuliah
        if (selectedSystem) {
            filtered = filtered.filter(path =>
                path.study_system.toLowerCase().includes(selectedSystem.toLowerCase())
            );
        }

        // Filter berdasarkan search query
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase().trim();
            if (searchLower) {
                filtered = filtered.filter(path => {
                    const searchableContent = [
                        path.name,
                        path.wave,
                        path.study_system,
                        path.description
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

        setFilteredPaths(filtered);
    }, [selectedLevel, selectedProgram, selectedSystem, searchQuery, admissionPaths]);

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
     * Handle form submission
     */
    const handleSearch = () => {
        console.log('Search params:', {
            level: selectedLevel,
            program: selectedProgram,
            system: selectedSystem,
            query: searchQuery
        });
    };

    /**
     * Handle pendaftaran
     */
    const handleRegister = (pathId) => {
        router.push(`/jalur-pendaftaran/${pathId}`);
    };

    /**
     * Format tanggal
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    /**
     * Format biaya
     */
    const formatCurrency = (amount) => {
        if (amount === 0) return 'Gratis';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
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
                            <span className="text-gray-900 font-medium">Jalur Pendaftaran</span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            Jalur Pendaftaran Mahasiswa Baru
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Temukan jalur pendaftaran yang tepat sesuai dengan pilihan program studi dan sistem kuliah yang Anda inginkan
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content - Background putih bersih */}
            <main className="py-8 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    {/* Filter Section */}
                    <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
                        <div className="flex flex-col space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    Filter Jalur Pendaftaran
                                </h2>
                                <p className="text-gray-600">
                                    Pilih kriteria untuk menemukan jalur pendaftaran yang sesuai
                                </p>
                            </div>

                            {/* Filter Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Jenjang Pendidikan */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Jenjang Pendidikan
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white focus:bg-white appearance-none"
                                        >
                                            <option value="">Pilih Jenjang</option>
                                            <option value="D3">D3 - Diploma 3</option>
                                            <option value="S1">S1 - Strata 1</option>
                                            <option value="PROFESI">Profesi</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Program Studi */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Program Studi
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedProgram}
                                            onChange={(e) => setSelectedProgram(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white focus:bg-white disabled:bg-gray-100 disabled:text-gray-400 appearance-none"
                                            disabled={!selectedLevel}
                                        >
                                            <option value="">Pilih Program Studi</option>
                                            {filteredDropdownPrograms.map(program => (
                                                <option key={program.id} value={program.code}>
                                                    {program.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Sistem Kuliah */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sistem Kuliah
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedSystem}
                                            onChange={(e) => setSelectedSystem(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white focus:bg-white appearance-none"
                                        >
                                            <option value="">Pilih Sistem Kuliah</option>
                                            <option value="reguler">Reguler</option>
                                            <option value="reguler_transfer">Reguler Transfer</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Box */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Cari Jalur
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Cari jalur pendaftaran..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white focus:bg-white"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={clearSearch}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Info Bar */}
                            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Menampilkan jalur pendaftaran yang tersedia
                                </span>
                                <span className="font-semibold text-blue-600">
                                    {filteredPaths.length} Jalur Tersedia
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Section */}
                    <div className="bg-white rounded-xl shadow-lg border mb-8 overflow-hidden">
                        <button
                            onClick={() => setShowInstructions(!showInstructions)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Tata Cara Pendaftaran Mahasiswa Baru
                                </h3>
                            </div>
                            <svg
                                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showInstructions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-6 pb-6 border-t border-gray-100">
                                <div className="space-y-4 pt-6">
                                    {[
                                        "Pilih Jalur Pendaftaran - Tentukan jalur masuk sesuai pilihan dan ketentuan kampus.",
                                        "Isi Formulir Pendaftaran - Lengkapi data diri pada formulir secara benar.",
                                        "Bayar Biaya Pendaftaran - Lakukan pembayaran sesuai petunjuk yang tersedia.",
                                        "Unggah Berkas & Ikuti Seleksi - Kirim dokumen dan ikuti tahapan seleksi sesuai jadwal."
                                    ].map((step, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {loading ? (
                        <div className="text-center py-16 bg-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                            <p className="text-gray-600 mt-4 text-lg">Memuat data jalur pendaftaran...</p>
                        </div>
                    ) : filteredPaths.length === 0 ? (
                        <div className="text-center py-16 bg-white">
                            <div className="bg-white rounded-xl shadow-lg border p-12 max-w-lg mx-auto">
                                <div className="text-gray-400 mb-6">
                                    <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Jalur pendaftaran tidak ditemukan
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {searchQuery
                                        ? `Tidak ada jalur pendaftaran yang cocok dengan pencarian "${searchQuery}"`
                                        : 'Silakan ubah kriteria pencarian atau pilih filter lain'
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
                        <div className="grid gap-6 bg-white">
                            {filteredPaths.map((path, index) => (
                                <div
                                    key={path.id}
                                    className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 p-6 group transform hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {path.wave}
                                                </div>
                                                <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                                <span className="text-green-600 text-sm font-medium">Pendaftaran Aktif</span>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                                                {path.name}
                                            </h3>
                                            
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>Sistem Kuliah: <strong className="text-gray-900">{path.study_system}</strong></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Biaya Pendaftaran: <strong className={`${path.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                                        {formatCurrency(path.registration_fee)}
                                                    </strong></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>Periode: <strong className="text-gray-900">
                                                        {formatDate(path.start_date)} - {formatDate(path.end_date)}
                                                    </strong></span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() => handleRegister(path.id)}
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                Daftar Sekarang
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

export default JalurPendaftaranPage;
