"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/urls";

function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if ((locales as readonly string[]).includes(maybeLocale)) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
}

export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const basePath = stripLocaleFromPath(pathname || "/");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label={label}
        className="flex h-9 items-center gap-1 rounded-lg border border-black/10 px-3 text-sm font-medium text-foreground/70 transition-colors hover:border-accent hover:text-accent-dark dark:border-white/15"
      >
        {localeNames[currentLocale]}
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-2 min-w-[9rem] rounded-lg border border-black/10 bg-background py-1 shadow-lg dark:border-white/15">
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                href={localePath(locale, basePath)}
                className={`block px-4 py-2 text-sm transition-colors hover:bg-accent/10 hover:text-accent-dark ${
                  locale === currentLocale ? "font-semibold text-accent-dark" : "text-foreground/80"
                }`}
              >
                {localeNames[locale]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
