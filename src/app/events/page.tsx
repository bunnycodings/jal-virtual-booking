'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import CreateEventModal from '@/components/CreateEventModal'
import { Calendar, MapPin, Clock, Users, Plus, Edit, Trash2 } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  departure: string
  arrival: string
  aircraft: string
  maxSlots: number
  isActive: boolean
  bookings: any[]
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'PILOT' | 'ADMIN'>('PILOT')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchEvents()
    checkUserRole()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error('Error fetching events:', error)
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

  const handleBookEvent = async (eventId: string) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      })

      if (response.ok) {
        alert('Successfully booked!')
        fetchEvents()
      } else {
        alert('Booking failed')
      }
    } catch (error) {
      alert('Error booking event')
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchEvents()
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      alert('Error deleting event')
    }
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
            <p className="text-gray-400">Browse and book virtual aviation events</p>
          </div>
          {userRole === 'ADMIN' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="mr-2" size={16} />
              Create Event
            </button>
          )}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Loading events...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  {userRole === 'ADMIN' && (
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-gray-400 mb-4">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="mr-2" size={14} />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="mr-2" size={14} />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="mr-2" size={14} />
                    {event.departure} → {event.arrival}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Users className="mr-2" size={14} />
                    {event.bookings.length}/{event.maxSlots} slots
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-4">
                  Aircraft: {event.aircraft}
                </div>

                {userRole === 'PILOT' && (
                  <button
                    onClick={() => handleBookEvent(event.id)}
                    disabled={event.bookings.length >= event.maxSlots}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      event.bookings.length >= event.maxSlots
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {event.bookings.length >= event.maxSlots ? 'Fully Booked' : 'Book Event'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="text-gray-400">No events available</div>
          </div>
        )}

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onEventCreated={fetchEvents}
        />
      </div>
    </Layout>
  )
}
