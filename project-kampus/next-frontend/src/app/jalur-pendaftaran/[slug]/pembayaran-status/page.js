// src/app/jalur-pendaftaran/[slug]/pembayaran-status/page.js
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

// Loading component
const LoadingSpinner = () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Memverifikasi pembayaran...</p>
            </div>
        </div>
    </div>
);

// Main component
const PembayaranStatusContent = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [registrationData, setRegistrationData] = useState(null);
    const [pathData, setPathData] = useState(null);
    const [error, setError] = useState(null);

    // Ambil parameter dari URL - HANYA reg
    const slug = params.slug;
    const regNumber = searchParams.get('reg');

    // Load data jalur pendaftaran
    useEffect(() => {
        const loadPathData = async () => {
            try {
                const response = await fetch('/data/realDummyData.json');
                const data = await response.json();

                const admissionPath = data.dummy_data.admission_paths.find(
                    path => path.id.toString() === slug
                );

                if (admissionPath) {
                    setPathData(admissionPath);
                }
            } catch (error) {
                console.error('Error loading path data:', error);
            }
        };

        if (slug) {
            loadPathData();
        }
    }, [slug]);

    const getPaymentMethodName = (method) => {
        const methods = {
            'bank_transfer': 'Transfer Bank',
            'credit_card': 'Kartu Kredit',
            'e_wallet': 'E-Wallet (Dana/OVO/GoPay)',
            'virtual_account': 'Virtual Account',
            'qris': 'QRIS'
        };
        return methods[method] || 'Transfer Bank';
    };

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                setLoading(true);

                // Simulasi delay API
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (!regNumber) {
                    throw new Error('Nomor registrasi tidak ditemukan');
                }

                // Ambil data dari localStorage
                const savedData = localStorage.getItem('registration_payment_data');
                if (!savedData) {
                    throw new Error('Data pendaftaran tidak ditemukan');
                }

                const parsedData = JSON.parse(savedData);

                // Verifikasi regNumber cocok
                if (parsedData.registrationId !== regNumber) {
                    throw new Error('Nomor registrasi tidak cocok');
                }

                // SELALU BERHASIL - tidak ada parameter status lagi
                // Buat data lengkap dengan informasi pembayaran
                const completeData = {
                    ...parsedData,
                    payment: {
                        transactionId: 'TXN' + Date.now(),
                        method: parsedData.selectedPaymentMethod,
                        methodName: getPaymentMethodName(parsedData.selectedPaymentMethod),
                        amount: parsedData.paymentAmount,
                        adminFee: parsedData.adminFee,
                        totalAmount: parsedData.totalAmount,
                        paidAt: new Date().toLocaleString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }
                };

                setRegistrationData(completeData);
                setPaymentStatus('success');

            } catch (err) {
                setError(err.message);
                setPaymentStatus('failed');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [regNumber]);

    const handleDownloadReceipt = () => {
        alert('ℹ️ Fitur download bukti pembayaran akan segera tersedia');
    };

    const handleBackToHome = () => {
        router.push('/');
    };

    const handleViewRegistration = () => {
        alert('ℹ️ Fitur cek status pendaftaran akan segera tersedia');
    };

    const handleTryAgain = () => {
        router.push(`/jalur-pendaftaran/${slug}/form`);
    };

    const handleLogin = () => {
        router.push('/login');
    };

    if (loading) {
        return <LoadingSpinner />;
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
                                onClick={() => router.push('/jalur-pendaftaran')}
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                Jalur Pendaftaran
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">Status Pembayaran</span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
            <main className="py-12 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    {paymentStatus === 'success' && registrationData ? (
                        // SUCCESS STATE
                        <div className="max-w-3xl mx-auto">
                            {/* Success Header */}
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Pembayaran Berhasil!
                                </h1>
                                <p className="text-gray-600 text-lg mb-8">
                                    Pendaftaran Anda telah berhasil dan pembayaran telah dikonfirmasi.
                                </p>

                                {/* Account Info Box - DIPINDAH KE SINI */}
                                <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <h4 className="font-bold text-green-900 mb-2">Akun Portal Mahasiswa Telah Dibuat</h4>
                                            <p className="text-green-800 text-sm leading-relaxed mb-3">
                                                Kami telah mengirimkan informasi akun portal mahasiswa ke email <strong>{registrationData.email}</strong>. 
                                                Silakan cek email Anda untuk mendapatkan username dan password untuk mengakses portal mahasiswa.
                                            </p>
                                            <button
                                                onClick={handleLogin}
                                                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                Login Sekarang
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Summary */}
                            <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pendaftaran</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column - Personal Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Nomor Registrasi</div>
                                            <div className="font-bold text-blue-600 text-lg">{registrationData.registrationId}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Nama Lengkap</div>
                                            <div className="font-semibold text-gray-900">{registrationData.fullName}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Email</div>
                                            <div className="font-semibold text-gray-900 break-all">{registrationData.email}</div>
                                        </div>
                                    </div>

                                    {/* Right Column - Program Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Program Studi</div>
                                            <div className="font-semibold text-gray-900">{registrationData.selectedProgram?.name || 'Belum dipilih'}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Jenjang</div>
                                            <div className="font-semibold text-gray-900">{registrationData.selectedProgram?.level || '-'}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Jalur Pendaftaran</div>
                                            <div className="font-semibold text-gray-900">{registrationData.pathName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pembayaran</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">ID Transaksi</div>
                                            <div className="font-semibold text-blue-600">{registrationData.payment.transactionId}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Metode Pembayaran</div>
                                            <div className="font-semibold text-gray-900">{registrationData.payment.methodName}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Waktu Pembayaran</div>
                                            <div className="font-semibold text-gray-900">{registrationData.payment.paidAt}</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <div className="text-sm text-green-700 mb-1">Total Dibayar</div>
                                            <div className="font-bold text-green-600 text-xl">Rp {registrationData.payment.totalAmount.toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button
                                    onClick={handleDownloadReceipt}
                                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Bukti
                                </button>
                                
                                <button
                                    onClick={handleLogin}
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-300 font-semibold flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login Portal
                                </button>
                                
                                <button
                                    onClick={handleBackToHome}
                                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors duration-300 font-semibold flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Kembali ke Beranda
                                </button>
                            </div>

                            {/* Info Box */}
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-2">Informasi Penting</h4>
                                        <p className="text-blue-800 text-sm leading-relaxed">
                                            Simpan nomor registrasi <strong className="bg-blue-200 px-2 py-1 rounded">{registrationData.registrationId}</strong> untuk keperluan selanjutnya.
                                            Informasi lebih lanjut mengenai jadwal orientasi dan perkuliahan akan dikirim melalui email yang telah didaftarkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // FAILED STATE
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Pembayaran Gagal
                                </h1>
                                <p className="text-gray-600 text-lg mb-8">
                                    {error || 'Terjadi kesalahan saat memproses pembayaran Anda.'}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border p-8">
                                <div className="space-y-4">
                                    <button
                                        onClick={handleTryAgain}
                                        className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg"
                                    >
                                        Coba Lagi
                                    </button>
                                    <button
                                        onClick={handleBackToHome}
                                        className="w-full bg-gray-600 text-white px-6 py-4 rounded-xl hover:bg-gray-700 transition-colors duration-300 font-semibold text-lg"
                                    >
                                        Kembali ke Beranda
                                    </button>
                                </div>

                                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-red-900 mb-1">Bantuan</h4>
                                            <p className="text-red-800 text-sm">
                                                Jika masalah terus berlanjut, silakan hubungi tim support kami untuk mendapatkan bantuan lebih lanjut.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Wrapper component with Suspense
const PembayaranStatusPage = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PembayaranStatusContent />
        </Suspense>
    );
};

export default PembayaranStatusPage;
