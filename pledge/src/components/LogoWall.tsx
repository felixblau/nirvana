import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

type Tile = {
  src: string;
  label: string;
  /** Rendered height in px within the 200x102 tile (per Figma spec). */
  h: number;
  /** Optional vertical nudge in px for optical centering. */
  offsetY?: number;
};

const PAGE_1: Tile[] = [
  { src: "optum.png", label: "Optum", h: 42 },
  { src: "amazon.png", label: "Amazon", h: 32, offsetY: 8 },
  { src: "simple-practice.png", label: "SimplePractice", h: 37 },
  { src: "transformations-care-network.png", label: "Transformations Care Network", h: 42 },
  { src: "alma.png", label: "Alma", h: 60 },
  { src: "sondermind.png", label: "SonderMind", h: 32 },
  { src: "resmed.png", label: "ResMed", h: 60 },
  { src: "pomelo-care.png", label: "Pomelo Care", h: 40 },
  { src: "weight-watchers.png", label: "WeightWatchers", h: 60 },
  { src: "eleanor-health.png", label: "Eleanor Health", h: 32 },
  { src: "sol-mental-health.png", label: "Sol Mental Health", h: 55 },
  { src: "midwest-express-clinic.png", label: "Midwest Express Clinic", h: 44 },
  { src: "lifemd.png", label: "LifeMD", h: 60 },
  { src: "osmind.png", label: "Osmind", h: 32 },
  { src: "radiology-partners.png", label: "Radiology Partners", h: 32 },
];

const PAGE_2: Tile[] = [
  { src: "headlight.png", label: "Headlight", h: 24 },
  { src: "clear.png", label: "CLEAR", h: 32 },
  { src: "octave.png", label: "Octave", h: 48 },
  { src: "headspace.png", label: "Headspace", h: 40 },
  { src: "fastpace-health.png", label: "Fastpace Health", h: 32 },
  { src: "brave-health.png", label: "Brave Health", h: 24 },
  { src: "happier-living.png", label: "Happier Living", h: 32 },
  { src: "geode.png", label: "Geode", h: 24 },
  { src: "modern.png", label: "Modern", h: 24 },
  { src: "cerebral.png", label: "Cerebral", h: 24 },
  { src: "grow-therapy.png", label: "Grow Therapy", h: 28 },
  { src: "thriveworks.png", label: "Thriveworks", h: 40 },
  { src: "doctronic.png", label: "Doctronic", h: 36 },
  { src: "lifestance.png", label: "LifeStance", h: 37 },
  { src: "nocd.png", label: "NOCD", h: 40 },
];

const AUTOPLAY_MS = 15_000;

function tilesFromPledges(pledges: PublicPledge[]): Tile[] | null {
  const seen = new Set<string>();
  const tiles: Tile[] = [];
  for (const p of pledges) {
    if (!p.logoUrl) continue;
    if (seen.has(p.company)) continue;
    seen.add(p.company);
    tiles.push({ src: p.logoUrl, label: p.company, h: 40 });
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

  // Preload every logo image once so page flips are instant (no lazy pop-in).
  useEffect(() => {
    const all = pages.flat();
    for (const tile of all) {
      const src = tile.src.startsWith("http") ? tile.src : `${BASE}logos/${tile.src}`;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    }
  }, [pages]);

  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const startedAtRef = useRef<number>(performance.now());
  useEffect(() => {
    if (totalPages < 2 || !playing) return;
    startedAtRef.current = performance.now() - progress * AUTOPLAY_MS;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage, totalPages, playing]);

  const resetTimer = () => {
    startedAtRef.current = performance.now();
    setProgress(0);
  };

  const goBack = () => { setPage((p) => (p - 1 + totalPages) % totalPages); resetTimer(); };
  const goNext = () => { setPage((p) => (p + 1) % totalPages); resetTimer(); };
  const togglePlay = () => setPlaying((p) => !p);

  const visible = pages[safePage];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <section
        aria-label="Signatory logos"
        className="grid grid-cols-3 gap-2 w-full"
      >
        {visible.map((tile, i) => (
          <div
            key={`slot-${i}`}
            className="bg-white rounded-lg flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: "200.485 / 102.4", padding: 16 }}
            title={tile.label}
          >
            <img
              src={tile.src.startsWith("http") ? tile.src : `${BASE}logos/${tile.src}`}
              alt={tile.label}
              className="object-contain"
              style={{
                height: `${tile.h}px`,
                maxWidth: "100%",
                width: "auto",
                transform: tile.offsetY ? `translateY(${tile.offsetY}px)` : undefined,
              }}
              decoding="async"
            />
          </div>
        ))}
      </section>

      {totalPages > 1 && (
        <TimerPill
          onBack={goBack}
          onNext={goNext}
          onTogglePlay={togglePlay}
          playing={playing}
          progress={progress}
        />
      )}
    </div>
  );
}

function TimerPill({
  onBack,
  onNext,
  onTogglePlay,
  playing,
  progress,
}: {
  onBack: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  playing: boolean;
  progress: number;
}) {
  const W = 128;
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
          onClick={onTogglePlay}
          className="flex-1 flex items-center justify-center text-white hover:bg-[color:var(--warm-tan)] transition-colors"
          aria-label={playing ? "Pause logo autoplay" : "Resume logo autoplay"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
