import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { locales, isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { languageAlternates, localeUrl } from "@/lib/i18n/urls";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ogLocaleMap: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  ro: "ro_RO",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const url = localeUrl(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.seo.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    applicationName: siteConfig.name,
    category: "lifestyle",
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale],
      url,
      siteName: siteConfig.name,
      title: dict.seo.title,
      description: dict.seo.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.title,
      description: dict.seo.description,
      images: ["/opengraph-image"],
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.colors.splash },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.colors.accentDark },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: siteConfig.name,
    description: dict.seo.description,
    url: localeUrl(locale),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.supportEmail,
    },
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Script
            id="ld-json"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
