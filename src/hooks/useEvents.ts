'use client'

import { useState, useEffect } from 'react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  departure: string
  arrival: string
  aircraft: string
  maxSlots: number
  isActive: boolean
  bookings: any[]
  status: 'created' | 'active' | 'completed' | 'cancelled'
  banner?: string
  type?: string
}

interface EventsResponse {
  events: Event[]
  total: number
  page: number
  hasNextPage: boolean
}

interface UseEventsReturn {
  data: EventsResponse | null
  isLoading: boolean
  error: string | null
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  refetch: () => void
}

export function useEvents(): UseEventsReturn {
  const [data, setData] = useState<EventsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchEvents = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true)
      } else {
        setIsFetchingNextPage(true)
      }
      
      setError(null)
      
      const response = await fetch(`/api/events?page=${page}&limit=12`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      
      const result = await response.json()
      
      const eventsResponse: EventsResponse = {
        events: result.events || [],
        total: result.total || 0,
        page: page,
        hasNextPage: result.hasNextPage || false
      }
      
      if (append && data) {
        setData({
          ...eventsResponse,
          events: [...data.events, ...eventsResponse.events]
        })
      } else {
        setData(eventsResponse)
      }
      
      setHasNextPage(eventsResponse.hasNextPage)
      setCurrentPage(page)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
      setIsFetchingNextPage(false)
    }
  }

  const fetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchEvents(currentPage + 1, true)
    }
  }

  const refetch = () => {
    fetchEvents(1, false)
  }

  useEffect(() => {
    fetchEvents(1, false)
  }, [])

  return {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  }
}
