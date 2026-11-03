// "use client";
// import { SqueezeCarousel } from "@/components/ui/carousel-squeeze";

// // Swap /public/gallery/*.jpg for real project photos
// const mark = (t) => <span className="text-sm font-medium tracking-tight text-white">{t}</span>;
// const slides = [
//   ["UV printing with white ink", "Opaque whites on acrylic, glass and ACP.", "Printing"],
//   ["Facade and hoarding branding", "Large-scale outdoor work, framed and installed.", "Branding"],
//   ["LED and edge-glow signage", "Acrylic and liquid-acrylic signs that light up.", "Signage"],
//   ["Laser and CNC cutting", "Clean cuts and carvings for decor and signage.", "Fabrication"],
//   ["Arches and structural lighting", "Event and permanent installations.", "Installations"],
// ].map(([title, description, tag], k) => ({
//   id: k, title, description, overlay: mark(tag), image: `/gallery/${k + 1}.jpg`, imageAlt: title,
//   // action: "Get a quote", href: "/contact",
// }));

// export default function Gallery() {
//   return (
//     <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
//       <h2 className="mb-10 font-display text-3xl tracking-tight text-ink md:text-5xl">Recent work</h2>
//       <SqueezeCarousel slides={slides} label="Recent work" autoplay accent="#EC008C" accentForeground="#fff" />
//     </section>
//   );
// }
"use client";
import { useMemo } from "react";
import { SqueezeCarousel } from "@/components/ui/carousel-squeeze";
import useContent from "@/lib/useContent";

const mark = (t) => <span className="text-sm font-medium tracking-tight text-white">{t}</span>;

// Shown until the admin pins at least one image
const FALLBACK = [
  ["UV printing with white ink", "Opaque whites on acrylic, glass and ACP.", "Printing"],
  ["Facade and hoarding branding", "Large-scale outdoor work, framed and installed.", "Branding"],
  ["LED and edge-glow signage", "Acrylic and liquid-acrylic signs that light up.", "Signage"],
  ["Laser and CNC cutting", "Clean cuts and carvings for decor and signage.", "Fabrication"],
  ["Arches and structural lighting", "Event and permanent installations.", "Installations"],
].map(([title, desc, tag], k) => ({ _id: k, title, desc, tag, img: `/gallery/${k + 1}.jpg` }));

export default function Gallery() {
  const items = useContent("/api/content/gallery-pinned", FALLBACK);
  const slides = useMemo(
    () =>
      items.map((it, k) => ({
        id: it._id ?? k,
        title: it.title,
        description: it.desc,
        overlay: mark(it.tag),
        image: it.img,
        imageAlt: it.title,
      })),
    [items]
  );

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 font-display text-3xl tracking-tight text-ink md:text-5xl">Recent work</h2>
      <SqueezeCarousel slides={slides} label="Recent work" autoplay accent="#EC008C" accentForeground="#fff" />
    </section>
  );
}