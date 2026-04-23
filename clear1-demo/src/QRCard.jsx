import { useState, useEffect } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";

export default function QRCard() {
  const [ttl, setTtl] = useState(300);
  const [expanded, setExpanded] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [wait, setWait] = useState(14);
  const urgent = ttl < 30;

  useEffect(() => {
    const t = setInterval(() => setTtl(s => s <= 1 ? 300 : s - 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!checkedIn) return;
    const t = setInterval(() => setWait(w => Math.max(0, w - 1)), 60000);
    return () => clearInterval(t);
  }, [checkedIn]);

  const size = 188, cells = 21, cell = size / cells, seed = 77;
  const pr = (i, j) => { const v = Math.sin(seed + i * 31 + j * 97) * 10000; return v - Math.floor(v); };
  const ifr = i => i < 7 || i > cells - 8;
  const ifc = j => j < 7 || j > cells - 8;
  const fc = (i, j) => { const ri = i < 7 ? i : i - (cells - 7), rj = j < 7 ? j : j - (cells - 7); const m = Math.max(Math.abs(ri - 3), Math.abs(rj - 3)); return m === 0 || m === 2 || m === 3 ? T.deepPurple : T.white; };
  const rects = [];
  for (let i = 0; i < cells; i++) for (let j = 0; j < cells; j++) {
    let fill;
    if (ifr(i) && ifc(j)) fill = fc(i, j);
    else if ((i === 6 && !ifc(j)) || (j === 6 && !ifr(i))) fill = (i + j) % 2 === 0 ? T.deepPurple : T.white;
    else fill = pr(i, j) > 0.45 ? T.deepPurple : T.white;
    if (fill !== T.white) rects.push(<rect key={`${i}-${j}`} x={j * cell} y={i * cell} width={cell} height={cell} fill={fill} />);
  }

  if (checkedIn) {
    return (
      <div style={{ background: T.deepPurple, borderRadius: r.lg + 4, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: font, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Checked in</div>
            <div style={{ fontFamily: font, fontSize: 17, fontWeight: 600, color: T.white, marginTop: 4 }}>Dr. Sarah Patel</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="fa-circle-check" weight="solid" size={15} style={{ color: T.white }} />
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: r.lg, padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: font, fontSize: 12, color: T.white, marginBottom: 6 }}>Estimated wait time:</div>
          <div style={{ fontFamily: font, fontSize: 52, fontWeight: 600, color: T.white, lineHeight: 1 }}>{wait} mins.</div>
          <div style={{ fontFamily: font, fontSize: 12, color: T.white, marginTop: 6 }}>You'll be notified when ready</div>
        </div>
        <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Feel free to step out — we'll notify you</div>
        <button onClick={() => setCheckedIn(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontFamily: font, fontSize: 10, cursor: "pointer", padding: 0, textAlign: "center" }}>↩ reset (dev)</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulse-border{0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}50%{box-shadow:0 0 0 4px rgba(192,57,43,0.18)}}
        @keyframes expand-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow-pulse{0%,100%{box-shadow:0 0 0 0 rgba(44,31,69,0.12)}50%{box-shadow:0 0 0 5px rgba(44,31,69,0.18)}}
      `}</style>
      <div style={{ border: `2px solid ${urgent ? T.red : T.deepPurple}`, borderRadius: r.lg + 4, background: T.white, transition: `border-color ${motion}`, animation: urgent ? "pulse-border 1s ease-in-out infinite" : "glow-pulse 2.5s ease-in-out infinite" }}>
        <div onClick={() => setExpanded(e => !e)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: 20, borderRadius: `${r.lg + 4}px ${r.lg + 4}px ${expanded ? 0 : r.lg + 4}px ${expanded ? 0 : r.lg + 4}px`, transition: `background ${motion}` }}
          onMouseEnter={e => e.currentTarget.style.background = T.lilacLight}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <div>
            <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: T.deepPurple }}>Ready to check in?</div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.deepPurple, marginTop: 3 }}>Dr. Sarah Patel · Today 10:30 AM</div>
          </div>
          <Icon name={expanded ? "fa-chevron-down" : "fa-chevron-right"} weight="thin" size={16} style={{ color: T.deepPurple, flexShrink: 0, marginLeft: 8 }} />
        </div>
        {expanded && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "16px 20px 20px", borderTop: `0.5px solid ${T.warmLight}`, animation: "expand-in 0.2s ease" }}>
            <div style={{ position: "relative" }}>
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
                <rect width={size} height={size} fill={T.white} />{rects}
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 36, height: 36, background: T.deepPurple, borderRadius: r.md, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="fa-plus" size={14} style={{ color: T.white }} />
              </div>
            </div>
            <button onClick={() => setCheckedIn(true)}
              style={{ background: "none", border: "none", fontFamily: font, fontSize: 13, fontWeight: 500, color: T.vibrantPurple, cursor: "pointer", padding: "2px 0", textDecoration: "underline", textDecorationColor: T.lilac }}>
              Scan (dev)
            </button>
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: font, fontSize: 11, color: urgent ? T.red : T.warmShadow, marginBottom: 5, transition: `color ${motion}` }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="fa-clock" weight="thin" size={10} style={{ color: urgent ? T.red : T.warmShadow }} />
                  {urgent ? `Expiring in ${ttl}s!` : `Expires in ${Math.floor(ttl / 60)}:${String(ttl % 60).padStart(2, "0")}`}
                </span>
                <button onClick={(e) => { e.stopPropagation(); setTtl(300); }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}>
                  <Icon name="fa-rotate" weight="solid" size={19} style={{ color: T.warmShadow }} />
                </button>
              </div>
              <div style={{ height: 5, background: T.warmLight, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${(ttl / 300) * 100}%`, height: "100%", background: urgent ? T.red : T.deepPurple, borderRadius: 3, transition: `width 1s linear, background ${motion}` }} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: T.deepPurple }}>Simon Wolf</div>
              <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow }}>BCBS PPO Blue Choice</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
