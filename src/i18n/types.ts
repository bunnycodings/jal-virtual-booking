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
  eventsFound: string
  loadMoreEvents: string
  noEventsFound: string
  eventType: string
  eventStatus: string
  created: string
  active: string
  completed: string
  cancelled: string
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
  eventDetails: string
  eventSlots: string
  pilotBriefing: string
  atcBriefing: string
  sceneries: string
  freeware: string
  payware: string
  bookSlot: string
  slotType: string
  landing: string
  private: string
  flightNumber: string
  airline: string
  aircraftType: string
  gate: string
  terminal: string
  status: string
  onTime: string
  delayed: string
  noFlightsFound: string
  unableToBook: string
  filter: string
  clear: string
  search: string
  
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
  
  // Slot Notifications
  slotConfirmed: string
  slotConfirmedSubtitle: string
  slotScheduled: string
  slotScheduledSubtitle: string
  slotCancelled: string
  slotCancelledSubtitle: string
  scheduleConfirmation: string
  scheduleConfirmationSubtitle: string
  scheduleConfirmationAlert: string
  confirmSchedule: string
  
  // Slot Actions
  confirmFlight: string
  cancelFlight: string
  waitToConfirm: string
  cancelFlightConfirmation: string
  backToSlots: string
  
  // Footer
  copyright: string
  jalVirtual: string
  bookingSystem: string
}
