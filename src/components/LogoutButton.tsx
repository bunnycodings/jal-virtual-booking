'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface LogoutButtonProps {
  className?: string
  variant?: 'button' | 'link' | 'icon'
  showIcon?: boolean
  showText?: boolean
}

export function LogoutButton({ 
  className = '', 
  variant = 'button',
  showIcon = true,
  showText = true 
}: LogoutButtonProps) {
  const { setUser } = useUser()
  const { t } = useLanguage()
  const router = useRouter()

  const handleLogout = async () => {
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

    // Redirect to login page
    router.push('/login')
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
        title={t('logout')}
      >
        <LogOut className="h-5 w-5" />
      </button>
    )
  }

  if (variant === 'link') {
    return (
      <button
        onClick={handleLogout}
        className={`text-sm underline transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${className}`}
      >
        {showIcon && <LogOut className="h-4 w-4 inline mr-1" />}
        {showText && t('logout')}
      </button>
    )
  }

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 ${className}`}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      {showText && t('logout')}
    </button>
  )
}
