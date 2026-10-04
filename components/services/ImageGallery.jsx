"use client";
import { useState } from "react";

// Replace /public/services/placeholder-N.jpg with real photos for each type.
const IMAGES = ["/services/placeholder-1.jpg", "/services/placeholder-2.jpg", "/services/placeholder-3.jpg"];

export default function ImageGallery({ alt }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink/10">
        <img src={IMAGES[active]} alt={alt} className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={() => setActive((i) => (i - 1 + IMAGES.length) % IMAGES.length)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-ink shadow backdrop-blur hover:bg-paper"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setActive((i) => (i + 1) % IMAGES.length)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-ink shadow backdrop-blur hover:bg-paper"
        >
          →
        </button>
      </div>
      <div className="mt-3 flex gap-3">
        {IMAGES.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
              i === active ? "border-cyan" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}