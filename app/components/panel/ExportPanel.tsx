"use client";

import { useState } from "react";
import { Check, Copy, FileCode } from "@phosphor-icons/react";
import {
  exportTheme,
  type ExportFormat,
  type PreviewMode,
  type Theme,
} from "@/lib/theme";
import { SwatchGrid } from "./SwatchGrid";
import { ContrastBadge } from "./ContrastBadge";

interface ExportPanelProps {
  theme: Theme;
  mode: PreviewMode;
}

const FORMATS: { id: ExportFormat; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "tailwind", label: "Tailwind" },
  { id: "json", label: "JSON" },
];

const FILENAMES: Record<ExportFormat, string> = {
  css: "theme.css",
  tailwind: "theme.css",
  json: "theme.tokens.json",
};

export function ExportPanel({ theme, mode }: ExportPanelProps) {
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState(false);

  const tokens = mode === "dark" ? theme.dark : theme.light;
  const code = exportTheme(theme, format);
  const lineCount = code.split("\n").length;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable; the code block remains selectable as a fallback.
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text">
          Tokens
          <span className="ml-2 font-normal capitalize text-text-muted">{mode} mode</span>
        </h3>
        <SwatchGrid tokens={tokens} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-text">Accessibility</h3>
          <span className="text-xs text-text-muted">WCAG contrast</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <ContrastBadge label="Text on surface" foreground={tokens.text} background={tokens.surface} />
          <ContrastBadge label="Muted on surface" foreground={tokens.textMuted} background={tokens.surface} />
          <ContrastBadge label="Label on accent" foreground={tokens.accentText} background={tokens.accent} />
          <ContrastBadge label="Text on background" foreground={tokens.text} background={tokens.background} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-text">Export</h3>
          <div
            className="flex gap-1 border border-border bg-surface-muted p-1"
            style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
          >
            {FORMATS.map((item) => {
              const active = item.id === format;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFormat(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active ? "bg-accent text-accent-text" : "text-text-muted hover:text-text"
                  }`}
                  style={{ borderRadius: "calc(var(--radius) * 0.4)" }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="relative flex flex-col overflow-hidden border border-border bg-surface"
          style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
        >
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileCode size={14} className="shrink-0 text-text-muted" aria-hidden />
              <span className="truncate font-mono text-xs text-text">{FILENAMES[format]}</span>
              <span className="shrink-0 font-mono text-[11px] text-text-muted">
                {lineCount} lines
              </span>
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="flex shrink-0 items-center gap-1.5 border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-surface-muted"
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
          <pre className="max-h-[clamp(22rem,56vh,44rem)] min-h-80 flex-1 overflow-y-auto whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-relaxed text-text">
            <code>{code}</code>
          </pre>
        </div>

        <p className="text-xs leading-relaxed text-text-muted">
          Both light and dark values are included, scoped to <code className="font-mono text-text">data-theme</code>.
          Paste the block into your stylesheet and the palette is live.
        </p>
      </section>
    </div>
  );
}
