'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { useTranslation } from '@/hooks/useTranslation'
import { AlertTriangle, Check } from 'lucide-react'
import Layout from '@/components/Layout'

const PRIVATE_SLOT_URL_PARAMS = ["flightNumber", "aircraft", "origin", "destination"]

interface PrivateSlotScheduleData {
  flightNumber: string
  aircraft: string
  origin: string
  destination: string
}

export default function ConfirmSchedule() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const eventId = params.eventId as string
  const slotId = params.slotId as string

  const isPrivateSlot = () => {
    return PRIVATE_SLOT_URL_PARAMS.find(urlParamKey => searchParams.get(urlParamKey) !== null) !== undefined
  }

  const extractSlotParamsFromUrl = (): PrivateSlotScheduleData => {
    const result: PrivateSlotScheduleData = {
      flightNumber: "",
      aircraft: "",
      origin: "",
      destination: ""
    }

    PRIVATE_SLOT_URL_PARAMS.forEach(urlParamKey => {
      if (!(urlParamKey in result)) {
        return
      }

      const urlParamValue = searchParams.get(urlParamKey)?.toUpperCase()
      result[urlParamKey as keyof PrivateSlotScheduleData] = urlParamValue || ""
    })

    return result
  }

  const bookSlot = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const mutationParams = {
        slotId: Number(slotId),
        eventId: Number(eventId),
      }

      let requestBody: any = mutationParams

      if (isPrivateSlot()) {
        const privateSlotData = extractSlotParamsFromUrl()
        requestBody = { ...mutationParams, privateSlotData }
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to book slot')
      }

      // Navigate to scheduled page
      router.push(`/slot/scheduled?eventId=${eventId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('scheduleConfirmation')}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                {t('scheduleConfirmationSubtitle')}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <div className="flex items-start mb-6">
                <div className="bg-orange-500 p-3 rounded-l-lg">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div className="bg-orange-500/10 text-orange-500 dark:text-white py-3 pl-4 pr-6 rounded-r-lg text-sm flex-1">
                  {t('scheduleConfirmationAlert')}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Button
                    onClick={bookSlot}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    {t('confirmSchedule')}
                  </Button>
                </div>
                <div className="flex-1">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Globe Image */}
          <div className="hidden xl:block w-full max-w-[28rem] mx-auto mt-8">
            <img className="w-full max-w-[30rem]" alt="globe" src="/icons/globe.svg" width={430} height={466} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
