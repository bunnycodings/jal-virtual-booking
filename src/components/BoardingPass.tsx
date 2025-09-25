'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plane, Calendar, Clock, MapPin, User } from 'lucide-react'

interface BoardingPassProps {
  booking: {
    id: string
    event: {
      title: string
      date: string
      startTime: string
      departure: string
      arrival: string
      aircraft?: string
    }
    callsign: string
    aircraft: string
    status: string
    createdAt: string
  }
  user: {
    firstName?: string
    lastName?: string
    callsign?: string
    jalId?: string
  }
  theme?: 'light' | 'dark'
}

export default function BoardingPass({ booking, user, theme = 'dark' }: BoardingPassProps) {
  const isDark = theme === 'dark'
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`max-w-md mx-auto p-6 rounded-3xl border shadow-2xl ${
        isDark 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" 
          : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isDark ? "bg-red-500/20" : "bg-red-100"
          }`}>
            <Plane className={`text-2xl ${isDark ? "text-red-400" : "text-red-600"}`} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              JAL Virtual
            </h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Boarding Pass
            </p>
          </div>
        </div>
        
        <div className={`text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          <p className="text-sm font-medium">Status</p>
          <p className={`text-lg font-bold ${
            booking.status === 'CONFIRMED' 
              ? isDark ? "text-green-400" : "text-green-600"
              : booking.status === 'PENDING'
              ? isDark ? "text-yellow-400" : "text-yellow-600"
              : isDark ? "text-red-400" : "text-red-600"
          }`}>
            {booking.status}
          </p>
        </div>
      </div>

      {/* Flight Information */}
      <div className={`p-4 rounded-2xl mb-4 ${
        isDark ? "bg-gray-700/50" : "bg-gray-100/50"
      }`}>
        <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
          {booking.event.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
            <div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Date</p>
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                {formatDate(booking.event.date)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
            <div>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Departure</p>
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                {formatTime(booking.event.startTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>From</p>
          <p className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {booking.event.departure}
          </p>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className={`w-16 h-0.5 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
          <Plane className={`w-6 h-6 mx-2 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
          <div className={`w-16 h-0.5 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>
        
        <div className="text-center">
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>To</p>
          <p className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {booking.event.arrival}
          </p>
        </div>
      </div>

      {/* Passenger Information */}
      <div className={`p-4 rounded-2xl mb-4 ${
        isDark ? "bg-gray-700/50" : "bg-gray-100/50"
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <User className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
          <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            Passenger Information
          </h4>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Name</p>
            <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              {user.firstName} {user.lastName}
            </p>
          </div>
          
          <div>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Callsign</p>
            <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              {user.callsign || booking.callsign}
            </p>
          </div>
          
          <div>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>JAL ID</p>
            <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              {user.jalId || 'N/A'}
            </p>
          </div>
          
          <div>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Aircraft</p>
            <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              {booking.aircraft}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="flex justify-between items-center text-xs">
        <div>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Booking ID</p>
          <p className={`font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {booking.id.slice(-8).toUpperCase()}
          </p>
        </div>
        
        <div className="text-right">
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Booked</p>
          <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>

      {/* Barcode */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-400">
        <div className="flex justify-center">
          <div className={`w-full h-8 bg-gradient-to-r from-black to-white rounded ${
            isDark ? "opacity-80" : "opacity-60"
          }`} />
        </div>
        <p className={`text-center text-xs mt-2 font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {booking.id.replace(/-/g, '').toUpperCase()}
        </p>
      </div>
    </motion.div>
  )
}
