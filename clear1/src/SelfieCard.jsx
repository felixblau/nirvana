import { useState, useEffect } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";

const STEPS = [
  { key: "intro", label: "Take a selfie" },
  { key: "capture", label: "Center your face and hold still" },
  { key: "matching", label: "Matching your\ninformation" },
  { key: "verifying", label: "Verifying your\nidentity" },
  { key: "encrypting", label: "Encrypting your\ninformation" },
  { key: "done", label: "Verified" },
];

function PulsingRings() {
  return (
    <>
      <style>{`
        @keyframes ring-pulse{0%{transform:scale(0.95);opacity:0.3}50%{transform:scale(1.05);opacity:0.6}100%{transform:scale(0.95);opacity:0.3}}
      `}</style>
      <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto" }}>
        {[200, 150, 110].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2,
            border: `1.5px dashed ${T.navy}`, borderRadius: "50%",
            opacity: 0.3 + i * 0.15,
            animation: `ring-pulse 2s ease-in-out ${i * 0.3}s infinite`,
          }} />
        ))}
      </div>
    </>
  );
}

export default function SelfieCard() {
  const [step, setStep] = useState("intro");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (step === "matching") {
      const t = setTimeout(() => setStep("verifying"), 2000);
      return () => clearTimeout(t);
    }
    if (step === "verifying") {
      const t = setTimeout(() => setStep("encrypting"), 2000);
      return () => clearTimeout(t);
    }
    if (step === "encrypting") {
      const t = setTimeout(() => setStep("done"), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (step === "done") {
    return (
      <div style={{ background: T.navy, borderRadius: r.lg + 4, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Identity verified</div>
            <div style={{ fontFamily: font, fontSize: 17, fontWeight: 600, color: T.white, marginTop: 4 }}>Dr. Sarah Patel</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="fa-circle-check" weight="solid" size={15} style={{ color: T.white }} />
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: r.lg, padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: font, fontSize: 12, color: T.white, marginBottom: 6 }}>Estimated wait time:</div>
          <div style={{ fontFamily: font, fontSize: 52, fontWeight: 600, color: T.white, lineHeight: 1 }}>14 mins.</div>
          <div style={{ fontFamily: font, fontSize: 12, color: T.white, marginTop: 6 }}>You'll be notified when ready</div>
        </div>
        <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Feel free to step out — we'll notify you</div>
        <button onClick={() => setStep("intro")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontFamily: font, fontSize: 10, cursor: "pointer", padding: 0, textAlign: "center" }}>↩ reset (dev)</button>
      </div>
    );
  }

  if (step === "matching" || step === "verifying" || step === "encrypting") {
    const labels = { matching: "Matching your\ninformation", verifying: "Verifying your\nidentity", encrypting: "Encrypting your\ninformation" };
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 50, background: T.white, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <img src={`${import.meta.env.BASE_URL}clear-logo.svg`} alt="CLEAR" style={{ position: "absolute", top: 56, left: 32, height: 32 }} />
        <PulsingRings />
        <div style={{ fontFamily: font, fontSize: 32, fontWeight: 700, color: T.textBlack, textAlign: "center", letterSpacing: "-0.03em", lineHeight: 1.1, whiteSpace: "pre-line", padding: "0 32px" }}>
          {labels[step]}
        </div>
      </div>
    );
  }

  if (step === "capture") {
    return (
      <>
        <style>{`
          @keyframes scan-line{0%{top:20%}50%{top:70%}100%{top:20%}}
          @keyframes fade-in{from{opacity:0}to{opacity:1}}
        `}</style>
        <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "#000", animation: "fade-in 0.3s ease" }}>
          <img src={`${import.meta.env.BASE_URL}fakeportrait.png`} alt="" style={{ position: "absolute", top: "-23%", left: "-10%", width: "126%", height: "141%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 92, background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)", zIndex: 2 }} />
          <div style={{ position: "absolute", top: 60, right: 24, zIndex: 3 }}>
            <Icon name="fa-circle-question" weight="thin" size={24} style={{ color: T.white }} />
          </div>
          <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
            <div style={{ background: T.white, borderRadius: r.md, padding: "8px 16px" }}>
              <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: T.textBlack, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Center your face and hold still</span>
            </div>
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(calc(-50% + 3px), calc(-50% - 26px))", width: 355, height: 461, zIndex: 2 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: `3px solid rgba(255,255,255,0.85)`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, rgba(239,247,251,0.6), transparent)`, animation: "scan-line 2s ease-in-out infinite" }} />
            </div>
          </div>
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
            <svg width="100%" height="100%" style={{ display: "block" }}>
              <defs>
                <mask id="cutout">
                  <rect width="100%" height="100%" fill="white" />
                  <ellipse cx="50.8%" cy="46.8%" rx="178" ry="231" fill="black" />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="rgba(0,0,0,0.35)" mask="url(#cutout)" />
            </svg>
          </div>
          <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
            <button onClick={() => setStep("matching")}
              style={{ background: "none", border: "none", fontFamily: font, fontSize: 13, fontWeight: 500, color: T.blueWash, cursor: "pointer", padding: "2px 0", textDecoration: "underline" }}>
              Capture (dev)
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`@keyframes glow-navy{0%,100%{box-shadow:0 0 0 0 rgba(8,18,69,0.12)}50%{box-shadow:0 0 0 5px rgba(8,18,69,0.18)}}`}</style>
      <div style={{ border: `2px solid ${T.navy}`, borderRadius: r.lg + 4, background: T.white, animation: "glow-navy 2.5s ease-in-out infinite" }}>
        <div onClick={() => setExpanded(e => !e)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: 20, borderRadius: `${r.lg + 4}px ${r.lg + 4}px ${expanded ? 0 : r.lg + 4}px ${expanded ? 0 : r.lg + 4}px`, transition: `background ${motion}` }}
          onMouseEnter={e => e.currentTarget.style.background = T.blueWash}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <div>
            <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: T.navy }}>Ready to check in?</div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.navy, marginTop: 3 }}>Dr. Sarah Patel · Today 10:30 AM</div>
          </div>
          <Icon name={expanded ? "fa-chevron-down" : "fa-chevron-right"} weight="thin" size={16} style={{ color: T.navy, flexShrink: 0, marginLeft: 8 }} />
        </div>
        {expanded && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "16px 20px 20px", borderTop: `0.5px solid ${T.divider}` }}>
            <div style={{ width: "100%", height: 140, borderRadius: r.lg, overflow: "hidden", position: "relative", background: `linear-gradient(135deg, ${T.blueWash} 0%, #dbeaf4 100%)` }}>
              <img src={`${import.meta.env.BASE_URL}selfie-hero.png`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "left", width: "100%" }}>
              <div style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: T.textBlack, letterSpacing: "-0.03em" }}>Take a selfie</div>
            </div>
            <div style={{ background: T.blueWash, borderRadius: r.md, padding: 16, width: "100%", display: "flex", alignItems: "center", gap: 12 }}>
              <Icon name="fa-circle-info" weight="thin" size={20} style={{ color: T.textBlack, flexShrink: 0 }} />
              <span style={{ fontFamily: font, fontSize: 14, color: T.textBlack, letterSpacing: "-0.02em" }}>Remove any glasses and hats</span>
            </div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.textGray, lineHeight: 1.5, letterSpacing: "-0.02em" }}>
              By tapping "Continue" you consent to CLEAR collecting your biometric information to verify your identity, as explained in{" "}
              <span style={{ color: T.link }}>CLEAR's Member Terms</span> and{" "}
              <span style={{ color: T.link }}>Privacy Policy</span>.
            </div>
            <button onClick={() => setStep("capture")}
              style={{ width: "100%", height: 56, background: T.navy, color: T.white, border: "none", borderRadius: r.pill, fontFamily: font, fontSize: 18, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.02em" }}>
              Continue
            </button>
          </div>
        )}
      </div>
    </>
  );
}
