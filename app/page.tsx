import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChatCircleDots,
  CheckCircle,
  Code,
  Cursor,
  Export,
  Eye,
  FloppyDisk,
  GithubLogo,
  Lightning,
  Palette,
  Shuffle,
  Sliders,
} from "@phosphor-icons/react/dist/ssr";
import { LandingNav } from "./components/landing/LandingNav";
import { Reveal } from "./components/landing/Reveal";
import { MoodShowcase } from "./components/landing/MoodShowcase";
import { HeroPreview } from "./components/landing/HeroPreview";
import { FaqAccordion } from "./components/landing/FaqAccordion";

const FEATURES = [
  {
    icon: Sliders,
    title: "Six curated moods",
    body: "Start from a hue family with real personality - Tidal, Orchard, Ember, Orchid, Graphite, Rose - then dial in the exact feel.",
  },
  {
    icon: Eye,
    title: "Live component preview",
    body: "See every token on real buttons, forms, cards, and charts in both light and dark before you commit a single value.",
  },
  {
    icon: CheckCircle,
    title: "WCAG contrast built in",
    body: "Every foreground and background pair is graded as you work, so a palette never ships text that fails to read.",
  },
  {
    icon: Cursor,
    title: "Fine-grained control",
    body: "Override the accent with any hex, choose sharp, soft, or round corners, and regenerate variations on a seed.",
  },
];

const WORKFLOW = [
  {
    icon: Shuffle,
    title: "Pick a mood",
    body: "Choose a starting direction or hit Surprise me for a fresh seed. The generator shapes a full palette from color theory.",
  },
  {
    icon: Eye,
    title: "Preview and tune",
    body: "Watch the whole UI re-theme instantly. Adjust the accent, radius, and mode until it reads exactly right.",
  },
  {
    icon: Export,
    title: "Export the tokens",
    body: "Copy production-ready CSS variables, a Tailwind v4 theme block, or plain JSON. Drop it straight into your project.",
  },
];

const EXPORTS = [
  { label: "CSS", desc: "Custom properties with light and dark overrides, scoped to data-theme." },
  { label: "Tailwind", desc: "A Tailwind v4 @theme block ready to paste into your stylesheet." },
  { label: "JSON", desc: "Flat token objects for design pipelines or your own build step." },
];

