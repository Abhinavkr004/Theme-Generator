// A SavedTheme is a Theme snapshot plus an id, persisted to localStorage so a
// user can keep a few generated themes side by side across reloads.

import type { Theme } from "./generate";

export interface SavedTheme extends Theme {
  id: string;
  savedAt: number;
}

const STORAGE_KEY = "palette-studio:saved-themes";
const MAX_SAVED = 8;

export function loadSavedThemes(): SavedTheme[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedTheme[]) : [];
  } catch {
    return [];
  }
}

export function persistSavedThemes(items: SavedTheme[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_SAVED)));
  } catch {
    // Storage can be full or blocked; the in-memory list still works this session.
  }
}

export function createSavedTheme(theme: Theme): SavedTheme {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `theme-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
  return { ...theme, id, savedAt: Date.now() };
}

export { MAX_SAVED };
