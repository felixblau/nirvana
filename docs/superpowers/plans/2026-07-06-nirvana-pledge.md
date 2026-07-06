# Nirvana Pledge Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a password-gated one-off marketing page at `meetnirvana.com/pledge` that lets healthcare companies sign a public commitment to price transparency, with a Nirvana-rep-moderated approval flow.

**Architecture:** New sub-app `~/nirvana/pledge/` (Vite/React/Tailwind v4/shadcn v4/base-ui), stitched into the existing `~/nirvana` root Vercel monorepo via `build.sh` and `vercel.json`. Google Sheet + Apps Script backs the pledge store (`submit`, `list`, `lookup`, `rescind`). Client-side password gate (`nirvana`). Cookie-based state machine tracks each visitor's pledge status; email lookup as escape hatch.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Tailwind CSS v4, shadcn v4, `@base-ui/react`, `@fontsource-variable/geist` (+ PP Mori override), lucide-react, Google Apps Script (backend).

**Spec:** [`docs/superpowers/specs/2026-07-06-nirvana-pledge-design.md`](../specs/2026-07-06-nirvana-pledge-design.md)

**No test suite.** Per the spec: this is a one-off page, so we ship with manual smoke tests at each checkpoint, not TDD. Each task ends with a commit.

---

## Task Index

1. Scaffold the `pledge/` sub-app from `invite/`
2. Wire pledge into the root build + Vercel routes
3. Set up brand: theme, fonts, palette, assets
4. Build the visual `PasswordGate`
5. Build `SiteHeader` (inert visual replica)
6. Build `SiteFooter` (inert visual replica)
7. Build `Hero` with static CTA (state machine wiring comes later)
8. Build `LogoCarousel` (CSS marquee, reduced-motion aware)
9. Build `PledgeCounterPill`
10. Build `PledgeListModal` (grouped display, uses mocked data)
11. Build `PledgeFormDialog` (form UI, no submit wiring yet)
12. Provision Google Sheet + Apps Script backend
13. Build `lib/api.ts` (client for Apps Script)
14. Build `lib/storage.ts` (cookie/localStorage helpers)
15. Build `usePledgeState` hook (state machine)
16. Wire form submission end-to-end
17. Build `PendingCard` and `ApprovedCard`
18. Build `LookupSheet` ("Already pledged?" recovery)
19. Wire background polling + list refresh
20. Compose everything in `App.tsx`
21. Manual QA pass across state machine + accessibility
22. Deploy to Vercel

---

## Task 1: Scaffold the `pledge/` sub-app from `invite/`

