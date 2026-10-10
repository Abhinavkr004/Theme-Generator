"use client";

import { useId, useState } from "react";
import { Check, Copy, FileCode } from "@phosphor-icons/react";
import { getPreset, hslToHex, type Theme } from "@/lib/theme";

type SnippetId = "css" | "tailwind" | "react";

interface Snippet {
  id: SnippetId;
  label: string;
  file: string;
  hint: string;
}

const SNIPPETS: Snippet[] = [
  { id: "css", label: "CSS", file: "components.css", hint: "Reference the tokens as variables." },
  { id: "tailwind", label: "Tailwind", file: "card.html", hint: "Use the generated utilities." },
  { id: "react", label: "React", file: "ThemeSwitch.tsx", hint: "Switch light and dark in one attribute." },
];

// Shows how the exported tokens are consumed. Every snippet carries the live
// mood, accent, and radius in its header comment, so the code always matches
// the theme on screen. Snippets are plain strings (no highlighter dependency)
// and each block scrolls on both axes instead of wrapping, so long lines can
// never break the layout.
function buildSnippet(id: SnippetId, theme: Theme): string {
  const label = getPreset(theme.moodId).label;
  const accent = hslToHex(theme.accentHsl);

  if (id === "css") {
    return `/* ${label} theme, accent ${accent}, radius ${theme.radiusPx}px */
/* Paste the exported tokens first. */

.button {
  background: var(--color-accent);
  color: var(--color-accent-text);
  border-radius: calc(var(--radius) * 0.6);
  padding: 0.5rem 1rem;
  font-weight: 600;
}

.button:hover {
  background: var(--color-accent-hover);
}

.card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.card p {
  color: var(--color-text-muted);
}`;
  }

  if (id === "tailwind") {
    return `<!-- ${label} theme, accent ${accent}, radius ${theme.radiusPx}px -->
<!-- Add the exported @theme block to your stylesheet. -->

<article class="rounded-theme border border-border bg-surface p-5 text-text">
  <h3 class="font-semibold">Join the beta</h3>
  <p class="mt-1 text-sm text-text-muted">
    One email when your workspace is ready.
  </p>

  <button
    class="mt-4 rounded-theme bg-accent px-4 py-2
           font-semibold text-accent-text
           hover:bg-accent-hover"
  >
    Request access
  </button>
</article>`;
  }

  return `// ${label} theme, accent ${accent}, radius ${theme.radiusPx}px
// Light and dark are scoped to data-theme, so switching is one attribute.
"use client";

export function ThemeSwitch() {
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme =
      root.dataset.theme === "dark" ? "light" : "dark";
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-theme bg-accent px-4 py-2 text-accent-text"
    >
      Toggle theme
    </button>
  );
}`;
}

function SnippetPanel({ snippet, theme }: { snippet: Snippet; theme: Theme }) {
  const [copied, setCopied] = useState(false);
  const code = buildSnippet(snippet.id, theme);
  const lineCount = code.split("\n").length;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable; the block stays selectable as a fallback.
    }
  };

  return (
    <div
      className="flex min-w-0 flex-col overflow-hidden border border-border bg-background"
      style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-surface px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <FileCode size={14} className="shrink-0 text-accent" aria-hidden />
          <span className="text-xs font-semibold text-text">{snippet.label}</span>
          <span className="truncate font-mono text-[11px] text-text-muted">
            {snippet.file}
          </span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`Copy ${snippet.label} snippet`}
          className="flex shrink-0 items-center gap-1.5 border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-surface-muted active:scale-[0.97]"
          style={{ borderRadius: "calc(var(--radius) * 0.4)" }}
        >
          {copied ? (
            <>
              <Check size={13} weight="bold" className="text-success" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>

      <pre
        tabIndex={0}
        aria-label={`${snippet.label} example, ${lineCount} lines`}
        className="h-[25rem] flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-text"
      >
        <code>{code}</code>
      </pre>

      <p className="border-t border-border bg-surface px-3 py-2 text-xs text-text-muted">
        {snippet.hint}
      </p>
    </div>
  );
}

export function UsageSnippets({ theme }: { theme: Theme }) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="border border-border bg-surface p-5 lg:p-6"
      style={{ borderRadius: "var(--radius)" }}
    >
      <div className="mb-5 max-w-[65ch]">
        <h3 id={titleId} className="text-base font-semibold text-text">
          Use it in code
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">
          Paste the exported tokens, then reference them like this. All three snippets follow
          the theme you are designing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {SNIPPETS.map((snippet) => (
          <SnippetPanel key={snippet.id} snippet={snippet} theme={theme} />
        ))}
      </div>
    </section>
  );
}
