// Mood presets are the curated starting points. Each describes a hue family,
// saturation and lightness bands, and a personality the generator reads to
// shape the rest of the palette. This is the "taste" baked into the tool.

export type RadiusScale = "sharp" | "soft" | "round";
export type FontPairing = "geist" | "mono-accent";

export interface MoodPreset {
  id: string;
  label: string;
  blurb: string;
  // Hue in degrees, plus how far the generator may wander when randomizing.
  hue: number;
  hueSpread: number;
  saturation: number;
  // Base lightness of the accent on a light surface.
  lightness: number;
  radius: RadiusScale;
  // A representative swatch so the chip reads at a glance before generating.
  swatch: string;
}

export const MOOD_PRESETS: MoodPreset[] = [
  {
    id: "tidal",
    label: "Tidal",
    blurb: "Cool, calm, dependable. Reads as trustworthy product UI.",
    hue: 205,
    hueSpread: 18,
    saturation: 70,
    lightness: 46,
    radius: "soft",
    swatch: "#1f85d0",
  },
  {
    id: "orchard",
    label: "Orchard",
    blurb: "Fresh green with warmth. Growth, health, approachable.",
    hue: 150,
    hueSpread: 22,
    saturation: 58,
    lightness: 42,
    radius: "soft",
    swatch: "#1f9d6b",
  },
  {
    id: "ember",
    label: "Ember",
    blurb: "Warm orange-red energy. Bold, confident, action-first.",
    hue: 18,
    hueSpread: 16,
    saturation: 78,
    lightness: 52,
    radius: "round",
    swatch: "#e8632a",
  },
  {
    id: "orchid",
    label: "Orchid",
    blurb: "Saturated violet. Creative, premium, a touch playful.",
    hue: 280,
    hueSpread: 24,
    saturation: 62,
    lightness: 56,
    radius: "round",
    swatch: "#9b5de5",
  },
  {
    id: "graphite",
    label: "Graphite",
    blurb: "Near-neutral slate with a quiet accent. Serious, editorial.",
    hue: 220,
    hueSpread: 30,
    saturation: 16,
    lightness: 40,
    radius: "sharp",
    swatch: "#4a5568",
  },
  {
    id: "rose",
    label: "Rose",
    blurb: "Deep pink-red. Expressive, modern, consumer-friendly.",
    hue: 342,
    hueSpread: 16,
    saturation: 68,
    lightness: 52,
    radius: "round",
    swatch: "#e0407a",
  },
];

export const RADIUS_VALUES: Record<RadiusScale, { label: string; px: number }> = {
  sharp: { label: "Sharp", px: 4 },
  soft: { label: "Soft", px: 12 },
  round: { label: "Round", px: 20 },
};

export function getPreset(id: string): MoodPreset {
  return MOOD_PRESETS.find((preset) => preset.id === id) ?? MOOD_PRESETS[0];
}
