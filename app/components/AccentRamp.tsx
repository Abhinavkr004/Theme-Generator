"use client";

import { useState } from "react";
import { Check, Swatches } from "@phosphor-icons/react";
import { hslToHex, type Theme } from "@/lib/theme";

const STEPS = [95, 86, 76, 66, 56, 46, 36, 26, 16];

// A 9-step tint and shade ramp built from the live accent hue and saturation.
// Click any step to copy its hex, which is what you reach for when a design
// needs one more shade than the exported tokens provide.
export function AccentRamp({ theme }: { theme: Theme }) {
  const [copied, setCopied] = useState<string | null>(null);
  const { h, s } = theme.accentHsl;

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      // Clipboard unavailable; the hex is still shown on the swatch title.
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swatches size={15} weight="bold" className="text-accent" aria-hidden />
          <h3 className="text-sm font-semibold text-text">Accent ramp</h3>
        </div>
        <span className="font-mono text-xs text-text-muted" aria-live="polite">
          {copied ?? "Click to copy"}
        </span>
      </div>

      <ul
        className="grid grid-cols-9 gap-1 border border-border bg-surface p-2"
        style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
      >
        {STEPS.map((l) => {
          const hex = hslToHex({ h, s, l });
          const isCopied = copied === hex;
          return (
            <li key={l}>
              <button
                type="button"
                onClick={() => copy(hex)}
                title={hex}
                aria-label={`Copy ${hex}`}
                className="flex h-12 w-full items-center justify-center ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 active:scale-95"
                style={{ background: hex, borderRadius: "calc(var(--radius) * 0.35)" }}
              >
                {isCopied && (
                  <Check
                    size={13}
                    weight="bold"
                    aria-hidden
                    style={{ color: l > 56 ? "#18181b" : "#fafafa" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
