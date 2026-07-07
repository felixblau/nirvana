"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X, Menu } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const NAV: Array<{ label: string; hasChevron?: boolean }> = [
  { label: "Solutions", hasChevron: true },
  { label: "Who We Serve", hasChevron: true },
  { label: "Why Nirvana", hasChevron: true },
  { label: "Resources", hasChevron: true },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-[color:var(--deep-purple)]"
        style={{ height: 88 }}
        aria-label="Site navigation"
      >
        <div
          className="w-full h-full flex items-center justify-between"
          style={{ paddingLeft: "clamp(24px, 10%, 150px)", paddingRight: "clamp(24px, 10%, 150px)" }}
        >
          {/* Logo */}
          <div className="flex items-center select-none">
            <img
              src={`${BASE}nirvana-logo.svg`}
              alt="Nirvana"
              style={{ height: 24, width: "auto", filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6 select-none" aria-label="Main navigation">
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

          {/* Mobile burger */}
          <button
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-50 bg-[color:var(--deep-purple)] flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Close button */}
        <div className="flex items-center justify-end px-6 pt-6 pb-2">
          <button
            className="text-white p-2 -mr-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-10">
          {NAV.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2 text-[22px] font-medium text-white cursor-default"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              {item.hasChevron && <ChevronDown className="h-6 w-6 opacity-70" />}
            </span>
          ))}

          <span
            className="mt-4 rounded-full bg-[color:var(--vibrant-purple)] px-8 py-3.5 text-[16px] font-semibold text-[color:var(--deep-purple)] cursor-default select-none"
          >
            Book a Demo
          </span>
        </nav>
      </div>
    </>
  );
}
