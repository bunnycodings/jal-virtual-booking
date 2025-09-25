'use client'

import React, { useState, useEffect, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plane, Shield, Eye, EyeOff, LogIn, User, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

interface AuthContextType {
  signIn: (pilotId: string) => Promise<void>
  signed: boolean
  token: string | null
}

// Mock AuthContext for this component - replace with your actual AuthContext
const AuthContext = React.createContext<AuthContextType | null>(null)

export default function JALLoginPage() {
  const [pilotId, setPilotId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPilotId, setShowPilotId] = useState(false)
  
  const { t } = useLanguage()
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const isDark = theme === "dark"

  // Check if user is already signed in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const redirectPath = searchParams.get("redirect") || "/dashboard"
      router.push(redirectPath)
    }
  }, [router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/pilot-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pilotId })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        if (data.pilotId) {
          localStorage.setItem('pilotId', data.pilotId)
        }
        
        const redirectPath = searchParams.get("redirect") || "/dashboard"
        router.push(redirectPath)
      } else {
        setError(data.error || t('loginError'))
      }
    } catch (err) {
      setError(t('errors.network.subtitle'))
    } finally {
      setLoading(false)
    }
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
        {Array.from({ length: 40 }).map((_, i) => (
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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Plane className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h1 className="text-4xl font-bold mb-2">{t('jalVirtual')}</h1>
          <p className="text-lg opacity-80">{t('bookingSystem')}</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-sm border ${
            isDark 
              ? 'bg-gray-900/80 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">{t('pilotLogin')}</h2>
            <p className="text-sm opacity-70">{t('jalPilotId')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium opacity-80">
                {t('jalPilotId')}
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPilotId ? 'text' : 'password'}
                  value={pilotId}
                  onChange={(e) => setPilotId(e.target.value)}
                  placeholder="Enter your JAL Pilot ID"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                  } focus:outline-none focus:ring-2`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPilotId(!showPilotId)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPilotId ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-red-900/20 text-red-400 border border-red-800' 
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !pilotId.trim()}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                loading || !pilotId.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              } text-white shadow-lg hover:shadow-xl active:shadow-md`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('signingIn')}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  {t('login')}
                </div>
              )}
            </button>
          </form>

          {/* Admin Login Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/admin-login')}
              className={`text-sm underline transition-colors duration-200 ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              {t('switchToAdmin')}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-sm opacity-60"
        >
          <p>{t('copyright')}</p>
        </motion.div>
      </div>
    </div>
  )
}
