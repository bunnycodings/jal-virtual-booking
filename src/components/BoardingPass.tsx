'use client'

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/Card'

export enum BoardingPassType {
  DEPARTURE = 'departure',
  ARRIVAL = 'arrival'
}

interface User {
  firstName: string
  lastName: string
  jalId: string
}

interface Airport {
  name: string
  iata: string
}

interface BoardingPassProps {
  user: User
  origin: Airport
  destination: Airport
  callsign: string
  slotDate: string
  gate?: string
  type: BoardingPassType
  eventStartDate: Date
  actions?: ReactNode
}

export function BoardingPass({
  user,
  origin,
  destination,
  callsign,
  slotDate,
  gate,
  type,
  eventStartDate,
  actions
}: BoardingPassProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const isDeparture = type === BoardingPassType.DEPARTURE

  return (
    <Card className="bg-white border-2 border-gray-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          {/* Left side - Airline info */}
          <div className="bg-blue-600 text-white p-4 flex flex-col justify-between min-w-[120px]">
            <div>
              <div className="text-xs font-bold mb-2">JAL</div>
              <div className="text-xs">Japan Airlines</div>
            </div>
            <div className="text-xs">
              {isDeparture ? 'DEPARTURE' : 'ARRIVAL'}
            </div>
          </div>

          {/* Center - Flight details */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm font-bold text-gray-800">
                  {origin.iata} → {destination.iata}
                </div>
                <div className="text-xs text-gray-600">
                  {origin.name} to {destination.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">
                  {callsign}
                </div>
                <div className="text-xs text-gray-600">
                  Flight Number
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-lg font-bold text-gray-800">
                  {formatTime(slotDate)}
                </div>
                <div className="text-xs text-gray-600">
                  {formatDate(slotDate)}
                </div>
              </div>
              {gate && (
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {gate}
                  </div>
                  <div className="text-xs text-gray-600">
                    Gate
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-gray-800">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-600">
                  Passenger
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">
                  {user.jalId}
                </div>
                <div className="text-xs text-gray-600">
                  JAL ID
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Barcode area */}
          <div className="bg-gray-100 p-4 flex flex-col justify-center items-center min-w-[80px]">
            <div className="w-full h-16 bg-gray-300 rounded mb-2"></div>
            <div className="text-xs text-gray-600 text-center">
              Boarding Pass
            </div>
          </div>
        </div>

        {/* Actions */}
        {actions && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  )
}