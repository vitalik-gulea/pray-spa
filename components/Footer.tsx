import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/urls";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="mt-auto border-t border-black/5 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.name} logo`}
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-sm font-medium">{siteConfig.name}</span>
        </div>

        <p className="text-sm text-foreground/60">{dict.footer.rights}</p>

        <div className="flex items-center gap-5 text-sm font-medium text-foreground/70">
          <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-accent">
            {siteConfig.supportEmail}
          </a>
          <Link href={localePath(locale, "/privacy")} className="hover:text-accent">
            {dict.footer.privacyLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
