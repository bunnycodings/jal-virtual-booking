import { Translations } from '@/i18n/types'

const enTranslations: { translations: Translations } = {
  translations: {
    // Navigation
    dashboard: 'Dashboard',
    events: 'Events',
    bookings: 'Bookings',
    flights: 'Flights',
    profile: 'Profile',
    users: 'Users',
    logout: 'Logout',
    
    // Login
    pilotLogin: 'Pilot Login',
    adminLogin: 'Admin Login',
    jalPilotId: 'JAL Pilot ID',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    signingIn: 'Signing in...',
    switchToAdmin: 'Switch to Admin',
    switchToPilot: 'Switch to Pilot',
    
    // Events
    upcomingEvents: 'Upcoming Events',
    pastEvents: 'Past Events',
    createEvent: 'Create Event',
    editEvent: 'Edit Event',
    deleteEvent: 'Delete Event',
    eventTitle: 'Event Title',
    eventDescription: 'Event Description',
    eventDate: 'Event Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    departure: 'Departure',
    arrival: 'Arrival',
    aircraft: 'Aircraft',
    maxSlots: 'Max Slots',
    availableSlots: 'Available Slots',
    bookedSlots: 'Booked Slots',
    
    // Bookings
    myBookings: 'My Bookings',
    allBookings: 'All Bookings',
    createBooking: 'Create Booking',
    cancelBooking: 'Cancel Booking',
    bookingStatus: 'Booking Status',
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    
    // Flights
    departures: 'Departures',
    arrivals: 'Arrivals',
    flightNumber: 'Flight Number',
    aircraftType: 'Aircraft Type',
    gate: 'Gate',
    terminal: 'Terminal',
    status: 'Status',
    onTime: 'On Time',
    delayed: 'Delayed',
    
    // Profile
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    callsign: 'Callsign',
    jalId: 'JAL ID',
    role: 'Role',
    pilot: 'Pilot',
    admin: 'Admin',
    
    // Users
    allUsers: 'All Users',
    searchUsers: 'Search Users',
    userRole: 'User Role',
    joinDate: 'Join Date',
    lastActive: 'Last Active',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    
    // Messages
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    logoutSuccess: 'Logout successful',
    logoutError: 'Logout failed',
    bookingCreated: 'Booking created successfully',
    bookingCancelled: 'Booking cancelled',
    eventCreated: 'Event created successfully',
    eventUpdated: 'Event updated successfully',
    eventDeleted: 'Event deleted successfully',
    profileUpdated: 'Profile updated successfully',
    
    // Errors
    errors: {
      general: {
        title: 'Something went wrong',
        subtitle: 'An unexpected error occurred. Please try again.'
      },
      network: {
        title: 'Connection Error',
        subtitle: 'Unable to connect to the server. Please check your internet connection.'
      },
      auth: {
        title: 'Authentication Error',
        subtitle: 'Your session has expired. Redirecting to login...'
      },
      notFound: {
        title: 'Page Not Found',
        subtitle: 'The page you are looking for does not exist or has been moved.'
      },
      retry: 'Try Again',
      backToHome: 'Back to Home',
      backToDashboard: 'Back to Dashboard'
    },
    
    // Cookie Consent
    cookies: {
      title: 'Cookie Consent',
      subtitle: 'We use cookies to enhance your experience and analyze our traffic. By continuing to use our site, you consent to our use of cookies.',
      authorizeUse: 'Accept All Cookies',
      continueWithout: 'Continue Without Cookies',
      learnMore: 'Learn More',
      necessary: 'Necessary',
      analytics: 'Analytics',
      marketing: 'Marketing',
      preferences: 'Preferences'
    },
    
    // Footer
    copyright: '© 2024 Japan Airlines Virtual',
    jalVirtual: 'JAL Virtual',
    bookingSystem: 'Booking System',
  },
}

export default enTranslations
