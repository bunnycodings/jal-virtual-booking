'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'

interface ThemeSwitcherProps {
  className?: string
  variant?: 'button' | 'card'
}

export function ThemeSwitcher({ className, variant = 'button' }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme()

  if (variant === 'card') {
    return (
      <Card className={cn('p-4', className)}>
        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
        <div className="flex gap-2">
          <Button
            variant={theme === 'light' ? 'primary' : 'outline'}
            onClick={() => toggleTheme()}
            className="flex items-center gap-2"
          >
            <Sun className="h-4 w-4" />
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'primary' : 'outline'}
            onClick={() => toggleTheme()}
            className="flex items-center gap-2"
          >
            <Moon className="h-4 w-4" />
            Dark
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={cn('flex items-center gap-2', className)}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </Button>
  )
}
