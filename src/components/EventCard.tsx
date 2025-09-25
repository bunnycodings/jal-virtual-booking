'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Calendar, MapPin, Clock, Users, Plane } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

interface EventCardProps {
  eventId: string
  imageSrc?: string
  eventName: string
  eventType: string
  description: string
  date: string
  startTime: string
  endTime: string
  departure: string
  arrival: string
  aircraft: string
  maxSlots: number
  bookedSlots: number
  status: 'created' | 'active' | 'completed' | 'cancelled'
  tbd?: boolean
  onBookEvent?: (eventId: string) => void
  userRole?: 'PILOT' | 'ADMIN'
}

export function EventCard({
  eventId,
  imageSrc,
  eventName,
  eventType,
  description,
  date,
  startTime,
  endTime,
  departure,
  arrival,
  aircraft,
  maxSlots,
  bookedSlots,
  status,
  tbd = false,
  onBookEvent,
  userRole = 'PILOT'
}: EventCardProps) {
  const { t } = useTranslation()
  
  const isFullyBooked = bookedSlots >= maxSlots
  const availableSlots = maxSlots - bookedSlots

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'completed': return 'text-blue-400'
      case 'cancelled': return 'text-red-400'
      case 'created': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('active')
      case 'completed': return t('completed')
      case 'cancelled': return t('cancelled')
      case 'created': return t('created')
      default: return status
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-white text-lg font-semibold mb-2">
              {eventName}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-400">{t('eventType')}:</span>
              <span className="text-sm text-blue-400 font-medium">{eventType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{t('eventStatus')}:</span>
              <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
            </div>
          </div>
          {imageSrc && (
            <div className="w-16 h-16 rounded-lg overflow-hidden ml-4">
              <img 
                src={imageSrc} 
                alt={eventName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="text-gray-300 mb-4 line-clamp-3">
          {description}
        </CardDescription>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="mr-2" size={14} />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <Clock className="mr-2" size={14} />
            <span>{startTime} - {endTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <MapPin className="mr-2" size={14} />
            <span>{departure} → {arrival}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <Plane className="mr-2" size={14} />
            <span>{aircraft}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <Users className="mr-2" size={14} />
            <span>{bookedSlots}/{maxSlots} {t('bookedSlots')}</span>
            <span className="ml-2 text-xs text-gray-400">
              ({availableSlots} {t('availableSlots')})
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link 
            href={`/events/${eventId}`}
            className="flex-1"
          >
            <Button 
              variant="outline" 
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {t('eventDetails')}
            </Button>
          </Link>
          
          {userRole === 'PILOT' && !tbd && (
            <Button
              onClick={() => onBookEvent?.(eventId)}
              disabled={isFullyBooked || status !== 'active'}
              className={`flex-1 ${
                isFullyBooked || status !== 'active'
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isFullyBooked ? 'Fully Booked' : t('bookSlot')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
