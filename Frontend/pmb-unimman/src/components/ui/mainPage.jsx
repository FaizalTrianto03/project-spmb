// src/components/ui/mainPage.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MainPage = () => {
    const router = useRouter();

    /**
     * State management untuk form dan data
     */
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedSystem, setSelectedSystem] = useState('');
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [filteredDropdownPrograms, setFilteredDropdownPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('D3');
    const [showMore, setShowMore] = useState(false);

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
     * Filter programs untuk tab (Informasi Program Studi)
     */
    useEffect(() => {
        if (activeTab) {
            const filtered = studyPrograms.filter(program =>
                program.level === activeTab && program.is_active
            );
            setFilteredPrograms(filtered);
        } else {
            setFilteredPrograms(studyPrograms.filter(program => program.is_active));
        }
    }, [activeTab, studyPrograms]);

    /**
     * Filter programs untuk dropdown (Form Pencarian)
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
     * Reset program studi ketika jenjang berubah
     */
    useEffect(() => {
        setSelectedProgram('');
    }, [selectedLevel]);

    /**
     * Handle form submission untuk pencarian jalur pendaftaran
     */
    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedLevel) params.append('level', selectedLevel);
        if (selectedProgram) params.append('program', selectedProgram);
        if (selectedSystem) params.append('system', selectedSystem);
        router.push(`/jalur-pendaftaran?${params.toString()}`);
    };

    /**
     * Handle navigation untuk detail program studi
     */
    const handleProgramDetail = (programId) => {
        router.push(`/program-studi/${programId}`);
    };

    /**
     * Handle navigation untuk brosur dan informasi biaya
     */
    const handleBrosurDetail = () => {
        router.push('/brosur-biaya');
    };

    const displayedPrograms = showMore ? filteredPrograms : filteredPrograms.slice(0, 6);
    const hasMorePrograms = filteredPrograms.length > 6;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section dengan Banner Background */}
            <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
                {/* Banner Background */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/banner1.jpg"
                        alt="PMB UNIMMAN Banner"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
                </div>
                
                <div className="relative z-10 w-full">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                        {/* Hero Content */}
                        <div className="text-center text-white mb-12 lg:mb-16">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
                                Portal Pendaftaran<br />Mahasiswa Baru
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg xl:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                                Temukan program studi impian Anda dan mulai perjalanan akademik di 
                                <span className="font-semibold"> Universitas Muhammadiyah Manado</span>
                            </p>
                        </div>

                        {/* Search Card */}
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                                        Cari Jalur Pendaftaran Anda
                                    </h2>
                                    <p className="text-sm lg:text-base text-gray-600">
                                        Pilih jenjang, program studi, dan sistem kuliah untuk menemukan jalur pendaftaran yang tepat
                                    </p>
                                </div>

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
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
                        
                        {/* Program Studi - 3 Kolom */}
                        <div className="xl:col-span-3">
                            {/* Header */}
                            <div className="text-center mb-8 lg:mb-12">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                                    Program Studi Tersedia
                                </h2>
                                <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                                    Jelajahi berbagai program studi berkualitas yang tersedia di UNIMMAN
                                </p>
                            </div>

                            {/* Tab Navigation dengan padding yang lebih baik */}
                            <div className="flex justify-center mb-8">
                                <div className="inline-flex bg-gray-100 rounded-xl p-1.5">
                                    {['D3', 'S1', 'PROFESI'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => { setActiveTab(level); setShowMore(false); }}
                                            className={`px-8 lg:px-10 py-3 mx-1 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 ${
                                                activeTab === level
                                                    ? 'bg-[#1a81ca] text-white shadow-md'
                                                    : 'text-gray-600 hover:text-[#1a81ca]'
                                            }`}
                                        >
                                            {level === 'PROFESI' ? 'Profesi' : level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Program List */}
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a81ca] mx-auto"></div>
                                    <p className="text-gray-600 mt-4 text-lg">Memuat program studi...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-8">
                                        {displayedPrograms.map((program) => (
                                            <div
                                                key={program.id}
                                                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#1a81ca] hover:shadow-lg transition-all duration-300"
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
                                                        
                                                        <p className="text-sm lg:text-base text-gray-600">
                                                            Tersedia 5 jalur pendaftaran dengan berbagai keunggulan
                                                        </p>
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

                                    {/* Show More Button */}
                                    {hasMorePrograms && (
                                        <div className="text-center">
                                            <button
                                                onClick={() => setShowMore(!showMore)}
                                                className="bg-white border-2 border-[#1a81ca] text-[#1a81ca] font-semibold px-8 py-3 rounded-xl hover:bg-[#1a81ca] hover:text-white transition-all duration-300"
                                            >
                                                {showMore ? 'Tampilkan Lebih Sedikit' : `Lihat ${filteredPrograms.length - 6} Program Lainnya`}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Sidebar - 1 Kolom */}
                        <div className="xl:col-span-1 space-y-6">
                            
                            {/* Informasi Biaya */}
                            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Informasi Biaya
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    Dapatkan informasi lengkap mengenai biaya pendidikan dan beasiswa yang tersedia
                                </p>
                                <button
                                    onClick={handleBrosurDetail}
                                    className="w-full bg-[#1a81ca] text-white font-semibold py-3 rounded-lg hover:bg-[#1565a0] transition-all duration-300"
                                >
                                    Lihat Rincian Biaya
                                </button>
                            </div>

                            {/* Panduan Pendaftaran */}
                            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Panduan Pendaftaran
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Pilih jalur pendaftaran yang sesuai",
                                        "Lengkapi formulir pendaftaran online",
                                        "Lakukan pembayaran biaya pendaftaran",
                                        "Upload dokumen yang diperlukan",
                                        "Ikuti tahapan seleksi sesuai jadwal"
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
                </div>
            </section>
        </div>
    );
};

export default MainPage;