**Files:**
- Create: `~/nirvana/pledge/` (whole directory, copied from `~/nirvana/invite/`)
- Modify: `~/nirvana/pledge/package.json` (rename)
- Modify: `~/nirvana/pledge/index.html` (title)
- Delete: `~/nirvana/pledge/src/*` (we'll rebuild)
- Delete: `~/nirvana/pledge/NirvanaInvite.jsx`, `README.md`, `node_modules/`, `dist/`

- [ ] **Step 1: Copy `invite/` to `pledge/` as the starting point**

```bash
cd ~/nirvana
cp -R invite pledge
rm -rf pledge/node_modules pledge/dist pledge/NirvanaInvite.jsx pledge/README.md
rm -rf pledge/src
mkdir -p pledge/src/{components/ui,lib,hooks}
```

- [ ] **Step 2: Rename the package**

Edit `~/nirvana/pledge/package.json`: change `"name": "invite"` to `"name": "nirvana-pledge"`. Leave every other dependency and script untouched — the invite stack (React 19, Tailwind v4, shadcn v4, base-ui, three.js — we'll drop three later if unused) is exactly what we want.

- [ ] **Step 3: Set the page title**

Edit `~/nirvana/pledge/index.html`: change `<title>` to `Nirvana · Price Transparency Pledge`.

- [ ] **Step 4: Verify install + dev server boots**

```bash
cd ~/nirvana/pledge
npm install
npm run dev
```

Expect Vite to start on some local port. Open it — the browser will show a blank white page (no src content yet) or a Vite error about missing `main.tsx`. Both are acceptable at this stage — we're just confirming the toolchain works. Kill the dev server.

- [ ] **Step 5: Copy the four shadcn primitives from `invite/`**

```bash
cd ~/nirvana
cp invite/src/components/ui/button.tsx pledge/src/components/ui/
cp invite/src/components/ui/dialog.tsx pledge/src/components/ui/
cp invite/src/components/ui/input.tsx pledge/src/components/ui/
cp invite/src/components/ui/label.tsx pledge/src/components/ui/
cp invite/src/lib/utils.ts pledge/src/lib/
cp invite/components.json pledge/components.json
```

- [ ] **Step 6: Add minimal `main.tsx` and empty `App.tsx` so the build passes**

Create `~/nirvana/pledge/src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `~/nirvana/pledge/src/App.tsx`:

```tsx
export default function App() {
  return <div>Pledge — coming soon</div>;
}
```

Create a placeholder `~/nirvana/pledge/src/index.css`:

```css
@import "tailwindcss";
```

(We'll fill this out properly in Task 3.)

- [ ] **Step 7: Verify build passes**

```bash
cd ~/nirvana/pledge
npm run build
```

Expect: exits 0, `dist/index.html` exists. If TypeScript errors, fix them before moving on.

- [ ] **Step 8: Commit**

```bash
cd ~/nirvana
git add pledge/
git commit -m "pledge: scaffold sub-app from invite/"
```

---

## Task 2: Wire pledge into the root build + Vercel routes

**Files:**
- Modify: `~/nirvana/build.sh`
- Modify: `~/nirvana/vercel.json`

- [ ] **Step 1: Add `pledge` to the build loop**

In `~/nirvana/build.sh`, add `pledge` to the first `for` loop's app list:

```bash
for app in pt-checkin clear1 clear1-demo health-ai wallet-e2e invite gemmd chatpcp lifestance lifestance-demo sagent sagent-demo nehs nehs-demo pledge; do
```

And add a copy step after the existing ones near the bottom:

```bash
mkdir -p "dist/pledge"
cp -r "pledge/dist/"* "dist/pledge/"
```

- [ ] **Step 2: Add the Vercel rewrite**

In `~/nirvana/vercel.json`, add this rewrite to the `rewrites` array (order doesn't matter, but keep it grouped with the other sub-app rewrites):

```json
{ "source": "/pledge", "destination": "/pledge/index.html" }
```

- [ ] **Step 3: Test the root build script locally**

```bash
cd ~/nirvana
bash build.sh
```

Expect: no errors. Verify `~/nirvana/dist/pledge/index.html` exists and contains `Pledge — coming soon`.

- [ ] **Step 4: Commit**

```bash
git add build.sh vercel.json
git commit -m "pledge: wire into root build + /pledge Vercel route"
```

---

## Task 3: Brand — theme, fonts, palette, assets

**Files:**
- Create: `~/nirvana/pledge/public/nirvana-logo.svg` (wordmark, copied from root)
- Create: `~/nirvana/pledge/public/nirvana-glyph.svg` (icon mark — export from prod)
- Create: `~/nirvana/pledge/public/logos/` (placeholder dir)
- Modify: `~/nirvana/pledge/src/index.css` (fill in Nirvana theme)

- [ ] **Step 1: Copy the Nirvana wordmark**

```bash
cp ~/nirvana/nirvana-logo.svg ~/nirvana/pledge/public/nirvana-logo.svg
```

- [ ] **Step 2: Fetch the Nirvana glyph icon**

The production site uses two SVGs side-by-side (`logo-icn.svg` + `logo-text.svg`). We need the icon. Download it from prod:

```bash
curl -sL https://www.meetnirvana.com/logo-icn.svg -o ~/nirvana/pledge/public/nirvana-glyph.svg || \
  cp ~/nirvana/nirvana-glyph.png ~/nirvana/pledge/public/nirvana-glyph.png
```

If curl succeeds you have the SVG. If it fails, we fall back to the PNG at `~/nirvana/nirvana-glyph.png` — either works.

- [ ] **Step 3: Create `public/logos/` and drop in placeholder logos**

```bash
mkdir -p ~/nirvana/pledge/public/logos
```

Real logos will be dropped in by the user before final deploy. For now, create 6 placeholder SVGs so the carousel has something to render:

```bash
for i in 1 2 3 4 5 6; do
  cat > ~/nirvana/pledge/public/logos/placeholder-$i.svg <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40">
  <rect width="160" height="40" rx="4" fill="#e1dff4"/>
  <text x="80" y="24" font-family="sans-serif" font-size="14" font-weight="600" fill="#7447ff" text-anchor="middle">Company $i</text>
</svg>
EOF
done
```

- [ ] **Step 4: Fill in the Nirvana theme in `index.css`**

Overwrite `~/nirvana/pledge/src/index.css` with the light-theme Nirvana palette. This file is the whole design system — palette, font, marquee keyframes, motion vars:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@custom-variant dark (&:is(.dark *));

:root {
  /* Nirvana canonical palette (from pt-checkin/theme.js) */
  --deep-purple: #2c1f45;
  --lilac: #ae9bea;
  --vibrant-purple: #7447ff;
  --lilac-light: #e1dff4;
  --white-purple: #f8f7ff;
  --off-white: #f3efeb;
  --green: #1D7A4A;
  --green-light: #E8F5EE;
  --amber: #BA7517;
  --red: #c0392b;

  /* shadcn/tailwind semantic vars mapped to Nirvana palette */
  --background: var(--off-white);
  --foreground: var(--deep-purple);
  --card: #ffffff;
  --card-foreground: var(--deep-purple);
  --popover: #ffffff;
  --popover-foreground: var(--deep-purple);
  --primary: var(--vibrant-purple);
  --primary-foreground: #ffffff;
  --secondary: var(--white-purple);
  --secondary-foreground: var(--deep-purple);
  --muted: var(--lilac-light);
  --muted-foreground: var(--lilac);
  --accent: var(--lilac-light);
  --accent-foreground: var(--deep-purple);
  --destructive: var(--red);
  --border: var(--lilac-light);
  --input: var(--lilac-light);
  --ring: var(--vibrant-purple);
  --radius: 0.75rem;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@utility animate-marquee {
  animation: marquee 40s linear infinite;
}

@utility animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee { animation: none; }
  .animate-fade-in { animation: none; }
}

body {
  margin: 0;
  background: var(--off-white);
  color: var(--deep-purple);
  font-family: 'PP Mori', 'Geist Variable', 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@theme inline {
  --font-sans: 'PP Mori', 'Geist Variable', 'Inter', system-ui, sans-serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    font-family: 'PP Mori', 'Geist Variable', 'Inter', system-ui, sans-serif;
  }
}
```

Note: PP Mori isn't bundled here — we fall through to Geist Variable (which IS bundled via `@fontsource-variable/geist`), then Inter, then system fonts. If a licensed PP Mori copy is available later we can drop it in `public/fonts/`; for now Geist Variable is a very close visual match.

- [ ] **Step 5: Verify build still passes and theme applies**

```bash
cd ~/nirvana/pledge && npm run dev
```

Open the URL, verify the page background is off-white `#f3efeb` and text is deep-purple. Kill dev.

- [ ] **Step 6: Commit**

```bash
cd ~/nirvana
git add pledge/
git commit -m "pledge: brand — Nirvana palette, fonts, logo, placeholder logos"
```

---

## Task 4: `PasswordGate` component

**Files:**
- Create: `~/nirvana/pledge/src/components/PasswordGate.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx` (wrap in gate)

- [ ] **Step 1: Write `PasswordGate.tsx`**

Create `~/nirvana/pledge/src/components/PasswordGate.tsx`:

```tsx
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "nirvana_pledge_unlocked";
const PASSWORD = "nirvana";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-xl p-8 space-y-6 animate-fade-in"
      >
        <img src="/nirvana-logo.svg" alt="Nirvana" className="h-4 opacity-70" />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">This page is private.</p>
          <Input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            aria-invalid={error}
            aria-describedby={error ? "gate-error" : undefined}
          />
          {error && (
            <p id="gate-error" className="text-xs text-destructive">
              Incorrect password.
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">Enter</Button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Wrap `App.tsx` in the gate**

Update `~/nirvana/pledge/src/App.tsx`:

```tsx
import { PasswordGate } from "@/components/PasswordGate";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen">
        {/* Pledge content — coming in later tasks */}
        <p className="p-6">Pledge page — unlocked.</p>
      </div>
    </PasswordGate>
  );
}
```

- [ ] **Step 3: Manual test**

```bash
cd ~/nirvana/pledge && npm run dev
```

- Open URL → see password prompt
- Type `nirvana` → click Enter → see "Pledge page — unlocked."
- Refresh → still unlocked (localStorage)
- Open incognito → gate again
- Type wrong password → red error
- Verify keyboard: Tab to input, Enter submits

Kill dev when done.

- [ ] **Step 4: Commit**

```bash
cd ~/nirvana
git add pledge/
git commit -m "pledge: add client-side password gate"
```

---

## Task 5: `SiteHeader` (inert visual replica)

**Files:**
- Create: `~/nirvana/pledge/src/components/SiteHeader.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx` (mount header)

Reference the production header from the screenshot: deep-purple bar, glyph icon + wordmark on the left, four nav labels (Solutions ⌄ / Who We Serve ⌄ / Why Nirvana ⌄ / Resources ⌄), lilac "Book a Demo" pill on the right. **All non-functional** — labels are `<span>`, not `<a>`. The dropdown carets are decorative (lucide `ChevronDown`).

- [ ] **Step 1: Write `SiteHeader.tsx`**

```tsx
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
          <img src="/nirvana-glyph.svg" alt="" className="h-7 w-7" onError={(e) => (e.currentTarget.src = "/nirvana-glyph.png")} />
          <img src="/nirvana-logo.svg" alt="Nirvana" className="h-4 invert" />
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
```

Note: `.invert` inverts the deep-purple wordmark SVG to white so it reads on the dark bar.

- [ ] **Step 2: Mount in `App.tsx`**

```tsx
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen">
        <SiteHeader />
        <p className="p-6">Pledge page — unlocked.</p>
      </div>
    </PasswordGate>
  );
}
```

- [ ] **Step 3: Manual test**

Run dev, confirm: header is deep-purple, glyph + wordmark visible on left, 4 labels + Book a Demo pill on right. Compare side-by-side with `meetnirvana.com` in another tab — the visual should read as "same site." At mobile widths (`<md`), nav hides (that's fine).

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add inert SiteHeader (visual replica of prod)"
```

---

## Task 6: `SiteFooter` (inert visual replica)

**Files:**
- Create: `~/nirvana/pledge/src/components/SiteFooter.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx` (mount footer)

Match the production footer screenshot: deep-purple bg, logo + social icons on left, four link columns, compliance badges, careers callout pill, legal row. All labels are `<span>`, not links. Social icons and compliance badges use lucide + simple styled boxes.

- [ ] **Step 1: Write `SiteFooter.tsx`**

