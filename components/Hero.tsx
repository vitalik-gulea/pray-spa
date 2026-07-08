import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/types";
import { StoreButtons } from "./StoreButtons";
import { Reveal } from "./motion/Reveal";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-splash to-background"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-dark">
            {dict.hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">
            {dict.hero.description}
          </p>
          <div className="mt-8">
            <StoreButtons dict={dict.storeButtons} />
          </div>
        </Reveal>

        <Reveal delay={0.15} y={32} className="relative mx-auto w-full max-w-xs">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-accent/20 blur-3xl" />
          <Image
            src="/images/first-nav.png"
            alt={dict.hero.imageAlt}
            width={390}
            height={844}
            priority
            className="w-full rounded-[2.5rem] border-8 border-foreground/5 shadow-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
