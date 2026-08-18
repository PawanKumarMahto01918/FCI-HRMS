import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hi from './locales/hi';
import en from './locales/en';

const resources = {
  hi,
  en
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'hi', // Default language
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
