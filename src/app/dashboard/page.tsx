'use client'

import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plane, Calendar, Users, Settings, TrendingUp, Clock } from 'lucide-react'

export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome to JAL Virtual Booking System</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Flights</CardTitle>
              <Plane className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-gray-400">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-400">+3 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156</div>
              <p className="text-xs text-gray-400">+8 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">System Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Online</div>
              <p className="text-xs text-gray-400">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Bookings</CardTitle>
              <CardDescription className="text-gray-400">Latest flight bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-white">JAL123 - Tokyo to Osaka</p>
                      <p className="text-xs text-gray-400">Pilot: JAL001</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">2h ago</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-white">JAL456 - Osaka to Fukuoka</p>
                      <p className="text-xs text-gray-400">Pilot: JAL002</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">4h ago</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-white">JAL789 - Fukuoka to Tokyo</p>
                      <p className="text-xs text-gray-400">Pilot: JAL003</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">6h ago</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Information</CardTitle>
              <CardDescription className="text-gray-400">Current system status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-300">Server Uptime</span>
                  </div>
                  <span className="text-sm text-white">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Plane className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">Active Flights</span>
                  </div>
                  <span className="text-sm text-white">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Online Pilots</span>
                  </div>
                  <span className="text-sm text-white">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-gray-300">System Load</span>
                  </div>
                  <span className="text-sm text-white">Low</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
