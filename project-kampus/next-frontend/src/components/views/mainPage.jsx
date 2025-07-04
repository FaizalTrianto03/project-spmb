// src/components/ui/mainPage.jsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const MainPage = () => {
    const router = useRouter();
    const programStudiRef = useRef(null);

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
     * Auto scroll ke section program studi dengan offset yang tepat
     */
    const scrollToProgramStudi = () => {
        if (programStudiRef.current) {
            const yOffset = -100; // Offset untuk header sticky
            const element = programStudiRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

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

    /**
     * Handle tab change dengan scroll yang lebih smooth
     */
    const handleTabChange = (level) => {
        setActiveTab(level);
        setShowMore(false);
        // Delay untuk memastikan content sudah ter-render
        setTimeout(() => {
            scrollToProgramStudi();
        }, 150);
    };

    /**
     * Handle pilih program dari card dengan scroll yang tepat
     */
    const handleSelectProgram = (level) => {
        setSelectedLevel(level);
        setActiveTab(level);
        // Delay lebih lama untuk transisi yang smooth
        setTimeout(() => {
            scrollToProgramStudi();
        }, 200);
    };

    const displayedPrograms = showMore ? filteredPrograms : filteredPrograms.slice(0, 8);
    const hasMorePrograms = filteredPrograms.length > 8;

    return (
        <div id="portal-pendaftaran" className="bg-white">
            {/* Hero Section - Form dengan Custom Dropdown Arrow */}
            <section className="pt-16 pb-20 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 lg:p-12">
                            <div className="text-center mb-12">
                                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
                                    Cari Program Anda
                                </h2>
                                <p className="text-xl text-blue-600 leading-relaxed">
                                    Temukan jalur pendaftaran yang tepat untuk masa depan cemerlang
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                                <div>
                                    <label className="block text-blue-900 font-semibold mb-3 text-base">
                                        Jenjang Pendidikan
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="w-full px-6 py-5 pr-12 border-2 border-blue-200 rounded-xl text-blue-900 font-medium focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-white hover:border-blue-300 text-base shadow-sm appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: 'none'
                                            }}
                                        >
                                            <option value="">-- Pilih Jenjang --</option>
                                            <option value="D3">D3 - Diploma 3</option>
                                            <option value="S1">S1 - Strata 1</option>
                                            <option value="PROFESI">Profesi</option>
                                        </select>
                                        {/* Custom Arrow */}
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-blue-900 font-semibold mb-3 text-base">
                                        Program Studi
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedProgram}
                                            onChange={(e) => setSelectedProgram(e.target.value)}
                                            className="w-full px-6 py-5 pr-12 border-2 border-blue-200 rounded-xl text-blue-900 font-medium focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-blue-50 disabled:text-blue-400 transition-all bg-white hover:border-blue-300 text-base shadow-sm appearance-none cursor-pointer disabled:cursor-not-allowed"
                                            disabled={!selectedLevel}
                                            style={{
                                                backgroundImage: 'none'
                                            }}
                                        >
                                            <option value="">-- Pilih Program Studi --</option>
                                            {filteredDropdownPrograms.map(program => (
                                                <option key={program.id} value={program.code}>
                                                    {program.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* Custom Arrow */}
                                        <div className={`absolute inset-y-0 right-4 flex items-center pointer-events-none ${!selectedLevel ? 'text-blue-300' : 'text-blue-400'}`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-blue-900 font-semibold mb-3 text-base">
                                        Sistem Kuliah
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedSystem}
                                            onChange={(e) => setSelectedSystem(e.target.value)}
                                            className="w-full px-6 py-5 pr-12 border-2 border-blue-200 rounded-xl text-blue-900 font-medium focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-white hover:border-blue-300 text-base shadow-sm appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: 'none'
                                            }}
                                        >
                                            <option value="">-- Pilih Sistem Kuliah --</option>
                                            <option value="reguler">Reguler</option>
                                            <option value="reguler_transfer">Reguler Transfer</option>
                                        </select>
                                        {/* Custom Arrow */}
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-6 rounded-xl text-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5 -ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Cari Jalur Pendaftaran
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Education Levels - Spacing yang Lebih Konsisten */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
                            Jenjang Pendidikan
                        </h2>
                        <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
                            Universitas Muhammadiyah Manado menawarkan berbagai jenjang pendidikan yang disesuaikan dengan kebutuhan industri dan perkembangan zaman
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Card 1: Diploma & Sarjana */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 flex flex-col group">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-blue-900 mb-4">
                                    Program Diploma & Sarjana
                                </h3>
                                <p className="text-blue-600 font-semibold text-lg mb-4">
                                    Pendidikan Tinggi - Jenjang D3 & S1
                                </p>
                            </div>

                            <div className="flex-grow">
                                <p className="text-blue-800 text-lg leading-relaxed mb-8">
                                    UNIMMAN menyediakan pendidikan berkualitas tinggi dengan kurikulum modern yang mengintegrasikan teori dan praktik untuk mempersiapkan lulusan yang kompeten dan siap kerja.
                                </p>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600 mb-1">D3</div>
                                                <div className="text-blue-800 font-medium">Diploma 3</div>
                                            </div>
                                            <div className="text-blue-600 font-bold text-lg">3 Tahun</div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600 mb-1">S1</div>
                                                <div className="text-blue-800 font-medium">Sarjana</div>
                                            </div>
                                            <div className="text-blue-600 font-bold text-lg">4 Tahun</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleSelectProgram('S1')}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] mt-auto shadow-lg"
                            >
                                Lihat Program Studi
                            </button>
                        </div>

                        {/* Card 2: Program Profesi */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 flex flex-col group">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-blue-900 mb-4">
                                    Program Profesi
                                </h3>
                                <p className="text-blue-600 font-semibold text-lg mb-4">
                                    Pendidikan Lanjutan - Spesialisasi Profesi
                                </p>
                            </div>

                            <div className="flex-grow">
                                <p className="text-blue-800 text-lg leading-relaxed mb-8">
                                    Program profesi dirancang untuk menghasilkan tenaga profesional yang kompeten dengan praktik intensif dan bimbingan praktisi berpengalaman di fasilitas modern.
                                </p>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600 mb-1">PROFESI</div>
                                                <div className="text-blue-800 font-medium">Program Profesi</div>
                                            </div>
                                            <div className="text-blue-600 font-bold text-lg">1-2 Tahun</div>
                                        </div>
                                    </div>
                                    {/* Spacer untuk menyamakan tinggi dengan card sebelah */}
                                    <div className="p-6 bg-transparent rounded-xl">
                                        <div className="flex items-center justify-between opacity-0">
                                            <div>
                                                <div className="text-2xl font-bold mb-1">-</div>
                                                <div className="font-medium">-</div>
                                            </div>
                                            <div className="font-bold text-lg">-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleSelectProgram('PROFESI')}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] mt-auto shadow-lg"
                            >
                                Lihat Program Profesi
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Studi - Scroll Target dengan Padding yang Tepat */}
            <section ref={programStudiRef} className="pt-24 pb-20 bg-white scroll-mt-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
                            Program Studi Unggulan
                        </h2>
                        <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
                            Temukan program studi yang sesuai dengan passion dan tujuan karir Anda
                        </p>
                    </div>

                    {/* Dengan margin tambahan */}
                    <div className="flex justify-center mb-16">
                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded-2xl inline-flex shadow-lg border border-blue-200">
                            {['D3', 'S1', 'PROFESI'].map((level, index) => (
                                <button
                                    key={level}
                                    onClick={() => handleTabChange(level)}
                                    className={`px-10 py-4 font-bold rounded-xl transition-all text-base min-w-[100px] ${index > 0 ? 'ml-2' : ''
                                        } ${activeTab === level
                                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                            : 'text-blue-600 hover:bg-blue-200 hover:scale-102'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Program Cards - Grid yang Lebih Responsif */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-blue-700 text-xl font-medium">Memuat program studi...</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                                {displayedPrograms.map((program, index) => (
                                    <div
                                        key={program.id}
                                        className="bg-white rounded-2xl shadow-lg border border-blue-100 hover:border-blue-600 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 h-full group"
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div className="p-6 h-full flex flex-col">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
                                                    {program.level}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-blue-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                                                {program.name}
                                            </h3>

                                            <p className="text-blue-700 mb-6 leading-relaxed flex-grow text-sm">
                                                Program terakreditasi dengan fasilitas modern dan prospek karir cemerlang di industri terkini.
                                            </p>

                                            <button
                                                onClick={() => handleProgramDetail(program.id)}
                                                className="w-full bg-blue-50 text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all mt-auto transform hover:scale-105 shadow-md"
                                            >
                                                Lihat Detail
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {hasMorePrograms && (
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowMore(!showMore)}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-12 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] shadow-lg"
                                    >
                                        {showMore ? 'Tampilkan Lebih Sedikit' : `Lihat ${filteredPrograms.length - 8} Program Lainnya`}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section - Layout yang Lebih Seimbang */}
            <section className="bg-blue-700 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] relative z-10">
                    {/* Left Content - Siap Bergabung */}
                    <div className="py-12 px-6 lg:px-16 xl:px-20 text-white flex items-center">
                        <div className="w-full ml-4 lg:ml-8">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                                Siap Bergabung dengan UNIMMAN?
                            </h2>
                            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                                Ribuan mahasiswa telah memilih UNIMMAN sebagai tempat meraih cita-cita.
                                Sekarang giliran Anda untuk menjadi bagian dari keluarga besar kami.
                            </p>

                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="text-3xl font-bold mb-2">95%</div>
                                    <div className="text-blue-100 text-sm">Tingkat Kelulusan</div>
                                </div>
                                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="text-3xl font-bold mb-2">85%</div>
                                    <div className="text-blue-100 text-sm">Langsung Bekerja</div>
                                </div>
                                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="text-3xl font-bold mb-2">A</div>
                                    <div className="text-blue-100 text-sm">Akreditasi</div>
                                </div>
                            </div>

                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                                <p className="text-blue-100 text-base">
                                    Atau hubungi kami di <strong className="text-white">(0431) 123-4567</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Foto UNIMMAN */}
                    <div className="relative overflow-hidden">
                        {/* Foto mepet container tanpa overlay */}
                        <img
                            src="/assets/mahasiswa pmb.png"
                            alt="Mahasiswa UNIMMAN"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default MainPage;
