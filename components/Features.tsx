import type { Dictionary } from "@/lib/i18n/types";
import { Reveal } from "./motion/Reveal";

const icons = [
  (
    <svg key="0" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-10-9C.5 8.5 2 4 6 4c2 0 3.5 1.2 4 2 .5-.8 2-2 4-2 4 0 5.5 4.5 4 8-2.5 4.4-10 9-10 9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M2.5 19c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2M14.5 19c0-2.3-1.2-4.1-3-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 9v4l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 2.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M4 20V10M12 20V4M20 20v-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="4" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9.9-1.6-.5-.5-.5-1.4.2-1.8.8-.5 2.9-.2 3.9-1.6.8-1.1.5-3-1-3.6-1.2-.5-1.2-2.2 0-2.6C17.5 9.2 18 7.7 17 6.2 15.6 4.2 13.7 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="9" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
];

export function Features({ dict }: { dict: Dictionary }) {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.features.heading}
        </h2>
        <p className="mt-4 text-lg text-foreground/70">{dict.features.subheading}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.features.items.map((feature, index) => (
          <Reveal key={feature.title} delay={(index % 3) * 0.08}>
            <div className="h-full rounded-2xl border border-black/5 bg-foreground/[0.02] p-6 transition-shadow hover:shadow-md dark:border-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
                {icons[index]}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {feature.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
