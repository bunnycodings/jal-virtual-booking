import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsentProvider, ConsentAnswers } from '@/contexts/CookieConsentContext'
import CookieConsentPage from './CookieConsentPage'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <LanguageProvider>
      <CookieConsentProvider>
        {children}
      </CookieConsentProvider>
    </LanguageProvider>
  </ThemeProvider>
)

beforeEach(() => {
  localStorageMock.clear()
  localStorageMock.getItem.mockReturnValue(null)
})

afterEach(() => {
  localStorageMock.clear()
})

describe('CookieConsentPage', () => {
  test('renders cookie consent page with title and subtitle', async () => {
    render(
      <TestWrapper>
        <CookieConsentPage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Cookie Consent')).toBeInTheDocument()
      expect(screen.getByText(/We use cookies to enhance your experience/)).toBeInTheDocument()
    })
  })

  test('shows accept and decline buttons', async () => {
    render(
      <TestWrapper>
        <CookieConsentPage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Accept All Cookies')).toBeInTheDocument()
      expect(screen.getByText('Continue Without Cookies')).toBeInTheDocument()
    })
  })

  test('accepts cookies when accept button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <CookieConsentPage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Accept All Cookies')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Accept All Cookies'))

    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookieConsent', ConsentAnswers.ACCEPTED)
  })

  test('declines cookies when decline button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <CookieConsentPage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Continue Without Cookies')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Continue Without Cookies'))

    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookieConsent', ConsentAnswers.DECLINED)
  })

  test('shows learn more link', async () => {
    render(
      <TestWrapper>
        <CookieConsentPage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })
  })

  test('displays JAL branding', async () => {
    render(
      <TestWrapper>
        <CookieConsentPage />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('JAL Virtual')).toBeInTheDocument()
      expect(screen.getByText('Booking System')).toBeInTheDocument()
    })
  })
})

describe('CookieConsentProvider', () => {
  test('shows cookie consent when no consent is stored', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const TestComponent = () => {
      const { showCookieConsent } = useCookieConsent()
      return <div>{showCookieConsent ? 'Show consent' : 'Hide consent'}</div>
    }

    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    expect(screen.getByText('Show consent')).toBeInTheDocument()
  })

  test('hides cookie consent when consent is already given', () => {
    localStorageMock.getItem.mockReturnValue(ConsentAnswers.ACCEPTED)
    
    const TestComponent = () => {
      const { showCookieConsent } = useCookieConsent()
      return <div>{showCookieConsent ? 'Show consent' : 'Hide consent'}</div>
    }

    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    expect(screen.getByText('Hide consent')).toBeInTheDocument()
  })

  test('hides cookie consent when consent is declined', () => {
    localStorageMock.getItem.mockReturnValue(ConsentAnswers.DECLINED)
    
    const TestComponent = () => {
      const { showCookieConsent } = useCookieConsent()
      return <div>{showCookieConsent ? 'Show consent' : 'Hide consent'}</div>
    }

    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    expect(screen.getByText('Hide consent')).toBeInTheDocument()
  })
})