const FAQ = [
  {
    q: "How are the palettes generated?",
    a: "Rule-based color theory, seeded for repeatable results. The same mood and seed always produce the same theme, so a palette you like is never lost to a refresh.",
  },
  {
    q: "Is it actually accessible?",
    a: "Contrast is scored against WCAG 2.1 ratios for the key text and surface pairs, and labelled AAA, AA, AA Large, or Fail right in the studio.",
  },
  {
    q: "What can I export?",
    a: "CSS custom properties, a Tailwind v4 theme block, or JSON tokens. The token shape is designed to swap in a model-backed generator later without changing your integration.",
  },
  {
    q: "Do I need an account?",
    a: "No. Themes you save are kept in your browser, and everything runs client-side. Open the studio and start building.",
  },
  {
    q: "Does it support light and dark?",
    a: "Every theme is generated as a matched light and dark pair. You preview both in the studio, and both ship in the exported tokens, scoped to a data-theme attribute.",
  },
  {
    q: "Can I bring my own brand color?",
    a: "Yes. Override the accent with any hex value and the generator rebuilds the surrounding surfaces, borders, and states around it while keeping the contrast checks live.",
  },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-site-bg text-site-text antialiased">
      <LandingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_0%,var(--site-glow),transparent_70%)]"
          />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-20 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pt-28">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-site-line bg-site-bg-elevated px-3 py-1 text-xs font-medium text-site-text-muted">
                <Lightning size={13} weight="fill" className="text-site-accent" aria-hidden />
                Accessible themes in seconds
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-site-text md:text-6xl">
                Design a full color theme,
                <span className="text-site-accent"> not just a swatch.</span>
              </h1>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-site-text-muted md:text-lg">
                Palette Studio turns a mood into a complete, accessible UI theme. Preview it on
                real components, check the contrast, and export tokens your codebase can use today.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/studio"
                  className="group flex items-center gap-2 rounded-xl bg-site-accent px-5 py-3 text-sm font-semibold text-site-accent-contrast transition-colors hover:bg-site-accent-hover"
                >
                  Open the studio
                  <ArrowRight
                    size={16}
                    weight="bold"
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <a
                  href="#features"
                  className="rounded-xl border border-site-line-strong px-5 py-3 text-sm font-semibold text-site-text transition-colors hover:bg-site-bg-elevated"
                >
                  See how it works
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <HeroPreview />
            </Reveal>
          </div>
        </section>

        {/* Moods */}
        <section id="features" className="border-t border-site-line py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-site-text md:text-4xl">
                Start from a mood with real intent
              </h2>
              <p className="mt-4 text-base leading-relaxed text-site-text-muted">
                Each preset carries a hue family, saturation band, and personality the generator
                reads to shape the rest of the palette. This is the taste baked into the tool.
              </p>
            </Reveal>
            <Reveal className="mt-10" delay={80}>
              <MoodShowcase />
            </Reveal>
          </div>
        </section>

        {/* Feature bento */}
        <section className="border-t border-site-line py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-site-text md:text-4xl">
                Everything a theme needs, in one pass
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {FEATURES.map((feature, i) => (
                <Reveal
                  key={feature.title}
                  delay={i * 70}
                  className="rounded-2xl border border-site-line bg-site-bg-elevated p-6 transition-colors hover:border-site-line-strong md:p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-site-accent/15 text-site-accent">
                    <feature.icon size={22} weight="bold" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-site-text">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-site-text-muted">{feature.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="border-t border-site-line py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-site-text md:text-4xl">
                From blank canvas to shipped tokens
              </h2>
              <p className="mt-4 text-base leading-relaxed text-site-text-muted">
                Three steps, no setup, nothing to install.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {WORKFLOW.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-site-line bg-site-bg-elevated text-site-accent">
                      <step.icon size={20} weight="bold" aria-hidden />
                    </span>
                    <span className="font-mono text-sm text-site-text-faint">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-site-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-site-text-muted">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Export */}
        <section id="export" className="border-t border-site-line py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-site-accent">
                <Code size={16} weight="bold" aria-hidden />
                Export
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-site-text md:text-4xl">
                Copy tokens that drop straight in
              </h2>
              <p className="mt-4 text-base leading-relaxed text-site-text-muted">
                Pick the format your stack speaks. Light and dark are handled, the radius travels
                with the theme, and the output is clean enough to commit as-is.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {EXPORTS.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-site-accent/15 font-mono text-[11px] font-bold text-site-accent">
                      {item.label.slice(0, 2)}
                    </span>
                    <p className="text-sm leading-relaxed text-site-text">
                      <span className="font-semibold text-site-text">{item.label}</span>
                      <span className="text-site-text-muted"> - {item.desc}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-2xl border border-site-line bg-site-bg-elevated">
                <div className="flex items-center gap-2 border-b border-site-line px-4 py-3">
                  <FloppyDisk size={14} className="text-site-text-faint" aria-hidden />
                  <span className="font-mono text-[11px] text-site-text-muted">theme.css</span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-site-text">
                  <code>{`:root {
  --color-background: #fafbfc;
  --color-surface: #ffffff;
  --color-text: #1a2026;
  --color-accent: #1f85d0;
  --color-accent-hover: #1a6fb0;
  --radius: 12px;
}

[data-theme="dark"] {
  --color-background: #0f141a;
  --color-surface: #171d25;
  --color-text: #e8edf2;
  --color-accent: #4b9fe0;
}`}</code>
                </pre>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative overflow-hidden border-t border-site-line py-20 lg:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_15%_30%,var(--site-glow),transparent_70%)] opacity-70"
          />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <Reveal className="lg:sticky lg:top-24 lg:self-start">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-site-accent">
                <ChatCircleDots size={16} weight="bold" aria-hidden />
                FAQ
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-site-text md:text-4xl">
                Questions, answered
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-site-text-muted">
                The quick version of how Palette Studio works. Expand any question for the detail.
              </p>

              <div className="mt-8 rounded-2xl border border-site-line bg-site-bg-elevated p-5">
                <p className="text-sm font-semibold text-site-text">Still curious?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-site-text-muted">
                  The fastest way to understand it is to build a theme.
                </p>
                <Link
                  href="/studio"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-site-accent transition-colors hover:text-site-accent-hover"
                >
                  Open the studio
                  <ArrowRight
                    size={14}
                    weight="bold"
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <FaqAccordion items={FAQ} />
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-site-line py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
            <Reveal className="relative overflow-hidden rounded-3xl border border-site-line bg-[radial-gradient(80%_120%_at_50%_0%,var(--site-glow),transparent_70%)] px-6 py-16 text-center lg:px-12">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-site-text md:text-5xl">
                Build a theme you can ship in minutes
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-site-text-muted">
                Open the studio, pick a mood, and export tokens that are accessible from the start.
              </p>
              <Link
                href="/studio"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-site-accent px-6 py-3.5 text-sm font-semibold text-site-accent-contrast transition-colors hover:bg-site-accent-hover"
              >
                Open the studio
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-site-line bg-site-bg-elevated/40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-site-accent/40 to-transparent"
        />
        <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            {/* Brand */}
            <div className="max-w-sm">
              <Link href="/" className="flex items-center gap-2.5" aria-label="Palette Studio home">
                <span className="flex size-8 items-center justify-center rounded-lg bg-site-accent text-site-accent-contrast">
                  <Palette size={18} weight="fill" aria-hidden />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-site-text">
                  Palette Studio
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-site-text-muted">
                Turn a mood into a complete, accessible UI theme and export tokens your codebase can
                use today.
              </p>
              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex size-9 items-center justify-center rounded-lg border border-site-line text-site-text-muted transition-colors hover:border-site-line-strong hover:text-site-text"
                >
                  <GithubLogo size={18} aria-hidden />
                </a>
                <Link
                  href="/studio"
                  className="group flex items-center gap-1.5 rounded-lg border border-site-line px-3.5 py-2 text-sm font-semibold text-site-text transition-colors hover:border-site-line-strong"
                >
                  Open the studio
                  <ArrowUpRight
                    size={15}
                    weight="bold"
                    aria-hidden
                    className="text-site-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Link columns */}
            <nav aria-label="Product" className="flex flex-col gap-3.5">
              <span className="text-xs font-semibold tracking-wide text-site-text-faint">
                Product
              </span>
              {[
                { label: "Features", href: "#features" },
                { label: "Workflow", href: "#workflow" },
                { label: "Export formats", href: "#export" },
                { label: "Open the studio", href: "/studio" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-site-text-muted transition-colors hover:text-site-text"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <nav aria-label="Resources" className="flex flex-col gap-3.5">
              <span className="text-xs font-semibold tracking-wide text-site-text-faint">
                Resources
              </span>
              {[
                { label: "FAQ", href: "#faq" },
                { label: "Moods", href: "#features" },
                { label: "Accessibility", href: "#features" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-site-text-muted transition-colors hover:text-site-text"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-site-line pt-6 text-sm text-site-text-muted sm:flex-row sm:items-center">
            <span>&copy; Palette Studio. Built for the web.</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              Runs entirely in your browser
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
