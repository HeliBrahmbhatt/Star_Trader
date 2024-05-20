import i18next, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'react-native-localize';

import en from './languages/en.json';

const resources = {
  en: {
    translation: en,
  },
};

export const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  // init: () => {},
  detect: async (callback: (lng: string) => void) => {
    try {
      // Get stored language from Async storage
      const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (language) {
        // If language was stored before, use this language in the app
        return callback(language);
      } else {
        // If language was not stored yet, use device's locale
        const locales = Localization.getLocales();
        if (locales && locales.length > 0) {
          return callback(locales[0].languageCode);
        }
        return callback('en'); // Fallback to 'en' if no locales found
      }
    } catch (error) {
      console.error('Error reading language', error);
      return callback('en'); // Fallback to 'en' in case of error
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      // Save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      // Todo: add better error handling
      console.error(error);
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: true,
    resources: resources,
  } as InitOptions);
