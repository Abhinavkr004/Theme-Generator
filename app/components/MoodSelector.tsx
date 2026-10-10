"use client";

import { MOOD_PRESETS } from "@/lib/theme";

interface MoodSelectorProps {
  activeMood: string;
  onSelect: (moodId: string) => void;
}

export function MoodSelector({ activeMood, onSelect }: MoodSelectorProps) {
  return (
    <fieldset className="grid grid-cols-2 gap-2">
      <legend className="sr-only">Choose a mood</legend>
      {MOOD_PRESETS.map((preset) => {
        const active = preset.id === activeMood;
        return (
          <button
            key={preset.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(preset.id)}
            className={`group flex items-center gap-2.5 border px-3 py-2.5 text-left transition-colors ${
              active
                ? "border-accent bg-surface-muted"
                : "border-border bg-surface hover:border-accent/50"
            }`}
            style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
            title={preset.blurb}
          >
            <span
              aria-hidden
              className="size-5 shrink-0 rounded-full ring-1 ring-black/10"
              style={{ background: preset.swatch }}
            />
            <span className="text-sm font-medium text-text">{preset.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
