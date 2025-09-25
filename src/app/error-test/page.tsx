'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ErrorTestPage() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    // This will trigger the ErrorPage component
    throw new Error('This is a test error to demonstrate the ErrorPage component!')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>ErrorPage Component Test</CardTitle>
          <CardDescription>
            This page demonstrates the ErrorPage component functionality. 
            Click the button below to trigger an error and see how the ErrorPage handles it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">ErrorPage Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Catches JavaScript errors anywhere in the component tree</li>
              <li>Automatically handles expired tokens (401/403 errors)</li>
              <li>Catches unhandled promise rejections</li>
              <li>Shows different error types (general, network, auth)</li>
              <li>Provides retry and recovery options</li>
              <li>Matches your JAL design with glassmorphism effects</li>
              <li>Supports both light and dark themes</li>
              <li>Includes smooth animations with Framer Motion</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => setShouldError(true)}
              variant="destructive"
              className="flex-1"
            >
              Trigger Test Error
            </Button>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              variant="outline"
              className="flex-1"
            >
              Go to Dashboard
            </Button>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <p className="text-sm">
              The ErrorPage component is wrapped around your entire application in the layout.tsx file. 
              It acts as an error boundary that catches any JavaScript errors and displays a beautiful 
              error recovery page instead of a white screen of death.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
