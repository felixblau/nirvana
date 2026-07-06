const BASE = import.meta.env.BASE_URL;
const LOGOS = [
  `${BASE}logos/placeholder-1.svg`,
  `${BASE}logos/placeholder-2.svg`,
  `${BASE}logos/placeholder-3.svg`,
  `${BASE}logos/placeholder-4.svg`,
  `${BASE}logos/placeholder-5.svg`,
  `${BASE}logos/placeholder-6.svg`,
];

export function LogoWall() {
  return (
    <section aria-label="Signatory logos" className="grid grid-cols-2 gap-3">
      {LOGOS.map((src, i) => (
        <div
          key={i}
          className="bg-card border border-[color:var(--deep-purple)]/10 rounded-xl h-24 flex items-center justify-center p-6"
        >
          <img src={src} alt="" className="max-h-8 max-w-full opacity-80" />
        </div>
      ))}
    </section>
  );
}
