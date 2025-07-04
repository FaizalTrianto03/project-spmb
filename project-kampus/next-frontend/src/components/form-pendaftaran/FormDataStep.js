// src/components/form-pendaftaran/FormDataStep.js
import React, { useState, useEffect, useMemo } from 'react';

const FormDataStep = ({
    formData,
    errors,
    provinces,
    cities,
    studyPrograms,
    selectedProgram,
    captchaVerified,
    submitting,
    currentPath,
    availablePaths = [],
    onInputChange,
    onSubmit,
    onCaptchaVerify,
    onProgramChange,
    loadingPrograms = false
}) => {
    const [showProgramSelector, setShowProgramSelector] = useState(false);
    const [programSearch, setProgramSearch] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [showProgramWarning, setShowProgramWarning] = useState(false);
    const [incompatibleProgram, setIncompatibleProgram] = useState(null);

    // Filter program studi berdasarkan search dan level
    const filteredPrograms = useMemo(() => {
        let filtered = studyPrograms;

        // Filter berdasarkan search
        if (programSearch) {
            filtered = filtered.filter(program => 
                program.name.toLowerCase().includes(programSearch.toLowerCase()) ||
                program.code.toLowerCase().includes(programSearch.toLowerCase())
            );
        }

        // Filter berdasarkan level
        if (selectedLevel !== 'all') {
            filtered = filtered.filter(program => 
                program.level.toLowerCase() === selectedLevel.toLowerCase()
            );
        }

        return filtered;
    }, [studyPrograms, programSearch, selectedLevel]);

    // Group program berdasarkan level
    const programLevels = useMemo(() => {
        const levels = [...new Set(studyPrograms.map(p => p.level))];
        return levels.sort();
    }, [studyPrograms]);

    // Cek apakah program yang dipilih kompatibel dengan jalur
    useEffect(() => {
        if (formData.firstChoice && currentPath) {
            const selectedProg = studyPrograms.find(p => p.code === formData.firstChoice);
            if (selectedProg && !isCompatibleWithPath(selectedProg, currentPath)) {
                setIncompatibleProgram(selectedProg);
                setShowProgramWarning(true);
            } else {
                setIncompatibleProgram(null);
                setShowProgramWarning(false);
            }
        }
    }, [formData.firstChoice, currentPath, studyPrograms]);

    // Fungsi untuk cek kompatibilitas program dengan jalur
    const isCompatibleWithPath = (program, path) => {
        if (path.restrictions && path.restrictions.programs) {
            return path.restrictions.programs.includes(program.code);
        }
        return true;
    };

    // Handle perubahan program studi
    const handleProgramSelect = (program) => {
        if (onProgramChange) {
            onProgramChange(program);
        }
        
        onInputChange({
            target: {
                name: 'firstChoice',
                value: program.code
            }
        });

        setShowProgramSelector(false);
        setProgramSearch('');
        setSelectedLevel('all');
    };

    // Handle search program
    const handleSearchChange = (e) => {
        setProgramSearch(e.target.value);
    };

    // Handle level filter
    const handleLevelChange = (level) => {
        setSelectedLevel(level);
    };

    // Clear program selection
    const clearProgramSelection = () => {
        onInputChange({
            target: {
                name: 'firstChoice',
                value: ''
            }
        });
        setShowProgramWarning(false);
        setIncompatibleProgram(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Data Pendaftaran
                    </h3>
                    <p className="text-gray-600">
                        Lengkapi data diri dan informasi pendidikan Anda
                    </p>
                </div>
            </div>

            <form onSubmit={onSubmit} className="divide-y divide-gray-100">
                {/* SECTION 1: DATA PRIBADI */}
                <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Data Pribadi
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nama Lengkap */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={onInputChange}
                                placeholder="Masukkan nama lengkap Anda"
                                className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.fullName && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* NIK */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                NIK / No. KTP <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nik"
                                value={formData.nik}
                                onChange={onInputChange}
                                placeholder="16 digit NIK"
                                maxLength={16}
                                className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.nik ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.nik && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.nik}
                                </p>
                            )}
                        </div>

                        {/* Jenis Kelamin */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Jenis Kelamin <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-6">
                                {['Laki-Laki', 'Perempuan'].map(gender => (
                                    <label key={gender} className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={gender}
                                            checked={formData.gender === gender}
                                            onChange={onInputChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {gender}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.gender && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        {/* Tempat Lahir */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Tempat Lahir <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="birthPlace"
                                value={formData.birthPlace}
                                onChange={onInputChange}
                                placeholder="Masukkan tempat lahir"
                                className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.birthPlace ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.birthPlace && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.birthPlace}
                                </p>
                            )}
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Tanggal Lahir <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={onInputChange}
                                max={new Date().toISOString().split('T')[0]}
                                className={`w-full px-4 py-3 text-base text-gray-900 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.birthDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.birthDate && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.birthDate}
                                </p>
                            )}
                        </div>

                        {/* Kewarganegaraan */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Kewarganegaraan <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={onInputChange}
                                    className={`w-full px-4 py-3 text-base text-gray-900 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white focus:bg-white appearance-none ${errors.nationality ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="WNA">Warga Negara Asing</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.nationality && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.nationality}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION 2: KONTAK */}
                <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Informasi Kontak
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Alamat Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onInputChange}
                                    placeholder="email@domain.com"
                                    className={`w-full px-4 py-3 pr-10 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* No. HP */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                No. HP <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={onInputChange}
                                    placeholder="08xxxxxxxxxx"
                                    className={`w-full px-4 py-3 pr-10 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.phoneNumber && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION 3: PENDIDIKAN */}
                <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Riwayat Pendidikan
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Provinsi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Provinsi Asal Sekolah <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="province"
                                    value={formData.province}
                                    onChange={onInputChange}
                                    className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white focus:bg-white appearance-none ${
                                        errors.province ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                                    } ${
                                        formData.province ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                                >
                                    <option value="" className="text-gray-500">Pilih Provinsi</option>
                                    {provinces.map(province => (
                                        <option key={province.id} value={province.id} className="text-gray-900">
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.province && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.province}
                                </p>
                            )}
                        </div>

                        {/* Kabupaten / Kota */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Kabupaten / Kota <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={onInputChange}
                                    disabled={!formData.province}
                                    className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white focus:bg-white appearance-none ${
                                        errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                                    } ${
                                        !formData.province ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 
                                        formData.city ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                                >
                                    <option value="" className="text-gray-500">
                                        {!formData.province ? 'Pilih provinsi terlebih dahulu' : 'Pilih Kabupaten / Kota'}
                                    </option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id} className="text-gray-900">
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.city && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">     
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* Jenis Sekolah */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Jenis Sekolah <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="schoolType"
                                    value={formData.schoolType}
                                    onChange={onInputChange}
                                    className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white focus:bg-white appearance-none ${
                                        errors.schoolType ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                                    } ${
                                        formData.schoolType ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                                >
                                    <option value="" className="text-gray-500">Pilih Jenis Sekolah</option>
                                    <option value="SMA" className="text-gray-900">SMA</option>
                                    <option value="SMK" className="text-gray-900">SMK</option>
                                    <option value="MA" className="text-gray-900">MA</option>
                                    <option value="MAK" className="text-gray-900">MAK</option>
                                    <option value="Paket C" className="text-gray-900">Paket C</option>
                                    <option value="Lainnya" className="text-gray-900">Lainnya</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.schoolType && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.schoolType}
                                </p>
                            )}
                        </div>

                        {/* NPSN / Nama Sekolah */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                NPSN / Nama Sekolah <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={onInputChange}
                                placeholder="Masukkan NPSN atau nama sekolah"
                                className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.schoolName ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.schoolName && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.schoolName}
                                </p>
                            )}
                        </div>

                        {/* Jurusan Sekolah */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Jurusan Sekolah <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="schoolMajor"
                                value={formData.schoolMajor}
                                onChange={onInputChange}
                                placeholder="Masukkan jurusan sekolah"
                                className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.schoolMajor ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.schoolMajor && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.schoolMajor}
                                </p>
                            )}
                        </div>

                        {/* Tahun Lulus */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Tahun Lulus <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    onChange={onInputChange}
                                    className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white focus:bg-white appearance-none ${
                                        errors.graduationYear ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                                    } ${
                                        formData.graduationYear ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                                >
                                    <option value="" className="text-gray-500">Pilih Tahun Lulus</option>
                                    {Array.from({ length: 10 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return (
                                            <option key={year} value={year} className="text-gray-900">
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.graduationYear && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.graduationYear}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION 4: PROGRAM STUDI */}
                <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Pilihan Program Studi
                    </h4>

                    {/* Current Selected Program Display */}
                    {formData.firstChoice && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <p className="font-semibold text-blue-900">
                                            {selectedProgram?.name || 'Program Terpilih'}
                                        </p>
                                        <p className="text-sm text-blue-700">
                                            {selectedProgram?.level} • Kode: {formData.firstChoice}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowProgramSelector(true)}
                                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        Ganti Program
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearProgramSelection}
                                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Program Warning */}
                    {showProgramWarning && incompatibleProgram && (
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-amber-900">Peringatan Program Studi</p>
                                    <p className="text-sm text-amber-800 mt-1">
                                        Program "{incompatibleProgram.name}" mungkin tidak tersedia untuk jalur {currentPath?.name}. 
                                        Silakan pilih program lain atau hubungi admin untuk konfirmasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Program Selector */}
                    {!formData.firstChoice || showProgramSelector ? (
                        <div className="space-y-4">
                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Cari program studi..."
                                        value={programSearch}
                                        onChange={handleSearchChange}
                                        className="w-full px-4 py-3 pl-10 text-base text-gray-900 placeholder-gray-500 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => handleLevelChange(e.target.value)}
                                        className={`px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none pr-10 ${
                                            selectedLevel === 'all' ? 'text-gray-500' : 'text-gray-900'
                                        }`}
                                    >
                                        <option value="all" className="text-gray-500">Semua Jenjang</option>
                                        {programLevels.map(level => (
                                            <option key={level} value={level} className="text-gray-900">{level}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Program List */}
                            <div className="max-h-80 overflow-y-auto border-2 border-gray-300 rounded-xl">
                                {loadingPrograms ? (
                                    <div className="p-8 text-center">
                                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-500">Memuat program studi...</p>
                                    </div>
                                ) : filteredPrograms.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {filteredPrograms.map((program) => (
                                            <button
                                                key={program.id}
                                                type="button"
                                                onClick={() => handleProgramSelect(program)}
                                                className="w-full p-4 text-left hover:bg-blue-50 transition-colors group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 group-hover:text-blue-900">
                                                            {program.name}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-1">
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {program.level}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                Kode: {program.code}
                                                            </span>
                                                            {program.accreditation && (
                                                                <span className="text-sm text-green-600 font-medium">
                                                                    Akreditasi {program.accreditation}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-gray-500">Tidak ada program studi yang ditemukan</p>
                                        <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci pencarian atau filter jenjang</p>
                                    </div>
                                )}
                            </div>

                            {/* Cancel Button for Modal */}
                            {showProgramSelector && formData.firstChoice && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProgramSelector(false);
                                            setProgramSearch('');
                                            setSelectedLevel('all');
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Batal
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : null}

                    {errors.firstChoice && (
                        <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.firstChoice}
                        </p>
                    )}
                </div>

                {/* CAPTCHA & SUBMIT SECTION */}
                <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verifikasi & Kirim
                    </h4>

                    {/* Captcha Section */}
                    <div className="mb-6">
                        <label className="flex items-start cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={captchaVerified}
                                onChange={onCaptchaVerify}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                            />
                            <div className="ml-3">
                                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                                    Saya bukan robot dan setuju dengan syarat & ketentuan yang berlaku
                                </span>
                                <p className="text-xs text-gray-600 mt-1">
                                    Dengan mencentang kotak ini, Anda menyetujui kebijakan privasi dan syarat penggunaan layanan pendaftaran online.
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={submitting || !captchaVerified}
                            className={`font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto ${
                                submitting || !captchaVerified
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed transform-none shadow-none'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                            }`}
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Mengirim OTP ke Email...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Kirim OTP ke Email
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                        
                        {!captchaVerified && (
                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm text-amber-800 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Silakan centang verifikasi keamanan terlebih dahulu
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormDataStep;
