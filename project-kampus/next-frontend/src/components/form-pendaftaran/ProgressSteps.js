// src/components/form-pendaftaran/ProgressSteps.js
import React from 'react';

const ProgressSteps = ({ currentStep, onBackStep, canGoBack = false }) => {
    const steps = [
        { id: 'form', name: 'Isi Data', number: 1 },
        { id: 'otp-verification', name: 'Verifikasi OTP', number: 2 },
        { id: 'payment', name: 'Pembayaran', number: 3 }
    ];

    const getStepStatus = (stepId) => {
        const currentIndex = steps.findIndex(step => step.id === currentStep);
        const stepIndex = steps.findIndex(step => step.id === stepId);
        
        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'current';
        return 'upcoming';
    };

    const handleBackToForm = () => {
        if (onBackStep) {
            onBackStep(); // Langsung ke form
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-6 mb-8">
            {/* Back Button - jika bisa back */}
            {canGoBack && onBackStep && (
                <div className="mb-6">
                    <button
                        onClick={handleBackToForm}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                    >
                        <svg 
                            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium text-sm sm:text-base">Kembali ke Isi Data</span>
                    </button>
                </div>
            )}

            {/* Progress Steps - Desktop (Horizontal) */}
            <div className="hidden sm:flex items-center justify-between">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    
                    return (
                        <React.Fragment key={step.id}>
                            {/* Step */}
                            <div className={`flex items-center gap-3 ${
                                status === 'current' ? 'text-blue-600' : 
                                status === 'completed' ? 'text-green-600' : 
                                'text-gray-400'
                            }`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    status === 'current' ? 'bg-blue-100 text-blue-600' : 
                                    status === 'completed' ? 'bg-green-100 text-green-600' : 
                                    'bg-gray-100 text-gray-400'
                                }`}>
                                    {status === 'completed' ? '✓' : step.number}
                                </div>
                                <span className="font-semibold">{step.name}</span>
                            </div>
                            
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-4 ${
                                    status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                                }`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Progress Steps - Mobile (Vertical) */}
            <div className="sm:hidden space-y-2">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    
                    return (
                        <div key={step.id} className="relative">
                            {/* Step */}
                            <div className={`flex items-center gap-3 ${
                                status === 'current' ? 'text-blue-600' : 
                                status === 'completed' ? 'text-green-600' : 
                                'text-gray-400'
                            }`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                    status === 'current' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-50' : 
                                    status === 'completed' ? 'bg-green-100 text-green-600 ring-2 ring-green-50' : 
                                    'bg-gray-100 text-gray-400'
                                }`}>
                                    {status === 'completed' ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : step.number}
                                </div>
                                <div className="flex-1">
                                    <span className={`font-semibold text-sm ${
                                        status === 'current' ? 'text-blue-600' : 
                                        status === 'completed' ? 'text-green-600' : 
                                        'text-gray-400'
                                    }`}>
                                        {step.name}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Vertical Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex justify-start ml-4 py-1">
                                    <div className={`w-0.5 h-4 ${
                                        status === 'completed' ? 'bg-green-300' : 
                                        status === 'current' ? 'bg-blue-300' : 'bg-gray-200'
                                    }`}></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step Info */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100">
                <div className="text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                        Step {steps.findIndex(step => step.id === currentStep) + 1} dari {steps.length}
                        {canGoBack && (
                            <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0 text-blue-600">
                                <span className="hidden sm:inline">• </span>
                                Klik "Kembali ke Isi Data" untuk mengubah informasi
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgressSteps;