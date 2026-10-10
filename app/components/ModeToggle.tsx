"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import type { PreviewMode } from "@/lib/theme";

interface ModeToggleProps {
  mode: PreviewMode;
  onToggle: (mode: PreviewMode) => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Preview mode"
      className="grid grid-cols-2 gap-1 border border-border bg-surface-muted p-1"
      style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
    >
      {(["light", "dark"] as const).map((option) => {
        const active = option === mode;
        const Icon = option === "light" ? Sun : Moon;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onToggle(option)}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium capitalize transition-colors ${
              active ? "bg-accent text-accent-text" : "text-text-muted hover:text-text"
            }`}
            style={{ borderRadius: "calc(var(--radius) * 0.5)" }}
          >
            <Icon size={16} weight={active ? "fill" : "regular"} aria-hidden />
            {option}
          </button>
        );
      })}
    </div>
  );
}
