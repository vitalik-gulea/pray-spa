import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/urls";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const navItems = [
    { href: "#features", label: dict.nav.features },
    { href: "#how-it-works", label: dict.nav.howItWorks },
    { href: "#privacy", label: dict.nav.privacy },
    { href: "#support", label: dict.nav.support },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur-md dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href={localePath(locale)} className="flex items-center gap-2 font-semibold">
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.name} logo`}
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="text-base">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} label={dict.languageSwitcher.label} />
          <ThemeToggle labels={dict.themeToggle} />
        </div>
      </div>
    </header>
  );
}
