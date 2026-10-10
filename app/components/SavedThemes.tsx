"use client";

import { Plus, Trash } from "@phosphor-icons/react";
import { getPreset, type SavedTheme } from "@/lib/theme";

interface SavedThemesProps {
  items: SavedTheme[];
  onSave: () => void;
  onApply: (item: SavedTheme) => void;
  onRemove: (id: string) => void;
}

export function SavedThemes({ items, onSave, onApply, onRemove }: SavedThemesProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Saved themes</h3>
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-1.5 text-xs font-semibold text-accent transition-opacity hover:opacity-80"
        >
          <Plus size={14} weight="bold" aria-hidden />
          Save current
        </button>
      </div>

      {items.length === 0 ? (
        <div
          className="border border-dashed border-border px-4 py-5 text-center"
          style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
        >
          <p className="text-sm text-text-muted">
            Nothing saved yet. Keep a theme you like to compare it with others.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-2">
          {items.map((item) => {
            const preset = getPreset(item.moodId);
            return (
              <li key={item.id} className="group relative">
                <button
                  type="button"
                  onClick={() => onApply(item)}
                  className="flex w-full flex-col items-start gap-2 border border-border bg-surface p-2 text-left transition-colors hover:border-accent/50"
                  style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
                  aria-label={`Apply saved ${preset.label} theme`}
                >
                  <span className="flex w-full gap-1">
                    {[item.light.accent, item.light.surface, item.dark.background].map((c, i) => (
                      <span
                        key={i}
                        className="h-6 flex-1 ring-1 ring-black/10"
                        style={{ background: c, borderRadius: "calc(var(--radius) * 0.3)" }}
                        aria-hidden
                      />
                    ))}
                  </span>
                  <span className="truncate text-xs font-medium text-text">{preset.label}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center bg-danger text-white opacity-0 ring-2 ring-background transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                  style={{ borderRadius: "999px" }}
                  aria-label={`Remove saved ${preset.label} theme`}
                >
                  <Trash size={11} weight="bold" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
