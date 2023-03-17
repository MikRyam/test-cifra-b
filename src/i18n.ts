import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './locals/locales'

const defaultLanguage = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: false,
    lng: defaultLanguage,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
