'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export enum ConsentAnswers {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING'
}

interface CookieConsentContextType {
  cookieConsent: ConsentAnswers
  setCookieConsent: (consent: ConsentAnswers) => void
  showCookieConsent: boolean
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

interface CookieConsentProviderProps {
  children: ReactNode
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [cookieConsent, setCookieConsentState] = useState<ConsentAnswers>(ConsentAnswers.PENDING)
  const [showCookieConsent, setShowCookieConsent] = useState(false)

  useEffect(() => {
    // Check localStorage for existing consent
    const storedConsent = localStorage.getItem('cookieConsent') as ConsentAnswers
    if (storedConsent && Object.values(ConsentAnswers).includes(storedConsent)) {
      setCookieConsentState(storedConsent)
      setShowCookieConsent(false)
    } else {
      setShowCookieConsent(true)
    }
  }, [])

  const setCookieConsent = (consent: ConsentAnswers) => {
    setCookieConsentState(consent)
    localStorage.setItem('cookieConsent', consent)
    setShowCookieConsent(false)
    
    // Handle analytics based on consent
    if (consent === ConsentAnswers.ACCEPTED) {
      // Enable analytics tracking
      console.log('Analytics enabled')
      // You can add Google Analytics or other tracking here
    } else {
      // Disable analytics tracking
      console.log('Analytics disabled')
    }
  }

  return (
    <CookieConsentContext.Provider value={{
      cookieConsent,
      setCookieConsent,
      showCookieConsent
    }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
