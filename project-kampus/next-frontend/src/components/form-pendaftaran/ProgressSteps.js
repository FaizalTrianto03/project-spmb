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
        <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
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
                        <span className="font-medium">Kembali ke Isi Data</span>
                    </button>
                </div>
            )}

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
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

            {/* Step Info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Step {steps.findIndex(step => step.id === currentStep) + 1} dari {steps.length}
                        {canGoBack && (
                            <span className="ml-2 text-blue-600">• Klik "Kembali ke Isi Data" untuk mengubah informasi</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgressSteps;
