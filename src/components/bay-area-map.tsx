import Image from "next/image";

export function BayAreaMap() {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-line/70">
      <Image
        src="/photos/bay-area-map.webp"
        alt="Map of the San Francisco Bay Area counties served: Sonoma, Marin, San Francisco, San Mateo, Santa Clara, Alameda, and Contra Costa"
        width={1217}
        height={939}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
    </div>
  );
}
