// src/components/form-pendaftaran/OtpVerificationStep.js
import React, { useState, useEffect } from 'react';

const OtpVerificationStep = ({
    formData,
    otpCode,
    submitting,
    onOtpCodeChange,
    onOtpVerification,
    onResendOtp,
    onBackStep //  Prop yang sudah ada
}) => {
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Countdown timer for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResend = () => {
        onResendOtp();
        setCountdown(60);
        setCanResend(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Verifikasi Email
                    </h3>
                    <p className="text-gray-600">
                        Masukkan kode OTP yang telah dikirim ke email Anda
                    </p>
                </div>
            </div>

            {/* Email Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                            Kode OTP telah dikirim ke:
                        </h4>
                        <p className="text-blue-800 font-medium">
                            {formData.email}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                            Silakan cek inbox atau folder spam email Anda
                        </p>
                    </div>
                </div>
            </div>

            {/* OTP Form */}
            <form onSubmit={onOtpVerification} className="space-y-6">
                <div className="text-center">
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                        Masukkan Kode OTP (6 Digit)
                    </label>
                    
                    {/*  OTP Input + Error Message */}
                    <div className="mb-6">
                        <div className="flex justify-center mb-3">
                            <input
                                type="text"
                                value={otpCode}
                                onChange={onOtpCodeChange}
                                placeholder="000000"
                                maxLength={6}
                                className="w-48 px-6 py-4 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-600"
                                disabled={submitting}
                            />
                        </div>
                        
                        {/*  Error Message - Langsung di bawah input */}
                        {otpCode.length !== 6 && otpCode.length > 0 && (
                            <p className="text-blue-600 text-sm font-medium">
                                Kode OTP harus 6 digit
                            </p>
                        )}
                    </div>

                    {/* Demo Info */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-amber-800">
                                Demo Mode: Gunakan kode <strong>123456</strong>
                            </span>
                        </div>
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center mb-6">
                        <p className="text-gray-600 mb-3">
                            Tidak menerima kode OTP?
                        </p>
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={submitting}
                                className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors disabled:opacity-50"
                            >
                                Kirim Ulang Kode OTP
                            </button>
                        ) : (
                            <p className="text-gray-500">
                                Kirim ulang dalam <span className="font-semibold text-blue-600">{countdown}</span> detik
                            </p>
                        )}
                    </div>

                    {/*  BUTTONS - Back & Submit */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={onBackStep}
                            disabled={submitting}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Isi Data
                        </button>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting || otpCode.length !== 6}
                            className={`flex-1 font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3 ${
                                submitting || otpCode.length !== 6
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
                                    Memverifikasi OTP...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Verifikasi OTP
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Bantuan
                    </h4>
                    <div className="text-sm text-gray-600 space-y-2">
                        <p>• Pastikan email yang dimasukkan sudah benar</p>
                        <p>• Cek folder spam/junk jika tidak menerima email</p>
                        <p>• Kode OTP berlaku selama 10 menit</p>
                        <p>• Hubungi admin jika masih mengalami kendala</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationStep;
