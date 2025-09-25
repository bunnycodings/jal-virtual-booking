'use client'

import { useState, useEffect } from 'react'
import { Search, Plane, Calendar, Clock, MapPin } from 'lucide-react'

interface Flight {
  id: string
  flightNumber: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  aircraft: string
  status: string
  type: 'DEPARTURE' | 'ARRIVAL'
}

export default function FlightSearch() {
  const [activeTab, setActiveTab] = useState<'departures' | 'arrivals'>('departures')
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchFlights()
  }, [activeTab])

  const fetchFlights = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/flights?type=${activeTab.toUpperCase()}`)
      const data = await response.json()
      setFlights(data.flights || [])
    } catch (error) {
      console.error('Error fetching flights:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.arrival.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'text-blue-400'
      case 'BOARDING': return 'text-yellow-400'
      case 'DEPARTED': return 'text-green-400'
      case 'ARRIVED': return 'text-green-400'
      case 'DELAYED': return 'text-red-400'
      case 'CANCELLED': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Flight Search</h1>
        <p className="text-gray-400">Search for departures and arrivals</p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('departures')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'departures'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plane className="inline mr-2" size={16} />
          Departures
        </button>
        <button
          onClick={() => setActiveTab('arrivals')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'arrivals'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plane className="inline mr-2 rotate-180" size={16} />
          Arrivals
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Flights List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Loading flights...</div>
          </div>
        ) : filteredFlights.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">No {activeTab} found</div>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Plane className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{flight.flightNumber}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <MapPin className="mr-1" size={14} />
                        {flight.departure} → {flight.arrival}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {new Date(flight.departureTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">
                    {new Date(flight.departureTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className={`text-sm font-medium ${getStatusColor(flight.status)}`}>
                    {flight.status}
                  </div>
                  <div className="text-xs text-gray-400">
                    {flight.aircraft}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
