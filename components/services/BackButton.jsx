"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ fallbackHref = "/services", label = "Back" }) {
  const router = useRouter();

  const goBack = () => {
    // If there's a previous page in this tab, go to it; otherwise (opened from a
    // direct link or a new tab) go to the fallback so the button never does nothing.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back to the previous page"
      className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-white/70 py-1.5 pl-2 pr-4 text-xs font-medium text-ink backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-paper"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/5 transition-colors group-hover:bg-white/15">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      </span>
      {label}
    </button>
  );
}