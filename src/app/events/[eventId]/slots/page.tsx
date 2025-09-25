'use client'

import { Fragment, useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { BoardingPass, BoardingPassType } from '@/components/BoardingPass'
import { Button } from '@/components/ui/Button'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { useTranslation } from '@/hooks/useTranslation'
import { Search, X } from 'lucide-react'

interface Slot {
  id: string
  flightNumber: string
  aircraft: string
  origin: string
  destination: string
  slotTime: string
  gate?: string
  type: 'takeoff' | 'landing'
  bookingStatus: 'booked' | 'confirmed' | 'cancelled'
}

interface Event {
  id: string
  title: string
  dateStart: string
  pilotBriefing: string
  has_ended: boolean
  can_confirm_slots: boolean
}

interface User {
  firstName: string
  lastName: string
  jalId: string
}

export default function UserSlots() {
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  
  const [searchedFlightNumber, setSearchedFlightNumber] = useState<string | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [event, setEvent] = useState<Event | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const eventId = params.eventId as string

  useEffect(() => {
    fetchData()
  }, [eventId, searchedFlightNumber])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch event data
      const eventResponse = await fetch(`/api/events/${eventId}`)
      if (eventResponse.ok) {
        const eventData = await eventResponse.json()
        setEvent(eventData)
      }

      // Fetch user data
      const userResponse = await fetch('/api/user')
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData)
      }

      // Fetch slots data
      const slotsResponse = await fetch(`/api/events/${eventId}/slots${searchedFlightNumber ? `?search=${searchedFlightNumber}` : ''}`)
      if (slotsResponse.ok) {
        const slotsData = await slotsResponse.json()
        setSlots(slotsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmSlot = async (slot: Slot) => {
    setIsConfirming(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slotId: slot.id,
          eventId: Number(eventId),
          action: 'confirm'
        })
      })

      if (response.ok) {
        router.push(`/slot/confirmed?eventId=${eventId}`)
      } else {
        alert('Failed to confirm slot')
      }
    } catch (error) {
      alert('Error confirming slot')
    } finally {
      setIsConfirming(false)
    }
  }

  const handleCancelSlot = async (slot: Slot) => {
    if (!confirm(t('cancelFlightConfirmation'))) {
      return
    }

    setIsCancelling(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slotId: slot.id,
          eventId: Number(eventId),
          action: 'cancel'
        })
      })

      if (response.ok) {
        router.push(`/slot/cancelled?eventId=${eventId}`)
      } else {
        alert('Failed to cancel slot')
      }
    } catch (error) {
      alert('Error cancelling slot')
    } finally {
      setIsCancelling(false)
    }
  }

  const handleFlightSearch = (flightNumber: string) => {
    setSearchedFlightNumber(flightNumber || null)
  }

  const getAirportShortName = (airportName: string) => {
    if (airportName.indexOf(" / ") !== -1) {
      const [airportShortName] = airportName.split(" / ")
      return airportShortName
    }
    return airportName
  }

  const availableActions = (slot: Slot) => {
    if (event?.has_ended) {
      return null
    }

    const cancelFlightAction = (
      <Button
        onClick={() => handleCancelSlot(slot)}
        disabled={isCancelling}
        className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 h-8"
      >
        {t('cancelFlight')}
      </Button>
    )

    if (slot.bookingStatus === 'booked') {
      return <>{cancelFlightAction}</>
    } else if (event?.can_confirm_slots) {
      return (
        <>
          {cancelFlightAction}
          <Button
            onClick={() => handleConfirmSlot(slot)}
            disabled={isConfirming}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 h-8"
          >
            {t('confirmFlight')}
          </Button>
        </>
      )
    } else {
      return (
        <>
          {cancelFlightAction}
          <Button
            disabled
            className="bg-gray-600 text-gray-400 text-xs px-4 py-2 h-8 cursor-not-allowed"
          >
            {t('waitToConfirm')}
          </Button>
        </>
      )
    }
  }

  if (isLoading || !event || !user) {
    return <LoadingIndicator />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Side Info */}
        <div className="lg:w-80 bg-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">{t('pilotBriefing')}</h2>
          <div className="text-gray-300 whitespace-pre-wrap">
            {event.pilotBriefing}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:max-h-screen w-full bg-gray-100 dark:bg-gray-800">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {event.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search flight number..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => handleFlightSearch(e.target.value)}
                  />
                </div>
                {searchedFlightNumber && (
                  <Button
                    onClick={() => handleFlightSearch('')}
                    variant="outline"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Slots List */}
          <div className="h-screen lg:h-auto lg:mt-5 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-5">
                {slots.map((slot) => (
                  <Fragment key={slot.id}>
                    <BoardingPass
                      user={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                        jalId: user.jalId
                      }}
                      origin={{
                        name: getAirportShortName(slot.origin),
                        iata: slot.origin.substring(0, 4)
                      }}
                      destination={{
                        name: getAirportShortName(slot.destination),
                        iata: slot.destination.substring(0, 4)
                      }}
                      callsign={slot.flightNumber}
                      slotDate={slot.slotTime}
                      gate={slot.gate}
                      type={slot.type === "takeoff" ? BoardingPassType.DEPARTURE : BoardingPassType.ARRIVAL}
                      eventStartDate={new Date(event.dateStart)}
                      actions={
                        <div className="flex gap-4">
                          {availableActions(slot)}
                        </div>
                      }
                    />
                  </Fragment>
                ))}
              </div>

              {slots.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500">
                    {searchedFlightNumber ? 'No slots found for this flight number' : 'No slots available'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
