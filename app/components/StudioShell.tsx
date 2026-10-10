"use client";

import { ArrowLeft, Palette, Shuffle } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useReducer } from "react";
import {
  generateTheme,
  getPreset,
  hslToHex,
  MOOD_PRESETS,
  themeToCssVars,
  type PreviewMode,
  type RadiusScale,
  type SavedTheme,
  type Theme,
} from "@/lib/theme";
import { ControlRail } from "./ControlRail";
import { SavedThemes } from "./SavedThemes";
import { PaletteDna } from "./PaletteDna";
import { AccentRamp } from "./AccentRamp";
import { useSavedThemes } from "./useSavedThemes";
import { PreviewCanvas } from "./preview/PreviewCanvas";
import { ExportPanel } from "./panel/ExportPanel";
import { UsageSnippets } from "./panel/UsageSnippets";
import { useSiteTheme } from "./theme/ThemeProvider";
import { ThemeToggle } from "./theme/ThemeToggle";

// Single source of truth for what the user is building. The whole page derives
// from this through generateTheme(), and the generated tokens are applied to the
// entire shell so the studio chrome wears the theme the user is designing.
interface StudioState {
  moodId: string;
  seed: number;
  accentHex: string | null;
  radius: RadiusScale | null;
  mode: PreviewMode;
}

type StudioAction =
  | { type: "setMood"; moodId: string }
  | { type: "regenerate" }
  | { type: "randomize" }
  | { type: "setAccent"; hex: string }
  | { type: "resetAccent" }
  | { type: "setRadius"; radius: RadiusScale }
  | { type: "setMode"; mode: PreviewMode }
  | { type: "applySaved"; theme: SavedTheme };

const MOOD_IDS = MOOD_PRESETS.map((preset) => preset.id);

function reducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case "setMood":
      return { ...state, moodId: action.moodId, accentHex: null, radius: null, seed: Date.now() };
    case "regenerate":
      return { ...state, seed: Date.now(), accentHex: null };
    case "randomize": {
      // Jump to a different mood with a fresh seed for a genuinely new result.
      const others = MOOD_IDS.filter((id) => id !== state.moodId);
      const next = others[Math.floor(Math.random() * others.length)] ?? state.moodId;
      return { ...state, moodId: next, accentHex: null, radius: null, seed: Date.now() };
    }
    case "setAccent":
      return { ...state, accentHex: action.hex };
    case "resetAccent":
      return { ...state, accentHex: null };
    case "setRadius":
      return { ...state, radius: action.radius };
    case "setMode":
      return { ...state, mode: action.mode };
    case "applySaved":
      return {
        ...state,
        moodId: action.theme.moodId,
        seed: action.theme.seed,
        accentHex: null,
        radius: action.theme.radius,
      };
    default:
      return state;
  }
}

const INITIAL: StudioState = {
  moodId: "tidal",
  seed: 1,
  accentHex: null,
  radius: null,
  mode: "light",
};

export function StudioShell() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { items: saved, save, remove } = useSavedThemes();
  const { theme: siteTheme } = useSiteTheme();

  // The studio chrome and preview follow the visitor's light/dark choice, so
  // flipping the site theme re-themes the whole studio. The in-rail ModeToggle
  // still lets you preview the opposite mode of the palette independently.
  useEffect(() => {
    dispatch({ type: "setMode", mode: siteTheme });
  }, [siteTheme]);

  const theme: Theme = useMemo(
    () =>
      generateTheme({
        moodId: state.moodId,
        seed: state.seed,
        accentHex: state.accentHex ?? undefined,
        radius: state.radius ?? undefined,
      }),
    [state.moodId, state.seed, state.accentHex, state.radius],
  );

  return (
    // The shell itself wears the generated theme in the chosen mode. The preview
    // canvas re-declares the same tokens so it stays correct even if nested.
    <main
      className="theme-root flex min-h-[100dvh] flex-col bg-background text-text"
      style={themeToCssVars(theme, state.mode)}
      data-theme={state.mode}
    >
      <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
              aria-label="Palette Studio home"
            >
              <span
                className="flex size-9 items-center justify-center bg-accent text-accent-text"
                style={{ borderRadius: "calc(var(--radius) * 0.7)" }}
                aria-hidden
              >
                <Palette size={20} weight="fill" />
              </span>
              <span className="text-base font-semibold tracking-tight">Palette Studio</span>
            </Link>
            <span className="hidden h-5 w-px bg-border sm:block" aria-hidden />
            <Link
              href="/"
              className="hidden items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text sm:flex"
            >
              <ArrowLeft size={15} weight="bold" aria-hidden />
              Back to overview
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "randomize" })}
              className="flex items-center gap-2 border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-text transition-colors hover:bg-surface-muted active:scale-[0.98]"
              style={{ borderRadius: "calc(var(--radius) * 0.7)" }}
            >
              <Shuffle size={16} weight="bold" aria-hidden />
              <span className="hidden sm:inline">Surprise me</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-start gap-6 px-4 pt-8 pb-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:px-6 xl:grid-cols-[290px_minmax(0,1fr)_340px]">
        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pb-2">
          <ControlRail
            theme={theme}
            onMoodChange={(moodId) => dispatch({ type: "setMood", moodId })}
            onAccentChange={(hex) => dispatch({ type: "setAccent", hex })}
            onAccentReset={() => dispatch({ type: "resetAccent" })}
            onRadiusChange={(radius) => dispatch({ type: "setRadius", radius })}
            onRegenerate={() => dispatch({ type: "regenerate" })}
            accentOverridden={state.accentHex !== null}
          />
          <SavedThemes
            items={saved}
            onSave={() => save(theme)}
            onApply={(item) => dispatch({ type: "applySaved", theme: item })}
            onRemove={remove}
          />
          <AccentRamp theme={theme} />
          <PaletteDna theme={theme} />
        </aside>

        <section className="min-w-0">
          <div
            className="overflow-hidden border border-border shadow-sm"
            style={{ borderRadius: "var(--radius)" }}
          >
            <PreviewCanvas theme={theme} mode={state.mode} />
          </div>
        </section>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pb-2 xl:col-start-3">
          <ExportPanel theme={theme} mode={state.mode} />
        </aside>
      </div>

      <div className="mx-auto w-full max-w-[1500px] px-4 pb-10 lg:px-6">
        <UsageSnippets theme={theme} />
      </div>

      <footer className="mt-auto border-t border-border bg-surface/60">
        <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 text-xs text-text-muted lg:px-6">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              Mood <span className="font-semibold text-text">{getPreset(theme.moodId).label}</span>
            </span>
            <span>
              Accent{" "}
              <span className="font-mono font-semibold text-text">{hslToHex(theme.accentHsl)}</span>
            </span>
            <span>
              Radius <span className="font-semibold capitalize text-text">{theme.radius}</span>
            </span>
            <span>
              Saved <span className="font-semibold text-text">{saved.length}</span>
            </span>
          </p>
          <Link href="/" className="font-medium transition-colors hover:text-text">
            Back to overview
          </Link>
        </div>
      </footer>
    </main>
  );
}
