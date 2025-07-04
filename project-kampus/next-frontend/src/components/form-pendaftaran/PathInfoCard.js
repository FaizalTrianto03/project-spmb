// src/components/form-pendaftaran/PathInfoCard.js
import React, { useState } from 'react';

const PathInfoCard = ({ 
    pathData, 
    onChangePath,
    availablePaths = [],
    currentFormData = {},
    hasFormData = false,
    loading = false,
    onPathSelect
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isChangingPath, setIsChangingPath] = useState(false);

    // Handle ketika jalur baru dipilih
    const handlePathSelection = async (newPath) => {
        if (newPath.id === pathData.id) {
            setShowDropdown(false);
            return;
        }

        setIsChangingPath(true);
        setShowDropdown(false);
        
        try {
            if (onPathSelect) {
                await onPathSelect(newPath, currentFormData);
            } else if (onChangePath) {
                await onChangePath(newPath);
            }
        } catch (error) {
            console.error('Error changing path:', error);
        } finally {
            setIsChangingPath(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
            <div className="space-y-6">
                {/* Current Path Info - Compact */}
                <div>
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Kamu memilih jalur pendaftaran
                        </h3>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">
                                        {pathData.name}
                                    </h4>
                                    <div className="flex gap-2 text-sm mt-1">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                                            {pathData.wave}
                                        </span>
                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                                            {pathData.study_system}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown untuk Pindah Jalur */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                disabled={loading || isChangingPath}
                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                {isChangingPath ? 'Memindahkan...' : 'Pindah Jalur'}
                                {!isChangingPath && (
                                    <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                                {isChangingPath && (
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && !isChangingPath && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                                    <div className="p-3 border-b bg-gray-50 rounded-t-lg">
                                        <h4 className="font-semibold text-gray-900 text-sm">Pilih Jalur Lain</h4>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {availablePaths.map((path) => {
                                            const isCurrentPath = path.id === pathData.id;
                                            
                                            return (
                                                <button
                                                    key={path.id}
                                                    onClick={() => handlePathSelection(path)}
                                                    disabled={isCurrentPath}
                                                    className={`w-full text-left p-3 hover:bg-gray-50 transition-colors border-b last:border-b-0 ${
                                                        isCurrentPath ? 'bg-blue-50 cursor-default' : ''
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-sm mb-1">
                                                                {path.name}
                                                            </div>
                                                            <div className="flex gap-1 text-xs">
                                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                                    {path.wave}
                                                                </span>
                                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                                    {path.study_system}
                                                                </span>
                                                            </div>
                                                            {path.description && (
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {path.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {isCurrentPath && (
                                                            <div className="ml-2">
                                                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                                    Terpilih
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-b-lg">
                                        <p className="text-xs text-gray-600">
                                            Klik jalur untuk langsung pindah
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="text-orange-900 font-bold text-base mb-1">
                                Lengkapi datamu Sekarang
                            </h4>
                            <p className="text-orange-800 text-sm">
                                Jangan sampai kehabisan kuota! Sedikit lagi kamu akan terdaftar di perguruan tinggi impianmu.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Click outside to close dropdown */}
                {showDropdown && (
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowDropdown(false)}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default PathInfoCard;
