'use client'

import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { LanguageProvider } from './LanguageContext'
import { UserProvider } from './UserContext'
import { CookieConsentProvider } from './CookieConsentContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <UserProvider>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </UserProvider>
    </CookieConsentProvider>
  )
}
