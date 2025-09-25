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
  cancelled: string
  
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
  bookingCreated: string
  bookingCancelled: string
  eventCreated: string
  eventUpdated: string
  eventDeleted: string
  profileUpdated: string
  
  // Footer
  copyright: string
  jalVirtual: string
  bookingSystem: string
}

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
    cancelled: 'Cancelled',
    
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
    bookingCreated: 'Booking created successfully',
    bookingCancelled: 'Booking cancelled',
    eventCreated: 'Event created successfully',
    eventUpdated: 'Event updated successfully',
    eventDeleted: 'Event deleted successfully',
    profileUpdated: 'Profile updated successfully',
    
    // Footer
    copyright: '© 2024 Japan Airlines Virtual',
    jalVirtual: 'JAL Virtual',
    bookingSystem: 'Booking System',
  },
}

export default enTranslations
