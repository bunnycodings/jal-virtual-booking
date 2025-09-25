# JAL Virtual Booking System

A modern, feature-rich flight booking system for Japan Airlines Virtual, inspired by the [IVAO Brazil booking system](https://github.com/ivao-brasil/booking.br.ivao.aero). Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark & Light Themes** - Seamless theme switching with system preference detection
- **Animated Interface** - Smooth animations powered by Framer Motion
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Glass Morphism** - Modern backdrop blur effects and translucent elements

### 🌍 **Internationalization (i18n)**
- **7 Languages Supported** - English, Japanese, Portuguese, French, Spanish, German, Italian
- **Dynamic Language Switching** - Change language on-the-fly without page reload
- **RTL Support Ready** - Architecture prepared for right-to-left languages
- **Localized Content** - All UI text, dates, and numbers properly localized

### 🔐 **Authentication System**
- **JAL Pilot ID Login** - Simple pilot authentication using JAL Virtual API
- **Admin Email/Password** - Traditional admin authentication
- **JWT Token Security** - Secure session management
- **API Integration** - Real-time pilot data from JAL Virtual API

### ✈️ **Flight Management**
- **Event Creation** - Admins can create and manage flight events
- **Booking System** - Pilots can book flights with real-time availability
- **Flight Confirmation Flow** - Beautiful confirmation process with boarding pass generation
- **Boarding Pass Component** - Professional boarding pass with barcode and flight details

### 👥 **User Management**
- **Suspension System** - Admin can suspend users with reason tracking
- **Role-Based Access** - Pilot and Admin roles with different permissions
- **User Profiles** - Complete pilot information management
- **Activity Tracking** - Monitor user activity and booking history

### 📱 **Mobile Support**
- **Touch-Friendly Interface** - Optimized for mobile devices
- **Responsive Layouts** - Adaptive design for all screen sizes
- **Mobile Navigation** - Intuitive mobile navigation patterns

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- JAL Virtual API access

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
   
   Update the `.env` file with your configuration:
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

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Internationalization**: react-i18next
- **API Integration**: JAL Virtual API

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── BoardingPass.tsx   # Boarding pass component
│   ├── FlightConfirmation.tsx # Flight confirmation flow
│   └── LanguageSelector.tsx  # Language switcher
├── contexts/              # React contexts
│   ├── ThemeContext.tsx   # Theme management
│   └── LanguageContext.tsx # Language management
├── i18n/                  # Internationalization
│   ├── locales/           # Translation files
│   └── index.ts          # i18n configuration
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   └── prisma.ts         # Database client
└── prisma/               # Database schema
    └── schema.prisma     # Prisma schema
```

## 🌐 Supported Languages

| Language | Code | Status | Contributors |
|----------|------|--------|-------------|
| English | en | ✅ Complete | Core Team |
| Japanese | ja | ✅ Complete | Core Team |
| Portuguese | pt | ✅ Complete | Core Team |
| French | fr | ✅ Complete | Core Team |
| Spanish | es | ✅ Complete | Core Team |
| German | de | ✅ Complete | Core Team |
| Italian | it | ✅ Complete | Core Team |

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/pilot-login` - Pilot authentication with JAL API
- `POST /api/auth/admin-login` - Admin authentication
- `GET /api/user` - Get current user profile

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### Bookings
- `GET /api/bookings` - List user bookings (or all for admin)
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Flights
- `GET /api/flights` - List flights with optional type filter

## 🎨 Theme System

The application supports both dark and light themes with automatic system preference detection:

```typescript
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'dark' ? 'light' : 'dark'} theme
    </button>
  )
}
```

## 🌍 Language System

Easy language switching with full i18n support:

```typescript
import { useLanguage } from '@/contexts/LanguageContext'

function MyComponent() {
  const { language, setLanguage, t } = useLanguage()
  
  return (
    <div>
      <h1>{t('dashboard')}</h1>
      <button onClick={() => setLanguage('ja')}>
        Switch to Japanese
      </button>
    </div>
  )
}
```

## 📱 Mobile Features

- **Touch Gestures**: Swipe navigation and touch-friendly interactions
- **Responsive Breakpoints**: Optimized for phones, tablets, and desktops
- **Mobile-First Design**: Built with mobile users in mind
- **Progressive Web App**: Ready for PWA implementation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **API Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Secure cross-origin requests

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   ```env
   DATABASE_URL="your-production-database-url"
   JWT_SECRET="your-production-jwt-secret"
   JAL_API_URL="https://crew.jalvirtual.com/api"
   ```

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

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [IVAO Brazil Booking System](https://github.com/ivao-brasil/booking.br.ivao.aero)
- Built with modern web technologies
- Designed for the aviation community

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**JAL Virtual Booking System** - Modern flight booking for the virtual aviation community ✈️