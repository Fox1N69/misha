export async function getUserCountry(): Promise<string | null> {
  try {
    // Try to get country from IP geolocation
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code?.toLowerCase() || null;
  } catch (error) {
    console.warn('Failed to detect user country:', error);
    return null;
  }
}

export function shouldUseRussian(country: string | null): boolean {
  if (!country) return true; // Default to Russian
  
  // Russian-speaking countries
  const russianSpeakingCountries = [
    'ru', // Russia
    'by', // Belarus
    'kz', // Kazakhstan
    'kg', // Kyrgyzstan
    'tj', // Tajikistan
    'uz', // Uzbekistan
    'tm', // Turkmenistan
    'md', // Moldova (partially)
    'am', // Armenia (partially)
    'az', // Azerbaijan (partially)
  ];
  
  return russianSpeakingCountries.includes(country);
}