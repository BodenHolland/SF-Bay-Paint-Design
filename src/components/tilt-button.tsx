"use client";

import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

// Same cursor-reactive 3D tilt + gold sheen as <TiltLink>, but for a real
// <button> (e.g. form submit). Honors prefers-reduced-motion and disabled state.
export function TiltButton({
  children,
  className = "",
  max = 8,
  scale = 1.03,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const raf = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    if (el.disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - py) * max * 2;
    const rotY = (px - 0.5) * max * 2;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transition = "transform 0.12s ease-out, background-color 0.3s ease";
      el.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
      el.style.setProperty("--s", String(scale));
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    });
  };

  const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transition =
      "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease";
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--s", "1");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  return (
    <button
      {...rest}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`tilt inline-flex items-center justify-center ${className}`}
    >
      <span className="relative z-[1] inline-flex items-center justify-center gap-3">
        {children}
      </span>
    </button>
  );
}
