
import Link from "next/link";
import { notFound } from "next/navigation";
import { getType } from "@/data/services";
import ImageGallery from "@/components/services/ImageGallery";
import QuoteForm from "@/components/services/QuoteForm";
import BackButton from "@/components/services/BackButton";

export async function generateMetadata({ params }) {
  const t = getType(params.category, params.type);
  return { title: t ? `${t.name} | Corp Prints` : "Service | Corp Prints" };
}

export default function ServiceTypePage({ params }) {
  const t = getType(params.category, params.type);
  if (!t) notFound();

  return (
    <main className="min-h-screen bg-paper pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        {/* breadcrumb */}
        {/* <nav className="flex flex-wrap items-center gap-2 text-xs text-ink/50">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>&gt;</span>
          <Link href="/services" className="hover:text-ink">Services</Link>
          <span>&gt;</span>
          <Link href={`/services#${t.category.slug}`} className="hover:text-ink">{t.category.name}</Link>
          <span>&gt;</span>
          <span className="text-ink/70">{t.name}</span>
        </nav> */}
                {/* back button + breadcrumb */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <BackButton fallbackHref={`/services#${t.category.slug}`} />

          <nav className="flex flex-wrap items-center gap-2 text-xs text-ink/50">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>&gt;</span>
            <Link href="/services" className="hover:text-ink">Services</Link>
            <span>&gt;</span>
            <Link href={`/services#${t.category.slug}`} className="hover:text-ink">{t.category.name}</Link>
            <span>&gt;</span>
            <span className="text-ink/70">{t.name}</span>
          </nav>
        </div>

        {/* items-start is required for the sticky column below — a default
            grid row stretches both children to equal height, which breaks
            position:sticky on the shorter one */}
        <div className="mt-8 grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          {/* stays pinned in the viewport while the right column keeps
              scrolling past it; top offset clears the fixed navbar */}
          <div className="md:sticky md:top-28">
            <ImageGallery images={t.images} alt={t.name} />
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              {t.name}
            </h1>
            <p className="mt-2 font-display text-sm italic text-ink/50">{t.category.name}</p>

            <div className="mt-4 flex h-1 w-16 overflow-hidden rounded-full">
              {["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"].map((c) => (
                <span key={c} className={`h-full flex-1 ${c}`} />
              ))}
            </div>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">{t.description}</p>

            <ul className="mt-6 space-y-2 text-sm text-ink/70">
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan" />Custom sizing, fabricated to your spec</li>
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-magenta" />Pickup or site delivery available</li>
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-yellow" />Quote and timeline within 24 hours</li>
            </ul>

            <QuoteForm categoryName={t.category.name} categorySlug={t.category.slug} typeName={t.name} typeSlug={t.slug} />
          </div>
        </div>
      </div>
    </main>
  );
}