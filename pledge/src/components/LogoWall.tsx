import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

type Tile = {
  src: string;
  label: string;
  /** Optional vertical nudge in px for optical centering. */
  offsetY?: number;
};

const PAGE_1: Tile[] = [
  { src: "optum.png", label: "Optum" },
  { src: "amazon.png", label: "Amazon", offsetY: 8 },
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
  const firstPaintRef = useRef(true);
  useEffect(() => {
    const t = window.setTimeout(() => {
      firstPaintRef.current = false;
    }, 2000);
    return () => window.clearTimeout(t);
  }, []);


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
      if (p >= 1) {
        setProgress(0);
        setPage((prev) => (prev + 1) % totalPages);
      } else {
        setProgress(p);
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

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Stack all pages absolutely; only the active one is visible. Every image
          stays in the DOM after first paint so page flips have no fetch flash. */}
      <div className="relative w-full" style={{ aspectRatio: "617.455 / 544" }}>
        {pages.map((tiles, pi) => (
          <section
            key={`page-${pi}`}
            aria-label="Signatory logos"
            aria-hidden={pi !== safePage}
            className="absolute inset-0 grid grid-cols-3 gap-2"
            style={{
              visibility: pi === safePage ? "visible" : "hidden",
              pointerEvents: pi === safePage ? "auto" : "none",
            }}
          >
            {tiles.map((tile, i) => {
              const shouldStagger = pi === 0 && firstPaintRef.current;
              return (
                <div
                  key={`p${pi}-slot-${i}`}
                  className="bg-white rounded-lg flex items-center justify-center overflow-hidden"
                  style={{
                    aspectRatio: "200.485 / 102.4",
                    padding: 16,
                    ...(shouldStagger
                      ? {
                          opacity: 0,
                          animation: `fadeIn 0.5s ease-out ${i * 60}ms forwards`,
                        }
                      : null),
                  }}
                  title={tile.label}
                >
                  <HalfSizedLogo
                    src={tile.src.startsWith("http") ? tile.src : `${BASE}logos/${tile.src}`}
                    alt={tile.label}
                    offsetY={tile.offsetY}
                  />
                </div>
              );
            })}
          </section>
        ))}
      </div>

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

/** Renders an @2x logo at exactly half its natural pixel size, centered. */
function HalfSizedLogo({
  src,
  alt,
  offsetY,
}: {
  src: string;
  alt: string;
  offsetY?: number;
}) {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  return (
    <img
      src={src}
      alt={alt}
      className="object-contain"
      style={{
        width: dims ? `${dims.w / 2}px` : "auto",
        height: dims ? `${dims.h / 2}px` : "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        transform: offsetY ? `translateY(${offsetY}px)` : undefined,
      }}
      onLoad={(e) => {
        const img = e.currentTarget;
        setDims({ w: img.naturalWidth, h: img.naturalHeight });
      }}
      decoding="async"
    />
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
        shapeRendering="geometricPrecision"
      >
        <path
          d={path}
          fill="none"
          stroke="#ffffff"
          strokeWidth={STROKE}
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter * (1 - progress)}
          strokeLinecap="butt"
        />
      </svg>
    </div>
  );
}
