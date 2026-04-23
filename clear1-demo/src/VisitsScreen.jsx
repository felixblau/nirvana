import { useState, forwardRef, useImperativeHandle } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";
import { HoverRow, SectionLabel } from "./primitives.jsx";

const VISITS = [
  { date: "Nov 3, 2025",  loc: "MEC – Ashland Ave",   type: "Ear infection",  copay: "$40", docs: ["After-visit summary", "Prescription — Amoxicillin"] },
  { date: "Jun 14, 2025", loc: "MEC – W Chicago Ave", type: "X-ray – wrist",  copay: "$40", docs: ["X-ray report", "After-visit summary"] },
  { date: "Jan 9, 2025",  loc: "MEC – 111th St",      type: "Strep test",     copay: "$40", docs: ["Lab results", "After-visit summary"] },
  { date: "Sep 22, 2024", loc: "MEC – Ashland Ave",   type: "Annual physical", copay: "$0",  docs: ["Physical summary", "Lab panel results"] },
];

const TYPE_ICONS = { "Ear infection": "fa-stethoscope", "X-ray – wrist": "fa-x-ray", "Strep test": "fa-flask", "Annual physical": "fa-person-running" };

function VisitCard({ v, isOpen, toggle }) {
  return (
    <div data-demo={`visit-${v.type}`} style={{ background: T.white, border: `1px solid ${isOpen ? T.navy : T.divider}`, borderRadius: r.lg + 2, overflow: "hidden", transition: `border-color ${motion}` }}>
      <HoverRow onClick={toggle} style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: r.md, background: isOpen ? T.blueWash : T.offWhite, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: `background ${motion}` }}>
            <Icon name={TYPE_ICONS[v.type] || "fa-hospital"} weight="thin" size={16} style={{ color: isOpen ? T.navy : T.warmShadow }} />
          </div>
          <div>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.navy }}>{v.type}</div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow, marginTop: 2 }}>{v.loc} · {v.date}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: v.copay === "$0" ? T.green : T.navy }}>{v.copay}</div>
          <Icon name="fa-chevron-down" weight="thin" size={12} style={{ color: T.warmShadow, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: `transform ${motion}` }} />
        </div>
      </HoverRow>
      {isOpen && (
        <div style={{ borderTop: `0.5px solid ${T.divider}`, padding: "12px 16px", background: T.blueWash }}>
          <SectionLabel>Documents</SectionLabel>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {v.docs.map(doc => (
              <HoverRow key={doc} onClick={() => {}} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: T.white, borderRadius: r.md, border: `0.5px solid ${T.divider}` }}>
                <Icon name="fa-file-medical" weight="thin" size={14} style={{ color: T.navy, flexShrink: 0 }} />
                <span style={{ fontFamily: font, fontSize: 13, color: T.navy, flex: 1 }}>{doc}</span>
                <Icon name="fa-chevron-right" weight="thin" size={11} style={{ color: T.divider }} />
              </HoverRow>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const VisitsScreen = forwardRef(function VisitsScreen(props, ref) {
  const [expanded, setExpanded] = useState(null);

  useImperativeHandle(ref, () => ({
    openVisit: (type) => setExpanded(VISITS.find(v => v.type === type)?.date ?? null),
  }));

  const toggle = d => setExpanded(expanded === d ? null : d);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.navy }}>My visits</div>
        <div style={{ fontFamily: font, fontSize: 13, color: T.warmShadow, marginTop: 2 }}>Tap a visit to view documents</div>
      </div>
      {["2025", "2024"].map(year => (
        <div key={year}>
          <SectionLabel dark>{year}</SectionLabel>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            {VISITS.filter(v => v.date.includes(year)).map(v => (
              <VisitCard key={v.date} v={v} isOpen={expanded === v.date} toggle={() => toggle(v.date)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default VisitsScreen;
