import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import ru from "@/lib/i18n/dictionaries/ru";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ru.seo.title,
    short_name: siteConfig.name,
    description: ru.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.colors.splash,
    theme_color: siteConfig.colors.accent,
    icons: [
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
