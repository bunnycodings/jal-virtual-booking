'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Clock, Plane, MapPin, Calendar } from 'lucide-react'
import { BoardingPass } from './BoardingPass'

interface FlightConfirmationProps {
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
    firstName: string
    lastName: string
    callsign?: string
    jalId: string
  }
  onClose: () => void
  theme?: 'light' | 'dark'
}

type ConfirmationStep = 'processing' | 'success' | 'error'

export default function FlightConfirmation({ booking, user, onClose, theme = 'dark' }: FlightConfirmationProps) {
  const [step, setStep] = useState<ConfirmationStep>('processing')
  const isDark = theme === 'dark'

  React.useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      setStep('success')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const getStepIcon = () => {
    switch (step) {
      case 'processing':
        return <Clock className="w-8 h-8 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case 'error':
        return <XCircle className="w-8 h-8 text-red-500" />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 'processing':
        return 'Processing Your Booking...'
      case 'success':
        return 'Booking Confirmed!'
      case 'error':
        return 'Booking Failed'
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 'processing':
        return 'Please wait while we confirm your flight booking with JAL Virtual.'
      case 'success':
        return 'Your flight has been successfully booked. Your boarding pass is ready!'
      case 'error':
        return 'There was an error processing your booking. Please try again.'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
            isDark 
              ? "bg-gray-900 border-gray-700" 
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDark ? "bg-blue-500/20" : "bg-blue-100"
                }`}>
                  <Plane className={`text-2xl ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Flight Confirmation
                  </h2>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    JAL Virtual Booking System
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className={`p-2 rounded-2xl transition-colors ${
                  isDark 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Processing Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                {getStepIcon()}
              </div>
              
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {getStepTitle()}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {getStepDescription()}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 ${
                    step === 'processing' || step === 'success' || step === 'error' ? 'opacity-100' : 'opacity-50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 'processing' || step === 'success' || step === 'error'
                        ? isDark ? "bg-blue-500/20" : "bg-blue-100"
                        : isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}>
                      <CheckCircle className={`w-4 h-4 ${
                        step === 'processing' || step === 'success' || step === 'error'
                          ? isDark ? "text-blue-400" : "text-blue-600"
                          : isDark ? "text-gray-500" : "text-gray-400"
                      }`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      step === 'processing' || step === 'success' || step === 'error'
                        ? isDark ? "text-white" : "text-gray-900"
                        : isDark ? "text-gray-500" : "text-gray-400"
                    }`}>
                      Validate
                    </span>
                  </div>
                  
                  <div className={`w-8 h-0.5 ${
                    step === 'success' || step === 'error' ? 'bg-blue-500' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`} />
                  
                  <div className={`flex items-center gap-2 ${
                    step === 'success' || step === 'error' ? 'opacity-100' : 'opacity-50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 'success' || step === 'error'
                        ? isDark ? "bg-green-500/20" : "bg-green-100"
                        : isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}>
                      <CheckCircle className={`w-4 h-4 ${
                        step === 'success' || step === 'error'
                          ? isDark ? "text-green-400" : "text-green-600"
                          : isDark ? "text-gray-500" : "text-gray-400"
                      }`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      step === 'success' || step === 'error'
                        ? isDark ? "text-white" : "text-gray-900"
                        : isDark ? "text-gray-500" : "text-gray-400"
                    }`}>
                      Confirm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className={`p-4 rounded-2xl mb-6 ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            }`}>
              <h4 className={`font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                Flight Details
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  <div>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Date</p>
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {new Date(booking.event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  <div>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Time</p>
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {booking.event.startTime}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  <div>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>From</p>
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {booking.event.departure}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  <div>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>To</p>
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {booking.event.arrival}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boarding Pass */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <BoardingPass booking={booking} user={user} theme={theme} />
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              {step === 'success' && (
                <>
                  <button
                    onClick={() => window.print()}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? "bg-white/10 border border-white/20 hover:bg-white/20 text-white" 
                        : "bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    Print Boarding Pass
                  </button>
                  <button
                    onClick={onClose}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25" 
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25"
                    }`}
                  >
                    Done
                  </button>
                </>
              )}
              
              {step === 'error' && (
                <button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 ${
                    isDark 
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/25" 
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-lg shadow-red-500/25"
                  }`}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
