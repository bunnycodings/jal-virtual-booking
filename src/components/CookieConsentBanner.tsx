'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { ConsentAnswers, useCookieConsent } from '@/contexts/CookieConsentContext'

export function CookieConsentBanner() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { showCookieConsent, setCookieConsent } = useCookieConsent()
  
  const isDark = theme === 'dark'

  if (!showCookieConsent) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${
          isDark 
            ? 'bg-gray-900 border-t border-gray-700' 
            : 'bg-white border-t border-gray-200'
        } shadow-lg`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Cookie Icon */}
            <div className="flex-shrink-0">
              <Cookie className={`h-8 w-8 ${
                isDark ? 'text-yellow-400' : 'text-yellow-600'
              }`} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">
                {t('cookies.title')}
              </h3>
              <p className="text-sm opacity-80">
                {t('cookies.subtitle')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <button
                onClick={() => setCookieConsent(ConsentAnswers.ACCEPTED)}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {t('cookies.authorizeUse')}
              </button>
              
              <button
                onClick={() => setCookieConsent(ConsentAnswers.DECLINED)}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                }`}
              >
                {t('cookies.continueWithout')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
