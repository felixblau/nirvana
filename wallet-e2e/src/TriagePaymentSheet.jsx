import { useState, useEffect } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";

function CvvDots({ active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    if (count >= 3) return;
    const t = setTimeout(() => setCount(c => c + 1), 150);
    return () => clearTimeout(t);
  }, [active, count]);
  if (!active || count === 0) return null;
  return <>{"•".repeat(count)}</>;
}

export default function TriagePaymentSheet({ doctor, onConfirm, onClose }) {
  const [cvvFilled, setCvvFilled] = useState(false);

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(44,31,69,0.35)", zIndex: 10, display: "flex", alignItems: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.white, borderRadius: `${r.lg + 8}px ${r.lg + 8}px 0 0`, width: "100%", padding: "16px 20px 20px", maxHeight: "85%" }}>
        <div style={{ width: 36, height: 4, background: T.warmLight, borderRadius: 2, margin: "0 auto 16px" }} />

        <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: T.deepPurple, marginBottom: 14 }}>Book appointment</div>

        <div style={{ background: T.offWhite, borderRadius: r.lg, padding: 14, marginBottom: 14 }}>
          {[
            ["Doctor", doctor.name],
            ["Date", "Mon, Mar 24"],
            ["Time", "9:00 AM"],
            ["Location", doctor.address],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontFamily: font, fontSize: 13, padding: "6px 0" }}>
              <span style={{ color: T.warmShadow }}>{k}</span>
              <span style={{ color: T.deepPurple, textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: T.lilacLight, borderRadius: r.lg, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: font, fontSize: 12, color: T.deepPurple }}>Estimated copay with insurance</span>
          <span style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: T.vibrantPurple }}>$45.00</span>
        </div>

        <div style={{ fontFamily: font, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.warmShadow, marginBottom: 8 }}>Payment method</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.offWhite, borderRadius: r.lg, marginBottom: 14 }}>
          <div style={{ background: T.deepPurple, borderRadius: r.sm, padding: "2px 6px", fontFamily: font, fontSize: 9, fontWeight: 700, color: T.white, letterSpacing: "0.05em" }}>VISA</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.deepPurple }}>Chase Sapphire</div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow }}>•••• 4242</div>
          </div>
          <Icon name="fa-chevron-right" weight="thin" size={12} style={{ color: T.warmShadow }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <span style={{ fontFamily: font, fontSize: 13, color: T.deepPurple }}>CVV</span>
          <div onClick={() => setCvvFilled(true)} style={{ width: 80, height: 40, borderRadius: r.md, border: `1.5px solid ${cvvFilled ? T.deepPurple : T.warmLight}`, background: T.white, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", fontFamily: font, fontSize: 16, color: T.deepPurple, letterSpacing: 3, transition: `border-color ${motion}` }}>
            <CvvDots active={cvvFilled} />
            <Icon name="fa-lock" weight="thin" size={13} style={{ color: T.warmShadow }} />
          </div>
        </div>

        <button onClick={cvvFilled ? onConfirm : undefined} style={{ width: "100%", height: 48, background: cvvFilled ? T.deepPurple : T.warmLight, color: T.white, border: "none", borderRadius: r.pill, fontFamily: font, fontSize: 15, fontWeight: 500, cursor: cvvFilled ? "pointer" : "default", transition: `background ${motion}` }}>
          Book Appointment — $45.00
        </button>
      </div>
    </div>
  );
}
