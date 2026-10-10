"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  createSavedTheme,
  loadSavedThemes,
  persistSavedThemes,
  type SavedTheme,
  type Theme,
} from "@/lib/theme";

// localStorage is an external store. useSyncExternalStore is the idiomatic way
// to read it: it returns the server snapshot ([]) during SSR and hydration, then
// the real stored value on the client, with no effect-driven setState and no
// hydration mismatch.

const SERVER_SNAPSHOT: SavedTheme[] = [];
let cache: SavedTheme[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === "palette-studio:saved-themes") {
      cache = loadSavedThemes();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): SavedTheme[] {
  if (cache === null) cache = loadSavedThemes();
  return cache;
}

function setItems(next: SavedTheme[]) {
  cache = next.slice(0, 8);
  persistSavedThemes(cache);
  emit();
}

export function useSavedThemes() {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);

  const save = useCallback((theme: Theme) => {
    setItems([createSavedTheme(theme), ...getSnapshot()]);
  }, []);

  const remove = useCallback((id: string) => {
    setItems(getSnapshot().filter((item) => item.id !== id));
  }, []);

  return { items, save, remove };
}
