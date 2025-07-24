import { translations, type Locale } from '../i18n/translations';

export function getTranslations(locale: Locale) {
    return translations[locale] || translations.ru;
}

export function detectLocale(request?: Request): Locale {
    if (typeof window !== 'undefined') {
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale && translations[savedLocale]) {
            return savedLocale;
        }

        // Browser language detection
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('en')) {
            return 'en';
        }
    }

    if (request) {
        const acceptLanguage = request.headers.get('accept-language');
        if (acceptLanguage) {
            const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());
            for (const lang of languages) {
                if (lang.startsWith('en')) {
                    return 'en';
                }
            }
        }
    }

    return 'ru';
}

export function setLocale(locale: Locale) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('locale', locale);
        // Reload page to apply new locale
        window.location.reload();
    }
}
