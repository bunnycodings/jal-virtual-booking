'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Users, Calendar, Plane, BarChart3, Settings } from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalEvents: number
  totalBookings: number
  activeEvents: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalEvents: 0,
    totalBookings: 0,
    activeEvents: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Mock data for now - in a real app, you'd fetch from API
      setStats({
        totalUsers: 156,
        totalEvents: 12,
        totalBookings: 89,
        activeEvents: 8
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-400">Loading admin panel...</div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage the JAL Virtual booking system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-blue-400">{stats.totalUsers}</p>
              </div>
              <Users className="text-blue-400" size={32} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Events</p>
                <p className="text-3xl font-bold text-green-400">{stats.totalEvents}</p>
              </div>
              <Calendar className="text-green-400" size={32} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Bookings</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.totalBookings}</p>
              </div>
              <Plane className="text-yellow-400" size={32} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Events</p>
                <p className="text-3xl font-bold text-purple-400">{stats.activeEvents}</p>
              </div>
              <BarChart3 className="text-purple-400" size={32} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
              <Calendar className="mr-2" size={20} />
              Create New Event
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
              <Users className="mr-2" size={20} />
              Manage Users
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
              <Settings className="mr-2" size={20} />
              System Settings
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">New booking created for Tokyo to Osaka Express</span>
              </div>
              <span className="text-sm text-gray-400">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300">New event "International Route" created</span>
              </div>
              <span className="text-sm text-gray-400">1 hour ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-gray-300">User registration: JAL002</span>
              </div>
              <span className="text-sm text-gray-400">3 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Booking cancelled for Regional Flight</span>
              </div>
              <span className="text-sm text-gray-400">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