```tsx
import { Instagram, Linkedin } from "lucide-react";

const COLUMNS: Array<{ heading: string; items: string[] }> = [
  { heading: "Solutions", items: ["Platform overview", "Insurance Discovery", "Cost Estimates", "Enhanced Verification"] },
  { heading: "Who We Serve", items: ["Healthcare Providers", "Digital Health Partners", "EHR Partners"] },
  { heading: "Why Nirvana", items: ["Customer Stories", "Our Technology"] },
  { heading: "Resources", items: ["About Us", "Careers", "Blog", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-[color:var(--deep-purple)] text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <img src="/nirvana-glyph.svg" alt="" className="h-7 w-7" onError={(e) => (e.currentTarget.src = "/nirvana-glyph.png")} />
              <img src="/nirvana-logo.svg" alt="Nirvana" className="h-4 invert" />
            </div>
            <div className="flex gap-3">
              <span className="w-9 h-9 rounded-full bg-[color:var(--lilac)]/20 flex items-center justify-center cursor-default">
                <Instagram className="h-4 w-4 text-[color:var(--lilac)]" />
              </span>
              <span className="w-9 h-9 rounded-full bg-[color:var(--lilac)]/20 flex items-center justify-center cursor-default">
                <Linkedin className="h-4 w-4 text-[color:var(--lilac)]" />
              </span>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <div className="text-xs font-semibold tracking-wider text-[color:var(--lilac)]">{col.heading.toUpperCase()}</div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-white cursor-default">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between gap-8 mb-10">
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/70 text-center leading-tight cursor-default">HIPAA<br/>COMPLIANT</div>
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/70 text-center leading-tight cursor-default">AICPA<br/>SOC</div>
          </div>
          <div className="hidden md:flex items-center gap-4 bg-[color:var(--lilac)]/25 rounded-full pl-6 pr-3 py-2 cursor-default">
            <span className="text-sm text-white">Looking to help make mental healthcare more accessible? Join Nirvana team.</span>
            <span className="rounded-full bg-transparent border border-white/30 px-3 py-1 text-xs font-medium text-white">View job openings</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-white/60">
          <div>Copyright Meet Nirvana 2026</div>
          <div className="flex gap-6">
            <span className="cursor-default">Cookies Preferences</span>
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Mount in `App.tsx`**

```tsx
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">Pledge page — unlocked.</main>
        <SiteFooter />
      </div>
    </PasswordGate>
  );
}
```

- [ ] **Step 3: Manual test**

Verify: footer is deep-purple, four columns of nav labels visible on desktop, HIPAA + SOC badges, careers pill, legal row. Compare with prod screenshot — must feel like the same site.

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add inert SiteFooter (visual replica of prod)"
```

---

## Task 7: `Hero` with static CTA

**Files:**
- Create: `~/nirvana/pledge/src/components/Hero.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Just the visual + CTA button for now. Click handler is a stub that logs. We wire it to the form dialog in Task 11 and to the state machine in Task 15.

- [ ] **Step 1: Write `Hero.tsx`**

```tsx
import { Button } from "@/components/ui/button";

type HeroProps = { onSignClick: () => void };

export function Hero({ onSignClick }: HeroProps) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block rounded-full border border-border bg-card px-4 py-1.5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--vibrant-purple)]">
            The Price Transparency Pledge
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
          Patients deserve to know what care costs — and what they're covered for — before they book.
        </h1>
        <p className="text-lg text-[color:var(--deep-purple)]/70 max-w-2xl mx-auto">
          Sign the pledge and stand with providers committing to price transparency and coverage clarity for every patient.
        </p>
        <div className="pt-2">
          <Button
            size="lg"
            onClick={onSignClick}
            className="rounded-full px-8 py-6 text-base font-semibold"
          >
            Sign the pledge
          </Button>
        </div>
      </div>
    </section>
  );
}
```

Note: subhead uses `deep-purple/70` (not `--lilac`) for WCAG AA contrast on the off-white background.

- [ ] **Step 2: Wire into `App.tsx`**

```tsx
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero onSignClick={() => console.log("sign clicked")} />
        </main>
        <SiteFooter />
      </div>
    </PasswordGate>
  );
}
```

- [ ] **Step 3: Manual test**

Verify: hero pill "THE PRICE TRANSPARENCY PLEDGE" in vibrant purple, big deep-purple headline, lilac subhead, vibrant-purple CTA button. Clicking logs "sign clicked" in the browser console.

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add Hero with static CTA"
```

---

## Task 8: `LogoCarousel` (CSS marquee)

