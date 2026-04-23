import { useState, useRef, useEffect, useCallback } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon, { useFontAwesome } from "./icons.jsx";
import HomeScreen from "./HomeScreen.jsx";
import VisitsScreen from "./VisitsScreen.jsx";
import CoverageScreen from "./CoverageScreen.jsx";
import AccountScreen from "./AccountScreen.jsx";
import useTapRipple from "./TapRipple.jsx";
import useRecorder from "./useRecorder.jsx";

const TABS = [
  { id: "home", label: "Home", fa: "fa-house" },
  { id: "visits", label: "Visits", fa: "fa-clock-rotate-left" },
  { id: "coverage", label: "Coverage", fa: null, customIcon: true },
  { id: "account", label: "Account", fa: "fa-circle-user" },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function smoothScroll(el, to, duration) {
  return new Promise(resolve => {
    const start = el.scrollTop;
    const diff = to - start;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      el.scrollTop = start + diff * ease;
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  useFontAwesome();
  const { showTap, TapOverlay } = useTapRipple();

  const phoneRef = useRef(null);
  const selfieRef = useRef(null);
  const homeScrollRef = useRef(null);
  const visitsRef = useRef(null);
  const { startRecording, stopRecording } = useRecorder(phoneRef);

  const getElCenter = useCallback((selector) => {
    const phone = phoneRef.current;
    if (!phone) return null;
    const el = phone.querySelector(selector);
    if (!el) return null;
    const phoneRect = phone.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      x: elRect.left + elRect.width / 2 - phoneRect.left,
      y: elRect.top + elRect.height / 2 - phoneRect.top,
    };
  }, []);

  const tapEl = useCallback(async (selector, delayBefore = 400) => {
    await sleep(delayBefore);
    const pos = getElCenter(selector);
    if (pos) showTap(pos.x, pos.y);
    await sleep(300);
  }, [getElCenter, showTap]);

  const tapTabByIndex = useCallback(async (idx) => {
    await sleep(600);
    const phone = phoneRef.current;
    if (!phone) return;
    const tabs = phone.querySelectorAll("[data-demo-tab]");
    if (!tabs[idx]) return;
    const phoneRect = phone.getBoundingClientRect();
    const r = tabs[idx].getBoundingClientRect();
    showTap(r.left + r.width / 2 - phoneRect.left, r.top + r.height / 2 - phoneRect.top);
    await sleep(300);
  }, [showTap]);

  const runDemo = useCallback(async () => {
    setRunning(true);
    setStarted(true);
    setTab("home");
    await startRecording();
    await sleep(1200);

    // 1. Tap "Ready to check in?" to expand
    await tapEl('[data-demo="selfie-expand"]', 600);
    selfieRef.current?.expand();
    await sleep(800);

    // 2. Press Continue
    await tapEl('[data-demo="selfie-continue"]', 600);
    selfieRef.current?.pressContinue();

    // 3. Selfie capture screen stays for 3500ms, then interstitials auto-run
    // Wait for capture(3500) + matching(2000) + verifying(2000) + encrypting(2000) + done
    await sleep(3500 + 2000 + 2000 + 2000 + 800);

    // 4. Now on home with "done" card. Scroll down to bottom.
    // 5. Scroll home to bottom
    await sleep(800);
    const homeScroll = homeScrollRef.current;
    if (homeScroll) {
      await smoothScroll(homeScroll, homeScroll.scrollHeight, 2500);
    }
    await sleep(1000);

    // 6. Tap Visits tab
    await tapTabByIndex(1);
    setTab("visits");
    await sleep(1000);

    // 7. Tap open "Ear infection" card
    await tapEl('[data-demo="visit-Ear infection"]', 800);
    visitsRef.current?.openVisit("Ear infection");
    await sleep(1200);

    // 8. Tap Coverage tab
    await tapTabByIndex(2);
    setTab("coverage");
    await sleep(1000);

    // 9. Slowly scroll coverage to bottom
    await sleep(500);
    const covScroll = phoneRef.current?.querySelector("[data-demo-coverage-scroll]");
    if (covScroll) {
      await smoothScroll(covScroll, covScroll.scrollHeight, 4000);
    }
    await sleep(1000);

    // 10. Tap Account tab
    await tapTabByIndex(3);
    setTab("account");
    await sleep(1500);

    await stopRecording();
    setRunning(false);
  }, [tapEl, tapTabByIndex, startRecording, stopRecording]);

  const screens = {
    home: <HomeScreen ref={homeScrollRef} selfieRef={selfieRef} onSelfieDone={() => {}} />,
    visits: <VisitsScreen ref={visitsRef} />,
    coverage: <CoverageScreen />,
    account: <AccountScreen />,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: T.offWhite, minHeight: "100vh" }}>
      {!started && (
        <button onClick={runDemo}
          style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100, background: T.navy, color: T.white, border: "none", borderRadius: 28, padding: "12px 32px", fontFamily: font, fontSize: 16, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.02em", boxShadow: "0 4px 20px rgba(8,18,69,0.3)" }}>
          ▶ Start Demo
        </button>
      )}
      <div ref={phoneRef} style={{ width: 375, background: T.white, borderRadius: 40, overflow: "hidden", display: "flex", flexDirection: "column", height: 780, boxShadow: "0 24px 80px rgba(8,18,69,0.14)", position: "relative", border: "6px solid black" }}>
        <TapOverlay />

        <div style={{ width: "100%", height: 45, flexShrink: 0, position: "relative", background: T.white }}>
          <img src={`${import.meta.env.BASE_URL}ios-bar.svg`} alt="" style={{ width: "100%", height: 45, display: "block" }} />
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 32, background: "black", borderRadius: 20 }} />
        </div>

        <div data-demo-screen style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {screens[tab]}
        </div>

        <div style={{ display: "flex", borderTop: `1px solid ${T.divider}`, background: T.white, paddingBottom: 8, flexShrink: 0 }}>
          {TABS.map((t, idx) => {
            const isActive = tab === t.id;
            return (
              <button key={t.id} data-demo-tab={t.id} onClick={() => !running && setTab(t.id)}
                style={{ flex: 1, border: "none", background: "none", padding: "10px 0 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: font, fontSize: 9, fontWeight: isActive ? 600 : 400, color: isActive ? T.navy : T.warmShadow, transition: `color ${motion}`, outline: "none", position: "relative", WebkitTapHighlightColor: "transparent" }}>
                <div style={{ position: "relative" }}>
                  {t.customIcon ? (
                    <svg width="20" height="21" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {isActive ? (
                        <path d="M9.8275 0.195312L17.9134 3.32031L18.6556 3.63281L18.6947 4.41406C18.8119 6.36719 18.5384 9.33594 17.2494 12.2656C15.9603 15.1953 13.6947 18.125 9.86657 19.8047L9.35875 20L8.85094 19.8047C5.02282 18.125 2.75719 15.1953 1.46813 12.2656C0.21813 9.33594-0.0943705 6.36719 0.022817 4.41406L0.0618795 3.63281L0.804067 3.32031L8.92907 0.195312L9.35875 0L9.8275 0.195312Z" fill={T.navy} />
                      ) : (
                        <path d="M9.35875 2.03125L1.85875 4.92188C1.81969 6.64062 2.13219 9.10156 3.18688 11.5234C4.28063 14.0625 6.19469 16.5234 9.35875 17.9688C12.5228 16.5234 14.4369 14.0625 15.5306 11.5234C16.5853 9.10156 16.8978 6.64062 16.8588 4.92188L9.35875 2.03125ZM18.6556 3.63281L18.7338 4.41406C18.8119 6.36719 18.5384 9.33594 17.2494 12.2656C15.9994 15.1953 13.6947 18.125 9.86657 19.8047L9.35875 20L8.85094 19.8047C5.02282 18.125 2.75719 15.1953 1.46813 12.2656C0.21813 9.33594-0.0943705 6.36719 0.022817 4.41406L0.0618795 3.63281L0.804067 3.32031L8.92907 0.195312L9.35875 0L9.8275 0.195312L17.9134 3.32031L18.6556 3.63281Z" fill="currentColor" />
                      )}
                    </svg>
                  ) : (
                    <Icon name={t.fa} weight={isActive ? "solid" : "thin"} size={20} />
                  )}
                </div>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
