import { useState } from "react";
import { T, font, r, motion } from "./theme.js";

export function HoverRow({ onClick, children, style = {}, hoverBg = T.offWhite }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor: onClick ? "pointer" : "default", background: hov && onClick ? hoverBg : "transparent", transition: `background ${motion}`, ...style }}>
      {children}
    </div>
  );
}

export function PillBtn({ children, onClick, secondary, small, style = {} }) {
  const [hov, setHov] = useState(false);
  const base = secondary
    ? { bg: "transparent", color: T.navy, border: `1.5px solid ${T.navy}` }
    : { bg: T.navy, color: T.white, border: "none" };
  const hover = { bg: T.blueWash, color: T.navy };
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onFocus={e => e.currentTarget.style.boxShadow = `0 0 0 3px ${T.blueWash}`}
      onBlur={e => e.currentTarget.style.boxShadow = "none"}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        height: small ? 36 : 56, padding: small ? "0 14px" : "0 64px", borderRadius: r.pill,
        border: base.border, background: hov ? hover.bg : base.bg, color: hov ? hover.color : base.color,
        fontFamily: font, fontSize: small ? 13 : 18, fontWeight: 600, cursor: "pointer",
        transition: `background ${motion}, color ${motion}`, outline: "none", width: "100%",
        letterSpacing: "-0.02em", ...style }}>
      {children}
    </button>
  );
}

export function SectionLabel({ children, light, dark }) {
  const color = light ? "rgba(255,255,255,0.45)" : dark ? T.navy : T.warmShadow;
  return <div style={{ fontFamily: font, fontSize: 10, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color }}>{children}</div>;
}

export function Card({ children, style = {} }) {
  return <div style={{ background: T.offWhite, borderRadius: r.lg + 2, border: `1px solid ${T.divider}`, padding: 16, ...style }}>{children}</div>;
}
