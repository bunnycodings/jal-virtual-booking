'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function JALLoginPage() {
  const [pilotId, setPilotId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('jalVirtual')}</h1>
          <p className="text-blue-200">{t('bookingSystem')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">{t('pilotLogin')}</h2>
            <p className="text-blue-200 text-sm">{t('jalPilotId')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t('jalPilotId')}
              </label>
              <input
                type="password"
                value={pilotId}
                onChange={(e) => setPilotId(e.target.value)}
                placeholder="Enter your JAL Pilot ID"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !pilotId.trim()}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('signingIn')}
                </div>
              ) : (
                t('login')
              )}
            </button>
          </form>

          {/* Admin Login Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/admin-login')}
              className="text-sm text-blue-300 hover:text-blue-200 underline transition-colors duration-200"
            >
              {t('switchToAdmin')}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-200 text-sm">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </div>
  )
}
