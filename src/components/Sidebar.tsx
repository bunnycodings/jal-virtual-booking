'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Info, 
  Plane, 
  ClipboardList, 
  Home, 
  Sun, 
  LogOut,
  Calendar,
  Users,
  Settings
} from 'lucide-react'
import Image from 'next/image'

interface SidebarProps {
  userRole?: 'PILOT' | 'ADMIN'
}

export default function Sidebar({ userRole = 'PILOT' }: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const pathname = usePathname()

  const pilotMenuItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/flights', icon: Plane, label: 'Flights' },
    { href: '/bookings', icon: ClipboardList, label: 'My Bookings' },
    { href: '/profile', icon: Info, label: 'Profile' },
  ]

  const adminMenuItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/flights', icon: Plane, label: 'Flights' },
    { href: '/bookings', icon: ClipboardList, label: 'All Bookings' },
    { href: '/users', icon: Users, label: 'Users' },
    { href: '/admin', icon: Settings, label: 'Admin Panel' },
  ]

  const menuItems = userRole === 'ADMIN' ? adminMenuItems : pilotMenuItems

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // You can implement actual dark mode toggle here
  }

  return (
    <div className={`fixed left-0 top-0 h-full w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 z-50 ${isDarkMode ? 'dark' : ''}`}>
      {/* Logo */}
      <div className="mb-6">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <Image
              src="/img/jal-logo.svg"
              alt="JAL Logo"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-8 h-px bg-gray-600 mb-4"></div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gray-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title={item.label}
            >
              <Icon size={20} />
            </Link>
          )
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col space-y-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          title="Toggle Dark Mode"
        >
          <Sun size={20} />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  )
}
