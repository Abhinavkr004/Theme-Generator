"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";

export interface FaqItem {
  q: string;
  a: string;
}

// An accordion is the right structure here: the questions are a scannable
// index, and the answers only matter once a reader commits to one. Height
// animates with a grid-rows trick (no JS measurement, GPU-cheap), and the
// whole thing degrades to open/close with no motion under reduced-motion.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div
            key={item.q}
            className={`group overflow-hidden rounded-2xl border transition-colors duration-300 ${
              isOpen
                ? "border-site-line-strong bg-site-bg-elevated"
                : "border-site-line bg-site-bg-elevated/40 hover:border-site-line-strong hover:bg-site-bg-elevated/70"
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
              >
                <span className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className={`font-mono text-xs tabular-nums transition-colors duration-300 ${
                      isOpen ? "text-site-accent" : "text-site-text-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold text-site-text md:text-lg">
                    {item.q}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
                    isOpen
                      ? "rotate-45 border-site-accent bg-site-accent text-site-accent-contrast"
                      : "border-site-line-strong text-site-text-muted group-hover:text-site-text"
                  }`}
                >
                  <Plus size={15} weight="bold" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-site-text-muted md:px-6 md:pl-[3.5rem]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
