export const locales = ["ru", "en", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  ro: "Română",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
