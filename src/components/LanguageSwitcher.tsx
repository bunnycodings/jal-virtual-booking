'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
]

interface LanguageSwitcherProps {
  className?: string
  variant?: 'dropdown' | 'buttons' | 'card'
}

export function LanguageSwitcher({ className, variant = 'dropdown' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const { isAdmin, isPilot } = useUser()

  const changeLanguage = (languageCode: string) => {
    setLanguage(languageCode as any)
  }

  // Hide language switcher for pilots
  if (isPilot) {
    return null
  }

  // For admin users, show dropdown only
  if (isAdmin) {
    return (
      <div className={cn('relative', className)}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    )
  }

  // For non-authenticated users, show buttons variant
  if (variant === 'buttons') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? 'primary' : 'outline'}
            size="sm"
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center gap-2"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </Button>
        ))}
      </div>
    )
  }

  // Default behavior for 'dropdown' and 'card' variants (non-authenticated users)
  return (
    <Card className={cn('p-4', className)}>
      <h3 className="text-lg font-semibold mb-4">Select Language</h3>
      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? 'primary' : 'outline'}
            size="sm"
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center gap-2 justify-start"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  )
}
