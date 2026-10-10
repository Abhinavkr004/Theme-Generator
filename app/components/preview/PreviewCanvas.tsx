"use client";

import {
  ArrowUpRight,
  Bell,
  CaretDown,
  TrendUp,
  Users,
  CurrencyDollar,
  Lightning,
} from "@phosphor-icons/react";
import {
  themeToCssVars,
  type PreviewMode,
  type Theme,
} from "@/lib/theme";
import { MiniChart } from "./MiniChart";
import { PreviewForm } from "./PreviewForm";

interface PreviewCanvasProps {
  theme: Theme;
  mode: PreviewMode;
}

const STATS = [
  { label: "Active sessions", value: "2,847", delta: "+12.4%", icon: Users },
  { label: "Revenue", value: "$48.2k", delta: "+6.1%", icon: CurrencyDollar },
  { label: "Avg. response", value: "184ms", delta: "-9.3%", icon: Lightning },
];

const ACTIVITY = [
  { name: "Priya Nair", action: "upgraded to Scale", time: "2m" },
  { name: "Marcus Hale", action: "invited 3 teammates", time: "18m" },
  { name: "Lena Okafor", action: "connected a data source", time: "41m" },
];

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-border bg-surface ${className}`}
      style={{ borderRadius: "var(--radius)" }}
    >
      {children}
    </div>
  );
}

export function PreviewCanvas({ theme, mode }: PreviewCanvasProps) {
  return (
    <div
      className="theme-root flex min-h-full flex-col bg-background text-text"
      style={themeToCssVars(theme, mode)}
      data-theme={mode}
    >
      {/* Product top bar */}
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span
            className="flex size-7 items-center justify-center bg-accent text-accent-text"
            style={{ borderRadius: "calc(var(--radius) * 0.5)" }}
            aria-hidden
          >
            <TrendUp size={16} weight="bold" />
          </span>
          <span className="text-sm font-semibold">Northwind</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative flex size-9 items-center justify-center text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
            style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
            aria-label="Notifications, 2 unread"
          >
            <Bell size={18} aria-hidden />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger ring-2 ring-surface" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 border border-border px-2 py-1.5 text-sm transition-colors hover:bg-surface-muted"
            style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
          >
            <span
              className="flex size-6 items-center justify-center bg-accent text-xs font-semibold text-accent-text"
              style={{ borderRadius: "calc(var(--radius) * 0.4)" }}
              aria-hidden
            >
              AO
            </span>
            <CaretDown size={13} className="text-text-muted" aria-hidden />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-5 p-5">
        {/* Heading row */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Overview</h3>
            <p className="text-sm text-text-muted">Last 7 days of workspace activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="bg-success/15 px-2.5 py-1 text-xs font-medium text-success"
              style={{ borderRadius: "999px" }}
            >
              All systems normal
            </span>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {STATS.map((stat) => {
            const positive = stat.delta.startsWith("+");
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">{stat.label}</span>
                  <Icon size={16} className="text-text-muted" aria-hidden />
                </div>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <span className="font-mono text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span
                    className={`text-xs font-medium ${positive ? "text-success" : "text-text-muted"}`}
                  >
                    {stat.delta}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Chart + activity */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Active sessions</span>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-medium text-accent transition-opacity hover:opacity-80"
              >
                Full report
                <ArrowUpRight size={13} weight="bold" aria-hidden />
              </button>
            </div>
            <MiniChart />
          </Card>

          <Card className="p-5 lg:col-span-2">
            <span className="text-sm font-semibold">Recent activity</span>
            <ul className="mt-3 flex flex-col divide-y divide-border">
              {ACTIVITY.map((item) => (
                <li key={item.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center bg-surface-muted text-xs font-semibold text-text"
                    style={{ borderRadius: "999px" }}
                    aria-hidden
                  >
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm">
                    <span className="font-medium">{item.name}</span>{" "}
                    <span className="text-text-muted">{item.action}</span>
                  </p>
                  <span className="shrink-0 font-mono text-xs text-text-muted">{item.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Buttons + badges showcase */}
        <Card className="flex flex-col gap-4 p-5">
          <span className="text-sm font-semibold">Components</span>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="bg-accent px-4 py-2 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover active:scale-[0.98]"
              style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
            >
              Primary
            </button>
            <button
              type="button"
              className="border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-surface-muted active:scale-[0.98]"
              style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
            >
              Secondary
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-surface-muted"
              style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
            >
              Ghost
            </button>
            <button
              type="button"
              disabled
              className="border border-border px-4 py-2 text-sm font-semibold text-text-muted opacity-50"
              style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
            >
              Disabled
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "Accent", cls: "bg-accent/15 text-accent" },
              { label: "Success", cls: "bg-success/15 text-success" },
              { label: "Warning", cls: "bg-warning/15 text-warning" },
              { label: "Danger", cls: "bg-danger/15 text-danger" },
            ].map((badge) => (
              <span
                key={badge.label}
                className={`px-2.5 py-1 text-xs font-medium ${badge.cls}`}
                style={{ borderRadius: "999px" }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </Card>

        {/* Form */}
        <Card className="p-5">
          <span className="text-sm font-semibold">Join the beta</span>
          <div className="mt-3">
            <PreviewForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
