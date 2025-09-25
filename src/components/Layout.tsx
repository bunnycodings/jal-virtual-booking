'use client'

import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { verifyToken } from '@/lib/auth'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<{ role: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = verifyToken(token)
      if (payload) {
        setUser({ role: payload.role })
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar userRole={user?.role as 'PILOT' | 'ADMIN'} />
      <main className="ml-16 min-h-screen">
        {children}
      </main>
    </div>
  )
}
