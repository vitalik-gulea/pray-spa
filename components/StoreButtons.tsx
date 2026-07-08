import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/types";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.468 2.19-1.24 2.98-.86.88-2.19 1.56-3.24 1.48-.14-1.12.46-2.28 1.2-3.02.83-.86 2.28-1.5 3.28-1.44zm4.6 16.35c-.42.98-.63 1.42-1.18 2.29-.77 1.2-1.86 2.7-3.2 2.71-1.19.02-1.5-.78-3.12-.77-1.62.01-1.96.79-3.15.77-1.34-.02-2.37-1.36-3.14-2.56-2.16-3.35-2.39-7.28-1.05-9.38.94-1.48 2.43-2.35 3.83-2.35 1.43 0 2.33.79 3.51.79 1.15 0 1.85-.79 3.51-.79 1.25 0 2.58.68 3.52 1.86-3.09 1.7-2.59 6.13.37 7.43z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M3.6 2.15c-.35.2-.6.6-.6 1.1v17.5c0 .5.25.9.6 1.1l10.35-9.85L3.6 2.15zm12.05 9.85 2.5-2.4 3.75 2.15c.6.35.6 1.15 0 1.5l-3.75 2.15-2.5-2.4zM4.5 21.4l9.6-9.15 2.05 1.95L5.4 21.9c-.3.15-.6.1-.9-.15v-.35zM4.5 2.6c.3-.25.6-.3.9-.15l10.75 6.15-2.05 1.95L4.5 2.6z" />
    </svg>
  );
}

export function StoreButtons({
  dict,
  className = "",
}: {
  dict: Dictionary["storeButtons"];
  className?: string;
}) {
  const disabledClasses =
    "cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-none";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={siteConfig.links.appStore ?? "#support"}
        aria-disabled={!siteConfig.links.appStore}
        title={siteConfig.links.appStore ? undefined : `${dict.comingSoon} ${dict.appStore}`}
        className={`group flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-background transition-all hover:-translate-y-0.5 hover:shadow-lg ${
          !siteConfig.links.appStore ? disabledClasses : ""
        }`}
      >
        <AppleIcon />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[11px] opacity-80">
            {siteConfig.links.appStore ? dict.downloadOn : dict.comingSoon}
          </span>
          <span className="text-sm font-semibold">{dict.appStore}</span>
        </span>
      </a>
      <a
        href={siteConfig.links.googlePlay ?? "#support"}
        aria-disabled={!siteConfig.links.googlePlay}
        title={siteConfig.links.googlePlay ? undefined : `${dict.comingSoon} ${dict.googlePlay}`}
        className={`group flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-background transition-all hover:-translate-y-0.5 hover:shadow-lg ${
          !siteConfig.links.googlePlay ? disabledClasses : ""
        }`}
      >
        <PlayIcon />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[11px] opacity-80">
            {siteConfig.links.googlePlay ? dict.downloadOn : dict.comingSoon}
          </span>
          <span className="text-sm font-semibold">{dict.googlePlay}</span>
        </span>
      </a>
    </div>
  );
}
