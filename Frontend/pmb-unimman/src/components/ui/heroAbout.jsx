// src/components/ui/heroAbout.jsx
"use client";

import React, { useState, useEffect } from 'react';

const HeroAbout = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [universityData, setUniversityData] = useState(null);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [counters, setCounters] = useState({
        students: 0,
        programs: 0,
        lecturers: 0,
        years: 0
    });

    // Load data dari JSON file
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/realDummyData.json');
                const data = await response.json();
                setUniversityData(data.dummy_data.universities[0]);
                setStudyPrograms(data.dummy_data.study_programs || []);
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Animated counter effect
    useEffect(() => {
        if (isVisible && currentSlide === 0) {
            const targets = {
                students: 5000,
                programs: studyPrograms.length || 12,
                lecturers: 150,
                years: new Date().getFullYear() - 1982
            };

            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;

            const intervals = Object.keys(targets).map(key => {
                const target = targets[key];
                const increment = target / steps;
                let current = 0;
                let step = 0;

                return setInterval(() => {
                    step++;
                    current = Math.min(Math.ceil(increment * step), target);
                    setCounters(prev => ({ ...prev, [key]: current }));

                    if (step >= steps) {
                        clearInterval(intervals.find(interval => interval === this));
                    }
                }, stepTime);
            });

            return () => intervals.forEach(clearInterval);
        }
    }, [isVisible, currentSlide, studyPrograms.length]);

    // Data slides untuk hero section
    const slides = [
        {
            type: 'overview',
            title: "Universitas Muhammadiyah Manado",
            subtitle: "Perguruan Tinggi Swasta Terkemuka di Sulawesi Utara",
            description: "Universitas Muhammadiyah Manado (UNIMMAN) adalah perguruan tinggi swasta yang berkomitmen menghasilkan lulusan berkualitas, berakhlak mulia, dan siap berkompetisi di era global dengan nilai-nilai Islam yang rahmatan lil alamien."
        },
        {
            type: 'vision',
            title: "Visi & Misi UNIMMAN",
            subtitle: "Menjadi Universitas Unggul Berkarakter Islami",
            description: "Menjadi universitas unggul yang menghasilkan lulusan berkualitas, berkarakter Islami, dan berdaya saing global pada tahun 2030.",
            missions: [
                "Menyelenggarakan pendidikan tinggi yang berkualitas dan berkarakter Islami",
                "Mengembangkan penelitian yang inovatif dan bermanfaat bagi masyarakat",
                "Melaksanakan pengabdian kepada masyarakat yang berkelanjutan",
                "Membangun kerjasama strategis dengan berbagai pihak dalam dan luar negeri"
            ]
        },
        {
            type: 'programs',
            title: "Program Studi Terakreditasi",
            subtitle: "Beragam Pilihan Program Studi Berkualitas",
            description: "UNIMMAN menyelenggarakan berbagai program studi berkualitas dengan akreditasi yang baik dari BAN-PT.",
            faculties: [
                {
                    name: "Fakultas Kesehatan",
                    count: 5,
                    programs: ["Farmasi (D3 & S1)", "Keperawatan (S1)", "Kebidanan (S1)", "Gizi (S1)", "Kesehatan Masyarakat (S1)"]
                },
                {
                    name: "Fakultas Teknik",
                    count: 1,
                    programs: ["Teknik Sipil (S1)"]
                },
                {
                    name: "Program Profesi",
                    count: 3,
                    programs: ["Profesi Apoteker", "Profesi Ners", "Profesi Bidan"]
                }
            ]
        },
        {
            type: 'facilities',
            title: "Fasilitas Kampus",
            subtitle: "Infrastruktur Pendukung Pembelajaran Terbaik",
            description: "Kampus UNIMMAN dilengkapi dengan berbagai fasilitas modern untuk mendukung kegiatan akademik dan pengembangan mahasiswa.",
            facilities: [
                { name: "Kampus Modern", desc: "Berlokasi di jantung kota Manado" },
                { name: "Perpustakaan Digital", desc: "Koleksi lengkap dengan akses online" },
                { name: "Laboratorium Kesehatan", desc: "Berstandar nasional" },
                { name: "Laboratorium Teknik", desc: "Dilengkapi peralatan modern" },
                { name: "Klinik Kesehatan", desc: "Pelayanan untuk civitas akademika" },
                { name: "Ruang Kuliah Ber-AC", desc: "Fasilitas audio visual modern" }
            ]
        }
    ];

    // Auto slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // Visibility animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Manual slide navigation
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-6 text-lg">Memuat informasi universitas...</p>
                </div>
            </div>
        );
    }

    const currentSlideData = slides[currentSlide];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-blue-600 group">
            {/* Simple Blue Background */}
            <div className="absolute inset-0 bg-blue-600">
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>
            </div>

            {/* Content Slider */}
            <div className="relative z-10 w-full">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className={`text-white transition-all duration-700 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        
                        {/* Overview Slide */}
                        {currentSlideData.type === 'overview' && (
                            <div className="text-center max-w-6xl mx-auto">
                                <div className="mb-8">
                                    <span className="inline-flex items-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium border border-white/20">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Sejak 1982 - Terakreditasi BAN-PT
                                    </span>
                                </div>
                                
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                    {currentSlideData.title}
                                </h1>
                                
                                <p className="text-xl lg:text-2xl opacity-90 mb-6 max-w-4xl mx-auto leading-relaxed">
                                    {currentSlideData.subtitle}
                                </p>
                                
                                <p className="text-lg opacity-80 max-w-3xl mx-auto mb-16 leading-relaxed">
                                    {currentSlideData.description}
                                </p>

                                {/* Animated Stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                                    {[
                                        { label: "Mahasiswa Aktif", value: counters.students, suffix: "+" },
                                        { label: "Program Studi", value: counters.programs, suffix: "" },
                                        { label: "Dosen Berkualitas", value: counters.lecturers, suffix: "+" },
                                        { label: "Tahun Pengalaman", value: counters.years, suffix: "" }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                            <div className="text-3xl lg:text-4xl font-bold mb-2">
                                                {stat.value.toLocaleString()}{stat.suffix}
                                            </div>
                                            <div className="text-sm lg:text-base opacity-80">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Vision Slide */}
                        {currentSlideData.type === 'vision' && (
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-16">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                        {currentSlideData.title}
                                    </h1>
                                    <p className="text-xl lg:text-2xl opacity-90 mb-6 leading-relaxed">
                                        {currentSlideData.subtitle}
                                    </p>
                                    <p className="text-lg opacity-80 max-w-4xl mx-auto leading-relaxed">
                                        {currentSlideData.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {currentSlideData.missions.map((mission, index) => (
                                        <div key={index} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                            <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                                {index + 1}
                                            </div>
                                            <p className="text-base lg:text-lg opacity-90 leading-relaxed">{mission}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Programs Slide */}
                        {currentSlideData.type === 'programs' && (
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                        {currentSlideData.title}
                                    </h1>
                                    <p className="text-xl lg:text-2xl opacity-90 mb-6 leading-relaxed">
                                        {currentSlideData.subtitle}
                                    </p>
                                    <p className="text-lg opacity-80 max-w-4xl mx-auto leading-relaxed">
                                        {currentSlideData.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {currentSlideData.faculties.map((faculty, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                            <div className="text-center mb-6">
                                                <h3 className="text-xl lg:text-2xl font-bold mb-3">
                                                    {faculty.name}
                                                </h3>
                                                <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                                                    {faculty.count} Program Studi
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                {faculty.programs.map((program, programIndex) => (
                                                    <div key={programIndex} className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                                        <p className="text-sm lg:text-base opacity-90">{program}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Facilities Slide */}
                        {currentSlideData.type === 'facilities' && (
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-16">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                        {currentSlideData.title}
                                    </h1>
                                    <p className="text-xl lg:text-2xl opacity-90 mb-6 leading-relaxed">
                                        {currentSlideData.subtitle}
                                    </p>
                                    <p className="text-lg opacity-80 max-w-4xl mx-auto mb-12 leading-relaxed">
                                        {currentSlideData.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentSlideData.facilities.map((facility, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                            <h3 className="text-lg font-bold mb-3">{facility.name}</h3>
                                            <p className="text-sm opacity-80 leading-relaxed">{facility.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Navigation Controls - Hidden by default, show on hover */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 bg-white/15 backdrop-blur-sm hover:bg-white/25 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Slide Indicators */}
                <div className="flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'w-8 h-3 bg-white rounded-full' 
                                    : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 bg-white/15 backdrop-blur-sm hover:bg-white/25 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Contact Info - Simple floating card */}
            {universityData && (
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-medium">Kontak Kami</span>
                    </div>
                    <div className="space-y-1 text-xs opacity-90">
                        <div>Tel: {universityData.phone}</div>
                        <div>Email: {universityData.email}</div>
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div 
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
            </div>
        </section>
    );
};

export default HeroAbout;
