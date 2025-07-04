// src/app/jalur-pendaftaran/[slug]/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const PendaftaranDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const { slug } = params;

    /**
     * State management
     */
    const [pathData, setPathData] = useState(null);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [showRequirements, setShowRequirements] = useState(false);
    const [showCapacity, setShowCapacity] = useState(false);

    /**
     * Load data dari JSON file
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/realDummyData.json');
                const data = await response.json();
                
                // Find path by ID (slug)
                const admissionPath = data.dummy_data.admission_paths.find(
                    path => path.id.toString() === slug
                );
                
                if (admissionPath) {
                    setPathData(admissionPath);
                    
                    // Filter study programs berdasarkan jalur pendaftaran
                    const availablePrograms = data.dummy_data.study_programs.filter(
                        program => program.is_active
                    );
                    setStudyPrograms(availablePrograms);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        if (slug) {
            loadData();
        }
    }, [slug]);

    /**
     * Handle lanjutkan mendaftar
     */
    const handleContinueRegistration = () => {
        if (!selectedProgram) {
            alert('Silakan pilih program studi terlebih dahulu');
            return;
        }
        
        // Redirect ke form pendaftaran dengan parameter
        router.push(`/jalur-pendaftaran/${slug}/form?program=${selectedProgram}`);
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

    /**
     * Get programs by level
     */
    const getProgramsByLevel = (level) => {
        return studyPrograms.filter(program => program.level === level);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                    <p className="text-gray-600 mt-6 text-xl font-medium">Memuat data pendaftaran...</p>
                </div>
            </div>
        );
    }

    if (!pathData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-gray-400 mb-6">
                        <svg className="h-24 w-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Jalur pendaftaran tidak ditemukan
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Jalur pendaftaran yang Anda cari tidak tersedia atau sudah tidak aktif.
                    </p>
                    <button
                        onClick={() => router.push('/jalur-pendaftaran')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-bold"
                    >
                        Kembali ke Jalur Pendaftaran
                    </button>
                </div>
            </div>
        );
    }

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
                            <button
                                onClick={() => router.push('/jalur-pendaftaran')}
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                Jalur Pendaftaran
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">
                                {pathData.name}
                            </span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm">
                                {pathData.wave}
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            {pathData.name}
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Detail Jalur Pendaftaran
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="py-8 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    {/* Path Details */}
                    <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Periode</span>
                                </div>
                                <p className="text-gray-900 font-bold text-lg">{pathData.academic_year}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Sistem Kuliah</span>
                                </div>
                                <p className="text-gray-900 font-bold text-lg">{pathData.study_system}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Masa Pendaftaran</span>
                                </div>
                                <p className="text-gray-900 font-bold text-lg">
                                    {formatDate(pathData.start_date)} - {formatDate(pathData.end_date)}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Gelombang</span>
                                </div>
                                <p className="text-gray-900 font-bold text-lg">{pathData.wave}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Jenjang</span>
                                </div>
                                <p className="text-gray-900 font-bold text-lg">
                                    {['D3', 'S1', 'PROFESI'].map(level => {
                                        const programs = getProgramsByLevel(level);
                                        return programs.length > 0 ? level === 'D3' ? 'DIPLOMA 3' : level === 'S1' ? 'STRATA 1' : 'PROFESI' : null;
                                    }).filter(Boolean).join(', ')}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Biaya Daftar</span>
                                </div>
                                <p className={`font-bold text-xl ${pathData.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                    {formatCurrency(pathData.registration_fee)}
                                </p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-gray-900 font-bold text-sm">
                                            Khusus Peserta Didik Baru Non Transfer (D3/S1/Profesi), Pagi-Sore
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="bg-white rounded-xl shadow-lg border mb-8 overflow-hidden">
                        <button
                            onClick={() => setShowRequirements(!showRequirements)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Persyaratan Administrasi
                                </h3>
                            </div>
                            <svg
                                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${showRequirements ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showRequirements ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-6 pb-6 border-t border-gray-100">
                                <p className="text-gray-600 mb-6 pt-6">
                                    Silakan siapkan beberapa informasi dan dokumen berikut untuk mempercepat proses pendaftaran.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "KTP/SIM/Kartu Pelajar",
                                        "Sertifikat/Syahadah sekurang-kurangnya TM1", 
                                        "Rekomendasi Pimpinan Daerah Muhammadiyah",
                                        "Kartu Tanda Anggota Muhammadiyah Milik Pribadi ataupun Orang Tua"
                                    ].map((requirement, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                                            <p className="text-gray-700 font-medium">{requirement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Capacity Section */}
                    <div className="bg-white rounded-xl shadow-lg border mb-8 overflow-hidden">
                        <button
                            onClick={() => setShowCapacity(!showCapacity)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 rounded-xl">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Daya Tampung
                                </h3>
                            </div>
                            <svg
                                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${showCapacity ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showCapacity ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-6 pb-6 border-t border-gray-100">
                                <div className="pt-6 space-y-8">
                                    {['D3', 'S1', 'PROFESI'].map(level => {
                                        const programs = getProgramsByLevel(level);
                                        if (programs.length === 0) return null;
                                        
                                        const levelName = level === 'D3' ? 'D3 - Diploma 3' : level === 'S1' ? 'S1 - Strata 1' : 'PROFESI - Profesi';
                                        const totalCapacity = programs.reduce((sum, program) => sum + (program.capacity || 0), 0);
                                        
                                        return (
                                            <div key={level}>
                                                <h4 className="text-lg font-bold text-gray-900 mb-4">{levelName}</h4>
                                                <div className="space-y-3">
                                                    {programs.map(program => (
                                                        <div key={program.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                                            <span className="text-gray-700 font-medium">{program.name}</span>
                                                            <span className="text-gray-900 font-bold">
                                                                {program.capacity ? `${program.capacity} Mahasiswa` : 'Belum ada informasi'}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {totalCapacity > 0 && (
                                                    <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-green-700 font-bold">Total</span>
                                                            <span className="text-green-900 font-bold text-lg">{totalCapacity} Mahasiswa</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Selection */}
                    <div className="bg-white rounded-xl shadow-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Pilihan Program Studi
                            </h3>
                            <p className="text-gray-600">
                                Silakan pilih program studi yang kamu minati untuk melanjutkan proses pendaftaran
                            </p>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Program Studi
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedProgram}
                                    onChange={(e) => setSelectedProgram(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white appearance-none"
                                >
                                    <option value="">Pilih Program Studi</option>
                                    {studyPrograms.map(program => (
                                        <option key={program.id} value={program.code}>
                                            {program.level} - {program.name}
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

                        <div className="text-center">
                            <button
                                onClick={handleContinueRegistration}
                                disabled={!selectedProgram}
                                className={`font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto ${
                                    selectedProgram
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Lanjutkan Mendaftar
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            
                            {!selectedProgram && (
                                <p className="text-sm text-gray-500 mt-4">
                                    Silakan pilih program studi terlebih dahulu
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PendaftaranDetailPage;
