"use client";

interface AccentPickerProps {
  accentHex: string;
  onChange: (hex: string) => void;
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export function AccentPicker({ accentHex, onChange }: AccentPickerProps) {
  return (
    <div
      className="flex items-center gap-2 border border-border bg-surface p-1.5"
      style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
    >
      <label className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-md ring-1 ring-black/10">
        <span className="sr-only">Pick accent color</span>
        <span className="absolute inset-0" style={{ background: accentHex }} aria-hidden />
        <input
          type="color"
          value={accentHex}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
        />
      </label>
      <input
        type="text"
        value={accentHex}
        aria-label="Accent hex value"
        spellCheck={false}
        onChange={(event) => {
          const next = event.target.value;
          if (HEX_RE.test(next)) onChange(next);
          else if (next.startsWith("#") && next.length <= 7) onChange(next);
        }}
        className="w-full bg-transparent font-mono text-sm uppercase text-text outline-none placeholder:text-text-muted"
        placeholder="#000000"
      />
    </div>
  );
}
