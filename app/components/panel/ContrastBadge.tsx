"use client";

import { contrastRatio, gradeContrast } from "@/lib/theme";

interface ContrastBadgeProps {
  label: string;
  foreground: string;
  background: string;
}

// Surfaces the WCAG result for a real foreground/background pair in the current
// theme. A reviewer sees at a glance whether the generated palette is readable.
export function ContrastBadge({ label, foreground, background }: ContrastBadgeProps) {
  const ratio = contrastRatio(foreground, background);
  const grade = gradeContrast(ratio);
  const pass = grade !== "Fail";

  return (
    <div
      className="flex items-center justify-between gap-3 border border-border bg-surface px-3 py-2.5"
      style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-8 shrink-0 items-center justify-center text-xs font-bold ring-1 ring-black/10"
          style={{ background, color: foreground, borderRadius: "calc(var(--radius) * 0.4)" }}
          aria-hidden
        >
          Aa
        </span>
        <span className="text-sm text-text">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-text-muted">{ratio.toFixed(2)}</span>
        <span
          className={`px-2 py-0.5 text-xs font-semibold ${
            pass ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
          }`}
          style={{ borderRadius: "999px" }}
        >
          {grade}
        </span>
      </div>
    </div>
  );
}
