'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Plane, Users, Filter, Search, BookOpen } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

interface Slot {
  id: string
  flightNumber: string
  airline: string
  aircraftType: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  gate?: string
  terminal?: string
  status: 'available' | 'booked' | 'delayed'
  slotType: 'departure' | 'landing' | 'private'
}

interface Event {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  departure: string
  arrival: string
}

export default function EventSlotsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { theme } = useTheme()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSlotType, setSelectedSlotType] = useState<'departure' | 'landing' | 'private' | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch event details
        const eventResponse = await fetch(`/api/events/${id}`)
        if (!eventResponse.ok) {
          throw new Error('Event not found')
        }
        const eventData = await eventResponse.json()
        setEvent(eventData)
        
        // Fetch slots
        const slotsResponse = await fetch(`/api/events/${id}/slots`)
        if (!slotsResponse.ok) {
          throw new Error('Failed to load slots')
        }
        const slotsData = await slotsResponse.json()
        setSlots(slotsData)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const filteredSlots = slots.filter(slot => {
    const matchesType = selectedSlotType === 'all' || slot.slotType === selectedSlotType
    const matchesSearch = searchTerm === '' || 
      slot.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.aircraftType.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesType && matchesSearch
  })

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`)
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100 dark:bg-green-900'
      case 'booked':
        return 'text-red-600 bg-red-100 dark:bg-red-900'
      case 'delayed':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900'
    }
  }

  const getSlotTypeColor = (type: string) => {
    switch (type) {
      case 'departure':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900'
      case 'landing':
        return 'text-green-600 bg-green-100 dark:bg-green-900'
      case 'private':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900'
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('errors.notFound.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => router.push('/events')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('errors.backToHome')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <p className="text-lg opacity-80">{t('eventSlots')}</p>
            </div>
            <div className={`text-right ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {event.departure} → {event.arrival}
              </div>
              <div className="text-sm">
                {new Date(event.date).toLocaleDateString()}<br />
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-6 rounded-lg mb-8 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Slot Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSlotType('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedSlotType === 'all'
                    ? 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedSlotType('departure')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedSlotType === 'departure'
                    ? 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('departure')}
              </button>
              <button
                onClick={() => setSelectedSlotType('landing')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedSlotType === 'landing'
                    ? 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('landing')}
              </button>
              <button
                onClick={() => setSelectedSlotType('private')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedSlotType === 'private'
                    ? 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('private')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Slots Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-lg overflow-hidden shadow-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {filteredSlots.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('flightNumber')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('airline')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('aircraftType')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('slotType')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('departure')} / {t('arrival')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSlots.map((slot) => (
                    <tr key={slot.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {slot.flightNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {slot.airline}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {slot.aircraftType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSlotTypeColor(slot.slotType)}`}>
                          {slot.slotType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>{slot.departure} → {slot.arrival}</div>
                          <div className="text-xs text-gray-500">
                            {formatTime(slot.departureTime)} - {formatTime(slot.arrivalTime)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(slot.status)}`}>
                          {slot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {slot.status === 'available' ? (
                          <button
                            onClick={() => router.push(`/events/${id}/book/${slot.id}`)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {t('bookSlot')}
                          </button>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">
                            {slot.status === 'booked' ? 'Booked' : 'Unavailable'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('noFlightsFound')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No slots found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => router.push(`/events/${id}`)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Event Details
          </button>
        </motion.div>
      </div>
    </div>
  )
}
