"use client";

import { RADIUS_VALUES, RadiusScale } from "@/lib/theme";

interface RadiusControlProps {
  value: RadiusScale;
  onChange: (radius: RadiusScale) => void;
}

const ORDER: RadiusScale[] = ["sharp", "soft", "round"];

export function RadiusControl({ value, onChange }: RadiusControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Corner radius"
      className="grid grid-cols-3 gap-1 border border-border bg-surface-muted p-1"
      style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
    >
      {ORDER.map((scale) => {
        const active = scale === value;
        return (
          <button
            key={scale}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(scale)}
            className={`flex flex-col items-center gap-1.5 px-2 py-2 text-xs font-medium transition-colors ${
              active ? "bg-accent text-accent-text" : "text-text-muted hover:text-text"
            }`}
            style={{ borderRadius: "calc(var(--radius) * 0.5)" }}
          >
            <span
              aria-hidden
              className={`size-5 border-2 ${active ? "border-accent-text" : "border-current"}`}
              style={{ borderRadius: `${RADIUS_VALUES[scale].px * 0.45}px` }}
            />
            {RADIUS_VALUES[scale].label}
          </button>
        );
      })}
    </div>
  );
}
