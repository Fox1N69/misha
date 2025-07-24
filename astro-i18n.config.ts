import { defineAstroI18nConfig } from "astro-i18n"

export default defineAstroI18nConfig({
  primaryLocale: "ru", // default
  secondaryLocales: ["en"], // other supported locales
  fallbackLocale: "ru", // fallback
  trailingSlash: "never", // "never" | "always" | "ignore"
  run: "client+server", // "client+server" | "server" | "client"
  showPrimaryLocale: false, // "/en/about" vs "/about"
  translationLoadingRules: [], // per page group loading
  translationDirectory: {}, // translation directory names
  translations: {}, // in-line translations
  routes: {}, // in-line routes
})