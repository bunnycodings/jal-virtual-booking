'use client'

import { Fragment, useState, useEffect } from 'react'
import { EventListLayout } from '@/components/EventListLayout'
import { EventCard } from '@/components/EventCard'
import { Button } from '@/components/ui/Button'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import CreateEventModal from '@/components/CreateEventModal'
import { useEvents } from '@/hooks/useEvents'
import { useTranslation } from '@/hooks/useTranslation'
import { Plus } from 'lucide-react'

export default function EventsListPage() {
  const { t } = useTranslation()
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useEvents()
  const [userRole, setUserRole] = useState<'PILOT' | 'ADMIN'>('PILOT')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const totalFound = data?.total || 0

  useEffect(() => {
    checkUserRole()
  }, [])

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
        refetch()
      } else {
        alert('Booking failed')
      }
    } catch (error) {
      alert('Error booking event')
    }
  }

  const getEventTypeName = (type?: string) => {
    // Map event types to display names
    const typeMap: Record<string, string> = {
      'group_flight': 'Group Flight',
      'event': 'Event',
      'training': 'Training',
      'tour': 'Tour'
    }
    return typeMap[type || ''] || 'Event'
  }

  return (
    <EventListLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('events')}</h1>
          <p className="text-gray-400">{t('eventDetails')}</p>
        </div>
        {userRole === 'ADMIN' && (
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="mr-2" size={16} />
            {t('createEvent')}
          </Button>
        )}
      </div>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <p className="font-header text-light-gray-2 dark:text-white text-center md:text-left mb-8">
            {t('eventsFound').replace('{count}', totalFound.toString())}
          </p>
          
          <div className="mt-8 flex flex-col md:flex-row gap-12 xl:gap-24 items-center md:items-start flex-wrap">
            {data?.events.map((event) => (
              <Fragment key={event.id}>
                <EventCard
                  eventId={event.id}
                  imageSrc={event.banner}
                  eventName={event.title}
                  eventType={getEventTypeName(event.type)}
                  description={event.description}
                  date={event.date}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  departure={event.departure}
                  arrival={event.arrival}
                  aircraft={event.aircraft}
                  maxSlots={event.maxSlots}
                  bookedSlots={event.bookings.length}
                  status={event.status || 'created'}
                  tbd={event.status === 'created'}
                  onBookEvent={handleBookEvent}
                  userRole={userRole}
                />
              </Fragment>
            ))}
          </div>
          
          {hasNextPage && (
            <div className="flex justify-center mt-8">
              {isFetchingNextPage ? (
                <LoadingIndicator />
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {t('loadMoreEvents')}
                </Button>
              )}
            </div>
          )}
          
          {data?.events.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400">{t('noEventsFound')}</div>
            </div>
          )}
        </>
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={refetch}
      />
    </EventListLayout>
  )
}
