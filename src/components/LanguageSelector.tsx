'use client';

import React from 'react';
import { useI18n, Language } from '@/contexts/I18nContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1">
      {/* Sliding background */}
      <div
        className={`absolute top-1 bottom-1 w-[44px] rounded-full bg-secondary transition-all duration-500 ease-in-out ${
          language === 'en' ? 'left-1' : 'left-[45px]'
        }`}
      />
      
      {/* Language buttons */}
      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 ${
          language === 'en'
            ? 'text-white'
            : 'text-gray-600'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`relative z-10 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 ${
          language === 'es'
            ? 'text-white'
            : 'text-gray-600'
        }`}
        aria-label="Switch to Spanish"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSelector;
