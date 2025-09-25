import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import enTranslations from './locales/en'
import ptTranslations from './locales/pt'
import frTranslations from './locales/fr'
import esTranslations from './locales/es'
import deTranslations from './locales/de'
import itTranslations from './locales/it'
import jaTranslations from './locales/ja'

const resources = {
  en: enTranslations,
  pt: ptTranslations,
  fr: frTranslations,
  es: esTranslations,
  de: deTranslations,
  it: itTranslations,
  ja: jaTranslations,
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
