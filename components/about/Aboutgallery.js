"use client";
import { useRef } from "react";

// Replace /public/gallery/*.jpg with real project photography.
const ITEMS = [
  { title: "Flex & Vinyl", count: "12", img: "/gallery/1.jpg" },
  { title: "UV & White Ink", count: "09", img: "/gallery/2.jpg" },
  { title: "Signage & Glow", count: "20", img: "/gallery/3.jpg" },
  { title: "Laser & CNC", count: "15", img: "/gallery/4.jpg" },
  { title: "Installations", count: "18", img: "/gallery/5.jpg" },
];

export default function AboutGallery() {
  const trackRef = useRef(null);
  const scroll = (dir) => trackRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((it) => (
            <div key={it.title} className="w-64 shrink-0 snap-start md:w-72">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
                <img src={it.img} alt={it.title} className="h-full w-full object-cover grayscale" />
              </div>
              <p className="mt-4 font-display text-sm uppercase tracking-wide text-paper">{it.title}</p>
              <p className="mt-1 text-xs text-paper/50">{it.count} images</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-cyan hover:text-cyan"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-magenta hover:text-magenta"
          >
            →
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-paper/15 px-6 pt-10">
        <div className="flex items-end justify-between">
          <span className="font-display text-5xl text-paper/30 md:text-7xl">03</span>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-paper md:text-8xl">
            Gallery
          </h2>
        </div>
      </div>
    </section>
  );
}