# Nirvana Price Transparency Pledge — Design Spec

**Date:** 2026-07-06
**Author:** Felix (brainstormed with Claude)
**Status:** Draft — pending review

## Purpose

A one-off marketing page that solicits healthcare companies to publicly sign a pledge committing to Nirvana's mission of price transparency for patients. Submissions are reviewed by a Nirvana rep before appearing publicly, and a growing list of approved signatories serves as social proof for the mission.

## Goals

- Give companies a lightweight, on-brand way to publicly commit to price transparency
- Provide a moderated pipeline so Nirvana controls who appears on the public list
- Feel unmistakably like part of the Nirvana product family (brand, header, footer)
- Zero-server infrastructure — deployable via the existing `~/nirvana` Vercel monorepo

## Non-Goals

- Not a persistent product surface — this is a one-off campaign page
- No account system, no login for signatories
- No CMS beyond a Google Sheet (the "rep review" experience is editing a sheet cell)
- No logo procurement/upload flow — the on-page logo carousel is a curated static asset, not pledger-driven

## Deployment & Routing

**New sub-app:** `~/nirvana/pledge/` — cloned scaffolding from `~/nirvana/invite/`.

**Root integration:**
- `~/nirvana/build.sh` → add `pledge` to the sub-app build loop and add a `dist/pledge` copy step
- `~/nirvana/vercel.json` → add `{ "source": "/pledge", "destination": "/pledge/index.html" }`

**Deploy:** From `~/nirvana` (root), `vercel --prod --yes`. Never deploy from the `pledge/` sub-directory alone — the root project is what serves custom domains.

**Password gate:** Vercel deployment protection (platform-level, no code). Set on the root `nirvana-virid` project. Anyone with the URL + shared password can view.

## Stack

Matches `~/nirvana/invite/` (the most recent scaffold):

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- shadcn v4 primitives (button, input, label, dialog)
- `@base-ui/react` for accessible Dialog (form + list modals)
- `@fontsource-variable/geist` — but overridden by PP Mori for brand consistency (fallback Inter)
- No three.js, no generative art — this is a light-theme marketing page, not the dark invite hero

## Brand

Palette (from `~/nirvana/pt-checkin/theme.js` — the canonical Nirvana brand):

- `--deep-purple: #2c1f45` (primary text, header/footer bg)
- `--lilac: #ae9bea` (secondary text, dividers)
- `--vibrant-purple: #7447ff` (primary CTA, accents)
- `--lilac-light: #e1dff4` (borders, subtle chips)
- `--white-purple: #f8f7ff` (card bg on light theme)
- `--off-white: #f3efeb` (page background)
- `--white: #ffffff` (surfaces)
- `--green: #1D7A4A`, `--green-light: #E8F5EE` (approved state)
- `--amber: #BA7517` (pending state)
- `--red: #c0392b` (destructive, rescind)

**Font:** PP Mori (primary), Inter (fallback). Same as pt-checkin.

**Assets:**
- `nirvana-logo.svg` — wordmark, from `~/nirvana/nirvana-logo.svg`
- Nirvana glyph mark — exported from production `logo-icn.svg`
- `public/logos/` — curated customer logos (PNG/SVG), dropped in by user

## Page Structure (Layout B)

Single page, single scroll, main content only (no persistent tray).

Top-to-bottom:

1. **Site header** — visual replica of production `meetnirvana.com` header. Deep-purple bar, logo + wordmark left, nav labels ("Solutions", "Who We Serve", "Why Nirvana", "Resources") + lilac "Book a Demo" pill right. **All nav elements are inert on this page** — no dropdowns, no links, no re-routing off the page. Purely visual continuity.
2. **Hero**
   - Headline (draft): *"Patients deserve to know what care costs — and what they're covered for — before they book."*
   - Subhead (draft): *"Sign the pledge and stand with providers committing to price transparency and coverage clarity for every patient."*
   - Primary CTA: **"Sign the pledge"** (vibrant-purple pill button, opens form dialog)
3. **Logo carousel** — horizontal auto-scroll marquee of ~10–20 static customer logos from `public/logos/`. CSS `@keyframes` for continuous drift, pauses on hover, respects `prefers-reduced-motion`. `aria-hidden="true"` (decorative).
4. **Pledge counter pill** — "**247 pledges** from **89 companies** · View list →". Clicking opens the pledge list modal (§ Modal below). If the API list fetch fails, hide this pill entirely.
5. **Site footer** — visual replica of production `meetnirvana.com/ehr` footer. Deep-purple bg, four link columns (Solutions / Who We Serve / Why Nirvana / Resources), HIPAA + AICPA SOC compliance badges, Instagram + LinkedIn icons, careers callout pill ("Looking to help make mental healthcare more accessible? Join Nirvana team." + "View job openings"), legal row ("Copyright Meet Nirvana 2026", "Cookies Preferences", "Privacy Policy", "Terms & Conditions"). Also inert — no working links.

