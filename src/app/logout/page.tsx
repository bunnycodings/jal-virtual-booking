'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, Plane } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LogoutPage() {
  const { setUser } = useUser()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call logout API (optional - for server-side cleanup)
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      } catch (error) {
        console.error('Logout API error:', error)
        // Continue with logout even if API call fails
      }

      // Clear user data from context and localStorage
      setUser(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('pilotId')

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }

    performLogout()
  }, [setUser, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6"
        >
          <Plane className="w-10 h-10 text-white" />
        </motion.div>

        {/* Logout Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <LogOut className="w-16 h-16 text-white mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-3xl font-bold text-white mb-4"
        >
          {t('logout')}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-blue-200 text-lg mb-8"
        >
          {t('logout')} successful. Redirecting to login...
        </motion.p>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}
