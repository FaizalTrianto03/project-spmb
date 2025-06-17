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
     * Filter programs untuk dropdown (sama seperti di main page)
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
     * Reset program ketika level berubah (sama seperti di main page)
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

        setFilteredPaths(filtered);
    }, [selectedLevel, selectedProgram, selectedSystem, admissionPaths]);

    /**
     * Handle form submission
     */
    const handleSearch = () => {
        console.log('Search params:', {
            level: selectedLevel,
            program: selectedProgram,
            system: selectedSystem
        });
    };

    /**
     * Handle pendaftaran
     */
    const handleRegister = (pathId) => {
        router.push(`/pendaftaran/${pathId}`);
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
                                Jalur Pendaftaran
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
                                Jalur Pendaftaran
                            </h1>
                            <p className="text-sm lg:text-base text-gray-600">
                                Temukan jalur pendaftaran sesuai dengan pilihan program studi yang diminati.
                            </p>
                        </div>

                        {/* Search Form - Konsisten dengan main page */}
                        <div className="mb-6 lg:mb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Jenjang Pendidikan
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a81ca] focus:border-[#1a81ca] transition-all duration-200 text-gray-800 bg-white font-medium appearance-none"
                                        >
                                            <option value="">Pilih Jenjang</option>
                                            <option value="D3">D3 - Diploma 3</option>
                                            <option value="S1">S1 - Strata 1</option>
                                            <option value="PROFESI">Profesi</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Program Studi
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedProgram}
                                            onChange={(e) => setSelectedProgram(e.target.value)}
                                            className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a81ca] focus:border-[#1a81ca] transition-all duration-200 text-gray-800 bg-white disabled:bg-gray-100 disabled:text-gray-500 font-medium appearance-none"
                                            disabled={!selectedLevel}
                                        >
                                            <option value="">Pilih Program Studi</option>
                                            {filteredDropdownPrograms.map(program => (
                                                <option key={program.id} value={program.code}>
                                                    {program.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sistem Kuliah
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedSystem}
                                            onChange={(e) => setSelectedSystem(e.target.value)}
                                            className="w-full px-4 py-3 pr-10 text-sm border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a81ca] focus:border-[#1a81ca] transition-all duration-200 text-gray-800 bg-white font-medium appearance-none"
                                        >
                                            <option value="">Pilih Sistem Kuliah</option>
                                            <option value="reguler">Reguler</option>
                                            <option value="reguler_transfer">Reguler Transfer</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleSearch}
                                    className="bg-[#1a81ca] text-white font-bold px-8 lg:px-12 py-4 text-base lg:text-lg rounded-xl hover:bg-[#1565a0] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                                >
                                    Cari Jalur Pendaftaran
                                </button>
                            </div>
                        </div>

                        {/* Dropdown Tata Cara Pendaftaran - Konsisten dengan style card */}
                        <div className="mb-6 lg:mb-8 bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#1a81ca] transition-all duration-300">
                            <button
                                onClick={() => setShowInstructions(!showInstructions)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                            >
                                <h3 className="text-lg font-bold text-gray-900">
                                    Tata Cara Pendaftaran Mahasiswa Baru
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showInstructions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-6 pb-6 border-t border-gray-200">
                                    <div className="space-y-4 pt-6">
                                        {[
                                            "Pilih Jalur Pendaftaran - Tentukan jalur masuk sesuai pilihan dan ketentuan kampus.",
                                            "Isi Formulir Pendaftaran - Lengkapi data diri pada formulir secara benar.",
                                            "Bayar Biaya Pendaftaran - Lakukan pembayaran sesuai petunjuk yang tersedia.",
                                            "Unggah Berkas & Ikuti Seleksi - Kirim dokumen dan ikuti tahapan seleksi sesuai jadwal."
                                        ].map((step, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-[#1a81ca] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        {loading ? (
                            <div className="text-center py-8 lg:py-12">
                                <div className="animate-spin rounded-full h-8 lg:h-10 w-8 lg:w-10 border-b-2 border-[#1a81ca] mx-auto"></div>
                                <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">Memuat data jalur pendaftaran...</p>
                            </div>
                        ) : filteredPaths.length === 0 ? (
                            <div className="text-center py-8 sm:py-12 lg:py-16">
                                <div className="text-gray-400 mb-4">
                                    <svg className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-2">
                                    Jalur pendaftaran tidak ditemukan
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base px-4 mb-4">
                                    Silakan ubah kriteria pencarian atau pilih program studi lain
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredPaths.map((path, index) => (
                                    <div
                                        key={path.id}
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
                                                        {path.wave}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 leading-tight">
                                                    {path.name}
                                                </h3>

                                                <div className="space-y-2 text-sm lg:text-base">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-500">Sistem Kuliah:</span>
                                                        <span className="font-medium text-gray-900">{path.study_system}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-500">Biaya Pendaftaran:</span>
                                                        <span className={`font-semibold ${path.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                                            {formatCurrency(path.registration_fee)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-500">Periode:</span>
                                                        <span className="font-medium text-gray-900">
                                                            {formatDate(path.start_date)} - {formatDate(path.end_date)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-shrink-0">
                                                <button
                                                    onClick={() => handleRegister(path.id)}
                                                    className="bg-gray-50 text-[#1a81ca] font-semibold px-6 py-3 rounded-lg hover:bg-[#1a81ca] hover:text-white transition-all duration-300 border-2 border-transparent hover:border-[#1a81ca] text-sm lg:text-base"
                                                >
                                                    Daftar Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Results Count */}
                                <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 text-center">
                                        Menampilkan {filteredPaths.length} jalur pendaftaran
                                    </p>
                                </div>
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

export default JalurPendaftaranPage;
