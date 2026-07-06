const BASE = import.meta.env.BASE_URL;

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-30 w-full bg-[color:var(--deep-purple)]"
      style={{ height: 88 }}
      aria-label="Site navigation (decorative)"
    >
      <img
        src={`${BASE}site-header.png`}
        alt="Nirvana"
        className="h-full w-full object-cover object-center select-none pointer-events-none"
        draggable={false}
      />
    </header>
  );
}