## Pledge Form (Dialog)

Triggered from the hero CTA. Base-ui `Dialog`, centered, focus-trapped.

**Fields** (all required, in this order):

1. First name
2. Last name
3. Email
4. Company
5. Role

**Confirmation copy** under the submit button: *"Nirvana will review your submission shortly."*

**Submit button:** vibrant-purple, "Sign the pledge". Disables + shows spinner during submission.

**Validation:** trimmed non-empty for all fields; email regex sanity check. Errors show inline under each field with `aria-describedby`.

## Signatory State Machine

The user's view of the CTA area is driven by client state:

| State | Trigger | Rendered instead of CTA |
|---|---|---|
| **Fresh** | No cookie, no submission | Primary CTA button "Sign the pledge" |
| **Submitting** | Form submitted, awaiting response | Button spinner (dialog still open) |
| **Pending (just submitted)** | Success response received | Inline success card: "Thanks — Nirvana will review your pledge shortly." + "Rescind pledge" link. Cookie written. |
| **Pending (return visit)** | Cookie present, status=`pending` | `PendingCard`: "Your pledge is under review · Rescind" |
| **Approved (return visit)** | Cookie present, status=`approved` | `ApprovedCard`: "Thanks — your pledge is live" + link to list |
| **Rescinded** | User confirms rescind | Back to Fresh, cookie cleared |

Below the CTA area, always visible: a small link "Already pledged?" that opens the `LookupSheet` — an email input that recovers state for users on new devices/incognito/cleared cookies.

**Cookie contents:** `{ id: string, email: string }` in `localStorage` under key `nirvana_pledge`. Refetched status via `lookup` on page load if cookie present.

**Approval race:** background list refetch every 60s updates state without reload — a pending user sees their card flip to Approved automatically.

## Pledge List Modal

Triggered from the counter pill in §4. Base-ui `Dialog`, near-full-screen, matches page theme.

- **Header:** "**{n} pledges** from **{m} companies**" + close button (X, ESC also closes)
- **Body:** signatories grouped by company, alphabetical by company name
  - Company block: company name (large, `deep-purple`)
  - Signer rows underneath: "First L. · Role" (lilac tone)
- Scrolls independently of the page
- No search/filter (kept intentionally simple)
- Data: `list` endpoint response, cached in the page's session

## Backend — Google Apps Script

Single Google Sheet with one `Pledges` tab, backed by a single Apps Script Web App deployed as executable-as-owner with anonymous access.

**Sheet columns:**

| Column | Type | Notes |
|---|---|---|
| `id` | string (UUID) | Server-generated on submit |
| `timestamp` | ISO 8601 | Server-generated |
| `firstName` | string | Trimmed |
| `lastName` | string | Trimmed |
| `email` | string (lowercased) | Trimmed; dedup key |
| `company` | string | Trimmed |
| `role` | string | Trimmed |
| `status` | enum: `pending` \| `approved` \| `rescinded` | Rep edits to approve |
| `reviewedAt` | ISO 8601 | Optional; set by rep or via script trigger |
| `reviewedBy` | string | Optional |

**Endpoints:**

| Action | Method | Payload | Returns | Notes |
|---|---|---|---|---|
| `list` | GET `?action=list` | — | `[{ company, firstName, lastInitial, role }]` | Approved-only. Email + full lastName **never leave the server**. |
| `submit` | POST (no-cors) | `{firstName, lastName, email, company, role}` | fire-and-forget (client assumes success) | Server dedupes by email — if row exists, updates fields but preserves status |
| `lookup` | GET (JSONP) `?action=lookup&email=…&callback=…` | — | `{ id, status, firstName, company } \| null` | JSONP because we need a return value |
| `rescind` | GET (JSONP) `?action=rescind&id=…&email=…&callback=…` | — | `{ ok: true } \| { error }` | Email must match the row's email |

**Why the awkward GET-with-JSONP for lookup/rescind:** browsers block cross-origin POST responses from Apps Script (CORS), so the invite sub-app already uses `mode: "no-cors"` for submit (fire-and-forget). For endpoints that need a return value, JSONP is the escape hatch. This is intentional — the alternative is a real backend, which is out of scope for a one-off page.

**Rep review workflow:**

