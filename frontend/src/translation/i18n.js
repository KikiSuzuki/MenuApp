import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const supportedLanguages = ['ru', 'kz'];

i18n
  .use(Backend)
  .use(initReactI18next)
  //  .use(LanguageDetector)
  .use({
    type: 'languageDetector',
    init(services, detectorOptions, i18nextOptions) {},
    detect() {
      const lang = localStorage.getItem('i18nextLng');
      if (supportedLanguages.includes(lang)) {
        return lang;
      }
      return 'ru';
    },
    cacheUserLanguage(lng) {
      if (supportedLanguages.includes(lng)) {
        localStorage.setItem('i18nextLng', lng);
      }
    },
  })
  .init({
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true,
    },
    supportedLngs: supportedLanguages,
  });

export default i18n;
