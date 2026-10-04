"use client";

// Replace with your real address, or "lat,lng" (e.g. "17.3850,78.4867") for a precise pin.
const MAP_QUERY = "Corp Prints, Hyderabad, Telangana";

const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;
const openHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

function Crop({ className }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute z-20 h-4 w-4 text-ink/40 ${className}`}
    >
      <path d="M12 0V9M12 24V15M0 12H9M24 12H15" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function MapCard({ className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_80px_-30px_rgba(20,21,26,0.25)] ${className}`}
    >
      {/* CMYK colour bar */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-20 flex h-1">
        <span className="flex-1 bg-cyan" />
        <span className="flex-1 bg-magenta" />
        <span className="flex-1 bg-yellow" />
        <span className="flex-1 bg-ink" />
      </div>

      <div className="relative h-64 md:h-72">
        {/* The map: muted to match the light theme, full colour on hover */}
        <iframe
          title="Corp Prints location on Google Maps"
          src={embedSrc}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 transition-[filter] duration-500 [filter:grayscale(0.85)_contrast(1.05)_brightness(1.04)] group-hover:[filter:grayscale(0.2)_contrast(1.02)]"
        />

        {/* CMYK tint wash (doesn't block the map) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-cyan/20 via-transparent to-magenta/15 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-yellow/10 mix-blend-multiply"
        />

        <Crop className="left-3 top-4" />
        <Crop className="right-3 top-4" />
        <Crop className="bottom-3 left-3" />
        <Crop className="bottom-3 right-3" />

        {/* Open in Google Maps */}
        <a
          href={openHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-ink/10 bg-paper/90 px-3.5 py-2 text-xs font-medium text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper"
        >
          <span className="flex gap-0.5">
            <i className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <i className="h-1.5 w-1.5 rounded-full bg-magenta" />
            <i className="h-1.5 w-1.5 rounded-full bg-yellow" />
          </span>
          Get directions
        </a>
      </div>
    </div>
  );
}