import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { localeUrl, languageAlternates } from "@/lib/i18n/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => [
    {
      url: localeUrl(locale),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: languageAlternates() },
    },
    {
      url: localeUrl(locale, "/privacy"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: languageAlternates("/privacy") },
    },
  ]);
}
