// The generator. Given a mood (and an optional seed for repeatable randomness),
// it produces a full, self-consistent theme: an accent plus a complete set of
// surface, text, and support colors for both light and dark modes.
//
// The logic is rule-based color theory, not a trained model. The shape of the
// output (a Theme with a swap-in-ready token set) is intentionally designed so
// a real generation API could replace this function later without touching the UI.

import {
  HSL,
  hslToHex,
  hexToHsl,
  readableTextOn,
  rotateHue,
  withLightness,
  withSaturation,
} from "./color";
import { getPreset, RadiusScale, RADIUS_VALUES } from "./presets";

export interface ThemeModeTokens {
  background: string; // page backdrop
  surface: string; // card / panel
  surfaceMuted: string; // subtle fill, hover
  border: string;
  text: string; // primary text
  textMuted: string; // secondary text
  accent: string;
  accentHover: string;
  accentText: string; // text that sits on the accent
  success: string;
  warning: string;
  danger: string;
}

export interface Theme {
  moodId: string;
  seed: number;
  accentHsl: HSL;
  radius: RadiusScale;
  radiusPx: number;
  light: ThemeModeTokens;
  dark: ThemeModeTokens;
}

// A tiny deterministic PRNG (mulberry32) so a given seed always rebuilds the
// same theme. Lets "regenerate" feel alive while staying reproducible.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMode(accent: HSL, isDark: boolean): ThemeModeTokens {
  // Neutrals borrow a hint of the accent hue so the whole palette feels unified
  // rather than an accent dropped onto flat grey.
  const neutralHue = accent.h;
  const neutralSat = Math.min(accent.s * 0.14, 10);

  if (!isDark) {
    const accentHex = hslToHex(accent);
    return {
      background: hslToHex({ h: neutralHue, s: neutralSat, l: 98 }),
      surface: hslToHex({ h: neutralHue, s: neutralSat * 0.6, l: 100 }),
      surfaceMuted: hslToHex({ h: neutralHue, s: neutralSat, l: 95 }),
      border: hslToHex({ h: neutralHue, s: neutralSat, l: 89 }),
      text: hslToHex({ h: neutralHue, s: Math.min(neutralSat + 6, 16), l: 16 }),
      textMuted: hslToHex({ h: neutralHue, s: Math.min(neutralSat + 4, 14), l: 42 }),
      accent: accentHex,
      accentHover: hslToHex(withLightness(accent, Math.max(accent.l - 8, 10))),
      accentText: readableTextOn(accentHex),
      success: hslToHex({ h: 150, s: 55, l: 38 }),
      warning: hslToHex({ h: 38, s: 85, l: 45 }),
      danger: hslToHex({ h: 358, s: 65, l: 50 }),
    };
  }

  // Dark mode: lift the accent so it keeps presence against a dark surface,
  // and never use pure black for depth.
  const darkAccent = withSaturation(
    withLightness(accent, Math.min(accent.l + 10, 68)),
    Math.min(accent.s + 6, 90),
  );
  const darkAccentHex = hslToHex(darkAccent);
  return {
    background: hslToHex({ h: neutralHue, s: Math.min(neutralSat + 6, 18), l: 7 }),
    surface: hslToHex({ h: neutralHue, s: Math.min(neutralSat + 5, 16), l: 11 }),
    surfaceMuted: hslToHex({ h: neutralHue, s: Math.min(neutralSat + 5, 16), l: 15 }),
    border: hslToHex({ h: neutralHue, s: Math.min(neutralSat + 4, 14), l: 22 }),
    text: hslToHex({ h: neutralHue, s: 8, l: 96 }),
    textMuted: hslToHex({ h: neutralHue, s: 7, l: 66 }),
    accent: darkAccentHex,
    accentHover: hslToHex(withLightness(darkAccent, Math.min(darkAccent.l + 8, 78))),
    accentText: readableTextOn(darkAccentHex),
    success: hslToHex({ h: 150, s: 50, l: 55 }),
    warning: hslToHex({ h: 40, s: 85, l: 60 }),
    danger: hslToHex({ h: 358, s: 70, l: 64 }),
  };
}

export interface GenerateOptions {
  moodId: string;
  seed?: number;
  // When the user overrides the accent directly, honor it exactly.
  accentHex?: string;
  radius?: RadiusScale;
}

export function generateTheme({
  moodId,
  seed = Date.now(),
  accentHex,
  radius,
}: GenerateOptions): Theme {
  const preset = getPreset(moodId);
  const rand = mulberry32(seed);

  let accent: HSL;
  if (accentHex) {
    accent = hexToHsl(accentHex);
  } else {
    // Wander within the mood's defined bands so results stay on-brand.
    const hue = rotateHue(
      { h: preset.hue, s: preset.saturation, l: preset.lightness },
      Math.round((rand() - 0.5) * 2 * preset.hueSpread),
    ).h;
    const sat = Math.round(preset.saturation + (rand() - 0.5) * 16);
    const light = Math.round(preset.lightness + (rand() - 0.5) * 10);
    accent = {
      h: hue,
      s: Math.min(Math.max(sat, 12), 92),
      l: Math.min(Math.max(light, 30), 64),
    };
  }

  const radiusScale = radius ?? preset.radius;

  return {
    moodId,
    seed,
    accentHsl: accent,
    radius: radiusScale,
    radiusPx: RADIUS_VALUES[radiusScale].px,
    light: buildMode(accent, false),
    dark: buildMode(accent, true),
  };
}
