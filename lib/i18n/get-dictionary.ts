import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ru: () => import("./dictionaries/ru").then((mod) => mod.default),
  en: () => import("./dictionaries/en").then((mod) => mod.default),
  ro: () => import("./dictionaries/ro").then((mod) => mod.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
