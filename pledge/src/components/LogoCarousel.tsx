const BASE = import.meta.env.BASE_URL;
const LOGOS = [
  `${BASE}logos/placeholder-1.svg`,
  `${BASE}logos/placeholder-2.svg`,
  `${BASE}logos/placeholder-3.svg`,
  `${BASE}logos/placeholder-4.svg`,
  `${BASE}logos/placeholder-5.svg`,
  `${BASE}logos/placeholder-6.svg`,
];

export function LogoCarousel() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section
      className="w-full py-12 overflow-hidden border-y border-border bg-card"
      aria-hidden="true"
    >
      <div className="group relative">
        <div className="flex gap-12 animate-marquee w-max group-hover:[animation-play-state:paused]">
          {doubled.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-8 md:h-10 flex-shrink-0 opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
