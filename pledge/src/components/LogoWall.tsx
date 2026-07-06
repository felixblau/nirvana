import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

const PLACEHOLDER_LOGOS: string[] = Array.from({ length: 30 }, (_, i) =>
  `${BASE}logos/logo-${String(i + 1).padStart(2, "0")}.svg`
);

const PAGE_SIZE = 12;

type LogoTile = { key: string; src: string; label: string };

function paginate<T>(items: T[]): T[][] {
  if (items.length === 0) return [[]];
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += PAGE_SIZE) {
    pages.push(items.slice(i, i + PAGE_SIZE));
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

  const goBack = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  const visible = pages[safePage];
  const fillerCount = PAGE_SIZE - visible.length;

  return (
    <div className="space-y-4">
      <section aria-label="Signatory logos" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visible.map((tile) => (
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
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div
            key={`empty-${i}`}
            aria-hidden="true"
            className="h-24 rounded-xl bg-white/10"
          />
        ))}
      </section>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-lg border border-[color:var(--deep-purple)]/30 bg-white/10 flex items-center justify-center hover:border-[color:var(--deep-purple)] hover:bg-white/20 transition-colors group"
            aria-label="Previous page of logos"
          >
            <ChevronLeft className="h-5 w-5 text-[color:var(--deep-purple)] group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 rounded-lg border border-[color:var(--deep-purple)]/30 bg-white/10 flex items-center justify-center hover:border-[color:var(--deep-purple)] hover:bg-white/20 transition-colors group"
            aria-label="Next page of logos"
          >
            <ChevronRight className="h-5 w-5 text-[color:var(--deep-purple)] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
