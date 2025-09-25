'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Plane, Search, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'

interface NotFoundPageProps {
  showBackButton?: boolean
  customTitle?: string
  customSubtitle?: string
}

export function NotFoundPage({ 
  showBackButton = true, 
  customTitle,
  customSubtitle 
}: NotFoundPageProps) {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { user } = useUser()
  const router = useRouter()
  
  const isDark = theme === 'dark'

  const handleBackClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  const handleHomeClick = () => {
    router.push('/')
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-all duration-500 ${
      isDark ? "bg-black text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
    }`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className={`w-full h-full bg-gradient-to-br ${
          isDark 
            ? "from-blue-900/30 via-purple-900/30 to-black/80" 
            : "from-blue-100/40 via-purple-100/40 to-indigo-100/60"
        }`} />
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`, 
              width: Math.random() * 2 + 1, 
              height: Math.random() * 2 + 1 
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full py-12 px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Plane className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h1 className="text-3xl font-bold mb-2">{t('jalVirtual')}</h1>
          <p className="text-lg opacity-80">{t('bookingSystem')}</p>
        </motion.div>

        {/* 404 Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className={`relative w-64 h-64 rounded-full ${
            isDark ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm border-2 border-dashed ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          } flex items-center justify-center`}>
            <Search className={`h-24 w-24 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <div className="absolute top-4 right-4 text-6xl font-bold text-red-500">
              4
            </div>
            <div className="absolute bottom-4 left-4 text-6xl font-bold text-red-500">
              4
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8 max-w-md"
        >
          <h2 className="text-4xl font-bold mb-4 text-red-500">
            {customTitle || t('errors.notFound.title')}
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            {customSubtitle || t('errors.notFound.subtitle')}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } shadow-lg hover:shadow-xl`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {user ? t('errors.backToDashboard') : t('errors.backToHome')}
            </button>
          )}
          
          <button
            onClick={handleHomeClick}
            className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
            } shadow-lg hover:shadow-xl`}
          >
            <Home className="h-5 w-5 mr-2" />
            {t('errors.backToHome')}
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center text-sm opacity-60"
        >
          <p>{t('copyright')}</p>
        </motion.div>
      </div>
    </div>
  )
}
