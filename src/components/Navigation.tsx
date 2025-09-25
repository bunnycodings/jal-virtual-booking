'use client'

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/Button'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { AdminLoginModal } from '@/components/AdminLoginModal'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Calendar, 
  Plane, 
  User, 
  Users, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const { t } = useTranslation()
  const { isAdmin, isPilot, setUser } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = React.useState(false)

  // Base navigation items available to all users
  const baseNavigationItems = [
    { key: 'dashboard', icon: Home, href: '/dashboard' },
    { key: 'events', icon: Calendar, href: '/events' },
    { key: 'bookings', icon: Plane, href: '/bookings' },
    { key: 'flights', icon: Plane, href: '/flights' },
    { key: 'profile', icon: User, href: '/profile' },
  ]

  // Admin-only navigation items
  const adminNavigationItems = [
    { key: 'users', icon: Users, href: '/users' },
    { key: 'settings', icon: Settings, href: '/settings' },
  ]

  // Determine which navigation items to show based on user role
  const navigationItems = isAdmin 
    ? [...baseNavigationItems, ...adminNavigationItems]
    : baseNavigationItems

  const handleAdminLoginSuccess = (user: any) => {
    setUser(user)
    setIsAdminLoginOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <nav className={cn('bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                JAL Virtual
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {t(item.key)}
                </a>
              )
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Show language switcher only for admin */}
            {isAdmin && (
              <LanguageSwitcher variant="dropdown" className="hidden lg:flex" />
            )}
            <ThemeSwitcher />
            
            {/* Admin login button - only show when not logged in as admin */}
            {!isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdminLoginOpen(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
            
            {/* Logout button - only show when logged in */}
            {(isAdmin || isPilot) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {t(item.key)}
                  </a>
                )
              })}
              {/* Show language switcher only for admin in mobile */}
              {isAdmin && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <LanguageSwitcher variant="dropdown" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </nav>
  )
}
