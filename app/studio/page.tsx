import type { Metadata } from "next";
import { StudioShell } from "../components/StudioShell";

export const metadata: Metadata = {
  title: "Studio - Palette Studio",
  description:
    "Pick a mood, generate a complete color theme, preview it on real components, and export ready-to-use tokens for CSS, Tailwind, or JSON.",
};

export default function StudioPage() {
  return <StudioShell />;
}
