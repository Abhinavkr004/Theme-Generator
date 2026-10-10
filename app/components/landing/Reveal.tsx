"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms, applied as a transition-delay. */
  delay?: number;
  as?: "div" | "li" | "section";
}

// Lightweight scroll-reveal. Uses IntersectionObserver (never a scroll
// listener) and collapses to an instant, static state under reduced motion.
// Resolve the motion preference once, outside render, so the effect never has
// to call setState synchronously just to learn it.
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = prefersReducedMotion();
  const [shown, setShown] = useState(reduce);

  useEffect(() => {
    if (reduce) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  const Tag = as;
  const base = reduce
    ? ""
    : `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`;

  return (
    <Tag
      ref={ref as never}
      style={reduce ? undefined : { transitionDelay: `${delay}ms` }}
      className={`${base} ${className}`}
    >
      {children}
    </Tag>
  );
}
