import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/types";
import { Reveal } from "./motion/Reveal";

const sources = [
  "/images/first-nav.png",
  "/images/second-nav.png",
  "/images/third-nav.png",
  "/images/fourth-nav.png",
  "/images/fifth-nav.png",
];

export function Gallery({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.gallery.heading}
        </h2>
        <p className="mt-4 text-lg text-foreground/70">{dict.gallery.subheading}</p>
      </Reveal>

      <div className="mt-14 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:thin] sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
        {sources.map((src, index) => (
          <Reveal key={src} delay={index * 0.08} className="w-48 flex-shrink-0 sm:w-auto">
            <Image
              src={src}
              alt={dict.gallery.alts[index]}
              width={390}
              height={844}
              className="w-full rounded-2xl border-4 border-foreground/5 shadow-lg"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
