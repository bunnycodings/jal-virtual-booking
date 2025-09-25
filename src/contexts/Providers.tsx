'use client'

import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { LanguageProvider } from './LanguageContext'
import { UserProvider } from './UserContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </UserProvider>
  )
}
