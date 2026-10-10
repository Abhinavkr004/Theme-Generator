"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type SiteTheme = "light" | "dark";

const STORAGE_KEY = "palette-studio-site-theme";

interface ThemeContextValue {
  theme: SiteTheme;
  toggle: () => void;
  setTheme: (theme: SiteTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// The <html data-site-theme> attribute (set before paint by the inline script)
// is the single source of truth. React subscribes to it with
// useSyncExternalStore: the server snapshot is "dark", the client snapshot is
// the real attribute, and React reconciles the difference after hydration
// instead of reporting a mismatch.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-site-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): SiteTheme {
  return document.documentElement.getAttribute("data-site-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): SiteTheme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: SiteTheme) => {
    document.documentElement.setAttribute("data-site-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the attribute still applies.
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  // Keep in sync if another tab changes the preference.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
        document.documentElement.setAttribute("data-site-theme", event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useSiteTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useSiteTheme must be used within a ThemeProvider");
  }
  return ctx;
}

// Runs before paint to set data-site-theme from storage or system preference,
// so there is never a flash of the wrong theme. Injected via a layout script.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-site-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-site-theme", "dark");
  }
})();
`;
