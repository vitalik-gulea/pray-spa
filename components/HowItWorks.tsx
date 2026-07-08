import type { Dictionary } from "@/lib/i18n/types";
import { Reveal } from "./motion/Reveal";

export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section id="how-it-works" className="bg-foreground/[0.03] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.howItWorks.heading}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{dict.howItWorks.subheading}</p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.howItWorks.steps.map((item, index) => (
            <li key={item.title} className="relative">
              <Reveal delay={index * 0.08}>
                <span className="text-4xl font-bold text-accent/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
