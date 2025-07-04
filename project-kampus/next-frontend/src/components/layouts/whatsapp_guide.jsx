// src/components/layouts/whatsapp_guide.jsx
"use client";

import React from 'react';

// Konfigurasi - mudah untuk diubah
const CONFIG = {
  // Kontak WhatsApp
  whatsapp: {
    phone: '6282315571956',
    message: 'Hallo admin.....Saya ingin bertanya terkait pendaftaran Mahasiswa Baru Universitas Muhammadiyah Manado'
  },
  
  // URL
  urls: {
    userGuide: 'https://spmb.unimman.ac.id/user-guide'
  },
  
  // Assets
  assets: {
    banner: '/assets/banner2.png'
  },
  
  // Text Content
  content: {
    title: 'Butuh Bantuan?',
    description: 'Tim kami siap membantu Anda dengan pertanyaan seputar pendaftaran mahasiswa baru.',
    buttons: {
      whatsapp: 'Chat Admin',
      userGuide: 'Panduan Lengkap'
    }
  }
};

// Generate WhatsApp URL
const generateWhatsAppURL = () => {
  const encodedMessage = encodeURIComponent(CONFIG.whatsapp.message);
  return `https://api.whatsapp.com/send/?phone=${CONFIG.whatsapp.phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
};

const WhatsAppGuide = () => {
  const handleWhatsAppClick = () => {
    window.open(generateWhatsAppURL(), '_blank');
  };

  const handleUserGuideClick = () => {
    window.open(CONFIG.urls.userGuide, '_blank');
  };

  return (
    <section className="py-6 lg:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg min-h-[180px] lg:min-h-[200px] bg-gradient-to-br from-blue-600 to-blue-700"
          style={{
            backgroundImage: `url('${CONFIG.assets.banner}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Blue Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(59, 130, 246, 0.8) 50%, rgba(37, 99, 235, 0.7) 100%)'
            }}
          ></div>

          {/* Background Pattern - lebih subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-20 lg:w-32 h-20 lg:h-32 bg-white rounded-full -translate-y-10 lg:-translate-y-16 translate-x-10 lg:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-16 lg:w-24 h-16 lg:h-24 bg-white rounded-full translate-y-8 lg:translate-y-12 -translate-x-8 lg:-translate-x-12"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0 lg:pr-6">
              <div className="flex items-center justify-center lg:justify-start mb-3 lg:mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-white text-xl lg:text-2xl font-bold">
                  {CONFIG.content.title}
                </h2>
              </div>
              
              <p className="text-white/90 text-sm lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-3 lg:mb-4">
                {CONFIG.content.description}
              </p>

              {/* Stats - compact version */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs lg:text-sm font-medium">Admin Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs lg:text-sm">Respon Cepat</span>
                </div>
              </div>
            </div>

            {/* Right Content - Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-auto lg:flex-shrink-0">
              
              {/* WhatsApp Button - compact */}
              <button
                onClick={handleWhatsAppClick}
                className="group bg-green-500 hover:bg-green-600 text-white px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 min-w-[160px] lg:min-w-[180px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm lg:text-base">{CONFIG.content.buttons.whatsapp}</p>
                  <p className="text-xs lg:text-sm opacity-90">Respon Cepat</p>
                </div>
              </button>

              {/* User Guide Button - compact */}
              <button
                onClick={handleUserGuideClick}
                className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 hover:border-white/70 text-white px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 min-w-[160px] lg:min-w-[180px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm lg:text-base">{CONFIG.content.buttons.userGuide}</p>
                  <p className="text-xs lg:text-sm opacity-90">Baca Dulu</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppGuide;
