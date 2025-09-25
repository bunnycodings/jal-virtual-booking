'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'

// Import translations
import enTranslations from '@/i18n/locales/en'
import ptTranslations from '@/i18n/locales/pt'
import frTranslations from '@/i18n/locales/fr'
import esTranslations from '@/i18n/locales/es'
import deTranslations from '@/i18n/locales/de'
import itTranslations from '@/i18n/locales/it'
import jaTranslations from '@/i18n/locales/ja'

const translations = {
  en: enTranslations.translations,
  pt: ptTranslations.translations,
  fr: frTranslations.translations,
  es: esTranslations.translations,
  de: deTranslations.translations,
  it: itTranslations.translations,
  ja: jaTranslations.translations,
}

type Language = keyof typeof translations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useUser()
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Force English for admin users
    if (isAdmin) {
      setLanguageState('en')
      return
    }

    // Get language from localStorage on client side for pilots
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage)
      }
    }
  }, [isAdmin])

  const setLanguage = (lang: Language) => {
    // Prevent language change for admin users
    if (isAdmin) {
      return
    }
    
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return the key if not found anywhere
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}