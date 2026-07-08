import { siteConfig } from "@/lib/site-config";
import { locales, defaultLocale, type Locale } from "./config";

export function localePath(locale: Locale, path = ""): string {
  const suffix = path === "/" ? "" : path;
  return locale === defaultLocale ? suffix || "/" : `/${locale}${suffix}`;
}

export function localeUrl(locale: Locale, path = ""): string {
  return `${siteConfig.url}${localePath(locale, path)}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) {
    map[locale] = localeUrl(locale, path);
  }
  map["x-default"] = localeUrl(defaultLocale, path);
  return map;
}
