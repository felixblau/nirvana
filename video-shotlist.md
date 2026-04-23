# Nirvana Vision Video — Shotlist & Script (v2)

**Format:** ~25 second silent looping video (Stripe ACS style)
**Style:** Clean, dark background. Mix of product UI (phone mockup) and abstract motion graphics (network visualization). No voiceover — the visuals tell the story. Designed to loop seamlessly.
**Resolution:** 1620x1080 (horizontal, phone centered for UI shots, full-bleed for graphics shots)

---

## Reference Style Notes (from Stripe ACS video)

- Stripe's video opens with a **drag-and-drop setup moment** (CSV of inventory into the Stripe dashboard) before cutting to the consumer experience
- Transitions between screens feel native — chat messages type in, sheets slide up, elements animate sequentially
- The pacing is quick but readable — each key moment holds just long enough to register
- The video loops: the final state cuts or fades back to the beginning

---

## Shotlist

### Shot 1 — Drag & Drop: Contracts into Nirvana (0:00–0:04)
**Artboard:** NEW — needs to be designed
**What we see:** A desktop/dashboard view of Nirvana's platform. A cursor drags a stack of payer contract files (labeled things like "Aetna_PPO_2026.pdf", "BCBS_Network_Agreement.pdf", "UHC_Contract.pdf") and drops them into a Nirvana upload zone labeled something like "Network Status" or "Contract Ingestion." On drop, the files fan out and resolve into structured rows — each showing the payer name, contract status (Active / In Network), and a green checkmark.

**Motion:**
- Dashboard fades in (0.3s)
- Cursor grabs the contract file stack (0.2s)
- Drag motion across screen to the drop zone (0.8s, smooth ease)
- On drop: files fan/dissolve into structured data rows (0.5s stagger)
- Each row resolves with a checkmark — Aetna ✓, BCBS ✓, UHC ✓
- Brief hold on the resolved state (0.5s)

**Purpose:** This mirrors Stripe's CSV-into-dashboard moment. It establishes that Nirvana ingests raw payer contracts and turns them into structured, queryable network status — the foundation everything else runs on.

---

### Shot 2 — Transition to Consumer Experience (0:04–0:04.5)
**What we see:** Quick cut or zoom transition from the dashboard into the iPhone mockup. The dashboard compresses/morphs into the phone screen, or a simple match-cut from the dashboard to the ChatPCP interface.
**Motion:** Fast transition (0.3–0.5s). This is a visual bridge, not a lingering shot.

---

### Shot 3 — The Conversation (0:04.5–0:07)
**Artboard:** 1.1 mid convo
**What we see:** ChatPCP 4.6 interface on an iPhone mockup. The chat is mid-conversation. The user's message about knee pain is visible. ChatPCP's response is already rendered, ending with the bolded suggestion: **"I suggest you consult a radiologist."**
**Motion:** The final line — "Would you like me to find some radiologists you can reach out to?" — can animate in via a typewriter effect to draw the eye.
**Hold:** ~1s on the full message so the viewer can absorb the suggestion.

---

### Shot 4 — User Says Yes (0:07–0:08.5)
**Artboard:** 1.2 - Kickoff
**What we see:** The user's reply bubble ("yes please") animates up from the chat input. Immediately after, a subtle loading indicator appears: a spinner with "Retrieving your insurance information..." in muted text.
**Motion:**
- User message slides in (0.3s ease-out)
- Loading indicator fades in beneath it (0.2s delay)
**Hold:** ~0.5s on the loading state — just enough to feel the handoff.

---

### Shot 5 — Nirvana Takes Over (0:08.5–0:12)
**Artboards:** processing 1 → processing 2
**What we see:** The Nirvana transaction module slides up as a bottom sheet. The chat behind dims. Three steps appear and resolve sequentially:

1. **"Matching providers to your insurance"** — spinner → checkmark
2. **"Calculating your cost"** — spinner → checkmark
3. **"Checking availability across providers"** — spinner → checkmark

"Powered by nirvana" is visible at the bottom of the sheet.

**Motion:**
- Sheet slides up (0.4s spring ease)
- Step 1 spinner appears immediately
- After ~0.8s, Step 1 gets a checkmark, Step 2 activates
- After ~0.8s, Step 2 gets a checkmark, Step 3 activates
- After ~0.8s, Step 3 gets a checkmark — all done
- Brief hold (0.3s)
- Sheet slides down and away (0.3s)

**This is the hero moment.** Nirvana silently orchestrating insurance, cost, and availability behind the scenes.

---

### Shot 6 — Doctor Results (0:12–0:14.5)
**Artboard:** 1.3 - Doctor menu
**What we see:** Back in the chat. ChatPCP says "Here are 5 radiologists near you that accept your insurance and are available for booking via Nirvana." Doctor cards appear in a horizontal carousel. Each card shows: name, specialty, rating, reviews, distance, address, and the Nirvana "In Network" badge.
**Motion:**
- Assistant message types in quickly (0.4s)
- Cards stagger in from right to left (0.15s delay between cards)
- A simulated swipe scrolls the carousel slightly to hint at more cards
**Hold:** ~0.8s on the carousel.

---

### Shot 7 — Booking Flow (0:14.5–0:18)
**Artboards:** book 1 → book 2.1 / book 2.2
**What we see:** User taps the first doctor card (Dr. Sarah Chen). A booking sheet slides up:
- Doctor info at top
- Date selector (Mon 24 selected)
- Time slot grid (10:00 AM highlighted)
- User taps "Continue"

