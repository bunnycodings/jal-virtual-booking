export interface Translations {
  // Navigation
  dashboard: string
  events: string
  bookings: string
  flights: string
  profile: string
  users: string
  logout: string
  
  // Login
  pilotLogin: string
  adminLogin: string
  jalPilotId: string
  email: string
  password: string
  login: string
  signingIn: string
  switchToAdmin: string
  switchToPilot: string
  
  // Events
  upcomingEvents: string
  pastEvents: string
  createEvent: string
  editEvent: string
  deleteEvent: string
  eventTitle: string
  eventDescription: string
  eventDate: string
  startTime: string
  endTime: string
  departure: string
  arrival: string
  aircraft: string
  maxSlots: string
  availableSlots: string
  bookedSlots: string
  
  // Bookings
  myBookings: string
  allBookings: string
  createBooking: string
  cancelBooking: string
  bookingStatus: string
  pending: string
  confirmed: string
  cancelled: string
  rejected: string
  
  // Flights
  departures: string
  arrivals: string
  flightNumber: string
  aircraftType: string
  gate: string
  terminal: string
  status: string
  onTime: string
  delayed: string
  
  // Profile
  personalInfo: string
  firstName: string
  lastName: string
  callsign: string
  jalId: string
  role: string
  pilot: string
  admin: string
  
  // Users
  allUsers: string
  searchUsers: string
  userRole: string
  joinDate: string
  lastActive: string
  
  // Common
  save: string
  cancel: string
  delete: string
  edit: string
  create: string
  search: string
  filter: string
  clear: string
  loading: string
  error: string
  success: string
  warning: string
  info: string
  yes: string
  no: string
  confirm: string
  
  // Messages
  loginSuccess: string
  loginError: string
  logoutSuccess: string
  logoutError: string
  bookingCreated: string
  bookingCancelled: string
  eventCreated: string
  eventUpdated: string
  eventDeleted: string
  profileUpdated: string
  
  // Errors
  errors: {
    general: {
      title: string
      subtitle: string
    }
    network: {
      title: string
      subtitle: string
    }
    auth: {
      title: string
      subtitle: string
    }
    notFound: {
      title: string
      subtitle: string
    }
    retry: string
    backToHome: string
    backToDashboard: string
  }
  
  // Cookie Consent
  cookies: {
    title: string
    subtitle: string
    authorizeUse: string
    continueWithout: string
    learnMore: string
    necessary: string
    analytics: string
    marketing: string
    preferences: string
  }
  
  // Footer
  copyright: string
  jalVirtual: string
  bookingSystem: string
}
