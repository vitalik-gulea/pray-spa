import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { SupportForm } from "./SupportForm";
import { Reveal } from "./motion/Reveal";

export function Support({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [before, after] = dict.support.description.split("{email}");

  return (
    <section id="support" className="mx-auto max-w-3xl px-6 py-20">
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.support.heading}
        </h2>
        <p className="mt-4 text-lg text-foreground/70">
          {before}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="font-medium text-accent-dark hover:underline"
          >
            {siteConfig.supportEmail}
          </a>
          {after}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 rounded-3xl border border-black/5 p-8 dark:border-white/10">
        <SupportForm dict={dict.support} locale={locale} supportEmail={siteConfig.supportEmail} />
      </Reveal>
    </section>
  );
}
