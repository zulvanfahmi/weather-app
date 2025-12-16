import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import id from "./locales/id.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "en",
  fallbackLng: "en",

  resources: {
    en: { translation: en },
    id: { translation: id },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
