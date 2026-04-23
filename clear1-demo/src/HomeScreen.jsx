import { forwardRef } from "react";
import { T, font, r } from "./theme.js";
import Icon from "./icons.jsx";
import { HoverRow, Card, SectionLabel } from "./primitives.jsx";
import SelfieCard from "./SelfieCard.jsx";

const HomeScreen = forwardRef(function HomeScreen({ selfieRef, onSelfieDone }, ref) {
  return (
    <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={`${import.meta.env.BASE_URL}clear-logo.svg`} alt="CLEAR" style={{ height: 24 }} />
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.blueWash, border: `1.5px solid ${T.navy}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: 13, fontWeight: 600, color: T.navy, flexShrink: 0 }}>SW</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontFamily: font, fontSize: 13, color: T.navy }}>Welcome back,</div>
          <div style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: T.navy, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Simon</div>
        </div>
      </div>

      <SelfieCard ref={selfieRef} onDone={onSelfieDone} />

      <Card>
        <SectionLabel dark>Shared at verification</SectionLabel>
        <div style={{ marginTop: 10 }}>
          {[["Full name","Simon Wolf"],["Date of birth","07/22/1985"],["Member ID","BCBS-772-441-09"],["Address","5412 N Kedzie Ave, Chicago IL"],["Insurance","BCBS PPO · Active ✓"],["Copay","$40"]].map(([k,v],i,a) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontFamily: font, fontSize: 13, paddingBottom: 9, marginBottom: 9, borderBottom: i < a.length-1 ? `0.5px solid ${T.divider}` : "none" }}>
              <span style={{ color: T.warmShadow }}>{k}</span>
              <span style={{ color: v.includes("✓") ? T.green : T.navy, fontWeight: v.includes("✓") ? 600 : 400, textAlign: "right", maxWidth: "55%" }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <HoverRow onClick={() => {}} style={{ background: T.navy, borderRadius: r.lg + 2, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="fa-wallet" weight="thin" size={16} style={{ color: T.white }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.white }}>Add to Apple Wallet</div>
          <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Quick access from your lock screen</div>
        </div>
        <Icon name="fa-chevron-right" weight="thin" size={12} style={{ color: T.white }} />
      </HoverRow>
    </div>
  );
});

export default HomeScreen;
