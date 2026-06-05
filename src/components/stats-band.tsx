"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value?: string;
  countTo?: number;
  suffix?: string;
  duration?: number;
  label: string;
};

export function StatsBand({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-line/60 bg-charcoal/40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-line/60 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-2 py-10 text-center transition-all duration-700 ease-out sm:py-12 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 140}ms` }}
          >
            <div className="text-5xl font-light tracking-tight text-gold tabular-nums">
              {s.countTo != null ? (
                <CountUp to={s.countTo} run={inView} suffix={s.suffix} duration={s.duration} />
              ) : (
                s.value
              )}
            </div>
            <p className="mx-auto mt-3 max-w-[14rem] text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({
  to,
  run,
  suffix = "",
  duration = 2000,
}: {
  to: number;
  run: boolean;
  suffix?: string;
  duration?: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);

  return (
    <>
      {n.toLocaleString()}
      {suffix}
    </>
  );
}
