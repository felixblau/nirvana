import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const LOGOS: string[] = Array.from({ length: 30 }, (_, i) =>
  `${BASE}logos/logo-${String(i + 1).padStart(2, "0")}.svg`
);

const PAGE_SIZE = 15;

function paginate(logos: string[]): string[][] {
  const pages: string[][] = [];
  let i = 0;
  while (i < logos.length) {
    const isFirstPage = pages.length === 0;
    const remaining = logos.length - i;
    const backSlot = isFirstPage ? 0 : 1;
    const willFit = remaining <= PAGE_SIZE - backSlot;
    const nextSlot = willFit ? 0 : 1;
    const capacity = PAGE_SIZE - backSlot - nextSlot;
    pages.push(logos.slice(i, i + capacity));
    i += capacity;
  }
  return pages;
}

export function LogoWall() {
  const [page, setPage] = useState(0);
  const pages = useMemo(() => paginate(LOGOS), []);
  const totalPages = pages.length;
  const showBack = page > 0;
  const showNext = page < totalPages - 1;

  return (
    <section aria-label="Signatory logos" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {showBack && (
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="bg-card border border-[color:var(--deep-purple)]/15 rounded-xl h-24 flex items-center justify-center p-4 hover:border-[color:var(--deep-purple)] hover:bg-[color:var(--white-purple)] transition-colors group"
          aria-label="Previous page of logos"
        >
          <ChevronLeft className="h-6 w-6 text-[color:var(--deep-purple)] group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}
      {pages[page].map((src) => (
        <div
          key={src}
          className="bg-card border border-[color:var(--deep-purple)]/10 rounded-xl h-24 flex items-center justify-center p-6"
        >
          <img src={src} alt="" className="max-h-8 max-w-full opacity-80" />
        </div>
      ))}
      {showNext && (
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          className="bg-card border border-[color:var(--deep-purple)]/15 rounded-xl h-24 flex items-center justify-center p-4 hover:border-[color:var(--deep-purple)] hover:bg-[color:var(--white-purple)] transition-colors group"
          aria-label="Next page of logos"
        >
          <ChevronRight className="h-6 w-6 text-[color:var(--deep-purple)] group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </section>
  );
}
