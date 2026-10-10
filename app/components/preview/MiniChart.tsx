"use client";

// A compact area+bar chart drawn with inline SVG so it adopts the live accent
// through currentColor-style token references. No chart library needed for a
// preview this small, and it keeps the bundle lean.

const WEEKS = [
  { label: "Mon", value: 38 },
  { label: "Tue", value: 52 },
  { label: "Wed", value: 44 },
  { label: "Thu", value: 61 },
  { label: "Fri", value: 73 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 67 },
];

export function MiniChart() {
  const max = Math.max(...WEEKS.map((w) => w.value));
  const width = 280;
  const height = 96;
  const step = width / (WEEKS.length - 1);
  const points = WEEKS.map((w, i) => {
    const x = i * step;
    const y = height - (w.value / max) * (height - 12) - 4;
    return { x, y };
  });
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-24 w-full overflow-visible"
        role="img"
        aria-label="Weekly active sessions, trending up to 67 on Sunday"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#chart-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle
            key={WEEKS[i].label}
            cx={p.x}
            cy={p.y}
            r={i === points.length - 1 ? 4 : 2.5}
            fill="var(--color-accent)"
          />
        ))}
      </svg>
      <div className="flex justify-between">
        {WEEKS.map((w) => (
          <span key={w.label} className="font-mono text-[10px] text-text-muted">
            {w.label}
          </span>
        ))}
      </div>
    </div>
  );
}
