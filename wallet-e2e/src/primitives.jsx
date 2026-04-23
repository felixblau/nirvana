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
    ? { bg: "transparent", color: T.deepPurple, border: `1.5px solid ${T.deepPurple}` }
    : { bg: T.deepPurple, color: T.white, border: "none" };
  const hover = { bg: T.lilacLight, color: T.deepPurple };
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onFocus={e => e.currentTarget.style.boxShadow = `0 0 0 3px ${T.lilac}`}
      onBlur={e => e.currentTarget.style.boxShadow = "none"}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        height: small ? 36 : 44, padding: small ? "0 14px" : "0 20px", borderRadius: r.pill,
        border: base.border, background: hov ? hover.bg : base.bg, color: hov ? hover.color : base.color,
        fontFamily: font, fontSize: small ? 13 : 15, fontWeight: 500, cursor: "pointer",
        transition: `background ${motion}, color ${motion}`, outline: "none", width: "100%", ...style }}>
      {children}
    </button>
  );
}

export function SectionLabel({ children, light, dark }) {
  const color = light ? "rgba(255,255,255,0.45)" : dark ? T.deepPurple : T.warmShadow;
  return <div style={{ fontFamily: font, fontSize: 10, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color }}>{children}</div>;
}

export function Card({ children, style = {} }) {
  return <div style={{ background: T.offWhite, borderRadius: r.lg + 2, border: `1px solid ${T.warmLight}`, padding: 16, ...style }}>{children}</div>;
}
