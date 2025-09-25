'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Plane, Users, FileText, Headphones, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

interface Event {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  departure: string
  arrival: string
  aircraft?: string
  maxSlots: number
  availableSlots: number
  bookedSlots: number
  pilotBriefing?: string
  atcBriefing?: string
  sceneries?: {
    simulator: string
    freeware: string[]
    payware: string[]
  }[]
}

export default function EventDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { theme } = useTheme()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/events/${id}`)
        
        if (!response.ok) {
          throw new Error('Event not found')
        }
        
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEvent()
    }
  }, [id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`)
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
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
      <div className="max-w-6xl mx-auto px-4 py-8">
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
              <p className="text-lg opacity-80">{event.description}</p>
            </div>
            <div className={`text-right ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {event.departure} → {event.arrival}
              </div>
              <div className="text-sm">
                {formatDate(event.date)}<br />
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description */}
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4">{t('eventDescription')}</h3>
              <p className="whitespace-pre-line leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4">{t('eventDetails')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('eventDate')}:</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('startTime')}:</span>
                  <span>{formatTime(event.startTime)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('departure')}:</span>
                  <span>{event.departure}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('arrival')}:</span>
                  <span>{event.arrival}</span>
                </div>
                {event.aircraft && (
                  <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{t('aircraft')}:</span>
                    <span>{event.aircraft}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Briefings */}
            {(event.pilotBriefing || event.atcBriefing) && (
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4">Briefings</h3>
                <div className="space-y-4">
                  {event.pilotBriefing && (
                    <a
                      href={event.pilotBriefing}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div className="flex-1">
                        <h4 className="font-medium">{t('pilotBriefing')}</h4>
                        <p className="text-sm opacity-80">Click to view pilot briefing</p>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {event.atcBriefing && (
                    <a
                      href={event.atcBriefing}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Headphones className="h-6 w-6 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-medium">{t('atcBriefing')}</h4>
                        <p className="text-sm opacity-80">Click to view ATC briefing</p>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Sceneries */}
            {event.sceneries && event.sceneries.length > 0 && (
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4">{t('sceneries')}</h3>
                <div className="space-y-4">
                  {event.sceneries.map((scenery, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{scenery.simulator.toUpperCase()}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scenery.freeware.length > 0 && (
                          <div>
                            <h5 className="font-medium text-green-600 mb-2">{t('freeware')}</h5>
                            <ul className="space-y-1">
                              {scenery.freeware.map((item, idx) => (
                                <li key={idx} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {scenery.payware.length > 0 && (
                          <div>
                            <h5 className="font-medium text-blue-600 mb-2">{t('payware')}</h5>
                            <ul className="space-y-1">
                              {scenery.payware.map((item, idx) => (
                                <li key={idx} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Slot Information */}
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4">{t('availableSlots')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('maxSlots')}:</span>
                  <span className="text-lg font-bold">{event.maxSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('bookedSlots')}:</span>
                  <span className="text-lg font-bold text-red-600">{event.bookedSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('availableSlots')}:</span>
                  <span className="text-lg font-bold text-green-600">{event.availableSlots}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.bookedSlots / event.maxSlots) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/events/${id}/slots`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Users className="h-5 w-5" />
                  {t('eventSlots')}
                </button>
                <button
                  onClick={() => router.push('/events')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t('errors.backToHome')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
