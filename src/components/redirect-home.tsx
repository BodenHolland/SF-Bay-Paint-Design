"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Counts down and then sends the visitor to the home page.
export function RedirectHome({ seconds = 5 }: { seconds?: number }) {
  const router = useRouter();
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(
      () => setLeft((n) => Math.max(0, n - 1)),
      1000,
    );
    const timeout = setTimeout(() => router.push("/"), seconds * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [seconds, router]);

  return (
    <p className="mt-10 text-sm uppercase tracking-[0.18em] text-muted">
      Redirecting you home in {left} second{left === 1 ? "" : "s"}…
    </p>
  );
}
