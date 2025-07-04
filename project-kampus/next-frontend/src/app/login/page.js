// src/app/login/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        idPendaftar: '',
        pin: '',
        rememberMe: false
    });
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showForgotSection, setShowForgotSection] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMessage, setForgotMessage] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.idPendaftar.trim()) {
            newErrors.idPendaftar = 'ID Pendaftar harus diisi';
        }

        if (!formData.pin.trim()) {
            newErrors.pin = 'PIN harus diisi';
        } else if (formData.pin.length !== 8) {
            newErrors.pin = 'PIN harus 8 digit';
        } else if (!/^\d{8}$/.test(formData.pin)) {
            newErrors.pin = 'PIN harus berupa angka 8 digit';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulasi login berhasil
            localStorage.setItem('user_session', JSON.stringify({
                idPendaftar: formData.idPendaftar,
                loginTime: new Date().toISOString(),
                rememberMe: formData.rememberMe
            }));

            // Redirect ke dashboard atau halaman yang sesuai
            alert('✅ Login berhasil! Akan diarahkan ke dashboard...');
            router.push('/dashboard');

        } catch (error) {
            alert('❌ Terjadi kesalahan saat login. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotCredentials = () => {
        setShowForgotSection(true);
        setForgotMessage('');
        setForgotEmail('');
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        
        if (!forgotEmail.trim()) {
            setForgotMessage('Email harus diisi');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
            setForgotMessage('Format email tidak valid');
            return;
        }

        setForgotLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulasi email terdaftar/tidak terdaftar
            const registeredEmails = ['test@example.com', 'user@gmail.com', 'admin@test.com'];
            
            if (registeredEmails.includes(forgotEmail.toLowerCase())) {
                setForgotMessage('✅ Kami baru saja mengirim PIN baru untuk akun Anda. Silakan cek di email terkait.');
            } else {
                setForgotMessage('❌ Maaf, email tidak terdaftar dalam sistem kami.');
            }

        } catch (error) {
            setForgotMessage('❌ Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setForgotLoading(false);
        }
    };

    const handleRegister = () => {
        router.push('/jalur-pendaftaran');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="min-h-screen flex">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:flex lg:w-2/5 bg-blue-600 flex-col justify-center items-center p-12">
                    <div className="text-center max-w-md">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Portal Pendaftaran
                            </h2>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Sistem ini masih fokus untuk pendaftaran mahasiswa baru. Silakan masuk menggunakan akun yang telah terdaftar untuk melanjutkan proses pendaftaran Anda.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 lg:w-3/5 flex items-center justify-center p-8">
                    <div className="w-full max-w-lg">
                        {!showForgotSection ? (
                            <>
                                {/* Login Header */}
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Masuk ke Akun</h3>
                                    <p className="text-gray-600 text-lg">Gunakan ID Pendaftar dan PIN untuk mengakses portal</p>
                                </div>

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* ID Pendaftar */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                                            ID Pendaftar
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="idPendaftar"
                                                value={formData.idPendaftar}
                                                onChange={handleInputChange}
                                                placeholder="Masukkan ID pendaftar Anda"
                                                className={`w-full px-4 py-4 text-lg font-semibold border-2 rounded-xl transition-all duration-200 placeholder-gray-700 bg-gray-50 focus:bg-white focus:outline-none ${
                                                    errors.idPendaftar 
                                                        ? 'border-red-400 focus:border-red-500' 
                                                        : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                                                }`}
                                                style={{ 
                                                    color: formData.idPendaftar ? '#1f2937' : '#374151'
                                                }}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.idPendaftar && (
                                            <p className="text-red-500 text-sm font-medium">{errors.idPendaftar}</p>
                                        )}
                                    </div>

                                    {/* PIN */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                                            PIN
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPin ? "text" : "password"}
                                                name="pin"
                                                value={formData.pin}
                                                onChange={handleInputChange}
                                                placeholder="Masukkan PIN 8 digit"
                                                maxLength={8}
                                                className={`w-full px-4 py-4 text-lg font-semibold border-2 rounded-xl transition-all duration-200 placeholder-gray-700 bg-gray-50 focus:bg-white focus:outline-none ${
                                                    errors.pin 
                                                        ? 'border-red-400 focus:border-red-500' 
                                                        : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                                                }`}
                                                style={{ 
                                                    color: formData.pin ? '#1f2937' : '#374151'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPin(!showPin)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                            >
                                                {showPin ? (
                                                    <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.pin && (
                                            <p className="text-red-500 text-sm font-medium">{errors.pin}</p>
                                        )}
                                    </div>

                                    {/* Options */}
                                    <div className="flex items-center justify-between py-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="rememberMe"
                                                checked={formData.rememberMe}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 font-medium">Ingat saya</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleForgotCredentials}
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            Lupa ID atau PIN?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 transform ${
                                            loading
                                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Memproses...</span>
                                            </div>
                                        ) : (
                                            'MASUK'
                                        )}
                                    </button>
                                </form>

                                {/* Register Section */}
                                <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Belum memiliki akun?</h4>
                                        <p className="text-gray-600 text-sm mb-4">Daftar sekarang untuk mengakses semua layanan</p>
                                        <button
                                            onClick={handleRegister}
                                            className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                                        >
                                            DAFTAR SEKARANG
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Forgot PIN Section */
                            <div className="space-y-8">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Reset PIN</h3>
                                    <p className="text-gray-600 text-lg">Masukkan email untuk mendapatkan PIN baru</p>
                                </div>

                                <form onSubmit={handleForgotSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            placeholder="Masukkan email Anda"
                                            className="w-full px-4 py-4 text-lg font-semibold border-2 border-gray-300 rounded-xl transition-all duration-200 placeholder-gray-700 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
                                            style={{ 
                                                color: forgotEmail ? '#1f2937' : '#374151'
                                            }}
                                        />
                                    </div>

                                    {forgotMessage && (
                                        <div className={`p-4 rounded-xl font-medium ${forgotMessage.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                            {forgotMessage}
                                        </div>
                                    )}

                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForgotSection(false)}
                                            className="flex-1 py-4 px-6 text-lg font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            KEMBALI
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={forgotLoading}
                                            className={`flex-1 py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 ${
                                                forgotLoading
                                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                                    : 'bg-orange-600 text-white hover:bg-orange-700'
                                            }`}
                                        >
                                            {forgotLoading ? 'MENGIRIM...' : 'KIRIM EMAIL'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
