"use client";

import { ArrowClockwise, ArrowCounterClockwise } from "@phosphor-icons/react";
import { hslToHex, RadiusScale, Theme, getPreset } from "@/lib/theme";
import { MoodSelector } from "./MoodSelector";
import { RadiusControl } from "./RadiusControl";
import { AccentPicker } from "./AccentPicker";

interface ControlRailProps {
  theme: Theme;
  accentOverridden: boolean;
  onMoodChange: (moodId: string) => void;
  onAccentChange: (hex: string) => void;
  onAccentReset: () => void;
  onRadiusChange: (radius: RadiusScale) => void;
  onRegenerate: () => void;
}

function Field({
  label,
  action,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-text">{label}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

export function ControlRail({
  theme,
  accentOverridden,
  onMoodChange,
  onAccentChange,
  onAccentReset,
  onRadiusChange,
  onRegenerate,
}: ControlRailProps) {
  const activeAccent = hslToHex(theme.accentHsl);
  const preset = getPreset(theme.moodId);

  return (
    <div className="flex flex-col gap-6">
      <Field label="Mood">
        <MoodSelector activeMood={theme.moodId} onSelect={onMoodChange} />
      </Field>
      <p className="-mt-3 text-xs leading-relaxed text-text-muted">{preset.blurb}</p>

      <button
        type="button"
        onClick={onRegenerate}
        className="flex w-full items-center justify-center gap-2 bg-accent px-4 py-3 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover active:scale-[0.99]"
        style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
      >
        <ArrowClockwise size={17} weight="bold" aria-hidden />
        Generate variation
      </button>

      <Field
        label="Accent"
        action={
          accentOverridden ? (
            <button
              type="button"
              onClick={onAccentReset}
              className="flex items-center gap-1 text-xs font-medium text-text-muted transition-colors hover:text-text"
            >
              <ArrowCounterClockwise size={12} weight="bold" aria-hidden />
              Reset
            </button>
          ) : null
        }
      >
        <AccentPicker accentHex={activeAccent} onChange={onAccentChange} />
      </Field>

      <Field label="Corner radius">
        <RadiusControl value={theme.radius} onChange={onRadiusChange} />
      </Field>
    </div>
  );
}
