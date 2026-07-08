import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localeUrl, localePath, languageAlternates } from "@/lib/i18n/urls";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const url = localeUrl(locale, "/privacy");

  return {
    title: dict.privacyPage.title,
    description: dict.privacyTeaser.description,
    alternates: {
      canonical: url,
      languages: languageAlternates("/privacy"),
    },
    openGraph: {
      title: `${dict.privacyPage.title} — ${siteConfig.name}`,
      description: dict.privacyTeaser.description,
      url,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const { privacyPage } = dict;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href={localePath(locale)} className="text-sm font-medium text-accent-dark hover:underline">
        {privacyPage.backLink}
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {privacyPage.title}
      </h1>
      <p className="mt-3 text-sm text-foreground/60">{privacyPage.effectiveDate}</p>
      <p className="text-sm text-foreground/60">{privacyPage.lastUpdated}</p>

      <div className="mt-10 space-y-10">
        {privacyPage.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/75">
              {section.content.replaceAll("{email}", siteConfig.supportEmail)}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-black/5 pt-6 text-sm text-foreground/50 dark:border-white/10">
        {privacyPage.copyright}
      </p>
    </main>
  );
}
