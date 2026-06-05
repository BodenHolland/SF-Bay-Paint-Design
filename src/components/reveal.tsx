"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Subtle fade + rise when scrolled into view. Reusable wrapper; pass `delay`
// for staggered reveals. Plays once.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Drop will-change once the rise finishes. Leaving it on would pin every
  // revealed element to its own compositor layer permanently — with dozens per
  // page that's what makes scrolling feel laggy. We only hint it during the
  // ~0.9s animation window (transition is 900ms; 1000ms covers it + the delay).
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setDone(true), delay + 1000);
    return () => window.clearTimeout(t);
  }, [inView, delay]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: inView && !done ? "transform, opacity" : "auto",
      }}
      // Under prefers-reduced-motion the content is shown immediately with no
      // fade/rise (motion-reduce:* variants override the hidden state), so the
      // reveal never withholds content from users who opt out of motion.
      className={`transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
