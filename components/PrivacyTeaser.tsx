import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/urls";
import { Reveal } from "./motion/Reveal";

export function PrivacyTeaser({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="privacy" className="mx-auto max-w-4xl px-6 py-20">
      <Reveal className="rounded-3xl border border-black/5 p-10 text-center dark:border-white/10">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.privacyTeaser.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground/70">
          {dict.privacyTeaser.description}
        </p>
        <Link
          href={localePath(locale, "/privacy")}
          className="mt-6 inline-flex items-center gap-1 font-semibold text-accent-dark hover:underline"
        >
          {dict.privacyTeaser.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
