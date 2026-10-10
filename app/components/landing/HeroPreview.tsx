import { contrastRatio, gradeContrast, generateTheme } from "@/lib/theme";

// A real generated theme, rendered as a compact "spec card" so the hero shows
// the actual output of the tool (tokens + contrast) instead of a fake screenshot.
const theme = generateTheme({ moodId: "tidal", seed: 7 });
const textContrast = contrastRatio(theme.light.text, theme.light.surface);
const textGrade = gradeContrast(textContrast);

const ROWS: { label: string; value: string }[] = [
  { label: "accent", value: theme.light.accent },
  { label: "surface", value: theme.light.surface },
  { label: "text", value: theme.light.text },
  { label: "border", value: theme.light.border },
  { label: "success", value: theme.light.success },
  { label: "danger", value: theme.light.danger },
];

export function HeroPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-site-accent/15 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-site-line bg-site-bg-elevated shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between border-b border-site-line px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-site-accent" aria-hidden />
            <span className="text-xs font-medium text-site-text">Tidal / light</span>
          </div>
          <span className="font-mono text-[11px] text-site-text-faint">theme.css</span>
        </div>

        <div className="grid grid-cols-2 gap-px bg-site-line">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-3 bg-site-bg-elevated px-4 py-3"
            >
              <span
                className="size-8 shrink-0 rounded-md ring-1 ring-site-line-strong"
                style={{ background: row.value }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-site-text">--color-{row.label}</p>
                <p className="truncate font-mono text-[11px] text-site-text-faint">{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-site-line px-4 py-3">
          <span className="text-xs text-site-text-muted">Text on surface</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-500">
            {textGrade} {textContrast.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