Sheet transitions to the payment view:
- Appointment summary (Dr. Chen, Mon Mar 24, 10:00 AM)
- Copay: $45.00 highlighted
- Saved Visa ****4242
- Billing address
- CVV input
- "Book Appointment — $45.00" CTA

**Motion:**
- Time slot sheet slides up (0.3s)
- Quick beat, then cross-fades to payment sheet (0.3s)
- Touch indicator taps "Book Appointment"
- Button press animation (scale down + color flash)
**Pacing:** Brisk — the point is the seamlessness.

---

### Shot 8 — Confirmation (0:18–0:20.5)
**Artboard:** 1.4 - Confirm
**What we see:** Payment sheet closes. Back in ChatPCP. A confirmation card appears with a teal header: "Appointment Confirmed" with a checkmark. Card shows booking details (doctor, date, time, location, copay). ChatPCP says: "The appointment confirmation has been sent to your email as well."
**Motion:**
- Sheet slides down (0.3s)
- Confirmation card scales up + fades in (0.4s)
- Checkmark pops with a satisfying animation
- Assistant text types in below
**Hold:** ~1s on the confirmation — the payoff.

---

### Shot 9 — The Nirvana Network (0:20.5–0:24.5)
**Artboard:** NEW — needs to be designed (motion graphics)
**What we see:** Full-screen transition out of the phone. The Nirvana logo/glyph sits centered on a dark background. Around it, data source nodes orbit or flow inward — each represented by a small icon + label:

- **Payments** (Nirvana payment glyph / card icon)
- **Payers** (insurance shield icon)
- **Contract Data** (document icon)
- **EHRs** (medical record / clipboard icon)
- **Digital Wallets** (wallet icon)
- **Doctors** (stethoscope icon)
- **Scheduling** (calendar icon)
- **Identity Verification** (fingerprint / ID icon)

The nodes pulse or glow as they connect to the central Nirvana glyph via subtle lines or particle trails. They flow inward and merge into the logo — Nirvana as the convergence point of the entire healthcare transaction stack.

**Motion:**
- Phone mockup zooms out / dissolves, Nirvana glyph scales up to center (0.4s)
- Nodes appear in a radial burst, staggering in one by one (0.15s each, ~1.2s total)
- Connection lines/trails animate from each node toward center (0.5s)
- All nodes "pulse" once in unison — everything connected (0.3s)
- Hold on the full network visualization (0.8s)

**Purpose:** This is the "zoom out" moment. After seeing the consumer experience, the viewer now sees the full picture — Nirvana isn't just a checkout sheet, it's the connective tissue across the entire healthcare transaction ecosystem.

---

### Loop Transition (0:24.5–0:25)
**What we see:** The network visualization fades or the nodes contract back into the Nirvana glyph, which then morphs/cuts back into Shot 1 (the dashboard with the contract drag-and-drop). Seamless loop.

---

## Key Timing Summary

| Shot | Duration | Source | Key Moment |
|------|----------|--------|------------|
| 1 — Contract drag & drop | 4s | NEW (dashboard) | Contracts → structured network status |
| 2 — Transition | 0.5s | — | Dashboard → phone |
| 3 — Conversation | 2.5s | 1.1 mid convo | ChatPCP suggests radiologist |
| 4 — User confirms | 1.5s | 1.2 Kickoff | "yes please" + loading |
| 5 — Nirvana module | 3.5s | processing 1 & 2 | 3-step orchestration (HERO) |
| 6 — Doctor results | 2.5s | 1.3 Doctor menu | Carousel of in-network doctors |
| 7 — Booking + Payment | 3.5s | book 1, 2.1, 2.2 | Time → Payment → Book |
| 8 — Confirmation | 2.5s | 1.4 Confirm | Appointment confirmed |
| 9 — Nirvana Network | 4s | NEW (motion graphics) | All data sources → Nirvana |
| Loop | 0.5s | — | Network → back to Shot 1 |
| **Total** | **~25s** | | |

---

## New Assets Needed for Jitter

### 1. Contract Drag & Drop (Shot 1)
- Dashboard UI frame (Nirvana platform look — dark sidebar, clean content area)
- 3 contract file thumbnails (PDF icons with payer names)
- Upload/drop zone component
- Structured data rows (payer name, status badge, checkmark)

### 2. Nirvana Network Visualization (Shot 9)
- Nirvana glyph (centered, larger)
- 8 node icons with labels:
  - Payments, Payers, Contract Data, EHRs, Digital Wallets, Doctors, Scheduling, Identity Verification
- Connection lines or particle trails
- Radial layout template

Both of these can be designed as static Figma frames and then animated in Jitter.

---

## Production Notes

- **No audio/voiceover.** The UI flow is the narrative. Optional music for presentation.
- **Touch indicators:** Subtle circle for taps — on "yes please", doctor card, time slot, Book button.
- **Easing:** iOS-native spring curves for sheets. Smooth ease-in-out for the motion graphics shots.
- **Shot 5 (Nirvana module) is the hero moment** of the product demo. Shot 9 (network) is the hero moment of the positioning. Both should get the most polish.
- **Looping:** The video loops from the network visualization back into the contract drag-and-drop — establishing a cycle: ingest → orchestrate → transact → everything connects.
- **Color continuity:** The Nirvana purple/teal should thread through every shot. The dashboard, the transaction module, the network nodes — all use the same brand palette so it feels cohesive.
