# JAL Virtual Booking System

A comprehensive booking system for Japan Airlines Virtual built with Next.js, React, and TypeScript.

## 🚀 Features

- **Left Sidebar Navigation** - Clean, dark-themed sidebar based on aviation UI patterns
- **Dual Login System** - Separate authentication for pilots and admins
- **Pilot Login** - Integration with JAL Virtual API for pilot authentication
- **Admin Panel** - Complete event management system for administrators
- **Event Management** - Create, edit, and delete virtual aviation events
- **Flight Search** - Search departures and arrivals with real-time data
- **Booking System** - Pilots can book events with slot management
- **User Management** - Admin can view and manage all users
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Icons**: Lucide React
- **API Integration**: JAL Virtual API (https://crew.jalvirtual.com/api)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── events/        # Event management
│   │   ├── flights/       # Flight data
│   │   └── bookings/     # Booking management
│   ├── admin/             # Admin panel
│   ├── bookings/          # Booking management
│   ├── events/            # Event listing
│   ├── flights/           # Flight search
│   ├── login/             # Login page
│   ├── profile/           # User profile
│   └── users/             # User management (admin)
├── components/            # Reusable components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Sidebar.tsx        # Left navigation sidebar
│   ├── FlightSearch.tsx   # Flight search component
│   └── CreateEventModal.tsx # Event creation modal
└── lib/                   # Utility functions
    ├── prisma.ts          # Database client
    └── auth.ts            # Authentication utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- JAL Virtual API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jal-virtual-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your actual values:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   JAL_API_URL="https://crew.jalvirtual.com/api"
   ADMIN_EMAIL="admin@jalvirtual.com"
   ADMIN_PASSWORD="admin123"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### Pilot Login
- Uses JAL Virtual API for authentication
- Requires valid API key from https://crew.jalvirtual.com/api
- Automatically creates user account on first login

### Admin Login
- Separate admin authentication system
- Default admin credentials: `admin@jalvirtual.com` / `admin123`
- Full access to event management and user administration

## 📱 Features Overview

### For Pilots
- **Dashboard**: Overview of available events and personal stats
- **Event Booking**: Browse and book virtual aviation events
- **Flight Search**: Search departures and arrivals
- **Profile Management**: View personal information and statistics
- **Booking History**: Track all past and current bookings

### For Admins
- **Event Management**: Create, edit, and delete events
- **User Management**: View and manage all registered users
- **Booking Oversight**: Monitor all bookings across events
- **Admin Dashboard**: System statistics and recent activity
- **Full System Control**: Complete administrative access

## 🎨 UI/UX Features

- **Dark Theme**: Professional aviation-inspired dark interface
- **Left Sidebar**: Clean navigation matching aviation software patterns
- **Responsive Design**: Works seamlessly on all device sizes
- **Interactive Elements**: Smooth animations and hover effects
- **Real-time Updates**: Live data from APIs and database

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/pilot-login` - Pilot authentication with JAL API
- `POST /api/auth/admin-login` - Admin authentication

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### Flights
- `GET /api/flights` - List flights with optional type filter
- `GET /api/flights?type=DEPARTURE` - Departures only
- `GET /api/flights?type=ARRIVAL` - Arrivals only

### Bookings
- `GET /api/bookings` - List user bookings (or all for admin)
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/[id]` - Cancel booking

## 🗄️ Database Schema

### Users
- Pilot and admin user accounts
- JAL Virtual API integration
- Role-based access control

### Events
- Virtual aviation events
- Slot management
- Admin assignment

### Bookings
- Event bookings by pilots
- Status tracking
- Unique constraints

### Flights
- Flight schedule data
- Departure/arrival tracking
- Real-time status updates

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   - Set production database URL
   - Use secure JWT secret
   - Configure production JAL API credentials

2. **Database Migration**
   ```bash
   npm run db:push
   npm run db:seed
   ```

3. **Build and Start**
   ```bash
   npm run build
   npm run start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review API documentation
- Contact the development team

---

**Built with ❤️ for the Japan Airlines Virtual community**