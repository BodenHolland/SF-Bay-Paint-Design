"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type WorkPhoto = { src: string; alt: string };

export function WorkGallery({ photos }: { photos: WorkPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View ${p.alt} larger`}
            className={`group relative cursor-pointer overflow-hidden ${
              i === 0 ? "aspect-[4/5] lg:row-span-2 lg:aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-3xl text-white/80 transition-colors hover:text-white"
          >
            ×
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center text-4xl text-white/70 transition-colors hover:text-white sm:left-6"
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[78vh] w-full max-w-5xl"
          >
            <Image
              src={photos[open].src}
              alt={photos[open].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <p className="absolute -bottom-8 left-0 right-0 text-center text-sm text-white/70">
              {open + 1} / {photos.length}
            </p>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center text-4xl text-white/70 transition-colors hover:text-white sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
