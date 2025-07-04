
'use client';

import { useEffect } from 'react';

export default function PopupConfirm({
    isOpen,
    onClose,
    onConfirm,
    type = 'confirmation', // 'confirmation', 'danger', 'warning', 'info'
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false
}) {
    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && !isLoading) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, isLoading]);

    if (!isOpen) return null;

    // Type configurations
    const typeConfig = {
        confirmation: {
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            confirmBg: 'bg-blue-600 hover:bg-blue-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        danger: {
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            confirmBg: 'bg-red-600 hover:bg-red-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            )
        },
        warning: {
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            confirmBg: 'bg-yellow-600 hover:bg-yellow-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            )
        },
        info: {
            iconBg: 'bg-slate-100',
            iconColor: 'text-slate-600',
            confirmBg: 'bg-slate-600 hover:bg-slate-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    };

    const config = typeConfig[type] || typeConfig.confirmation;

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget && !isLoading) {
                    onClose();
                }
            }}
        >
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-200 scale-100">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <div className={config.iconColor}>
                                {config.icon}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                {title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2.5 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium ${config.confirmBg}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                confirmText
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
