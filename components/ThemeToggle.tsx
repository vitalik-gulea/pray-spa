"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

function subscribe() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const order = ["light", "dark", "system"] as const;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 20h7M12 16.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const icons = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemIcon,
};

export type ThemeToggleLabels = {
  light: string;
  dark: string;
  system: string;
};

export function ThemeToggle({ labels }: { labels: ThemeToggleLabels }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current = (mounted ? theme : "system") as (typeof order)[number];
  const Icon = icons[current] ?? SystemIcon;

  function handleClick() {
    const currentIndex = order.indexOf(current);
    const next = order[(currentIndex + 1) % order.length];
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={labels[current] ?? labels.system}
      title={labels[current] ?? labels.system}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-foreground/70 transition-colors hover:border-accent hover:text-accent-dark dark:border-white/15"
    >
      {mounted ? <Icon /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}
