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
        console.log('Search params:', {
            level: selectedLevel,
            program: selectedProgram,
            system: selectedSystem
        });
        // TODO: Implement search logic with router.push
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

    const displayedPrograms = showMore ? filteredPrograms : filteredPrograms.slice(0, 5);
    const hasMorePrograms = filteredPrograms.length > 5;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <section className="relative h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/banner1.jpg"
                        alt="PMB UNIMMAN Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/45"></div>
                </div>

                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                        <div className="max-w-xl lg:max-w-2xl text-white animate-fade-in">
                            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-3 leading-tight">
                                Portal Pendaftaran Mahasiswa Baru
                            </h1>
                            <p className="text-xs sm:text-sm lg:text-sm xl:text-base leading-relaxed">
                                Cari tau informasi program studi, biaya kuliah, dan informasi pendaftaran di
                                <br className="hidden sm:block" />
                                <span className="font-semibold">Universitas Muhammadiyah Manado</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Form */}
            <div className="relative z-40 -mt-12 lg:-mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto border transform transition-all duration-300 hover:shadow-md">
                        <div className="text-center mb-3 lg:mb-4">
                            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1">
                                Cari Jalur Pendaftaran
                            </h2>
                            <p className="text-xs lg:text-sm text-gray-600">
                                Temukan jalur pendaftaran sesuai dengan pilihan program studi yang diminati.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-3 mb-3 lg:mb-4">
                            <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="w-full px-2 lg:px-3 py-2 text-xs lg:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a81ca] focus:border-transparent transition-all duration-200 text-gray-800 bg-white appearance-none bg-no-repeat bg-right pr-8"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundSize: '1rem 1rem'
                                    }}
                                >
                                    <option value="" className="text-gray-500">-- Pilih Jenjang --</option>
                                    <option value="PROFESI" className="text-gray-800">Prof - Profesi</option>
                                    <option value="S1" className="text-gray-800">S1 - Strata 1</option>
                                    <option value="D3" className="text-gray-800">D3 - Diploma 3</option>
                                </select>
                            </div>

                            <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                <select
                                    value={selectedProgram}
                                    onChange={(e) => setSelectedProgram(e.target.value)}
                                    className="w-full px-2 lg:px-3 py-2 text-xs lg:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a81ca] focus:border-transparent transition-all duration-200 text-gray-800 bg-white disabled:bg-gray-100 disabled:text-gray-500 appearance-none bg-no-repeat bg-right pr-8"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundSize: '1rem 1rem'
                                    }}
                                    disabled={!selectedLevel}
                                >
                                    <option value="" className="text-gray-500">-- Pilih Program Studi --</option>
                                    {filteredDropdownPrograms.map(program => (
                                        <option key={program.id} value={program.code} className="text-gray-800">
                                            {program.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                <select
                                    value={selectedSystem}
                                    onChange={(e) => setSelectedSystem(e.target.value)}
                                    className="w-full px-2 lg:px-3 py-2 text-xs lg:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a81ca] focus:border-transparent transition-all duration-200 text-gray-800 bg-white appearance-none bg-no-repeat bg-right pr-8"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundSize: '1rem 1rem'
                                    }}
                                >
                                    <option value="" className="text-gray-500">-- Pilih Sistem Kuliah --</option>
                                    <option value="reguler" className="text-gray-800">Reguler</option>
                                    <option value="reguler_transfer" className="text-gray-800">Reguler Transfer</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleSearch}
                                className="bg-[#1a81ca] text-white font-semibold px-6 lg:px-8 py-2.5 lg:py-3 text-sm rounded-md hover:bg-[#1565a0] transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Cari Jalur Pendaftaran
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="pt-8 lg:pt-12 pb-8 lg:pb-12 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

                        {/* Left Column - Informasi Program Studi */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4 transform transition-all duration-300 hover:shadow-md">
                                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">
                                    Informasi Program Studi
                                </h2>

                                {/* Tabs */}
                                <div className="flex flex-wrap gap-1 mb-3 lg:mb-4">
                                    <button
                                        onClick={() => { setActiveTab('D3'); setShowMore(false); }}
                                        className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${activeTab === 'D3'
                                            ? 'bg-[#1a81ca] text-white shadow-sm'
                                            : 'border border-[#1a81ca] bg-white text-[#1a81ca] hover:bg-[#1a81ca] hover:text-white'
                                            }`}
                                    >
                                        D3 - Diploma 3
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('S1'); setShowMore(false); }}
                                        className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${activeTab === 'S1'
                                            ? 'bg-[#1a81ca] text-white shadow-sm'
                                            : 'border border-[#1a81ca] bg-white text-[#1a81ca] hover:bg-[#1a81ca] hover:text-white'
                                            }`}
                                    >
                                        S1 - Strata 1
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('PROFESI'); setShowMore(false); }}
                                        className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${activeTab === 'PROFESI'
                                            ? 'bg-[#1a81ca] text-white shadow-sm'
                                            : 'border border-[#1a81ca] bg-white text-[#1a81ca] hover:bg-[#1a81ca] hover:text-white'
                                            }`}
                                    >
                                        Prof - Profesi
                                    </button>
                                </div>

                                {/* Program List */}
                                {loading ? (
                                    <div className="text-center py-4 lg:py-6">
                                        <div className="animate-spin rounded-full h-6 lg:h-8 w-6 lg:w-8 border-b-2 border-[#1a81ca] mx-auto"></div>
                                        <p className="text-gray-600 mt-2 lg:mt-3 text-xs lg:text-sm">Memuat data program studi...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2 lg:space-y-3">
                                        {displayedPrograms.map((program, index) => (
                                            <div 
                                                key={program.id} 
                                                className="border border-gray-200 rounded-md p-2 lg:p-3 transform transition-all duration-300 hover:shadow-sm hover:border-gray-300 hover:scale-[1.01]"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    animation: 'fade-in-up 0.5s ease-out forwards'
                                                }}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800 mb-1 text-xs lg:text-sm">
                                                            {program.level} - PROGRAM STUDI {program.level} {program.name.toUpperCase()}
                                                        </h3>
                                                        <p className="text-[10px] lg:text-xs text-gray-600 mb-1">
                                                            Tersedia 5 Jalur Pendaftaran
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleProgramDetail(program.id)}
                                                        className="border border-[#1a81ca] bg-white text-[#1a81ca] font-semibold px-3 lg:px-4 py-1.5 lg:py-2 rounded-md hover:bg-[#1a81ca] hover:text-white transition-all duration-300 text-xs lg:text-sm self-start transform hover:scale-[1.02] active:scale-[0.98]"
                                                    >
                                                        Lihat Detail
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Show More/Less Button */}
                                        {hasMorePrograms && (
                                            <div className="text-center pt-3">
                                                <button
                                                    onClick={() => setShowMore(!showMore)}
                                                    className="border border-[#1a81ca] bg-white text-[#1a81ca] font-semibold px-4 lg:px-6 py-2 lg:py-2.5 rounded-md hover:bg-[#1a81ca] hover:text-white transition-all duration-300 text-sm transform hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    {showMore ? 'Tampilkan Lebih Sedikit' : `Lihat ${filteredPrograms.length - 5} Program Lainnya`}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3 lg:space-y-4">

                            {/* Brosur dan Informasi Biaya */}
                            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
                                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                                    Brosur dan Informasi Biaya
                                </h3>
                                <p className="text-gray-600 mb-3 text-xs lg:text-sm">
                                    Brosur dan rincian biaya selama kuliah di Universitas Muhammadiyah Manado
                                </p>
                                <button 
                                    onClick={handleBrosurDetail}
                                    className="border border-[#1a81ca] bg-white text-[#1a81ca] font-semibold px-3 lg:px-4 py-1.5 lg:py-2 rounded-md hover:bg-[#1a81ca] hover:text-white transition-all duration-300 text-xs lg:text-sm transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Lihat Detail
                                </button>
                            </div>

                            {/* Tata Cara Pendaftaran */}
                            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
                                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">
                                    Tata Cara Pendaftaran Mahasiswa Baru
                                </h3>
                                <div className="space-y-2 lg:space-y-3">
                                    {[
                                        {
                                            title: "Pilih Jalur Pendaftaran",
                                            desc: "Tentukan jalur masuk sesuai pilihan dan ketentuan kampus."
                                        },
                                        {
                                            title: "Isi Formulir Pendaftaran", 
                                            desc: "Lengkapi data diri pada formulir secara benar."
                                        },
                                        {
                                            title: "Bayar Biaya Pendaftaran",
                                            desc: "Lakukan pembayaran sesuai petunjuk yang tersedia."
                                        },
                                        {
                                            title: "Unggah Berkas & Ikuti Seleksi",
                                            desc: "Kirim dokumen dan ikuti tahapan seleksi sesuai jadwal."
                                        }
                                    ].map((step, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-start space-x-2 transform transition-all duration-300 hover:translate-x-1"
                                            style={{
                                                animationDelay: `${index * 150}ms`,
                                                animation: 'fade-in-left 0.6s ease-out forwards'
                                            }}
                                        >
                                            <div className="w-4 h-4 lg:w-5 lg:h-5 bg-[#1a81ca] text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transform transition-all duration-300 hover:scale-110">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800 text-xs lg:text-sm">{step.title}</h4>
                                                <p className="text-[10px] lg:text-xs text-gray-600">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Custom CSS untuk animasi */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
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

                @keyframes fade-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MainPage;