**Files:**
- Create: `~/nirvana/pledge/src/components/LogoCarousel.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Standard trick: render the logo list twice inside a container animated with `translateX(-50%)`, so it loops seamlessly. `prefers-reduced-motion` already killed via the CSS in Task 3.

- [ ] **Step 1: Write `LogoCarousel.tsx`**

```tsx
const LOGOS = [
  "/logos/placeholder-1.svg",
  "/logos/placeholder-2.svg",
  "/logos/placeholder-3.svg",
  "/logos/placeholder-4.svg",
  "/logos/placeholder-5.svg",
  "/logos/placeholder-6.svg",
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
```

- [ ] **Step 2: Mount below Hero in `App.tsx`**

```tsx
<Hero onSignClick={() => console.log("sign clicked")} />
<LogoCarousel />
```

- [ ] **Step 3: Manual test**

Verify: strip of 6 placeholder logos scrolls smoothly across the screen. Hover pauses. Enable "reduce motion" in OS accessibility → strip stops animating.

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add LogoCarousel marquee"
```

---

## Task 9: `PledgeCounterPill`

**Files:**
- Create: `~/nirvana/pledge/src/components/PledgeCounterPill.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Static counts for now (hard-coded props). Real data comes in Task 19. `visible` prop lets the parent hide it entirely when the `list` fetch fails (per spec).

- [ ] **Step 1: Write `PledgeCounterPill.tsx`**

```tsx
import { ArrowRight } from "lucide-react";

type Props = {
  pledges: number;
  companies: number;
  onOpenList: () => void;
  visible: boolean;
};

export function PledgeCounterPill({ pledges, companies, onOpenList, visible }: Props) {
  if (!visible) return null;
  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-3xl mx-auto flex justify-center">
        <button
          onClick={onOpenList}
          className="group inline-flex items-center gap-3 bg-card border border-border rounded-full pl-6 pr-4 py-3 hover:border-[color:var(--vibrant-purple)] transition-colors"
        >
          <span className="text-base">
            <span className="font-semibold text-foreground">{pledges} pledges</span>
            <span className="text-muted-foreground"> from </span>
            <span className="font-semibold text-foreground">{companies} companies</span>
          </span>
          <span className="text-sm text-[color:var(--vibrant-purple)] font-medium flex items-center gap-1">
            View list <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount in `App.tsx` with static values**

```tsx
<LogoCarousel />
<PledgeCounterPill
  pledges={247}
  companies={89}
  visible={true}
  onOpenList={() => console.log("open list")}
/>
```

- [ ] **Step 3: Manual test**

Verify: rounded pill centered on the page, hover changes border color, arrow slides on hover. Click logs "open list".

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add PledgeCounterPill"
```

---

## Task 10: `PledgeListModal` (grouped display)

**Files:**
- Create: `~/nirvana/pledge/src/types.ts`
- Create: `~/nirvana/pledge/src/components/PledgeListModal.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Uses base-ui `Dialog`. Grouped alphabetical by company, each with signer rows. Real data comes from Task 19; for now the parent passes a hard-coded list to verify layout.

- [ ] **Step 1: Write `types.ts`**

```ts
export type PledgeStatus = "pending" | "approved" | "rescinded";

export type PublicPledge = {
  company: string;
  firstName: string;
  lastInitial: string;
  role: string;
};

export type PrivatePledge = {
  id: string;
  status: PledgeStatus;
  firstName: string;
  company: string;
};
```

- [ ] **Step 2: Write `PledgeListModal.tsx`**

```tsx
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { PublicPledge } from "@/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pledges: PublicPledge[];
};

export function PledgeListModal({ open, onOpenChange, pledges }: Props) {
  const byCompany = new Map<string, PublicPledge[]>();
  for (const p of pledges) {
    const list = byCompany.get(p.company) ?? [];
    list.push(p);
    byCompany.set(p.company, list);
  }
  const companies = [...byCompany.keys()].sort((a, b) => a.localeCompare(b));
  const totalPledges = pledges.length;
  const totalCompanies = companies.length;

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup className="fixed inset-4 md:inset-16 z-50 bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-border">
            <BaseDialog.Title className="text-lg md:text-xl font-semibold">
              <span className="text-foreground">{totalPledges} pledges</span>
              <span className="text-muted-foreground"> from </span>
              <span className="text-foreground">{totalCompanies} companies</span>
            </BaseDialog.Title>
            <BaseDialog.Close className="rounded-full p-2 hover:bg-muted transition-colors" aria-label="Close">
              <X className="h-5 w-5" />
            </BaseDialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-8">
            {companies.length === 0 && (
              <p className="text-muted-foreground text-center py-16">No pledges yet.</p>
            )}
            {companies.map((company) => {
              const signers = byCompany.get(company)!;
              return (
                <div key={company} className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{company}</h3>
                  <ul className="space-y-1">
                    {signers.map((s, i) => (
                      <li key={i} className="text-sm text-[color:var(--lilac)]">
                        {s.firstName} {s.lastInitial}. · {s.role}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
```

- [ ] **Step 3: Wire in `App.tsx` with mock data**

```tsx
import { useState } from "react";
import { PledgeListModal } from "@/components/PledgeListModal";
import type { PublicPledge } from "@/types";

const MOCK: PublicPledge[] = [
  { company: "Acme Health", firstName: "Jane", lastInitial: "D", role: "CFO" },
  { company: "Acme Health", firstName: "Marcus", lastInitial: "P", role: "COO" },
  { company: "Better Care", firstName: "Mike", lastInitial: "R", role: "VP Revenue" },
  { company: "Clarity Med", firstName: "Sam", lastInitial: "L", role: "CEO" },
];

// Inside the component:
const [listOpen, setListOpen] = useState(false);
// ...
<PledgeCounterPill
  pledges={MOCK.length}
  companies={new Set(MOCK.map((p) => p.company)).size}
  visible={true}
  onOpenList={() => setListOpen(true)}
/>
<PledgeListModal open={listOpen} onOpenChange={setListOpen} pledges={MOCK} />
```

- [ ] **Step 4: Manual test**

Click pill → modal opens with 4 pledges from 3 companies. Acme Health shows both Jane and Marcus grouped. ESC closes. Click X closes. Backdrop click closes (base-ui default). Tab cycles within modal (focus trap).

- [ ] **Step 5: Commit**

```bash
git add pledge/
git commit -m "pledge: add PledgeListModal with grouped display"
```

---

## Task 11: `PledgeFormDialog` (form UI only)

**Files:**
- Create: `~/nirvana/pledge/src/components/PledgeFormDialog.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Form UI only. Submission goes nowhere yet — we log the payload. Task 16 wires it to the api client.

- [ ] **Step 1: Write `PledgeFormDialog.tsx`**

```tsx
import { useState } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type PledgeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PledgeFormData) => Promise<void>;
  submitting: boolean;
  submitError: string | null;
};

