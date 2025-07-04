// src/app/jalur-pendaftaran/[slug]/form/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
    FormDataStep,
    OtpVerificationStep,
    PaymentStep,
    ProgressSteps,
    PathInfoCard
} from '@/components/form-pendaftaran';
import PopupConfirm from '@/components/assets/popupConfirm';

const FormPendaftaranPage = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { slug } = params;
    const programCode = searchParams.get('program');

    /**
     * State management
     */
    const [pathData, setPathData] = useState(null);
    const [availablePaths, setAvailablePaths] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form steps - gunakan string konsisten
    const [currentStep, setCurrentStep] = useState('form'); // 'form', 'otp-verification', 'payment'
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [registrationId, setRegistrationId] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    // State untuk popup konfirmasi pembayaran
    const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);

    /**
     * Form data state
     */
    const [formData, setFormData] = useState({
        // Informasi Pribadi
        fullName: '',
        gender: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        birthPlace: '',
        nationality: 'Indonesia',
        nik: '',

        // Asal Sekolah
        province: '',
        city: '',
        schoolType: '',
        schoolName: '',
        schoolMajor: '',
        graduationYear: '',

        // Pilihan Program Studi
        firstChoice: programCode || ''
    });

    /**
     * Form validation errors
     */
    const [errors, setErrors] = useState({});

    /**
     *  Handle back from steps dengan logic yang lebih baik
     */
    const handleBackStep = () => {
        // Reset semua data step selanjutnya
        setOtpCode('');
        setSelectedPaymentMethod('');

        // Langsung ke form step
        setCurrentStep('form');

        // Scroll ke atas untuk user experience yang lebih baik
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Generate registration ID
     */
    useEffect(() => {
        const regId = `REG${Date.now().toString().slice(-8)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        setRegistrationId(regId);
    }, []);

    /**
     * Load initial data
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/realDummyData.json');
                const data = await response.json();

                // Load semua jalur untuk PathInfoCard
                const allPaths = data.dummy_data.admission_paths.filter(path => path.is_active);
                setAvailablePaths(allPaths);

                // Find path by ID (slug)
                const admissionPath = allPaths.find(
                    path => path.id.toString() === slug
                );

                if (admissionPath) {
                    setPathData(admissionPath);

                    // Get study programs
                    const availablePrograms = data.dummy_data.study_programs.filter(
                        program => program.is_active
                    );
                    setStudyPrograms(availablePrograms);

                    // Find selected program
                    if (programCode) {
                        const program = availablePrograms.find(p => p.code === programCode);
                        setSelectedProgram(program);
                    }
                }

                // Load provinces (dummy data)
                setProvinces([
                    { id: '1', name: 'DKI Jakarta' },
                    { id: '2', name: 'Jawa Barat' },
                    { id: '3', name: 'Jawa Tengah' },
                    { id: '4', name: 'Jawa Timur' },
                    { id: '5', name: 'Banten' },
                    { id: '6', name: 'Yogyakarta' },
                    { id: '7', name: 'Sulawesi Utara' }
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        if (slug) {
            loadData();
        }
    }, [slug, programCode]);

    /**
     * Load cities when province changes
     */
    useEffect(() => {
        if (formData.province) {
            // Dummy cities data
            const citiesData = {
                '1': [
                    { id: '1', name: 'Jakarta Pusat' },
                    { id: '2', name: 'Jakarta Utara' },
                    { id: '3', name: 'Jakarta Selatan' },
                    { id: '4', name: 'Jakarta Timur' },
                    { id: '5', name: 'Jakarta Barat' }
                ],
                '2': [
                    { id: '6', name: 'Bandung' },
                    { id: '7', name: 'Bekasi' },
                    { id: '8', name: 'Depok' },
                    { id: '9', name: 'Bogor' },
                    { id: '10', name: 'Cimahi' }
                ],
                '3': [
                    { id: '11', name: 'Semarang' },
                    { id: '12', name: 'Solo' },
                    { id: '13', name: 'Magelang' },
                    { id: '14', name: 'Salatiga' }
                ],
                '6': [
                    { id: '15', name: 'Yogyakarta' },
                    { id: '16', name: 'Bantul' },
                    { id: '17', name: 'Sleman' },
                    { id: '18', name: 'Kulon Progo' }
                ],
                '7': [
                    { id: '19', name: 'Manado' },
                    { id: '20', name: 'Bitung' },
                    { id: '21', name: 'Tomohon' },
                    { id: '22', name: 'Kotamobagu' }
                ]
            };

            setCities(citiesData[formData.province] || []);
            setFormData(prev => ({ ...prev, city: '' }));
        }
    }, [formData.province]);

    /**
     * Handle input change
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    /**
     * Handle program change
     */
    const handleProgramChange = (program) => {
        setSelectedProgram(program);
        setFormData(prev => ({
            ...prev,
            firstChoice: program.code
        }));
    };

    /**
     * Validate form
     */
    const validateForm = () => {
        const newErrors = {};

        // Required fields validation
        const requiredFields = {
            fullName: 'Nama Lengkap',
            gender: 'Jenis Kelamin',
            phoneNumber: 'No. HP',
            email: 'Alamat Email',
            birthDate: 'Tanggal Lahir',
            birthPlace: 'Tempat Lahir',
            nationality: 'Kewarganegaraan',
            nik: 'NIK / No. KTP',
            province: 'Provinsi',
            city: 'Kabupaten / Kota',
            schoolType: 'Jenis Sekolah',
            schoolName: 'NPSN / Nama Sekolah',
            schoolMajor: 'Jurusan Sekolah',
            graduationYear: 'Tahun Lulus',
            firstChoice: 'Pilihan Program Studi'
        };

        Object.keys(requiredFields).forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                newErrors[field] = `${requiredFields[field]} harus diisi`;
            }
        });

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        // Phone number validation
        if (formData.phoneNumber && !/^08[0-9]{8,11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Format nomor HP tidak valid (contoh: 081234567890)';
        }

        // NIK validation
        if (formData.nik && !/^[0-9]{16}$/.test(formData.nik)) {
            newErrors.nik = 'NIK harus 16 digit angka';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle captcha verification (demo)
     */
    const handleCaptchaVerify = (e) => {
        setCaptchaVerified(e.target.checked);
    };

    /**
     * Handle form submission (Step 1)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to first error
            const firstErrorField = document.querySelector('.border-red-500');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        if (!captchaVerified) {
            alert('Silakan verifikasi captcha terlebih dahulu');
            return;
        }

        setSubmitting(true);

        try {
            // Simulate saving data and sending OTP
            const registrationData = {
                ...formData,
                registrationId,
                pathId: slug,
                pathName: pathData.name,
                selectedProgram,
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('pendaftaran_data', JSON.stringify(registrationData));

            // Simulate API call for sending OTP
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Move to OTP verification step
            setCurrentStep('otp-verification');

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Handle OTP verification (Step 2)
     */
    const handleOtpVerification = async (e) => {
        e.preventDefault();

        if (!otpCode || otpCode.length !== 6) {
            alert('Masukkan kode OTP 6 digit');
            return;
        }

        // Demo: Accept only 123456
        if (otpCode !== '123456') {
            alert('Kode OTP salah. Gunakan kode: 123456');
            return;
        }

        setSubmitting(true);

        try {
            // Simulate OTP verification
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Move to payment step
            setCurrentStep('payment');

        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Terjadi kesalahan saat verifikasi OTP. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Handle OTP code change
     */
    const handleOtpCodeChange = (e) => {
        setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
    };

    /**
     * Handle resend OTP
     */
    const handleResendOtp = async () => {
        setSubmitting(true);
        try {
            // Simulate resending OTP
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Kode OTP baru telah dikirim ke email Anda');
        } catch (error) {
            console.error('Error resending OTP:', error);
            alert('Gagal mengirim ulang OTP. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Handle payment method selection
     */
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    /**
     * Handle payment button click - Show confirmation popup
     */
    const handlePaymentButtonClick = () => {
        if (!selectedPaymentMethod) {
            alert('Pilih metode pembayaran terlebih dahulu');
            return;
        }

        // Show confirmation popup
        setShowPaymentConfirm(true);
    };

    /**
     * Handle payment confirmation - Close popup and process payment
     */
    const handlePaymentConfirm = () => {
        setShowPaymentConfirm(false);
        handlePaymentProcess();
    };

    /**
     * Handle payment cancel - Close popup only
     */
    const handlePaymentCancel = () => {
        setShowPaymentConfirm(false);
    };

    /**
     * Handle payment process (Step 3) - DIPERBAIKI
     */
    const handlePaymentProcess = async () => {
        setSubmitting(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simpan data lengkap ke localStorage untuk digunakan di halaman status
            const completeRegistrationData = {
                // Data form
                ...formData,
                
                // Data registrasi
                registrationId,
                pathId: slug,
                pathName: pathData.name,
                selectedProgram,
                
                // Data pembayaran
                selectedPaymentMethod,
                paymentAmount: pathData?.registration_fee || 150000,
                adminFee: 5000,
                totalAmount: (pathData?.registration_fee || 150000) + 5000,
                
                // Metadata
                timestamp: new Date().toISOString(),
                status: 'success'
            };

            localStorage.setItem('registration_payment_data', JSON.stringify(completeRegistrationData));

            // PERBAIKAN: Redirect hanya dengan parameter reg
            router.push(`/jalur-pendaftaran/${slug}/pembayaran-status?reg=${registrationId}`);

        } catch (error) {
            console.error('Error processing payment:', error);
            
            // Simpan data dengan status failed
            const failedRegistrationData = {
                ...formData,
                registrationId,
                pathId: slug,
                pathName: pathData.name,
                selectedProgram,
                selectedPaymentMethod,
                paymentAmount: pathData?.registration_fee || 150000,
                adminFee: 5000,
                totalAmount: (pathData?.registration_fee || 150000) + 5000,
                timestamp: new Date().toISOString(),
                status: 'failed',
                error: error.message
            };

            localStorage.setItem('registration_payment_data', JSON.stringify(failedRegistrationData));

            // Redirect ke status dengan reg saja
            router.push(`/jalur-pendaftaran/${slug}/pembayaran-status?reg=${registrationId}`);
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Handle change path dengan data jalur
     */
    const handleChangePath = () => {
        router.push('/jalur-pendaftaran');
    };

    /**
     * Handle path selection dari PathInfoCard
     */
    const handlePathSelect = async (newPath, currentFormData) => {
        // Redirect ke jalur baru dengan data form jika ada
        const queryParams = new URLSearchParams();

        // Preserve program selection jika kompatibel
        if (currentFormData.firstChoice) {
            queryParams.set('program', currentFormData.firstChoice);
        }

        const url = `/jalur-pendaftaran/${newPath.id}/form${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        router.push(url);
    };

    /**
     * Get current step title and description
     */
    const getStepInfo = () => {
        switch (currentStep) {
            case 'form':
                return {
                    title: 'Formulir Pendaftaran',
                    description: 'Lengkapi data pendaftaran untuk melanjutkan ke tahap selanjutnya'
                };
            case 'otp-verification':
                return {
                    title: 'Verifikasi OTP',
                    description: 'Masukkan kode OTP yang telah dikirim ke email Anda'
                };
            case 'payment':
                return {
                    title: 'Pembayaran',
                    description: 'Pilih metode pembayaran dan selesaikan transaksi'
                };
            default:
                return {
                    title: 'Formulir Pendaftaran',
                    description: 'Lengkapi data pendaftaran untuk melanjutkan ke tahap selanjutnya'
                };
        }
    };

    // Check if has form data
    const hasFormData = Object.values(formData).some(value => value && value.trim() !== '');

    // Get payment method name for confirmation
    const getPaymentMethodName = (method) => {
        const paymentMethods = {
            'bank_transfer': 'Transfer Bank',
            'virtual_account': 'Virtual Account',
            'credit_card': 'Kartu Kredit',
            'e_wallet': 'E-Wallet',
            'qris': 'QRIS'
        };
        return paymentMethods[method] || method;
    };

    if (loading) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                        <p className="text-gray-600 mt-6 text-xl font-medium">Memuat formulir pendaftaran...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!pathData) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex items-center justify-center min-h-screen">
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
            </div>
        );
    }

    const stepInfo = getStepInfo();

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
            {/* Breadcrumb Section */}
            <section style={{ backgroundColor: '#ffffff' }} className="border-b py-3">
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
                            <button
                                onClick={() => router.push(`/jalur-pendaftaran/${slug}`)}
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                {pathData.name}
                            </button>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">
                                {stepInfo.title}
                            </span>
                        </div>
                    </nav>
                </div>
            </section>

            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            {stepInfo.title}
                        </h1>
                        <p className="text-blue-100 text-lg">
                            {stepInfo.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="py-8" style={{ backgroundColor: '#ffffff' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Steps dengan currentStep yang benar dan back handler */}
                        <ProgressSteps
                            currentStep={currentStep}
                            onBackStep={handleBackStep}
                            canGoBack={currentStep !== 'form'}
                        />

                        {/* Step 1: Form Data */}
                        {currentStep === 'form' && (
                            <>
                                {/* Selected Path Info dengan semua props */}
                                <PathInfoCard
                                    pathData={pathData}
                                    availablePaths={availablePaths}
                                    currentFormData={formData}
                                    hasFormData={hasFormData}
                                    onChangePath={handleChangePath}
                                    onPathSelect={handlePathSelect}
                                />

                                {/* Form Section */}
                                <FormDataStep
                                    formData={formData}
                                    errors={errors}
                                    provinces={provinces}
                                    cities={cities}
                                    studyPrograms={studyPrograms}
                                    selectedProgram={selectedProgram}
                                    captchaVerified={captchaVerified}
                                    submitting={submitting}
                                    currentPath={pathData}
                                    onInputChange={handleInputChange}
                                    onSubmit={handleSubmit}
                                    onCaptchaVerify={handleCaptchaVerify}
                                    onProgramChange={handleProgramChange}
                                />
                            </>
                        )}

                        {/* Step 2: OTP Verification */}
                        {currentStep === 'otp-verification' && (
                            <OtpVerificationStep
                                formData={formData}
                                otpCode={otpCode}
                                submitting={submitting}
                                onOtpCodeChange={handleOtpCodeChange}
                                onOtpVerification={handleOtpVerification}
                                onResendOtp={handleResendOtp}
                                onBackStep={handleBackStep}
                            />
                        )}

                        {/* Step 3: Payment */}
                        {currentStep === 'payment' && (
                            <PaymentStep
                                formData={formData}
                                selectedProgram={selectedProgram}
                                registrationId={registrationId}
                                selectedPaymentMethod={selectedPaymentMethod}
                                submitting={submitting}
                                onPaymentMethodSelect={handlePaymentMethodSelect}
                                onPaymentProcess={handlePaymentButtonClick} // Changed to show confirmation
                                onBackStep={handleBackStep}
                            />
                        )}
                    </div>
                </div>
            </main>

            {/* Payment Confirmation Popup */}
            <PopupConfirm
                isOpen={showPaymentConfirm}
                onClose={handlePaymentCancel}
                onConfirm={handlePaymentConfirm}
                type="warning"
                title="Konfirmasi Pembayaran"
                message={`Apakah Anda yakin ingin melanjutkan pembayaran dengan metode ${getPaymentMethodName(selectedPaymentMethod)}? Setelah dikonfirmasi, data pembayaran tidak dapat diubah lagi.`}
                confirmText="Ya, Lanjutkan Pembayaran"
                cancelText="Batal"
                isLoading={submitting}
            />
        </div>
    );
};

export default FormPendaftaranPage;
