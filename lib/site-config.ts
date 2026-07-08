export const siteConfig = {
  name: "Pray Together",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pray-together.org",
  supportEmail: process.env.SUPPORT_EMAIL_TO ?? "",
  bundleId: "app.pray.together",
  deepLinkScheme: "praytogether://",
  colors: {
    accent: "#A855F7",
    accentDark: "#9333EA",
    splash: "#E6F4FE",
  },
  links: {
    appStore: null as string | null,
    googlePlay: null as string | null,
  },
} as const;
