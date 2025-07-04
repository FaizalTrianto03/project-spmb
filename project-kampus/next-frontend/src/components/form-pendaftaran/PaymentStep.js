// src/components/form-pendaftaran/PaymentStep.js
import React from 'react';

const PaymentStep = ({ 
    formData, 
    selectedProgram, 
    registrationId, 
    onPaymentMethodSelect, 
    selectedPaymentMethod, 
    onPaymentProcess,
    submitting,
    onBackStep
}) => {
    const paymentMethods = [
        {
            id: 'bank_transfer',
            name: 'Transfer Bank',
            icon: '🏦',
            description: 'Transfer ke rekening bank',
            fee: 0,
            banks: ['BCA', 'BNI', 'BRI', 'Mandiri']
        },
        {
            id: 'virtual_account',
            name: 'Virtual Account',
            icon: '💳',
            description: 'Bayar melalui Virtual Account',
            fee: 2500,
            banks: ['BCA VA', 'BNI VA', 'BRI VA', 'Permata VA']
        },
        {
            id: 'ewallet',
            name: 'E-Wallet',
            icon: '📱',
            description: 'OVO, GoPay, DANA, LinkAja',
            fee: 1000,
            wallets: ['OVO', 'GoPay', 'DANA', 'LinkAja']
        },
        {
            id: 'qris',
            name: 'QRIS',
            icon: '📲',
            description: 'Scan QR Code untuk pembayaran',
            fee: 1500,
            apps: ['Semua aplikasi e-wallet & mobile banking']
        }
    ];

    const registrationFee = selectedProgram?.registrationFee || 200000;
    const adminFee = selectedPaymentMethod ? paymentMethods.find(p => p.id === selectedPaymentMethod)?.fee || 0 : 0;
    const totalAmount = registrationFee + adminFee;

    return (
        <div className="bg-white rounded-xl shadow-lg border p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Pembayaran Pendaftaran
                    </h3>
                    <p className="text-gray-600">
                        Pilih metode pembayaran untuk menyelesaikan pendaftaran
                    </p>
                </div>
            </div>

            {/*  Payment Summary - Konsep sama seperti Email Info di OTP */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-green-900 mb-4">
                            Ringkasan Pembayaran
                        </h4>
                        
                        {/*  Data Summary - Teks hitam, layout rapi */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-medium">ID Pendaftaran</span>
                                <span className="font-mono font-bold text-blue-600">{registrationId}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-medium">Nama Lengkap</span>
                                <span className="font-semibold text-gray-900">{formData.fullName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-medium">Email</span>
                                <span className="font-semibold text-gray-900">{formData.email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-medium">No. HP</span>
                                <span className="font-semibold text-gray-900">{formData.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-medium">Program Studi</span>
                                <span className="font-semibold text-gray-900">{selectedProgram?.name}</span>
                            </div>
                            
                            {/*  Payment Details */}
                            <div className="border-t border-green-200 pt-3 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-900 font-medium">Biaya Pendaftaran</span>
                                    <span className="font-semibold text-gray-900">Rp {registrationFee.toLocaleString('id-ID')}</span>
                                </div>
                                {adminFee > 0 && (
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-900 font-medium">Biaya Admin</span>
                                        <span className="font-semibold text-gray-900">Rp {adminFee.toLocaleString('id-ID')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-green-300">
                                    <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                                    <span className="text-xl font-bold text-green-600">Rp {totalAmount.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Payment Deadline - Konsep sama seperti Demo Info */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-red-800">
                        <strong>Batas Waktu Pembayaran:</strong> 24 jam setelah pendaftaran
                    </span>
                </div>
            </div>

            {/*  Payment Methods - Layout center */}
            <div className="text-center">
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                    Pilih Metode Pembayaran
                </label>
                
                <div className="space-y-3 mb-6">
                    {paymentMethods.map(method => (
                        <div
                            key={method.id}
                            onClick={() => onPaymentMethodSelect(method.id)}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                selectedPaymentMethod === method.id
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{method.icon}</span>
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-semibold text-gray-900">{method.name}</h5>
                                            <div className={`w-4 h-4 rounded-full border-2 ${
                                                selectedPaymentMethod === method.id
                                                    ? 'border-green-500 bg-green-500'
                                                    : 'border-gray-300'
                                            }`}>
                                                {selectedPaymentMethod === method.id && (
                                                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">{method.description}</p>
                                        
                                        {/* Available Options */}
                                        <div className="text-xs text-gray-600">
                                            {method.banks && (
                                                <span>Bank: {method.banks.join(', ')}</span>
                                            )}
                                            {method.wallets && (
                                                <span>E-Wallet: {method.wallets.join(', ')}</span>
                                            )}
                                            {method.apps && (
                                                <span>Support: {method.apps.join(', ')}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {method.fee > 0 ? (
                                        <span className="text-sm text-gray-700">
                                            +Rp {method.fee.toLocaleString('id-ID')}
                                        </span>
                                    ) : (
                                        <span className="text-sm text-green-600 font-semibold">Gratis</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/*  BUTTONS - Konsep sama seperti OTP */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

                    {/* Payment Button */}
                    <button
                        onClick={onPaymentProcess}
                        disabled={!selectedPaymentMethod || submitting}
                        className={`flex-1 font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3 ${
                            !selectedPaymentMethod || submitting
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed transform-none shadow-none'
                                : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                        }`}
                    >
                        {submitting ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses Pembayaran...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Bayar Sekarang - Rp {totalAmount.toLocaleString('id-ID')}
                            </>
                        )}
                    </button>
                </div>

                {!selectedPaymentMethod && (
                    <p className="text-sm text-gray-600 mb-6">
                        Pilih metode pembayaran untuk melanjutkan
                    </p>
                )}
            </div>

            {/*  Help Section - Konsep sama seperti OTP */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Penting untuk Diperhatikan
                    </h4>
                    <div className="text-sm text-gray-600 space-y-2">
                        <p>• Pembayaran harus diselesaikan dalam 24 jam</p>
                        <p>• Simpan bukti pembayaran untuk keperluan verifikasi</p>
                        <p>• Setelah pembayaran, Anda akan menerima konfirmasi via email</p>
                        <p>• Hubungi admin jika mengalami kendala pembayaran</p>
                        <p>• Pastikan data yang diisi sudah benar sebelum melakukan pembayaran</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentStep;
