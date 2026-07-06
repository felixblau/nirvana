import { ChevronDown } from "lucide-react";

const NAV = ["Solutions", "Who We Serve", "Why Nirvana", "Resources"];

export function SiteHeader() {
  return (
    <header
      className="w-full bg-[color:var(--deep-purple)] text-white"
      aria-label="Site navigation (decorative)"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 select-none">
          <img src={`${import.meta.env.BASE_URL}nirvana-glyph.svg`} alt="" className="h-7 w-7" onError={(e) => (e.currentTarget.src = `${import.meta.env.BASE_URL}nirvana-glyph.png`)} />
          <img src={`${import.meta.env.BASE_URL}nirvana-logo.svg`} alt="Nirvana" className="h-4 invert" />
        </div>
        <nav className="hidden md:flex items-center gap-8 select-none">
          {NAV.map((label) => (
            <span
              key={label}
              className="text-sm font-medium text-white/90 flex items-center gap-1 cursor-default"
            >
              {label}
              <ChevronDown className="h-4 w-4 opacity-70" />
            </span>
          ))}
          <span className="rounded-full bg-[color:var(--lilac)] text-[color:var(--deep-purple)] px-5 py-2 text-sm font-semibold cursor-default select-none">
            Book a Demo
          </span>
        </nav>
      </div>
    </header>
  );
}
