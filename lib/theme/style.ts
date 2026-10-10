// Bridges a generated Theme into inline CSS custom properties. The returned
// object is spread onto an element's style prop so the live tokens cascade to
// every child without a React re-render per node.

import type { CSSProperties } from "react";
import { Theme, ThemeModeTokens } from "./generate";

export type PreviewMode = "light" | "dark";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

export function themeToCssVars(theme: Theme, mode: PreviewMode): CSSVars {
  const tokens: ThemeModeTokens = mode === "dark" ? theme.dark : theme.light;
  return {
    "--ps-background": tokens.background,
    "--ps-surface": tokens.surface,
    "--ps-surface-muted": tokens.surfaceMuted,
    "--ps-border": tokens.border,
    "--ps-text": tokens.text,
    "--ps-text-muted": tokens.textMuted,
    "--ps-accent": tokens.accent,
    "--ps-accent-hover": tokens.accentHover,
    "--ps-accent-text": tokens.accentText,
    "--ps-success": tokens.success,
    "--ps-warning": tokens.warning,
    "--ps-danger": tokens.danger,
    "--radius": `${theme.radiusPx}px`,
  };
}
