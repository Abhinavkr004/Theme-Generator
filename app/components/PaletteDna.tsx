"use client";

import { useState } from "react";
import { Check, Copy, Fingerprint } from "@phosphor-icons/react";
import { getPreset, hslToHex, type Theme } from "@/lib/theme";

interface PaletteDnaProps {
  theme: Theme;
}

// The "DNA" of the current theme: the generative inputs the engine reasons
// about (hue, saturation, lightness, mood band, seed). This is the most
// characteristic thing in the generator's world, so it earns the panel's
// focus. Everything here is read-only and derived from the live theme, which
// means it re-themes with the studio and needs no extra state.
export function PaletteDna({ theme }: PaletteDnaProps) {
  const [copied, setCopied] = useState(false);
  const preset = getPreset(theme.moodId);
  const { h, s, l } = theme.accentHsl;
  const accentHex = hslToHex(theme.accentHsl);

  // Hue band the mood is allowed to wander within, as a percentage of the wheel.
  const bandStart = ((preset.hue - preset.hueSpread + 360) % 360) / 360;
  const bandWidth = (preset.hueSpread * 2) / 360;
  const markerLeft = (h / 360) * 100;

  const copySeed = async () => {
    try {
      await navigator.clipboard.writeText(`${theme.moodId}:${theme.seed}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable; the readout stays visible to copy by hand.
    }
  };

  const stats: { label: string; value: string }[] = [
    { label: "Hue", value: `${Math.round(h)}\u00b0` },
    { label: "Sat", value: `${Math.round(s)}%` },
    { label: "Light", value: `${Math.round(l)}%` },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Fingerprint size={15} weight="bold" className="text-accent" aria-hidden />
        <h3 className="text-sm font-semibold text-text">Palette DNA</h3>
      </div>

      <div
        className="flex flex-col gap-4 border border-border bg-surface p-4"
        style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
      >
        {/* Hue spectrum with the mood's allowed band and the live accent marker */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Hue spectrum</span>
            <span className="font-mono text-text-muted">{preset.label} band</span>
          </div>
          <div
            className="relative h-6 w-full overflow-hidden ring-1 ring-black/10"
            style={{
              borderRadius: "calc(var(--radius) * 0.4)",
              background:
                "linear-gradient(90deg, hsl(0 75% 55%), hsl(60 75% 55%), hsl(120 75% 55%), hsl(180 75% 55%), hsl(240 75% 55%), hsl(300 75% 55%), hsl(360 75% 55%))",
            }}
          >
            {/* The mood's wandering band */}
            <span
              aria-hidden
              className="absolute inset-y-0 border-x-2 border-white/70 bg-black/25 mix-blend-overlay"
              style={{ left: `${bandStart * 100}%`, width: `${bandWidth * 100}%` }}
            />
            {/* The live accent position */}
            <span
              aria-hidden
              className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
              style={{ left: `${markerLeft}%`, background: accentHex }}
            />
          </div>
        </div>

        {/* HSL readout of the current accent */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-0.5 bg-surface-muted px-2.5 py-2"
              style={{ borderRadius: "calc(var(--radius) * 0.45)" }}
            >
              <span className="text-[11px] text-text-muted">{stat.label}</span>
              <span className="font-mono text-sm font-semibold text-text">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Seed, the reproducible fingerprint of this exact theme */}
        <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
          <div className="flex min-w-0 flex-col">
            <span className="text-[11px] text-text-muted">Seed</span>
            <span className="truncate font-mono text-xs text-text">
              {theme.moodId}:{theme.seed}
            </span>
          </div>
          <button
            type="button"
            onClick={copySeed}
            className="flex shrink-0 items-center gap-1.5 border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-surface-muted active:scale-[0.97]"
            style={{ borderRadius: "calc(var(--radius) * 0.45)" }}
            aria-label="Copy theme seed"
          >
            {copied ? (
              <>
                <Check size={13} weight="bold" className="text-success" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Copy size={13} aria-hidden />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
