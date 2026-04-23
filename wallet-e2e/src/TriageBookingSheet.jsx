import { useState } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";

const DATES = [
  { day: "MON", num: 24 },
  { day: "TUE", num: 25 },
  { day: "WED", num: 26 },
  { day: "THU", num: 27 },
  { day: "FRI", num: 28 },
];

const TIMES = [
  "9:00AM", "9:30AM", "10:00AM", "10:30AM",
  "11:30AM", "12:00PM", "12:30PM", "1:00PM",
  "1:30PM", "2:00PM", "2:30PM", "3:00PM",
];

export default function TriageBookingSheet({ doctor, onBook, onClose }) {
  const [selDate, setSelDate] = useState(0);
  const [selTime, setSelTime] = useState(0);

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(44,31,69,0.35)", zIndex: 10, display: "flex", alignItems: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.white, borderRadius: `${r.lg + 8}px ${r.lg + 8}px 0 0`, width: "100%", padding: "16px 20px 20px", maxHeight: "85%" }}>
        <div style={{ width: 36, height: 4, background: T.warmLight, borderRadius: 2, margin: "0 auto 16px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, background: T.lilacLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: 13, fontWeight: 600, color: T.deepPurple }}>{doctor.initials}</div>
          <div>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: T.deepPurple }}>{doctor.name}</div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow }}>{doctor.specialty}</div>
          </div>
        </div>

        <div style={{ fontFamily: font, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.warmShadow, marginBottom: 8 }}>Select date</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {DATES.map((d, i) => (
            <button key={i} onClick={() => setSelDate(i)} style={{ flex: 1, border: selDate === i ? `2px solid ${T.deepPurple}` : `1px solid ${T.warmLight}`, background: selDate === i ? T.lilacLight : T.white, borderRadius: r.md, padding: "8px 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontFamily: font, fontSize: 9, fontWeight: 600, color: T.warmShadow, textTransform: "uppercase" }}>{d.day}</span>
              <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: T.deepPurple }}>{d.num}</span>
            </button>
          ))}
        </div>

        <div style={{ fontFamily: font, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.warmShadow, marginBottom: 8 }}>Select time</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 20 }}>
          {TIMES.map((t, i) => (
            <button key={i} onClick={() => setSelTime(i)} style={{ border: selTime === i ? `2px solid ${T.deepPurple}` : `1px solid ${T.warmLight}`, background: selTime === i ? T.lilacLight : T.white, borderRadius: r.md, padding: "8px 4px", cursor: "pointer", fontFamily: font, fontSize: 12, fontWeight: selTime === i ? 600 : 400, color: T.deepPurple }}>
              {t}
            </button>
          ))}
        </div>

        <button onClick={onBook} style={{ width: "100%", height: 48, background: T.deepPurple, color: T.white, border: "none", borderRadius: r.pill, fontFamily: font, fontSize: 15, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          Book Appointment <Icon name="fa-chevron-right" weight="thin" size={12} style={{ color: T.white }} />
        </button>
      </div>
    </div>
  );
}
