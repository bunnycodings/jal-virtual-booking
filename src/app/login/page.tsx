'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Plane, Shield, Eye, EyeOff } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

type Star = { top: number; left: number; size: number; dur: number; delay: number }

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'pilot' | 'admin'>('pilot')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    pilotId: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPilotId, setShowPilotId] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const router = useRouter()
  const isDark = theme === "dark"

  useEffect(() => {
    setCurrentTime(new Date())
    const id = setInterval(() => setCurrentTime(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const formattedTime = useMemo(
    () => (currentTime ? currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"),
    [currentTime]
  )

  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      })),
    []
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = loginType === 'pilot' ? '/api/auth/pilot-login' : '/api/auth/admin-login'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        if (loginType === 'pilot' && data.pilotId) {
          localStorage.setItem('pilotId', data.pilotId)
        }
        router.push('/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
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
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-12 px-6 text-center">
        {/* Header */}
        <div className="w-full flex justify-between items-start">
          <div className={`backdrop-blur-xl rounded-2xl p-4 border ${
            isDark 
              ? "bg-white/5 border-white/10 shadow-2xl" 
              : "bg-white/40 border-white/20 shadow-xl"
          }`}>
            <div className={`text-2xl font-bold font-mono ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              <time suppressHydrationWarning>{formattedTime}</time>
            </div>
            <div className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              Local Time
            </div>
          </div>
          
          {/* Theme Toggle and Language Selector */}
          <div className="flex gap-3">
            <LanguageSelector theme={theme} />
            <button
              onClick={toggleTheme}
              className={`backdrop-blur-xl rounded-2xl p-3 border transition-all duration-200 hover:scale-105 ${
                isDark 
                  ? "bg-white/5 border-white/10 hover:bg-white/10" 
                  : "bg-white/40 border-white/20 hover:bg-white/60"
              }`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`text-5xl md:text-6xl font-light tracking-wider mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            JAL VIRTUAL
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl ${
              isDark 
                ? "bg-white/5 border-white/10" 
                : "bg-white/40 border-white/20"
            }`}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold flex items-center gap-4"
            >
              <span className={`${isDark ? "text-white" : "text-gray-900"}`}>
                BOOKING
              </span>
              <span className={`text-3xl ${isDark ? "text-red-400" : "text-red-600"}`}>
                →
              </span>
              <span className={`${isDark ? "text-white" : "text-gray-900"}`}>
                SYSTEM
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`text-lg font-medium mt-4 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Flight Operations Management
            </motion.p>
          </motion.div>

          {/* Login Buttons */}
          <div className="mt-12 flex gap-4">
            <motion.button
              type="button"
              onClick={() => setLoginType('pilot')}
              className={`px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 flex items-center gap-3 focus:outline-none focus:ring-4 ${
                loginType === 'pilot'
                  ? isDark 
                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 focus:ring-red-500/50 shadow-2xl shadow-red-500/25" 
                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 focus:ring-red-500/50 shadow-2xl shadow-red-500/25"
                  : isDark
                    ? "bg-white/10 border border-white/20 hover:bg-white/20 text-white"
                    : "bg-white/60 border border-white/40 hover:bg-white/80 text-gray-900"
              } backdrop-blur-xl hover:scale-105 hover:shadow-3xl`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
            >
              <Plane className="text-2xl" />
              <span>{t('pilotLogin').toUpperCase()}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 flex items-center gap-3 focus:outline-none focus:ring-4 ${
                loginType === 'admin'
                  ? isDark 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:ring-blue-500/50 shadow-2xl shadow-blue-500/25" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 focus:ring-blue-500/50 shadow-2xl shadow-blue-500/25"
                  : isDark
                    ? "bg-white/10 border border-white/20 hover:bg-white/20 text-white"
                    : "bg-white/60 border border-white/40 hover:bg-white/80 text-gray-900"
              } backdrop-blur-xl hover:scale-105 hover:shadow-3xl`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
            >
              <Shield className="text-2xl" />
              <span>{t('adminLogin').toUpperCase()}</span>
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-sm font-medium mt-8 backdrop-blur-xl rounded-2xl px-6 py-3 border ${
            isDark 
              ? "bg-white/5 border-white/10 text-gray-300" 
              : "bg-white/40 border-white/20 text-gray-600"
          }`}
        >
          ✈️ {t('jalVirtual')} • {t('bookingSystem')}
        </motion.div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
        
        <motion.div
          role="dialog"
          aria-modal
          aria-labelledby="loginTitle"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className={`fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl border shadow-2xl rounded-3xl overflow-hidden ${
            isDark 
              ? "bg-white/5 border-white/10" 
              : "bg-white/60 border-white/20"
          }`}
        >
          <div className="p-6">
            <h3 id="loginTitle" className={`text-xl font-bold mb-6 flex items-center gap-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-blue-500/20" : "bg-blue-100/80"
              }`}>
                {loginType === 'pilot' ? <Plane className="text-lg" /> : <Shield className="text-lg" />}
              </div>
              {loginType === 'pilot' ? t('pilotLogin') : t('adminLogin')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {loginType === 'admin' && (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        isDark 
                          ? "bg-white/10 border-white/20 focus:ring-blue-500/50 text-white placeholder-gray-400" 
                          : "bg-white/80 border-white/40 focus:ring-blue-500/50 text-gray-900 placeholder-gray-500"
                      } backdrop-blur-sm`}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {t('password')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full px-4 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 pr-12 ${
                          isDark 
                            ? "bg-white/10 border-white/20 focus:ring-blue-500/50 text-white placeholder-gray-400" 
                            : "bg-white/80 border-white/40 focus:ring-blue-500/50 text-gray-900 placeholder-gray-500"
                        } backdrop-blur-sm`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium transition-colors ${
                          isDark 
                            ? "text-gray-300 hover:text-white" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {loginType === 'pilot' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {t('jalPilotId')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPilotId ? "text" : "password"}
                      required
                      value={formData.pilotId}
                      onChange={(e) => setFormData({ ...formData, pilotId: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 pr-12 tracking-widest ${
                        isDark 
                          ? "bg-white/10 border-white/20 focus:ring-blue-500/50 text-white placeholder-gray-400" 
                          : "bg-white/80 border-white/40 focus:ring-blue-500/50 text-gray-900 placeholder-gray-500"
                      } backdrop-blur-sm`}
                      placeholder="Enter your JAL Pilot ID"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPilotId(!showPilotId)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium transition-colors ${
                        isDark 
                          ? "text-gray-300 hover:text-white" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPilotId ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className={`text-xs mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Enter your JAL Virtual Pilot ID (API key) from{' '}
                    <a href="https://crew.jalvirtual.com/api" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:underline">
                      crew.jalvirtual.com
                    </a>
                  </p>
                </div>
              )}

              {error && (
                <div className={`p-3 rounded-2xl border ${
                  isDark 
                    ? "bg-red-500/10 border-red-500/20 text-red-300" 
                    : "bg-red-100/80 border-red-200/60 text-red-600"
                }`} role="alert">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLoginType(loginType === 'pilot' ? 'admin' : 'pilot')}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 ${
                    isDark 
                      ? "bg-white/10 border border-white/20 hover:bg-white/20 text-white" 
                      : "bg-white/60 border border-white/40 hover:bg-white/80 text-gray-900"
                  } backdrop-blur-sm`}
                >
                  {loginType === 'pilot' ? t('switchToAdmin') : t('switchToPilot')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 flex items-center gap-2 ${
                    isDark 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25" 
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25"
                  } backdrop-blur-sm`}
                >
                  {loading && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a 8 8 0 0 1 8-8v2a6 6 0 0 0-6 6H4z" />
                    </svg>
                  )}
                  {loading ? t('signingIn') : t('login')}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
