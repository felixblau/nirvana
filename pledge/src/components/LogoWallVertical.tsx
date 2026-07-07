import { useMemo, useState } from "react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

type Tile = {
  src: string;
  label: string;
  offsetY?: number;
  scale?: number;
};

const ALL_TILES: Tile[] = [
  { src: "optum.png", label: "Optum" },
  { src: "amazon.png", label: "Amazon", offsetY: 8 },
  { src: "simple-practice.png", label: "SimplePractice" },
  { src: "transformations-care-network.png", label: "Transformations Care Network" },
  { src: "alma.png", label: "Alma" },
  { src: "sondermind.png", label: "SonderMind" },
  { src: "resmed.png", label: "ResMed" },
  { src: "pomelo-care.png", label: "Pomelo Care" },
  { src: "weight-watchers.png", label: "WeightWatchers", scale: 2 },
  { src: "eleanor-health.png", label: "Eleanor Health" },
  { src: "sol-mental-health.png", label: "Sol Mental Health" },
  { src: "midwest-express-clinic.png", label: "Midwest Express Clinic" },
  { src: "lifemd.png", label: "LifeMD" },
  { src: "osmind.png", label: "Osmind" },
  { src: "radiology-partners.png", label: "Radiology Partners" },
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

function splitColumns(tiles: Tile[]): [Tile[], Tile[]] {
  const a: Tile[] = [];
  const b: Tile[] = [];
  tiles.forEach((t, i) => (i % 2 === 0 ? a : b).push(t));
  return [a, b];
}

type Props = { pledges: PublicPledge[] };

export function LogoWallVertical({ pledges }: Props) {
  const [colA, colB] = useMemo(() => {
    const fromPledges = tilesFromPledges(pledges);
    return splitColumns(fromPledges ?? ALL_TILES);
  }, [pledges]);

  return (
    <div
      aria-label="Signatory logos"
      className="relative w-full h-full overflow-hidden"
    >
      <div className="grid grid-cols-2 gap-2 h-full">
        <MarqueeColumn tiles={colA} direction="up" durationSec={55} />
        <MarqueeColumn tiles={colB} direction="down" durationSec={65} />
      </div>
    </div>
  );
}

function MarqueeColumn({
  tiles,
  direction,
  durationSec,
}: {
  tiles: Tile[];
  direction: "up" | "down";
  durationSec: number;
}) {
  const animationName =
    direction === "up" ? "logoMarqueeUp" : "logoMarqueeDown";

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex flex-col gap-2"
        style={{
          animation: `${animationName} ${durationSec}s linear infinite`,
          willChange: "transform",
        }}
      >
        {[...tiles, ...tiles].map((tile, i) => (
          <LogoTile key={`${tile.src}-${i}`} tile={tile} />
        ))}
      </div>
    </div>
  );
}

function LogoTile({ tile }: { tile: Tile }) {
  return (
    <div
      className="bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0"
      style={{ aspectRatio: "200.485 / 102.4", padding: 16 }}
      title={tile.label}
    >
      <HalfSizedLogo
        src={tile.src.startsWith("http") ? tile.src : `${BASE}logos/${tile.src}`}
        alt={tile.label}
        offsetY={tile.offsetY}
        scale={tile.scale}
      />
    </div>
  );
}

function HalfSizedLogo({
  src,
  alt,
  offsetY,
  scale = 1,
}: {
  src: string;
  alt: string;
  offsetY?: number;
  scale?: number;
}) {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  return (
    <img
      src={src}
      alt={alt}
      className="object-contain"
      style={{
        width: dims ? `${(dims.w / 2) * 1.5 * scale}px` : "auto",
        height: dims ? `${(dims.h / 2) * 1.5 * scale}px` : "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        transform: offsetY ? `translateY(${offsetY * 1.5}px)` : undefined,
      }}
      onLoad={(e) => {
        const img = e.currentTarget;
        setDims({ w: img.naturalWidth, h: img.naturalHeight });
      }}
      decoding="async"
    />
  );
}
