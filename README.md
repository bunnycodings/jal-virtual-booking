# JAL Virtual Booking System

A modern, multi-language virtual flight booking system for Japan Airlines Virtual, enhanced with features from the KRONOS booking system.

## ✨ Features

### 🌍 Multi-Language Support
- **7 Languages**: English, Japanese, Portuguese, French, Spanish, German, Italian
- **Auto-detection**: Automatically detects user's browser language
- **Language switching**: Easy language switcher in the navigation
- **Fallback system**: Graceful fallback to English if translation is missing

### 🎨 Theme System
- **Dark/Light modes**: Seamless theme switching
- **System preference**: Automatically detects user's system theme preference
- **Persistent**: Remembers user's theme choice
- **Smooth transitions**: Beautiful transitions between themes

### 🚀 Enhanced UI Components
- **Modern Design**: Clean, modern interface inspired by KRONOS
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Accessible**: Built with accessibility in mind
- **Custom Components**: Button, Input, Card, LoadingIndicator, and more

### 🔐 Authentication
- **JAL API Integration**: Preserved existing JAL API authentication
- **Secure**: Maintains all existing security features
- **User Management**: Full user management capabilities

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theme system
- **Internationalization**: react-i18next with language detection
- **Icons**: Lucide React icons
- **TypeScript**: Full TypeScript support
- **Database**: Prisma with SQLite

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Language Support

| Language | Code | Status | Flag |
|----------|------|--------|------|
| English | `en` | ✅ Complete | 🇺🇸 |
| Japanese | `ja` | ✅ Complete | 🇯🇵 |
| Portuguese | `pt` | ✅ Complete | 🇵🇹 |
| French | `fr` | ✅ Complete | 🇫🇷 |
| Spanish | `es` | ✅ Complete | 🇪🇸 |
| German | `de` | ✅ Complete | 🇩🇪 |
| Italian | `it` | ✅ Complete | 🇮🇹 |

## 🎨 Theme Customization

The theme system supports:
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy-on-the-eyes dark interface
- **Auto-detection**: Respects system preferences
- **Manual switching**: Easy theme switcher in navigation

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet support**: Great experience on tablets
- **Desktop**: Full-featured desktop experience
- **Touch-friendly**: Optimized for touch interactions

## 🔧 Development

### Adding New Languages

1. Create a new translation file in `src/i18n/locales/[language].ts`
2. Add the language to the `languages` array in `LanguageSwitcher.tsx`
3. Update the `resources` object in `src/i18n/index.ts`

### Customizing Themes

Themes are managed in `src/contexts/ThemeContext.tsx` and use Tailwind CSS classes. You can customize colors and styles by modifying the Tailwind configuration.

### Adding New Components

All UI components are located in `src/components/ui/` and follow a consistent pattern. Use the existing components as templates for new ones.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for Japan Airlines Virtual**