'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlotInformationLayout } from '@/components/SlotInformationLayout'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'
import { Calendar } from 'lucide-react'

export default function SlotScheduled() {
  const [eventId, setEventId] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  useEffect(() => {
    const eventIdParam = searchParams.get('eventId')
    if (!eventIdParam) {
      router.replace('/404')
      return
    }
    setEventId(eventIdParam)
    
    // Clear the eventId from URL
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('eventId')
    const newUrl = `${window.location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`
    window.history.replaceState({}, '', newUrl)
  }, [router, searchParams])

  const handleBackToSlots = () => {
    if (eventId) {
      router.push(`/events/${eventId}/slots`)
    } else {
      router.push('/events')
    }
  }

  return (
    <SlotInformationLayout
      header={t('slotScheduled')}
      description={
        <p className="text-gray-400 text-lg">
          {t('slotScheduledSubtitle')}
        </p>
      }
      image={
        <div className="flex justify-center">
          <Calendar className="w-48 h-48 text-blue-500" />
        </div>
      }
      actions={
        <Button
          onClick={handleBackToSlots}
          className="w-44 bg-gray-600 hover:bg-gray-700 text-white"
        >
          {t('backToSlots')}
        </Button>
      }
    />
  )
}