const EMPTY: PledgeFormData = { firstName: "", lastName: "", email: "", company: "", role: "" };

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function PledgeFormDialog({ open, onOpenChange, onSubmit, submitting, submitError }: Props) {
  const [values, setValues] = useState<PledgeFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof PledgeFormData, string>>>({});

  const update = (k: keyof PledgeFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((e2) => ({ ...e2, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed: PledgeFormData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      company: values.company.trim(),
      role: values.role.trim(),
    };
    const errs: typeof errors = {};
    if (!trimmed.firstName) errs.firstName = "Required";
    if (!trimmed.lastName) errs.lastName = "Required";
    if (!trimmed.email) errs.email = "Required";
    else if (!isEmail(trimmed.email)) errs.email = "Invalid email";
    if (!trimmed.company) errs.company = "Required";
    if (!trimmed.role) errs.role = "Required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    await onSubmit(trimmed);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-lg bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <BaseDialog.Title className="text-lg font-semibold">Sign the pledge</BaseDialog.Title>
            <BaseDialog.Close className="rounded-full p-1.5 hover:bg-muted" aria-label="Close">
              <X className="h-5 w-5" />
            </BaseDialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" error={errors.firstName}>
                <Input value={values.firstName} onChange={update("firstName")} required autoFocus />
              </Field>
              <Field label="Last name" error={errors.lastName}>
                <Input value={values.lastName} onChange={update("lastName")} required />
              </Field>
            </div>
            <Field label="Email" error={errors.email}>
              <Input type="email" value={values.email} onChange={update("email")} required />
            </Field>
            <Field label="Company" error={errors.company}>
              <Input value={values.company} onChange={update("company")} required />
            </Field>
            <Field label="Role" error={errors.role}>
              <Input value={values.role} onChange={update("role")} required />
            </Field>
            {submitError && (
              <p className="text-sm text-destructive" role="alert">{submitError}</p>
            )}
            <div className="pt-2 space-y-3">
              <Button type="submit" disabled={submitting} className="w-full rounded-full py-6 text-base font-semibold">
                {submitting ? "Submitting…" : "Sign the pledge"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Nirvana will review your submission shortly.
              </p>
            </div>
          </form>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Wire in `App.tsx`**

```tsx
const [formOpen, setFormOpen] = useState(false);

// In render:
<Hero onSignClick={() => setFormOpen(true)} />
// ...
<PledgeFormDialog
  open={formOpen}
  onOpenChange={setFormOpen}
  submitting={false}
  submitError={null}
  onSubmit={async (data) => {
    console.log("submit", data);
    setFormOpen(false);
  }}
/>
```

- [ ] **Step 3: Manual test**

- Click "Sign the pledge" → dialog opens
- Focus starts on First name
- Submit empty form → 5 "Required" errors
- Fill invalid email → "Invalid email"
- Fill valid data, submit → console logs the payload, dialog closes
- ESC closes, X closes
- Tab cycles through 5 inputs and submit button

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add PledgeFormDialog with client-side validation"
```

---

## Task 12: Provision Google Sheet + Apps Script backend

**Files:**
- Create: `~/nirvana/pledge/backend/Code.gs` (a checked-in reference copy of the Apps Script — Apps Script itself lives in Google, but we keep the source in the repo so it's not lost)
- Create: `~/nirvana/pledge/backend/README.md` (deployment instructions)

**This task is partly manual** (creating the Sheet + deploying the script in Google's UI). The `.gs` file in this repo is the source of truth for the code; you paste it into the Apps Script editor.

- [ ] **Step 1: Create the Google Sheet**

In Google Drive:
1. New → Google Sheet, name it `Nirvana Pledge Signatories`
2. Rename `Sheet1` to `Pledges`
3. In row 1, add these column headers exactly:
   `id | timestamp | firstName | lastName | email | company | role | status | reviewedAt | reviewedBy`
4. Copy the sheet ID from the URL (`.../spreadsheets/d/<SHEET_ID>/edit`)

- [ ] **Step 2: Create the Apps Script**

In the sheet: **Extensions → Apps Script**. Delete the default `myFunction`, paste in the code below.

- [ ] **Step 3: Save `Code.gs` to the repo**

Create `~/nirvana/pledge/backend/Code.gs`:

```javascript
// Nirvana Pledge — Apps Script backend
// Deployed as: Web App, execute as "Me", access "Anyone"

const SHEET_NAME = "Pledges";

function doGet(e) {
  const action = e.parameter.action;
  const cb = e.parameter.callback;
  if (action === "list") return respond(handleList(), cb);
  if (action === "lookup") return respond(handleLookup(e.parameter), cb);
  if (action === "rescind") return respond(handleRescind(e.parameter), cb);
  return respond({ error: "unknown action" }, cb);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "submit") return respond(handleSubmit(body));
    return respond({ error: "unknown action" });
  } catch (err) {
    return respond({ error: String(err) });
  }
}

function respond(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + json + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function rows() {
  const s = sheet();
  const data = s.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map((r, i) => {
    const o = { rowNum: i + 2 };
    headers.forEach((h, j) => (o[h] = r[j]));
    return o;
  });
}

function findByEmail(email) {
  const target = String(email || "").toLowerCase().trim();
  return rows().find((r) => String(r.email || "").toLowerCase().trim() === target);
}

function handleList() {
  return rows()
    .filter((r) => r.status === "approved")
    .map((r) => ({
      company: r.company,
      firstName: r.firstName,
      lastInitial: String(r.lastName || "").charAt(0),
      role: r.role,
    }));
}

function handleSubmit(body) {
  const email = String(body.email || "").toLowerCase().trim();
  if (!email) return { error: "email required" };
  const existing = findByEmail(email);
  const s = sheet();
  if (existing) {
    s.getRange(existing.rowNum, 3).setValue(body.firstName || existing.firstName);
    s.getRange(existing.rowNum, 4).setValue(body.lastName || existing.lastName);
    s.getRange(existing.rowNum, 6).setValue(body.company || existing.company);
    s.getRange(existing.rowNum, 7).setValue(body.role || existing.role);
    return { id: existing.id, status: existing.status };
  }
  const id = Utilities.getUuid();
  s.appendRow([
    id,
    new Date().toISOString(),
    body.firstName || "",
    body.lastName || "",
    email,
    body.company || "",
    body.role || "",
    "pending",
    "",
    "",
  ]);
  return { id, status: "pending" };
}

function handleLookup(p) {
  const row = findByEmail(p.email);
  if (!row) return null;
  return { id: row.id, status: row.status, firstName: row.firstName, company: row.company };
}

function handleRescind(p) {
  const id = String(p.id || "");
  const email = String(p.email || "").toLowerCase().trim();
  if (!id || !email) return { error: "id and email required" };
  const row = rows().find((r) => r.id === id);
  if (!row) return { error: "not found" };
  if (String(row.email || "").toLowerCase().trim() !== email) return { error: "email mismatch" };
  sheet().getRange(row.rowNum, 8).setValue("rescinded");
  return { ok: true };
}
```

Paste this whole file into the Apps Script editor.

- [ ] **Step 4: Deploy as Web App**

In the Apps Script editor:
1. Deploy → New deployment
2. Type: **Web App**
3. Description: `Nirvana Pledge v1`
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Deploy → grant permissions → copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`)

- [ ] **Step 5: Save the URL + README**

Create `~/nirvana/pledge/backend/README.md`:

```markdown
# Nirvana Pledge Backend

Google Sheet: <link to your sheet>
Apps Script URL: <paste the /exec URL here>

## Deploying updates

1. Edit `Code.gs` in this repo
2. Paste into Apps Script editor
3. Deploy → Manage deployments → edit the existing v1 deployment → New version → Deploy
4. URL stays the same

## Rep review workflow

1. Open the Sheet, tab `Pledges`
2. Filter/sort by `status = pending`
3. To approve: change the `status` cell for that row to `approved`
4. Fill `reviewedAt` / `reviewedBy` optionally
5. To reject: leave as `pending` or set to any non-approved value
```

- [ ] **Step 6: Verify the endpoints from the terminal**

```bash
# Replace with your actual URL
APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_ID/exec"

# List (should return [])
curl -sL "$APPS_SCRIPT_URL?action=list"

# Submit
curl -sL -X POST "$APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"action":"submit","firstName":"Test","lastName":"User","email":"test@example.com","company":"Test Co","role":"CEO"}'

# Lookup
curl -sL "$APPS_SCRIPT_URL?action=lookup&email=test@example.com&callback=cb"
# Expected: cb({"id":"...","status":"pending","firstName":"Test","company":"Test Co"})
```

Verify the row appears in the Sheet.

- [ ] **Step 7: Commit**

```bash
cd ~/nirvana
git add pledge/backend/
git commit -m "pledge: add Apps Script backend + deployment README"
```

**Note:** Do NOT commit the actual Apps Script URL to a public repo if you consider it sensitive. Since Nirvana's repo is private, the README's URL is fine.

---

## Task 13: `lib/api.ts` — Apps Script client

**Files:**
- Create: `~/nirvana/pledge/src/lib/api.ts`

- [ ] **Step 1: Write `api.ts`**

Set `APPS_SCRIPT_URL` to the value from Task 12.

```ts
import type { PledgeStatus, PublicPledge, PrivatePledge } from "@/types";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ID/exec";

export async function apiList(): Promise<PublicPledge[]> {
  const res = await fetch(`${APPS_SCRIPT_URL}?action=list`, { redirect: "follow" });
  if (!res.ok) throw new Error(`list failed: ${res.status}`);
  return res.json();
}

export async function apiSubmit(data: {
  firstName: string; lastName: string; email: string; company: string; role: string;
}): Promise<void> {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "submit", ...data }),
  });
}

export function apiLookup(email: string): Promise<PrivatePledge | null> {
  return jsonp("lookup", { email });
}

export function apiRescind(id: string, email: string): Promise<{ ok?: true; error?: string }> {
  return jsonp("rescind", { id, email });
}

function jsonp<T>(action: string, params: Record<string, string>): Promise<T> {
  return new Promise((resolve, reject) => {
    const cb = `_nirvana_cb_${Math.random().toString(36).slice(2)}`;
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`${action} timeout`));
    }, 10_000);
    (window as any)[cb] = (data: T) => {
      cleanup();
      resolve(data);
    };
    const cleanup = () => {
      clearTimeout(timeout);
      delete (window as any)[cb];
      script.remove();
    };
    const qs = new URLSearchParams({ action, callback: cb, ...params });
    const script = document.createElement("script");
    script.src = `${APPS_SCRIPT_URL}?${qs.toString()}`;
    script.onerror = () => { cleanup(); reject(new Error(`${action} network error`)); };
    document.body.appendChild(script);
  });
}
```

- [ ] **Step 2: Sanity-test from the browser console**

Run `npm run dev`. In the unlocked page's DevTools console:

```js
const api = await import("/src/lib/api.ts");
await api.apiList();          // → []
await api.apiSubmit({ firstName: "Cli", lastName: "Test", email: "cli@example.com", company: "CLI Co", role: "Dev" });
await api.apiLookup("cli@example.com");   // → { id, status, firstName, company }
```

Verify a row appears in the Sheet, then manually change its `status` cell to `approved`. Reload and run `apiList()` again — the row should now show up.

- [ ] **Step 3: Commit**

```bash
git add pledge/
git commit -m "pledge: add Apps Script API client (list/submit/lookup/rescind)"
```

---

## Task 14: `lib/storage.ts` — cookie/localStorage helpers

**Files:**
- Create: `~/nirvana/pledge/src/lib/storage.ts`

- [ ] **Step 1: Write `storage.ts`**

```ts
const KEY = "nirvana_pledge";

export type PledgeCookie = { id: string; email: string };

export function readPledgeCookie(): PledgeCookie | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" && parsed !== null &&
      typeof (parsed as PledgeCookie).id === "string" &&
      typeof (parsed as PledgeCookie).email === "string"
    ) {
      return parsed as PledgeCookie;
    }
    // Corrupt — wipe
    localStorage.removeItem(KEY);
    return null;
  } catch {
    return null;
  }
}

export function writePledgeCookie(c: PledgeCookie): void {
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
}

export function clearPledgeCookie(): void {
  try { localStorage.removeItem(KEY); } catch {}
}

export function tempId(): string {
  return `temp-${Math.random().toString(36).slice(2, 12)}`;
}
```

- [ ] **Step 2: Commit**

```bash
git add pledge/
git commit -m "pledge: add storage helpers with graceful fallback"
```

---

## Task 15: `usePledgeState` hook

**Files:**
- Create: `~/nirvana/pledge/src/hooks/usePledgeState.ts`

State machine driving the whole visitor-side experience. Owns cookie, current pledge status, submit/rescind/lookup logic, and background polling.

- [ ] **Step 1: Write `usePledgeState.ts`**

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import { apiSubmit, apiLookup, apiRescind, apiList } from "@/lib/api";
import { readPledgeCookie, writePledgeCookie, clearPledgeCookie, tempId } from "@/lib/storage";
import type { PublicPledge, PledgeStatus } from "@/types";

type Local =
  | { kind: "fresh" }
  | { kind: "submitting" }
  | { kind: "pending"; id: string; email: string; firstName: string; company: string }
  | { kind: "approved"; id: string; email: string; firstName: string; company: string };

const POLL_MS = 60_000;

export function usePledgeState() {
  const [local, setLocal] = useState<Local>({ kind: "fresh" });
  const [list, setList] = useState<PublicPledge[] | null>(null);
  const [listHidden, setListHidden] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const listRetryTimer = useRef<number | null>(null);

  const refreshList = useCallback(async (retryOnFail = true) => {
    try {
      const data = await apiList();
      setList(data);
      setListHidden(false);
    } catch (err) {
      console.warn("[pledge] list fetch failed", err);
      if (retryOnFail) {
        listRetryTimer.current = window.setTimeout(() => refreshList(false), 5_000);
      } else {
        setListHidden(true);
      }
    }
  }, []);

  const refreshMe = useCallback(async () => {
    const cookie = readPledgeCookie();
    if (!cookie) return;
    try {
      const row = await apiLookup(cookie.email);
      if (!row) {
        // If we only have a temp id, the just-submitted row may not be visible
        // to the server yet (Apps Script write-read race). Do NOT wipe the
        // optimistic state — leave it and the next poll will reconcile.
        if (cookie.id.startsWith("temp-")) return;
        clearPledgeCookie();
        setLocal({ kind: "fresh" });
        return;
      }
      // Reconcile temp ID with real server id
      if (row.id !== cookie.id) writePledgeCookie({ id: row.id, email: cookie.email });
      if (row.status === "rescinded") {
        clearPledgeCookie();
        setLocal({ kind: "fresh" });
      } else {
        setLocal({
          kind: row.status,
          id: row.id,
          email: cookie.email,
          firstName: row.firstName,
          company: row.company,
        });
      }
    } catch (err) {
      console.warn("[pledge] lookup failed", err);
    }
  }, []);

  // Boot: initial fetches + poll
  useEffect(() => {
    refreshList(true);
    refreshMe();
    const iv = window.setInterval(() => {
      refreshList(false);
      refreshMe();
    }, POLL_MS);
    return () => {
      window.clearInterval(iv);
      if (listRetryTimer.current) window.clearTimeout(listRetryTimer.current);
    };
  }, [refreshList, refreshMe]);

  const submit = useCallback(async (data: {
    firstName: string; lastName: string; email: string; company: string; role: string;
  }) => {
    setSubmitError(null);
    setLocal({ kind: "submitting" });
    try {
      await apiSubmit(data);
      // Optimistic: write cookie with temp id, then reconcile on next lookup
      const cookie = { id: tempId(), email: data.email };
      writePledgeCookie(cookie);
      setLocal({
        kind: "pending",
        id: cookie.id,
        email: data.email,
        firstName: data.firstName,
        company: data.company,
      });
      // Fire-and-forget reconciliation
      refreshMe();
    } catch (err) {
      console.warn("[pledge] submit failed", err);
      setSubmitError("Couldn't submit — please try again.");
      setLocal({ kind: "fresh" });
    }
  }, [refreshMe]);

  const rescind = useCallback(async () => {
    if (local.kind !== "pending" && local.kind !== "approved") return;
    try {
      const result = await apiRescind(local.id, local.email);
      if (result.ok) {
        clearPledgeCookie();
        setLocal({ kind: "fresh" });
        refreshList(false);
      } else {
        throw new Error(result.error || "rescind failed");
      }
    } catch (err) {
      console.warn("[pledge] rescind failed", err);
      throw err;
    }
  }, [local, refreshList]);

  const lookupByEmail = useCallback(async (email: string) => {
    const row = await apiLookup(email.toLowerCase().trim());
    if (!row) return null;
    writePledgeCookie({ id: row.id, email: email.toLowerCase().trim() });
    if (row.status === "rescinded") {
      clearPledgeCookie();
      setLocal({ kind: "fresh" });
      return null;
    }
    setLocal({
      kind: row.status,
      id: row.id,
      email: email.toLowerCase().trim(),
      firstName: row.firstName,
      company: row.company,
    });
    return row;
  }, []);

  return {
    local,
    list,
    listHidden,
    submitError,
    submit,
    rescind,
    lookupByEmail,
    refreshList,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add pledge/
git commit -m "pledge: add usePledgeState hook (state machine + polling)"
```

---

## Task 16: Wire form submission end-to-end

**Files:**
- Modify: `~/nirvana/pledge/src/App.tsx`

Replace the mock/log submit handler with `usePledgeState`.

- [ ] **Step 1: Update `App.tsx`**

```tsx
import { useState } from "react";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
import { usePledgeState } from "@/hooks/usePledgeState";

export default function App() {
  const state = usePledgeState();
  const [formOpen, setFormOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const pledges = state.list ?? [];
  const companies = new Set(pledges.map((p) => p.company)).size;

  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero onSignClick={() => setFormOpen(true)} />
          <LogoCarousel />
          <PledgeCounterPill
            pledges={pledges.length}
            companies={companies}
            visible={!state.listHidden && pledges.length > 0}
            onOpenList={() => setListOpen(true)}
          />
        </main>
        <SiteFooter />

        <PledgeFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          submitting={state.local.kind === "submitting"}
          submitError={state.submitError}
          onSubmit={async (data) => {
            await state.submit(data);
            setFormOpen(false);
          }}
        />
        <PledgeListModal open={listOpen} onOpenChange={setListOpen} pledges={pledges} />
      </div>
    </PasswordGate>
  );
}
```

- [ ] **Step 2: End-to-end manual test**

```bash
cd ~/nirvana/pledge && npm run dev
```

Test the full happy path:
1. Enter password → unlocked
2. Verify counter pill is either hidden (no approved rows yet) or shows the count
3. Click "Sign the pledge" → fill form → submit
4. Dialog closes; row appears in the Sheet with status `pending`
5. Reload the page — Hero CTA is still showing (we don't render PendingCard yet — that's Task 17)
6. In the Sheet, change your row's `status` to `approved`
7. Wait up to 60s (or reload) → counter pill now shows `1 pledges from 1 companies`
8. Click the pill → modal shows your name grouped under your company

- [ ] **Step 3: Commit**

```bash
git add pledge/
git commit -m "pledge: wire form submit to Apps Script backend"
```

---

## Task 17: `PendingCard` and `ApprovedCard`

**Files:**
- Create: `~/nirvana/pledge/src/components/PendingCard.tsx`
- Create: `~/nirvana/pledge/src/components/ApprovedCard.tsx`
- Modify: `~/nirvana/pledge/src/components/Hero.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Hero swaps its CTA area based on state. Also add rescind confirmation flow.

- [ ] **Step 1: Write `PendingCard.tsx`**

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Clock } from "lucide-react";

type Props = {
  firstName: string;
  company: string;
  onRescind: () => Promise<void>;
};

export function PendingCard({ firstName, company, onRescind }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rescinding, setRescinding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doRescind = async () => {
    setRescinding(true); setError(null);
    try { await onRescind(); setConfirmOpen(false); }
    catch { setError("Couldn't rescind. Try again."); }
    finally { setRescinding(false); }
  };

  return (
    <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[color:var(--amber)]/10 flex items-center justify-center">
          <Clock className="h-5 w-5 text-[color:var(--amber)]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">Your pledge is under review</div>
          <div className="text-xs text-muted-foreground">Thanks {firstName} — Nirvana will review your submission shortly.</div>
        </div>
      </div>
      <div className="pt-2">
        <button
          onClick={() => setConfirmOpen(true)}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-destructive transition-colors"
        >
          Rescind pledge
        </button>
      </div>

      <BaseDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
          <BaseDialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-sm bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xl">
            <BaseDialog.Title className="text-base font-semibold">Rescind your pledge?</BaseDialog.Title>
            <BaseDialog.Description className="text-sm text-muted-foreground">
              This will remove your pledge for {company}. You can pledge again later.
            </BaseDialog.Description>
            {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="ghost" onClick={() => setConfirmOpen(false)} disabled={rescinding}>Cancel</Button>
              <Button variant="destructive" onClick={doRescind} disabled={rescinding}>
                {rescinding ? "Rescinding…" : "Rescind"}
              </Button>
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </div>
  );
}
```

- [ ] **Step 2: Write `ApprovedCard.tsx`**

```tsx
import { CheckCircle2 } from "lucide-react";

type Props = {
  firstName: string;
  company: string;
  onViewList: () => void;
};

export function ApprovedCard({ firstName, company, onViewList }: Props) {
  return (
    <div className="max-w-xl mx-auto bg-card border border-[color:var(--green)]/30 rounded-2xl p-8 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[color:var(--green-light)] flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-[color:var(--green)]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">Thanks {firstName} — your pledge is live</div>
          <div className="text-xs text-muted-foreground">{company} appears in the public list.</div>
        </div>
      </div>
      <button
        onClick={onViewList}
        className="text-xs text-[color:var(--vibrant-purple)] font-medium underline underline-offset-4"
      >
        View the list →
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Update `Hero.tsx` to accept a slot**

```tsx
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type HeroProps = { children?: ReactNode; onSignClick?: () => void };

export function Hero({ children, onSignClick }: HeroProps) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block rounded-full border border-border bg-card px-4 py-1.5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--vibrant-purple)]">
            The Price Transparency Pledge
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
          Patients deserve to know what care costs — and what they're covered for — before they book.
        </h1>
        <p className="text-lg text-[color:var(--lilac)] max-w-2xl mx-auto">
          Sign the pledge and stand with providers committing to price transparency and coverage clarity for every patient.
        </p>
        <div className="pt-4">
          {children ?? (
            <Button
              size="lg"
              onClick={onSignClick}
              className="rounded-full px-8 py-6 text-base font-semibold"
            >
              Sign the pledge
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire cards into `App.tsx`**

```tsx
// ... inside App(), replace the Hero line:
<Hero>
  {state.local.kind === "pending" && (
    <PendingCard
      firstName={state.local.firstName}
      company={state.local.company}
      onRescind={state.rescind}
    />
  )}
  {state.local.kind === "approved" && (
    <ApprovedCard
      firstName={state.local.firstName}
      company={state.local.company}
      onViewList={() => setListOpen(true)}
    />
  )}
  {(state.local.kind === "fresh" || state.local.kind === "submitting") && (
    <Button
      size="lg"
      onClick={() => setFormOpen(true)}
      disabled={state.local.kind === "submitting"}
      className="rounded-full px-8 py-6 text-base font-semibold"
    >
      Sign the pledge
    </Button>
  )}
</Hero>
```

Add imports for `PendingCard`, `ApprovedCard`, `Button` at the top of `App.tsx`.

- [ ] **Step 5: Manual test full state machine**

Reset by clearing localStorage in DevTools. Then:

1. Fresh → see CTA button
2. Submit form → see PendingCard with amber clock
3. Reload → still see PendingCard
4. In Sheet: set status → `approved`
5. Wait ≤60s → PendingCard flips to ApprovedCard (green check)
6. Click "Rescind pledge" (need to reset status to `pending` in Sheet first if you want to test the pending-side rescind)
7. Confirm dialog → click Rescind → back to Fresh, cookie cleared
8. Verify Sheet row status = `rescinded`, disappears from list

- [ ] **Step 6: Commit**

```bash
git add pledge/
git commit -m "pledge: add PendingCard + ApprovedCard state cards"
```

---

## Task 18: `LookupSheet` (Already pledged? recovery)

**Files:**
- Create: `~/nirvana/pledge/src/components/LookupSheet.tsx`
- Modify: `~/nirvana/pledge/src/App.tsx`

Small dialog with just an email input. Available always via a subtle link under the Hero CTA.

- [ ] **Step 1: Write `LookupSheet.tsx`**

```tsx
import { useState } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLookup: (email: string) => Promise<{ id: string; status: string } | null>;
};

export function LookupSheet({ open, onOpenChange, onLookup }: Props) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true); setNotFound(false); setError(null);
    try {
      const found = await onLookup(email.trim());
      if (found) { onOpenChange(false); setEmail(""); }
      else setNotFound(true);
    } catch (err) {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-sm bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <BaseDialog.Title className="text-base font-semibold">Find your pledge</BaseDialog.Title>
            <BaseDialog.Close className="rounded-full p-1.5 hover:bg-muted" aria-label="Close">
              <X className="h-4 w-4" />
            </BaseDialog.Close>
          </div>
          <form onSubmit={submit} className="px-6 py-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Email you used to pledge</Label>
              <Input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value); setNotFound(false); setError(null); }}
              />
              {notFound && <p className="text-xs text-muted-foreground">No pledge found for that email.</p>}
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button type="submit" disabled={busy} className="w-full rounded-full py-5 font-semibold">
              {busy ? "Looking up…" : "Find pledge"}
            </Button>
          </form>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
```

- [ ] **Step 2: Wire in `App.tsx`**

Add `LookupSheet` state and a small "Already pledged?" link below the Hero CTA (only when state is Fresh):

```tsx
const [lookupOpen, setLookupOpen] = useState(false);

// Inside Hero children, after the CTA button (only for fresh):
{state.local.kind === "fresh" && (
  <>
    <Button ...>Sign the pledge</Button>
    <div>
      <button
        onClick={() => setLookupOpen(true)}
        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground mt-4"
      >
        Already pledged?
      </button>
    </div>
  </>
)}

// Bottom of App:
<LookupSheet
  open={lookupOpen}
  onOpenChange={setLookupOpen}
  onLookup={state.lookupByEmail}
/>
```

- [ ] **Step 3: Manual test**

- Clear localStorage → see "Already pledged?" link under CTA
- Click → dialog opens
- Type an unknown email → "No pledge found"
- Type your real pledged email → dialog closes, PendingCard/ApprovedCard appears
- Reload → state persists via new cookie

- [ ] **Step 4: Commit**

```bash
git add pledge/
git commit -m "pledge: add LookupSheet email-recovery flow"
```

---

## Task 19: Background polling verification

**Files:** none (verification-only)

The polling logic is already in `usePledgeState` (Task 15). This task is a manual verification pass to catch integration issues.

- [ ] **Step 1: Verify list polling**

Open the page in the browser with DevTools → Network tab, filter to Fetch/XHR.

- Every 60s a request to `?action=list` should appear
- If you approve a new pledge in the Sheet while the tab is open, within 60s the counter updates without reload

- [ ] **Step 2: Verify pending→approved auto-transition**

- With a pending pledge, wait on the page with DevTools open
- Approve in the Sheet
- Within 60s, PendingCard should morph into ApprovedCard
- No page reload required

- [ ] **Step 3: Verify list-failure recovery**

Temporarily break `APPS_SCRIPT_URL` in `api.ts` (e.g. add "X" to it), reload:

- Console should log a warning
- Counter pill should be hidden entirely
- 5s later, retry fires — also fails
- Pill stays hidden for the session
- Restore the URL, reload — pill returns

- [ ] **Step 4: Commit any adjustments (none expected)**

If everything works, no commit needed. If something's off, fix and commit with `pledge: fix polling <specific issue>`.

---

## Task 20: Final `App.tsx` composition audit

**Files:**
- Modify: `~/nirvana/pledge/src/App.tsx` (final cleanup)

At this point `App.tsx` has been edited across many tasks. Consolidate it into a clean final version.

- [ ] **Step 1: Rewrite `App.tsx` cleanly**

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
import { PendingCard } from "@/components/PendingCard";
import { ApprovedCard } from "@/components/ApprovedCard";
import { LookupSheet } from "@/components/LookupSheet";
import { usePledgeState } from "@/hooks/usePledgeState";

export default function App() {
  const state = usePledgeState();
  const [formOpen, setFormOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [lookupOpen, setLookupOpen] = useState(false);

  const pledges = state.list ?? [];
  const companyCount = new Set(pledges.map((p) => p.company)).size;

  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Hero>
            {state.local.kind === "pending" && (
              <PendingCard
                firstName={state.local.firstName}
                company={state.local.company}
                onRescind={state.rescind}
              />
            )}
            {state.local.kind === "approved" && (
              <ApprovedCard
                firstName={state.local.firstName}
                company={state.local.company}
                onViewList={() => setListOpen(true)}
              />
            )}
            {(state.local.kind === "fresh" || state.local.kind === "submitting") && (
              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setFormOpen(true)}
                  disabled={state.local.kind === "submitting"}
                  className="rounded-full px-8 py-6 text-base font-semibold"
                >
                  Sign the pledge
                </Button>
                <button
                  onClick={() => setLookupOpen(true)}
                  className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Already pledged?
                </button>
              </div>
            )}
          </Hero>
          <LogoCarousel />
          <PledgeCounterPill
            pledges={pledges.length}
            companies={companyCount}
            visible={!state.listHidden && pledges.length > 0}
            onOpenList={() => setListOpen(true)}
          />
        </main>
        <SiteFooter />

        <PledgeFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          submitting={state.local.kind === "submitting"}
          submitError={state.submitError}
          onSubmit={async (data) => {
            await state.submit(data);
            setFormOpen(false);
          }}
        />
        <PledgeListModal open={listOpen} onOpenChange={setListOpen} pledges={pledges} />
        <LookupSheet
          open={lookupOpen}
          onOpenChange={setLookupOpen}
          onLookup={state.lookupByEmail}
        />
      </div>
    </PasswordGate>
  );
}
```

- [ ] **Step 2: Verify `npm run build` passes and dev server renders correctly**

```bash
cd ~/nirvana/pledge && npm run build && npm run dev
```

Do a final visual smoke test. Compare with the design spec §Page Structure.

- [ ] **Step 3: Commit**

```bash
git add pledge/
git commit -m "pledge: finalize App composition"
```

---

## Task 21: Manual QA pass

**Files:** none

Full walk-through of the state matrix, accessibility, and edge cases. Do this in one sitting.

- [ ] **State machine matrix**

| Path | Steps | Pass? |
|---|---|---|
| Fresh → Pending | Clear localStorage, submit form | |
| Pending persistence | Reload, still Pending | |
| Pending → Approved | Change Sheet status, wait ≤60s | |
| Approved persistence | Reload, still Approved | |
| Approved → Rescinded | Rescind, confirm → Fresh, cookie cleared | |
| Duplicate email | Submit same email from incognito → server dedupes | |
| Lookup recovery | Clear cookie, use "Already pledged?" | |
| Bad password | Wrong password on gate → error | |
| Password persists | Enter correct, reload → still unlocked | |

- [ ] **Accessibility**

- Tab through the page — logical order, visible focus
- Every dialog: focus trap works, ESC closes, focus returns after close
- `prefers-reduced-motion`: enable in OS → carousel + fadeIn stops
- Screen reader (VoiceOver on macOS: Cmd+F5): announces form labels + errors

- [ ] **Cross-browser**

- Safari, Chrome, Firefox latest
- Safari private mode (localStorage blocked) → success screen shows, reload = Fresh (acceptable)

- [ ] **Responsive**

- Mobile widths (375px): header shows logo only, footer stacks, hero scales, form dialog fits, list modal fills screen

- [ ] **Copy check**

- Hero headline and subhead match spec (still placeholder — flag any final wording changes for the user before deploy)
- Confirmation microcopy under submit button matches spec: *"Nirvana will review your submission shortly."*

- [ ] **Fix anything broken**

Any failed items → open the relevant task in the plan, add fix commits with a descriptive message.

---

## Task 22: Deploy to Vercel

**Files:** none

Follow the standing workflow: git push + `vercel --prod --yes` from the root.

- [ ] **Step 1: Confirm all commits are on `main`**

```bash
cd ~/nirvana
git status         # should be clean
git log --oneline -20   # confirm the plan's commits are all there
```

- [ ] **Step 2: Push to origin**

```bash
GH_CONFIG_DIR=/Users/felix/.gh git push origin main
```

- [ ] **Step 3: Verify root build script still works**

```bash
cd ~/nirvana && bash build.sh
```

Expect no errors. `dist/pledge/index.html` should exist.

- [ ] **Step 4: Deploy**

```bash
cd ~/nirvana
vercel --prod --yes
```

Wait for "Production" URL. Test at `https://<production-url>/pledge`:

1. Password gate loads
2. Enter `nirvana` → unlocked
3. Header + hero + carousel + counter + footer all render
4. Submit a real pledge → row appears in Sheet
5. Approve it → shows in list

- [ ] **Step 5: Post-deploy verification**

- Hit `meetnirvana.com/pledge` (if custom domain is configured) OR the Vercel URL
- Verify other sub-apps still work (`aidinner2026.meetnirvana.com`, `/invite`, `/pt-checkin`, etc.) — we don't want to have broken anything

- [ ] **Step 6: Update user memory**

If the deploy was successful, add a short project memory pointing to this new sub-app so future sessions know where to find it. Skip if the standing memory system already covers it.

---

## Post-launch: Nirvana rep onboarding

Not part of this plan, but flag for the user:

- Share the Sheet with the Nirvana rep who will do reviews
- Point them at `pledge/backend/README.md` for the review workflow
- Optionally: set a Google Sheets notification rule to email the rep on any new `pending` row (Tools → Notification rules)







