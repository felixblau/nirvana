import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

// Per-Figma tile is 200.485 × 102.4 with ~32px inner padding.
// Sizing spec: each logo gets its own height (per Figma 24771:90015 + 24774:90272).
// We approximate by expressing height as a fraction of the tile height (102.4).
type Tile = { src: string; label: string; hPct: number };

// Page 1 — matches Figma 24771:90015 exactly.
const PAGE_1: Tile[] = [
  { src: "amazon.png", label: "Amazon", hPct: 32 / 102.4 },
  { src: "simple-practice.png", label: "SimplePractice", hPct: 36.6 / 102.4 },
  { src: "transformations-care-network.png", label: "Transformations Care Network", hPct: 42.3 / 102.4 },
  { src: "alma.png", label: "Alma", hPct: 82.7 / 102.4 },
  { src: "sondermind.png", label: "SonderMind", hPct: 32 / 102.4 },
  { src: "resmed.png", label: "ResMed", hPct: 70 / 102.4 },
  { src: "pomelo-care.png", label: "Pomelo Care", hPct: 48.5 / 102.4 },
  { src: "weight-watchers.png", label: "WeightWatchers", hPct: 60 / 102.4 },
  { src: "eleanor-health.png", label: "Eleanor Health", hPct: 32 / 102.4 },
  { src: "sol-mental-health.png", label: "Sol Mental Health", hPct: 59.4 / 102.4 },
  { src: "midwest-express-clinic.png", label: "Midwest Express Clinic", hPct: 55 / 102.4 },
  { src: "lifemd.png", label: "LifeMD", hPct: 67.8 / 102.4 },
  { src: "osmind.png", label: "Osmind", hPct: 32 / 102.4 },
  { src: "radiology-partners.png", label: "Radiology Partners", hPct: 32 / 102.4 },
  { src: "headlight.png", label: "Headlight", hPct: 24 / 102.4 },
];

// Page 2 — matches Figma 24774:90272 exactly.
const PAGE_2: Tile[] = [
  { src: "octave.png", label: "Octave", hPct: 48.3 / 102.4 },
  { src: "headspace.png", label: "Headspace", hPct: 53 / 102.4 },
  { src: "fastpace-health.png", label: "Fastpace Health", hPct: 58.4 / 102.4 },
  { src: "brave-health.png", label: "Brave Health", hPct: 32 / 102.4 },
  { src: "happier-living.png", label: "Happier Living", hPct: 32 / 102.4 },
  { src: "geode.png", label: "Geode", hPct: 24 / 102.4 },
  { src: "modern.png", label: "Modern", hPct: 25.4 / 102.4 },
  { src: "cerebral.png", label: "Cerebral", hPct: 23.8 / 102.4 },
  { src: "grow-therapy.png", label: "Grow Therapy", hPct: 34.2 / 102.4 },
  { src: "brightside-health.png", label: "Brightside Health", hPct: 35 / 102.4 },
  { src: "thriveworks.png", label: "Thriveworks", hPct: 38.9 / 102.4 },
  { src: "doctronic.png", label: "Doctronic", hPct: 60 / 102.4 },
  { src: "lifestance.png", label: "LifeStance", hPct: 36.6 / 102.4 },
  { src: "nocd.png", label: "NOCD", hPct: 70.6 / 102.4 },
  { src: "clear.png", label: "CLEAR", hPct: 32 / 102.4 },
];

const AUTOPLAY_MS = 15_000;

function tilesFromPledges(pledges: PublicPledge[]): Tile[] | null {
  const seen = new Set<string>();
  const tiles: Tile[] = [];
  for (const p of pledges) {
    if (!p.logoUrl) continue;
    if (seen.has(p.company)) continue;
    seen.add(p.company);
    tiles.push({ src: p.logoUrl, label: p.company, hPct: 40 / 102.4 });
  }
  return tiles.length > 0 ? tiles : null;
}

function chunkPages(tiles: Tile[]): Tile[][] {
  const size = 15;
  const pages: Tile[][] = [];
  for (let i = 0; i < tiles.length; i += size) pages.push(tiles.slice(i, i + size));
  return pages;
}

type Props = { pledges: PublicPledge[] };

export function LogoWall({ pledges }: Props) {
  const [page, setPage] = useState(0);
  const pages = useMemo(() => {
    const fromPledges = tilesFromPledges(pledges);
    return fromPledges ? chunkPages(fromPledges) : [PAGE_1, PAGE_2];
  }, [pledges]);
  const safePage = Math.min(page, pages.length - 1);
  const totalPages = pages.length;

  const goBack = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  // Auto-advance timer with visual progress
  const [progress, setProgress] = useState(0); // 0..1
  const startedAtRef = useRef<number>(performance.now());
  useEffect(() => {
    if (totalPages < 2) return;
    startedAtRef.current = performance.now();
    setProgress(0);
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const elapsed = now - startedAtRef.current;
      const p = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(p);
      if (p >= 1) {
        setPage((prev) => (prev + 1) % totalPages);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [safePage, totalPages]);

  const resetTimer = () => {
    startedAtRef.current = performance.now();
    setProgress(0);
  };

  const visible = pages[safePage];

  return (
    <div className="space-y-4 flex flex-col items-center">
      <section
        aria-label="Signatory logos"
        className="grid grid-cols-3 gap-2 w-full"
      >
        {visible.map((tile, i) => (
          <div
            key={`${safePage}-${i}-${tile.src}`}
            className="bg-white rounded-lg flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: "200.485 / 102.4", padding: 16 }}
            title={tile.label}
          >
            <img
              src={tile.src.startsWith("http") ? tile.src : `${BASE}logos/${tile.src}`}
              alt={tile.label}
              className="max-w-full object-contain"
              style={{ height: `${tile.hPct * 100}%` }}
              loading="lazy"
            />
          </div>
        ))}
      </section>

      {totalPages > 1 && (
        <TimerPill
          onBack={() => { goBack(); resetTimer(); }}
          onNext={() => { goNext(); resetTimer(); }}
          progress={progress}
        />
      )}
    </div>
  );
}

function TimerPill({
  onBack,
  onNext,
  progress,
}: {
  onBack: () => void;
  onNext: () => void;
  progress: number;
}) {
  // Pill dimensions
  const W = 96;
  const H = 40;
  const R = H / 2; // 20
  // SVG stroke follows a rounded-rect path (pill shape).
  // Path: start at top-left after arc, go right, arc down, go left, arc up.
  const straight = W - 2 * R; // 56
  const arc = Math.PI * R; // 62.83
  const perimeter = 2 * straight + 2 * arc; // ≈ 237.7

  // Path starting at the top-center, going clockwise, so progress fills from top-center outward evenly.
  // But the mockup shows the fill starting at the top-center and progressing clockwise around the right side first.
  // Easier: standard rounded-rect path starting top-left corner-arc endpoint.
  const path = `
    M ${R} 0
    H ${W - R}
    A ${R} ${R} 0 0 1 ${W - R} ${H}
    H ${R}
    A ${R} ${R} 0 0 1 ${R} 0
    Z
  `.trim();

  const dash = perimeter;
  const offset = perimeter * (1 - progress);

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg
        className="absolute inset-0 pointer-events-none"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
      >
        {/* Base pill border */}
        <path d={path} fill="none" stroke="#ffffff" strokeWidth={1.5} />
        {/* Progress overlay */}
        <path
          d={path}
          fill="none"
          stroke="#2c1f45"
          strokeWidth={2}
          strokeDasharray={dash}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={onBack}
          className="w-1/2 h-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Previous page of logos"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="w-1/2 h-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Next page of logos"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
