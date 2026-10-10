import Link from "next/link";
import { ArrowRight, Palette } from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "../theme/ThemeToggle";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Export", href: "#export" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-site-line bg-site-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Palette Studio home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-site-accent text-site-accent-contrast">
            <Palette size={18} weight="fill" aria-hidden />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-site-text">
            Palette Studio
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-site-text-muted transition-colors hover:text-site-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/studio"
            className="group flex items-center gap-1.5 rounded-lg bg-site-accent px-4 py-2 text-sm font-semibold text-site-accent-contrast transition-colors hover:bg-site-accent-hover"
          >
            Open the studio
            <ArrowRight
              size={15}
              weight="bold"
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