1. Open the sheet
2. Filter `status = pending`
3. For approved rows, change `status` cell to `approved`; fill `reviewedAt`/`reviewedBy` if desired
4. Rejected → leave as `pending` (or add a `rejected` value — either way it's filtered out of `list`)

No email notifications to signatories on approval — the next background refresh on their tab (or a future visit) surfaces the state change silently.

## Component Structure

```
src/
├── main.tsx
├── App.tsx                       (composes sections; owns pledge state via usePledgeState)
├── index.css                     (Nirvana light theme + font-face + marquee keyframes)
├── lib/
│   ├── utils.ts                  (shadcn cn helper)
│   ├── api.ts                    (Apps Script client: list, submit, lookup, rescind)
│   └── storage.ts                (localStorage helpers with graceful fallback)
├── hooks/
│   └── usePledgeState.ts         (state machine: fresh|submitting|pending|approved|rescinded)
├── components/
│   ├── SiteHeader.tsx            (visual-only replica of prod nav)
│   ├── SiteFooter.tsx            (visual-only replica of prod footer)
│   ├── Hero.tsx                  (headline, sub, CTA area — swaps to PendingCard/ApprovedCard by state)
│   ├── LogoCarousel.tsx          (CSS marquee, pause on hover, reduced-motion aware)
│   ├── PledgeCounterPill.tsx     (n pledges · m companies · view list)
│   ├── PledgeListModal.tsx       (base-ui Dialog, grouped list)
│   ├── PledgeFormDialog.tsx      (base-ui Dialog, form with 5 fields)
│   ├── PendingCard.tsx           (under-review state + rescind)
│   ├── ApprovedCard.tsx          (approved state + link to list)
│   ├── LookupSheet.tsx           ("Already pledged?" email recovery flow)
│   └── ui/                       (shadcn primitives: button, input, label, dialog)
└── types.ts                      (Pledge, PledgeStatus, ApiResponse types)
```

Each component has one responsibility. `usePledgeState` is the single source of truth for the visitor's status; every state-swapped surface reads from it.

## Data Flow

**On page load:**
1. `usePledgeState` reads cookie
2. If cookie present → call `lookup(email)`, hydrate state
3. In parallel: `list()` → populates counter + modal
4. Set 60s interval to refetch `list()` (and `lookup()` if in pending state)

**On submit:**
1. Client-side validate
2. POST `submit` (no-cors, fire-and-forget)
3. Optimistically show Pending state, write cookie (with a temporary UUID)
4. On next `lookup` interval, reconcile with server-generated `id`

**On rescind:**
1. Confirm dialog
2. GET `rescind` (JSONP)
3. On success: clear cookie, reset to Fresh
4. On failure: keep state, show error

**On approval (rep-driven, out-of-band):**
1. Next scheduled `lookup()` returns `status=approved`
2. `usePledgeState` transitions Pending → Approved
3. Next `list()` refetch includes the new row in the modal

## Error Handling

**Network / API failures**
- `list` fails on page load → hide counter pill; retry once after 5s; log to console
- `submit` fails → keep form open, inline error under submit button, form state preserved
- `lookup` fails → keep current state, no user-visible error (silent)
- `rescind` fails → inline toast-style error, state unchanged

**Form validation (client-side)**
- All 5 fields trimmed non-empty
- Email regex sanity check
- Submit button disabled if `pledgeState !== 'fresh'`

**Duplicate submissions**
- Same browser (cookie present) → button disabled
- Same email from different browser → server dedupes (updates fields, preserves status), returns same `id`

**Cookie / storage**
- Missing/cleared → user appears Fresh; lookup available as recovery
- Corrupt → wipe, treat as missing
- `localStorage` blocked (private mode) → session-only in-memory state; success screen still shown; on refresh, back to Fresh

**Accessibility**
- Base-ui `Dialog` handles focus trap, ESC, `aria-modal` for form + list modals
- Logo carousel `aria-hidden`, respects `prefers-reduced-motion`
- All form fields have `<Label>` associations, required indicated, errors have `aria-describedby`
- Color contrast: primary text on off-white background meets WCAG AA (deepPurple #2c1f45 on #f3efeb = 12.6:1)

## Security & Privacy

- **Email never public** — the `list` endpoint returns only `{ company, firstName, lastInitial, role }`
- **Full last name never public** — only first letter with period ("Jane D.")
- **Rescind auth** — id + email must match. Weak (email is guessable) but sufficient: worst case a rescind can be reversed by the rep in the sheet
- **Password gate** — Vercel deployment protection; single shared password, platform-level
- **No PII in logs** — client-side console errors log status codes only, never form contents
- **CSRF** — not applicable (Apps Script endpoint accepts anonymous, no session)
- **Rate limiting** — Apps Script has built-in quotas; further limiting via a simple check in `submit` (e.g., last submission by email within 5s = ignore) is a nice-to-have

## Testing

- Manual smoke test of full state machine (Fresh → Pending → Approved → Rescinded → Fresh)
- Manual test of Lost-Session recovery via LookupSheet
- Manual test on Safari private mode (localStorage disabled path)
- Manual test with reduced-motion enabled
- Manual test with `list` endpoint failing (offline or Apps Script URL broken)

No automated test suite — this is a one-off page and the manual matrix is small.

## Open Questions / Deferred

- **Hero copy** — draft copy is placeholder; final wording is a user pass before launch
- **Curated logo list** — user provides logos into `public/logos/` before deploy
- **Apps Script URL + password** — provisioned by user during implementation phase, dropped into a `.env` or hardcoded (since it's public anyway)
- **Rep training** — the "rep review" flow is "edit a cell in the sheet"; a short internal doc may be worth writing but is outside this spec
