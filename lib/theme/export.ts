// Turns a generated Theme into the formats a developer actually copies out:
// CSS custom properties, a Tailwind v4 @theme block, and plain JSON tokens.

import { Theme, ThemeModeTokens } from "./generate";

export type ExportFormat = "css" | "tailwind" | "json";

const TOKEN_ORDER: { key: keyof ThemeModeTokens; cssName: string }[] = [
  { key: "background", cssName: "background" },
  { key: "surface", cssName: "surface" },
  { key: "surfaceMuted", cssName: "surface-muted" },
  { key: "border", cssName: "border" },
  { key: "text", cssName: "text" },
  { key: "textMuted", cssName: "text-muted" },
  { key: "accent", cssName: "accent" },
  { key: "accentHover", cssName: "accent-hover" },
  { key: "accentText", cssName: "accent-text" },
  { key: "success", cssName: "success" },
  { key: "warning", cssName: "warning" },
  { key: "danger", cssName: "danger" },
];

function cssVarBlock(tokens: ThemeModeTokens, radiusPx: number, indent: string): string {
  const lines = TOKEN_ORDER.map(
    ({ key, cssName }) => `${indent}--color-${cssName}: ${tokens[key]};`,
  );
  lines.push(`${indent}--radius: ${radiusPx}px;`);
  return lines.join("\n");
}

export function toCss(theme: Theme): string {
  return [
    ":root {",
    cssVarBlock(theme.light, theme.radiusPx, "  "),
    "}",
    "",
    '[data-theme="dark"] {',
    cssVarBlock(theme.dark, theme.radiusPx, "  "),
    "}",
  ].join("\n");
}

export function toTailwind(theme: Theme): string {
  // Tailwind v4 reads design tokens from an @theme block.
  const lightVars = TOKEN_ORDER.map(
    ({ key, cssName }) => `  --color-${cssName}: ${theme.light[key]};`,
  ).join("\n");
  return [
    "@theme {",
    lightVars,
    `  --radius-theme: ${theme.radiusPx}px;`,
    "}",
    "",
    "/* Dark mode overrides */",
    '[data-theme="dark"] {',
    TOKEN_ORDER.map(
      ({ key, cssName }) => `  --color-${cssName}: ${theme.dark[key]};`,
    ).join("\n"),
    "}",
  ].join("\n");
}

export function toJson(theme: Theme): string {
  const payload = {
    mood: theme.moodId,
    radius: { scale: theme.radius, px: theme.radiusPx },
    accent: theme.accentHsl,
    light: theme.light,
    dark: theme.dark,
  };
  return JSON.stringify(payload, null, 2);
}

export function exportTheme(theme: Theme, format: ExportFormat): string {
  switch (format) {
    case "css":
      return toCss(theme);
    case "tailwind":
      return toTailwind(theme);
    case "json":
      return toJson(theme);
  }
}
