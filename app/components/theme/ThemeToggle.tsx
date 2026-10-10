"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useSiteTheme } from "./ThemeProvider";

// Both icons are always rendered and CSS picks the visible one from the
// data-site-theme attribute, so the markup is identical on server and client.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { toggle } = useSiteTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className={`flex size-9 items-center justify-center rounded-lg border border-site-line bg-site-bg-elevated text-site-text-muted transition-colors hover:border-site-line-strong hover:text-site-text ${className}`}
    >
      <Sun size={17} weight="bold" aria-hidden className="hidden [[data-site-theme=dark]_&]:block" />
      <Moon size={17} weight="fill" aria-hidden className="block [[data-site-theme=dark]_&]:hidden" />
    </button>
  );
}
