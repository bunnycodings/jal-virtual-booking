import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EventsListPage from './page'

// Mock the hooks and components
jest.mock('@/hooks/useEvents', () => ({
  useEvents: () => ({
    data: {
      events: [
        {
          id: '1',
          title: 'Test Event 1',
          description: 'Test Description 1',
          date: '2024-01-15',
          startTime: '10:00',
          endTime: '12:00',
          departure: 'RJAA',
          arrival: 'RJBB',
          aircraft: 'Boeing 777',
          maxSlots: 10,
          bookings: [],
          status: 'active',
          banner: 'test-banner.jpg',
          type: 'group_flight'
        },
        {
          id: '2',
          title: 'Test Event 2',
          description: 'Test Description 2',
          date: '2024-01-20',
          startTime: '14:00',
          endTime: '16:00',
          departure: 'RJBB',
          arrival: 'RJAA',
          aircraft: 'Airbus A350',
          maxSlots: 8,
          bookings: [{ id: '1' }, { id: '2' }],
          status: 'active',
          banner: 'test-banner-2.jpg',
          type: 'event'
        }
      ],
      total: 2,
      page: 1,
      hasNextPage: false
    },
    isLoading: false,
    error: null,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn()
  })
}))

jest.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string, params?: { count?: number }) => {
      const translations: Record<string, string> = {
        'events': 'Events',
        'eventDetails': 'Browse and book virtual aviation events',
        'createEvent': 'Create Event',
        'eventsFound': `Found ${params?.count || 0} events`,
        'loadMoreEvents': 'Load More Events',
        'noEventsFound': 'No events found'
      }
      return translations[key] || key
    }
  })
}))

jest.mock('@/components/EventListLayout', () => ({
  EventListLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="event-list-layout">{children}</div>
  )
}))

jest.mock('@/components/EventCard', () => ({
  EventCard: ({ eventName, eventType, description }: any) => (
    <div data-testid="event-card">
      <h3>{eventName}</h3>
      <p>{eventType}</p>
      <p>{description}</p>
    </div>
  )
}))

jest.mock('@/components/LoadingIndicator', () => ({
  LoadingIndicator: () => <div data-testid="loading-indicator">Loading...</div>
}))

jest.mock('@/components/CreateEventModal', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="create-event-modal">Create Event Modal</div> : null
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('EventsListPage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders events list page with title and description', async () => {
    render(
      <MemoryRouter>
        <EventsListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument()
      expect(screen.getByText('Browse and book virtual aviation events')).toBeInTheDocument()
    })
  })

  test('displays events count', async () => {
    render(
      <MemoryRouter>
        <EventsListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Found 2 events')).toBeInTheDocument()
    })
  })

  test('renders event cards for each event', async () => {
    render(
      <MemoryRouter>
        <EventsListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument()
      expect(screen.getByText('Test Event 2')).toBeInTheDocument()
    })
  })

  test('shows create event button for admin users', async () => {
    // Mock admin token
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4ifQ.test'
    localStorageMock.getItem.mockReturnValue(adminToken)

    render(
      <MemoryRouter>
        <EventsListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Create Event')).toBeInTheDocument()
    })
  })

  test('does not show create event button for pilot users', async () => {
    // Mock pilot token
    const pilotToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUElMT1QifQ.test'
    localStorageMock.getItem.mockReturnValue(pilotToken)

    render(
      <MemoryRouter>
        <EventsListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Create Event')).not.toBeInTheDocument()
    })
  })

  test('handles empty events list', async () => {
    // Mock empty events data
    jest.doMock('@/hooks/useEvents', () => ({
      useEvents: () => ({
        data: {
          events: [],
          total: 0,
          page: 1,
          hasNextPage: false
        },
        isLoading: false,
        error: null,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: jest.fn(),
        refetch: jest.fn()
      })
    }))

    render(
      <MemoryRouter>
        <EventsListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Found 0 events')).toBeInTheDocument()
      expect(screen.getByText('No events found')).toBeInTheDocument()
    })
  })
})
