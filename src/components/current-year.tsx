"use client";

import { useEffect, useState } from "react";

// Renders the current year on the client so it stays accurate even on a
// statically built page. `initial` (the build-time year) avoids a hydration
// mismatch and an empty flash.
export function CurrentYear({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
