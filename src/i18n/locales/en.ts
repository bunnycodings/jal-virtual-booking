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
    eventsFound: 'Found {count} events',
    loadMoreEvents: 'Load More Events',
    noEventsFound: 'No events found',
    eventType: 'Event Type',
    eventStatus: 'Event Status',
    created: 'Created',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled',
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
    eventDetails: 'Event Details',
    eventSlots: 'Event Slots',
    pilotBriefing: 'Pilot Briefing',
    atcBriefing: 'ATC Briefing',
    sceneries: 'Sceneries',
    freeware: 'Freeware',
    payware: 'Payware',
    bookSlot: 'Book Slot',
    slotType: 'Slot Type',
    landing: 'Landing',
    private: 'Private',
    flightNumber: 'Flight Number',
    airline: 'Airline',
    aircraftType: 'Aircraft Type',
    gate: 'Gate',
    terminal: 'Terminal',
    status: 'Status',
    onTime: 'On Time',
    delayed: 'Delayed',
    noFlightsFound: 'No Flights Found',
    unableToBook: 'Unable to Book',
    filter: 'Filter',
    clear: 'Clear',
    search: 'Search',
    
    // Bookings
    myBookings: 'My Bookings',
    allBookings: 'All Bookings',
    createBooking: 'Create Booking',
    cancelBooking: 'Cancel Booking',
    bookingStatus: 'Booking Status',
    pending: 'Pending',
    confirmed: 'Confirmed',
    rejected: 'Rejected',
    
    // Flights
    departures: 'Departures',
    arrivals: 'Arrivals',
    
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
    
    // Slot Notifications
    slotConfirmed: 'Slot Confirmed',
    slotConfirmedSubtitle: 'Your slot has been successfully confirmed!',
    slotScheduled: 'Slot Scheduled',
    slotScheduledSubtitle: 'Your slot has been successfully scheduled!',
    slotCancelled: 'Slot Cancelled',
    slotCancelledSubtitle: 'Your slot has been cancelled.',
    scheduleConfirmation: 'Schedule Confirmation',
    scheduleConfirmationSubtitle: 'Please confirm your slot booking',
    scheduleConfirmationAlert: 'Please make sure all information is correct before confirming.',
    confirmSchedule: 'Confirm Schedule',
    
    // Slot Actions
    confirmFlight: 'Confirm Flight',
    cancelFlight: 'Cancel Flight',
    waitToConfirm: 'Wait to Confirm',
    cancelFlightConfirmation: 'Are you sure you want to cancel this flight?',
    backToSlots: 'Back to My Slots',
    
    // Footer
    copyright: '© 2024 Japan Airlines Virtual',
    jalVirtual: 'JAL Virtual',
    bookingSystem: 'Booking System',
  },
}

export default enTranslations
