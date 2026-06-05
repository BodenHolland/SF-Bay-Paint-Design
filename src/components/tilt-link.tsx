"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

// 3D "tilt toward the cursor" effect — the kind VanillaTilt.js / react-parallax-tilt
// popularized — as a dependency-free React wrapper around <Link>. The button
// leans toward the pointer with a soft gold sheen that follows it, then eases
// back on leave. Honors prefers-reduced-motion.
export function TiltLink({
  href,
  children,
  className = "",
  max = 10,
  scale = 1.04,
  sheen = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  max?: number; // peak tilt in degrees
  scale?: number; // hover scale
  sheen?: boolean; // the soft gold/white highlight that follows the cursor
}) {
  const raf = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotX = (0.5 - py) * max * 2; // tilt up/down toward cursor
    const rotY = (px - 0.5) * max * 2; // tilt left/right toward cursor
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

  const reset = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <Link
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`tilt inline-flex items-center justify-center ${sheen ? "" : "no-sheen"} ${className}`}
    >
      <span className="relative z-[1] inline-flex items-center gap-3">
        {children}
      </span>
    </Link>
  );
}
