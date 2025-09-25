'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Calendar, MapPin, Clock, Users, Plane, Trash2 } from 'lucide-react'

interface Booking {
  id: string
  callsign: string
  aircraft: string
  status: string
  createdAt: string
  event: {
    id: string
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    departure: string
    arrival: string
    aircraft: string
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'PILOT' | 'ADMIN'>('PILOT')

  useEffect(() => {
    fetchBookings()
    checkUserRole()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkUserRole = () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUserRole(payload.role)
      } catch (error) {
        console.error('Error parsing token:', error)
      }
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchBookings()
      } else {
        alert('Failed to cancel booking')
      }
    } catch (error) {
      alert('Error canceling booking')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-400'
      case 'CONFIRMED': return 'text-green-400'
      case 'CANCELLED': return 'text-red-400'
      case 'COMPLETED': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {userRole === 'ADMIN' ? 'All Bookings' : 'My Bookings'}
          </h1>
          <p className="text-gray-400">
            {userRole === 'ADMIN' 
              ? 'Manage all pilot bookings' 
              : 'View and manage your flight bookings'
            }
          </p>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Loading bookings...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">No bookings found</div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{booking.event.title}</h3>
                    <p className="text-gray-400">{booking.event.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    {userRole === 'PILOT' && booking.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-gray-400 hover:text-red-400"
                        title="Cancel Booking"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="mr-2" size={14} />
                    {new Date(booking.event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="mr-2" size={14} />
                    {booking.event.startTime} - {booking.event.endTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="mr-2" size={14} />
                    {booking.event.departure} → {booking.event.arrival}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Plane className="mr-2" size={14} />
                    {booking.aircraft}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div>
                    <span className="font-medium">Callsign:</span> {booking.callsign}
                  </div>
                  <div>
                    <span className="font-medium">Booked:</span> {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
