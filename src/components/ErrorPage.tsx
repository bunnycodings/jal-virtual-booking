'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { motion } from 'framer-motion'
import { Home, RefreshCw, AlertTriangle, Wifi, WifiOff } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface ErrorPageState {
  hasError: boolean
  errorType: 'general' | 'network' | 'auth' | 'unknown'
}

interface ErrorPageProps {
  children: ReactNode
}

class ErrorPageClass extends Component<ErrorPageProps, ErrorPageState> {
  private unhandledPromiseCallback = (_: any) => {
    this.setState({ hasError: true, errorType: 'unknown' })
  }

  constructor(props: ErrorPageProps) {
    super(props)
    this.state = { hasError: false, errorType: 'general' }
  }

  static getDerivedStateFromError(error: any) {
    // Determine error type based on the error
    let errorType: 'general' | 'network' | 'auth' | 'unknown' = 'general'
    
    if (error?.message?.includes('Network') || error?.message?.includes('fetch')) {
      errorType = 'network'
    } else if (error?.message?.includes('token') || error?.message?.includes('auth')) {
      errorType = 'auth'
    }
    
    return { hasError: true, errorType }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorPage:', error, errorInfo)
    
    // Handle specific error types
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      this.setState({ errorType: 'network' })
    } else if (error.message.includes('token') || error.message.includes('auth') || error.message.includes('401') || error.message.includes('403')) {
      this.setState({ errorType: 'auth' })
      // Try to refresh token or redirect to login
      this.handleAuthError()
    } else {
      this.setState({ errorType: 'general' })
    }
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.unhandledPromiseCallback)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.unhandledPromiseCallback)
  }

  handleAuthError = () => {
    // Clear invalid token and redirect to login
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  }

  onErrorReset = () => {
    // Force page reload to reset state
    window.location.href = '/dashboard'
  }

  onRetry = () => {
    // Reset error state and try again
    this.setState({ hasError: false, errorType: 'general' })
  }

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children
    }

    return <ErrorPageContent 
      errorType={this.state.errorType} 
      onErrorReset={this.onErrorReset}
      onRetry={this.onRetry}
    />
  }
}

// Error Page Content Component
function ErrorPageContent({ 
  errorType, 
  onErrorReset, 
  onRetry 
}: { 
  errorType: 'general' | 'network' | 'auth' | 'unknown'
  onErrorReset: () => void
  onRetry: () => void
}) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  const getErrorContent = () => {
    switch (errorType) {
      case 'network':
        return {
          icon: <WifiOff className="h-16 w-16 text-red-400" />,
          title: t('errors.network.title') || 'Connection Error',
          subtitle: t('errors.network.subtitle') || 'Unable to connect to the server. Please check your internet connection.',
          showRetry: true
        }
      case 'auth':
        return {
          icon: <AlertTriangle className="h-16 w-16 text-yellow-400" />,
          title: t('errors.auth.title') || 'Authentication Error',
          subtitle: t('errors.auth.subtitle') || 'Your session has expired. Redirecting to login...',
          showRetry: false
        }
      default:
        return {
          icon: <AlertTriangle className="h-16 w-16 text-red-400" />,
          title: t('errors.general.title') || 'Something went wrong',
          subtitle: t('errors.general.subtitle') || 'An unexpected error occurred. Please try again.',
          showRetry: true
        }
    }
  }

  const errorContent = getErrorContent()

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-all duration-500 ${
      isDark ? "bg-black text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className={`w-full h-full bg-gradient-to-br ${
          isDark 
            ? "from-red-900/20 via-orange-900/20 to-black/80" 
            : "from-red-100/40 via-orange-100/40 to-indigo-100/60"
        }`} />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-red-500/20" : "bg-red-400/30"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full py-12 px-6 text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          {errorContent.icon}
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl max-w-2xl ${
            isDark 
              ? "bg-white/5 border-white/10" 
              : "bg-white/40 border-white/20"
          }`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {errorContent.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-lg font-medium mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {errorContent.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {errorContent.showRetry && (
              <motion.button
                onClick={onRetry}
                className={`px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 flex items-center gap-3 focus:outline-none focus:ring-4 ${
                  isDark 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:ring-blue-500/50 shadow-2xl shadow-blue-500/25" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 focus:ring-blue-500/50 shadow-2xl shadow-blue-500/25"
                } backdrop-blur-xl hover:scale-105 hover:shadow-3xl`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
              >
                <RefreshCw className="text-2xl" />
                <span>{t('errors.retry') || 'TRY AGAIN'}</span>
              </motion.button>
            )}

            <motion.button
              onClick={onErrorReset}
              className={`px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 flex items-center gap-3 focus:outline-none focus:ring-4 ${
                isDark 
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 focus:ring-gray-500/50 shadow-2xl shadow-gray-500/25" 
                  : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 focus:ring-gray-500/50 shadow-2xl shadow-gray-500/25"
              } backdrop-blur-xl hover:scale-105 hover:shadow-3xl`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
            >
              <Home className="text-2xl" />
              <span>{t('errors.backToHome') || 'BACK TO HOME'}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
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
          ✈️ JAL Virtual • Error Recovery System
        </motion.div>
      </div>
    </div>
  )
}

export const ErrorPage = ErrorPageClass
