"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import type { ThemeModeTokens } from "@/lib/theme";

interface SwatchGridProps {
  tokens: ThemeModeTokens;
}

const SWATCHES: { key: keyof ThemeModeTokens; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "surfaceMuted", label: "Surface muted" },
  { key: "border", label: "Border" },
  { key: "text", label: "Text" },
  { key: "textMuted", label: "Text muted" },
  { key: "accent", label: "Accent" },
  { key: "accentHover", label: "Accent hover" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "danger", label: "Danger" },
];

export function SwatchGrid({ tokens }: SwatchGridProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
    } catch {
      // Clipboard can be blocked (insecure context); fail quietly, the hex is visible.
    }
  };

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {SWATCHES.map(({ key, label }) => {
        const hex = tokens[key];
        const isCopied = copied === hex;
        return (
          <button
            key={key}
            type="button"
            onClick={() => copy(hex)}
            className="group flex items-center gap-2 border border-border bg-surface p-1.5 text-left transition-colors hover:border-accent/50"
            style={{ borderRadius: "calc(var(--radius) * 0.5)" }}
            aria-label={`Copy ${label} value ${hex}`}
          >
            <span
              className="size-7 shrink-0 ring-1 ring-black/10"
              style={{ background: hex, borderRadius: "calc(var(--radius) * 0.35)" }}
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-text">{label}</span>
              <span className="block font-mono text-[10px] uppercase text-text-muted">{hex}</span>
            </span>
            <span className="shrink-0 pr-0.5 text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
              {isCopied ? (
                <Check size={13} weight="bold" className="text-success" aria-hidden />
              ) : (
                <Copy size={13} aria-hidden />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
