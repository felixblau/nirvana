import { ChevronDown } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const NAV: Array<{ label: string; hasChevron?: boolean }> = [
  { label: "Solutions", hasChevron: true },
  { label: "Who We Serve", hasChevron: true },
  { label: "Why Nirvana", hasChevron: true },
  { label: "Resources", hasChevron: true },
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-30 w-full bg-[color:var(--deep-purple)]"
      style={{ height: 88 }}
      aria-label="Site navigation (decorative)"
    >
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-8 md:px-[150px]">
        <div className="flex items-center gap-2 select-none">
          <img
            src={`${BASE}footer-nirvana-logo.svg`}
            alt=""
            className="h-8 w-8"
            aria-hidden="true"
          />
          <img
            src={`${BASE}nirvana-logo.svg`}
            alt="Nirvana"
            className="h-4 invert"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6 select-none" aria-hidden="true">
            {NAV.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-1 text-[14px] font-medium text-[color:var(--off-white)] cursor-default"
                style={{ lineHeight: 1.445 }}
              >
                {item.label}
                {item.hasChevron && <ChevronDown className="h-5 w-5 opacity-90" />}
              </span>
            ))}
          </nav>

          <span
            className="rounded-full bg-[color:var(--vibrant-purple)] px-5 py-1.5 text-[14px] font-semibold text-[color:var(--deep-purple)] cursor-default select-none"
            style={{ lineHeight: 1.445 }}
          >
            Book a Demo
          </span>
        </div>
      </div>
    </header>
  );
}
