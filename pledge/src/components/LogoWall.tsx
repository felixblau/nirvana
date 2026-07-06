import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

const PLACEHOLDER_LOGOS: string[] = Array.from({ length: 30 }, (_, i) =>
  `${BASE}logos/logo-${String(i + 1).padStart(2, "0")}.svg`
);

const PAGE_SIZE = 15;

type LogoTile = { key: string; src: string; label: string };

function paginate<T>(items: T[]): T[][] {
  if (items.length === 0) return [[]];
  const pages: T[][] = [];
  let i = 0;
  while (i < items.length) {
    const isFirstPage = pages.length === 0;
    const remaining = items.length - i;
    const backSlot = isFirstPage ? 0 : 1;
    const willFit = remaining <= PAGE_SIZE - backSlot;
    const nextSlot = willFit ? 0 : 1;
    const capacity = PAGE_SIZE - backSlot - nextSlot;
    pages.push(items.slice(i, i + capacity));
    i += capacity;
  }
  return pages;
}

function tilesFromPledges(pledges: PublicPledge[]): LogoTile[] {
  const seen = new Set<string>();
  const tiles: LogoTile[] = [];
  for (const p of pledges) {
    if (!p.logoUrl) continue;
    if (seen.has(p.company)) continue;
    seen.add(p.company);
    tiles.push({ key: `real-${p.company}`, src: p.logoUrl, label: p.company });
  }
  return tiles;
}

function fallbackTiles(): LogoTile[] {
  return PLACEHOLDER_LOGOS.map((src, i) => ({
    key: `ph-${i}`,
    src,
    label: `Logo ${i + 1}`,
  }));
}

type Props = {
  pledges: PublicPledge[];
};

export function LogoWall({ pledges }: Props) {
  const [page, setPage] = useState(0);
  const tiles = useMemo(() => {
    const real = tilesFromPledges(pledges);
    return real.length > 0 ? real : fallbackTiles();
  }, [pledges]);
  const pages = useMemo(() => paginate(tiles), [tiles]);
  const safePage = Math.min(page, pages.length - 1);
  const totalPages = pages.length;
  const showBack = safePage > 0;
  const showNext = safePage < totalPages - 1;

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
      {pages[safePage].map((tile) => (
        <div
          key={tile.key}
          className="bg-card border border-[color:var(--deep-purple)]/10 rounded-xl h-24 flex items-center justify-center p-6"
          title={tile.label}
        >
          <img
            src={tile.src}
            alt={tile.label}
            className="max-h-8 max-w-full opacity-80 object-contain"
            loading="lazy"
          />
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
      {Array.from({
        length: PAGE_SIZE - pages[safePage].length - (showBack ? 1 : 0) - (showNext ? 1 : 0),
      }).map((_, i) => (
        <div key={`empty-${i}`} aria-hidden="true" className="h-24 rounded-xl bg-[color:var(--off-white)]" />
      ))}
    </section>
  );
}
