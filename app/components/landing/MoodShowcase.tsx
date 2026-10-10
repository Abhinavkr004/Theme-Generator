import { MOOD_PRESETS } from "@/lib/theme";

// Renders the real curated moods from the generator so the landing page shows
// the actual product surface, not invented marketing swatches.
export function MoodShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {MOOD_PRESETS.map((mood) => (
        <div
          key={mood.id}
          className="group relative overflow-hidden rounded-xl border border-site-line bg-site-bg-elevated p-4 transition-colors hover:border-site-line-strong"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="size-7 shrink-0 rounded-full ring-1 ring-site-line-strong"
              style={{ background: mood.swatch }}
              aria-hidden
            />
            <span className="text-sm font-semibold text-site-text">{mood.label}</span>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-site-text-muted">{mood.blurb}</p>
        </div>
      ))}
    </div>
  );
}
