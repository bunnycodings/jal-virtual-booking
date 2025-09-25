'use client'

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { Plane, Calendar, Users, Settings } from 'lucide-react'

export default function DemoPage() {
  const { t } = useTranslation()
  const { isAdmin, isPilot } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDemoAction = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('jalVirtual')} {t('bookingSystem')} - Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enhanced with modern UI components and multi-language support
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <Plane className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>{t('flights')}</CardTitle>
              <CardDescription>
                Manage flight bookings and schedules
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>{t('events')}</CardTitle>
              <CardDescription>
                Create and manage virtual events
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>{t('users')}</CardTitle>
              <CardDescription>
                User management and permissions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Settings className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>{t('profile')}</CardTitle>
              <CardDescription>
                Personal settings and preferences
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Language Settings - Only show for admin */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Choose your preferred language for the interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LanguageSwitcher variant="card" />
              </CardContent>
            </Card>
          )}

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Switch between light and dark themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSwitcher variant="card" />
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interactive Demo</CardTitle>
            <CardDescription>
              Test the new UI components and features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="JAL Pilot ID"
                placeholder="Enter your pilot ID"
                icon={<Plane className="h-4 w-4" />}
              />
              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleDemoAction} loading={isLoading}>
                {isLoading ? 'Processing...' : 'Demo Action'}
              </Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="destructive">Destructive Button</Button>
            </div>

            {isLoading && (
              <div className="flex justify-center py-4">
                <LoadingIndicator text="Processing your request..." />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system information and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">✓</div>
                <div className="text-sm text-green-700 dark:text-green-300">i18n System</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">✓</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Theme System</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">✓</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">JAL API Integration</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
