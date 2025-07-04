// src/app/program-studi/[slug]/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const ProgramStudiDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const { slug } = params;

    /**
     * State management
     */
    const [program, setProgram] = useState(null);
    const [admissionPaths, setAdmissionPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('tentang');

    /**
     * Load data dari JSON file
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/realDummyData.json');
                const data = await response.json();

                // Find program by ID (slug is actually ID in this case)
                const foundProgram = data.dummy_data.study_programs.find(
                    p => p.id.toString() === slug || p.code === slug
                );

                if (foundProgram) {
                    setProgram(foundProgram);
                    // Filter admission paths that are active
                    setAdmissionPaths(data.dummy_data.admission_paths.filter(path => path.is_active));
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

    /**
     * Get accreditation badge color
     */
    const getAccreditationColor = (accreditation) => {
        switch (accreditation?.toLowerCase()) {
            case 'a': case 'unggul': return 'bg-green-100 text-green-800';
            case 'b': case 'baik sekali': return 'bg-blue-100 text-blue-800';
            case 'c': case 'baik': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                    <p className="text-gray-600 mt-4 text-lg">Memuat detail program studi...</p>
                </div>
            </div>
        );
    }

    if (!program) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-gray-400 mb-6">
                        <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Program Studi Tidak Ditemukan</h3>
                    <p className="text-gray-600 mb-6">Program studi yang Anda cari tidak tersedia atau telah dihapus.</p>
                    <button
                        onClick={() => router.push('/program-studi')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                    >
                        Kembali ke Daftar Program Studi
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
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                Beranda
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <button
                                onClick={() => router.push('/program-studi')}
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                Program Studi
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">{program.name}</span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                                    {program.level}
                                </div>
                                <div className="h-1 w-1 bg-white/50 rounded-full"></div>
                                <span className="text-blue-100">{program.faculty}</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                                PROGRAM STUDI {program.name.toUpperCase()}
                            </h1>
                            <p className="text-blue-100 text-lg max-w-2xl">
                                {program.description || `Program studi ${program.name} di Universitas Muhammadiyah Manado menawarkan pendidikan berkualitas dengan kurikulum yang sesuai dengan kebutuhan industri.`}
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-2">{admissionPaths.length}</div>
                                    <div className="text-blue-100 text-sm">Jalur Pendaftaran</div>
                                    <div className="text-blue-100 text-sm">Tersedia</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="py-8 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
                        <div className="flex bg-gray-100 rounded-xl p-1.5 w-fit gap-2">
                            <button
                                onClick={() => setActiveTab('tentang')}
                                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'tentang'
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                Tentang Prodi
                            </button>
                            <button
                                onClick={() => setActiveTab('jalur')}
                                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'jalur'
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                Jalur Pendaftaran
                            </button>
                        </div>
                    </div>


                    {/* Tab Content */}
                    {activeTab === 'tentang' && (
                        <div className="space-y-8">
                            {/* Program Info Cards */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Akreditasi */}
                                <div className="bg-white rounded-xl shadow-lg border p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Akreditasi</h3>
                                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getAccreditationColor(program.accreditation)}`}>
                                                {program.accreditation || 'Baik Sekali'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Gelar */}
                                <div className="bg-white rounded-xl shadow-lg border p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Gelar Lulusan</h3>
                                            <p className="text-gray-600 font-semibold">{program.degree || `${program.level === 'D3' ? 'A.Md.' : program.level === 'S1' ? 'S.' : 'Prof.'}`}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Website */}
                                <div className="bg-white rounded-xl shadow-lg border p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Website</h3>
                                            <p className="text-gray-600">
                                                {program.website ? (
                                                    <a href={program.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">
                                                        Kunjungi Website
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">Segera Hadir</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi Program */}
                            <div className="bg-white rounded-xl shadow-lg border p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang Program Studi</h2>
                                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                                    <p className="mb-4">
                                        {program.description || `Program Studi ${program.name} di Universitas Muhammadiyah Manado merupakan program pendidikan tinggi yang dirancang untuk menghasilkan lulusan yang kompeten dan profesional di bidang ${program.name.toLowerCase()}.`}
                                    </p>
                                    <p className="mb-4">
                                        Program ini menggabungkan teori dan praktik dengan kurikulum yang selalu disesuaikan dengan perkembangan ilmu pengetahuan dan kebutuhan industri. Didukung oleh tenaga pengajar yang berpengalaman dan fasilitas pembelajaran yang modern.
                                    </p>
                                    <p>
                                        Lulusan program studi ini diharapkan mampu berkontribusi positif dalam pembangunan bangsa dan memiliki daya saing tinggi di era globalisasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'jalur' && (
                        <div className="space-y-6">
                            {/* Header Jalur Pendaftaran */}
                            <div className="bg-white rounded-xl shadow-lg border p-8 text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pilih Jalur Pendaftaran</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Tersedia {admissionPaths.length} jalur pendaftaran untuk Program Studi {program.name}.
                                    Pilih jalur yang sesuai dengan kondisi dan kebutuhan Anda.
                                </p>
                            </div>

                            {/* Jalur Pendaftaran List */}
                            <div className="grid gap-6">
                                {admissionPaths.map((path, index) => (
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

                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                                    {path.name}
                                                </h3>

                                                <p className="text-gray-600 mb-4 leading-relaxed">
                                                    {path.description || `Jalur pendaftaran ${path.name.toLowerCase()} untuk mahasiswa baru Program Studi ${program.name}.`}
                                                </p>

                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        <span>Sistem Kuliah: <strong className="text-gray-900">{path.study_system}</strong></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Biaya Pendaftaran: <strong className={`${path.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                                            {formatCurrency(path.registration_fee)}
                                                        </strong></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 w-full lg:w-auto justify-center"
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

                            {admissionPaths.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="bg-white rounded-xl shadow-lg border p-12 max-w-lg mx-auto">
                                        <div className="text-gray-400 mb-6">
                                            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            Belum Ada Jalur Pendaftaran
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            Jalur pendaftaran untuk program studi ini sedang dalam persiapan. Silakan cek kembali nanti.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProgramStudiDetailPage;
