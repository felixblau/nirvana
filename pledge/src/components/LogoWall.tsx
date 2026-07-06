import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

type Tile = { src: string; label: string };

const PAGE_1: Tile[] = [
  { src: "optum.png", label: "Optum" },
  { src: "amazon.png", label: "Amazon" },
  { src: "simple-practice.png", label: "SimplePractice" },
  { src: "transformations-care-network.png", label: "Transformations Care Network" },
  { src: "alma.png", label: "Alma" },
  { src: "sondermind.png", label: "SonderMind" },
  { src: "resmed.png", label: "ResMed" },
  { src: "pomelo-care.png", label: "Pomelo Care" },
  { src: "weight-watchers.png", label: "WeightWatchers" },
  { src: "eleanor-health.png", label: "Eleanor Health" },
  { src: "sol-mental-health.png", label: "Sol Mental Health" },
  { src: "midwest-express-clinic.png", label: "Midwest Express Clinic" },
  { src: "lifemd.png", label: "LifeMD" },
  { src: "osmind.png", label: "Osmind" },
  { src: "radiology-partners.png", label: "Radiology Partners" },
];

const PAGE_2: Tile[] = [
  { src: "headlight.png", label: "Headlight" },
  { src: "clear.png", label: "CLEAR" },
  { src: "octave.png", label: "Octave" },
  { src: "headspace.png", label: "Headspace" },
  { src: "fastpace-health.png", label: "Fastpace Health" },
  { src: "brave-health.png", label: "Brave Health" },
  { src: "happier-living.png", label: "Happier Living" },
  { src: "geode.png", label: "Geode" },
  { src: "modern.png", label: "Modern" },
  { src: "cerebral.png", label: "Cerebral" },
  { src: "grow-therapy.png", label: "Grow Therapy" },
  { src: "thriveworks.png", label: "Thriveworks" },
  { src: "doctronic.png", label: "Doctronic" },
  { src: "lifestance.png", label: "LifeStance" },
  { src: "nocd.png", label: "NOCD" },
];

const AUTOPLAY_MS = 15_000;

function tilesFromPledges(pledges: PublicPledge[]): Tile[] | null {
  const seen = new Set<string>();
  const tiles: Tile[] = [];
  for (const p of pledges) {
    if (!p.logoUrl) continue;
    if (seen.has(p.company)) continue;
    seen.add(p.company);
    tiles.push({ src: p.logoUrl, label: p.company });
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

  const [progress, setProgress] = useState(0);
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

  const goBack = () => { setPage((p) => (p - 1 + totalPages) % totalPages); resetTimer(); };
  const goNext = () => { setPage((p) => (p + 1) % totalPages); resetTimer(); };

  const visible = pages[safePage];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
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
              className="object-contain"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              loading="lazy"
            />
          </div>
        ))}
      </section>

      {totalPages > 1 && (
        <TimerPill onBack={goBack} onNext={goNext} progress={progress} />
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
  const W = 96;
  const H = 40;
  const R = H / 2;
  const straight = W - 2 * R;
  const arc = Math.PI * R;
  const perimeter = 2 * straight + 2 * arc;

  const path =
    `M ${W / 2} 0 ` +
    `H ${W - R} ` +
    `A ${R} ${R} 0 0 1 ${W - R} ${H} ` +
    `H ${R} ` +
    `A ${R} ${R} 0 0 1 ${R} 0 ` +
    `H ${W / 2}`;

  const STROKE = 1.5;

  return (
    <div className="relative group" style={{ width: W, height: H }}>
      <div className="absolute inset-0 flex items-stretch rounded-full overflow-hidden">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center text-white hover:bg-[color:var(--warm-tan)] transition-colors"
          aria-label="Previous page of logos"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center text-white hover:bg-[color:var(--warm-tan)] transition-colors"
          aria-label="Next page of logos"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <svg
        className="absolute inset-0 pointer-events-none"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
      >
        <path d={path} fill="none" stroke="#ffffff" strokeWidth={STROKE} />
        <path
          d={path}
          fill="none"
          stroke="#2c1f45"
          strokeWidth={STROKE}
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter * (1 - progress)}
          strokeLinecap="butt"
        />
      </svg>
    </div>
  );
}
