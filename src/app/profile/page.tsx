'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { User, Mail, Plane, Calendar, Shield } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  callsign: string
  role: string
  jalId: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setProfile(data.user)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-400">Loading profile...</div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!profile) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-400">Profile not found</div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">View and manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-400">{profile.callsign}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Plane className="mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Callsign</p>
                  <p className="text-white">{profile.callsign}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Shield className="mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-white capitalize">{profile.role.toLowerCase()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">JAL Virtual ID</p>
                  <p className="text-white">{profile.jalId}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-white">December 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">5</p>
                <p className="text-sm text-gray-400">Total Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">127</p>
                <p className="text-sm text-gray-400">Flight Hours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">12</p>
                <p className="text-sm text-gray-400">Events Attended</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
