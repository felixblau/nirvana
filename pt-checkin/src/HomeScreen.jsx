import { T, font, r } from "./theme.js";
import Icon from "./icons.jsx";
import { HoverRow, Card, SectionLabel } from "./primitives.jsx";
import QRCard from "./QRCard.jsx";

export default function HomeScreen({ alerts, onDismiss }) {
  const homeAlert = alerts[0] ?? null;
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: font, fontSize: 13, color: T.deepPurple }}>Welcome back,</div>
          <div style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: T.deepPurple, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Sandra</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.lilacLight, border: `1.5px solid ${T.lilac}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: 13, fontWeight: 600, color: T.deepPurple, flexShrink: 0 }}>SW</div>
      </div>

      <QRCard />

      {homeAlert && (
        <div style={{ background: T.white, border: `1px solid ${T.warmLight}`, borderRadius: r.lg + 2, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: homeAlert.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={homeAlert.faIcon} weight="solid" size={13} style={{ color: T.white }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.deepPurple }}>{homeAlert.title}</div>
            <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow, marginTop: 2, lineHeight: 1.5 }}>{homeAlert.body}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <button onClick={() => onDismiss(homeAlert.id, homeAlert.title)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}>
              <Icon name="fa-trash" weight="thin" size={19} style={{ color: T.warmShadow }} />
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}>
              <Icon name="fa-chevron-right" weight="thin" size={14} style={{ color: T.deepPurple }} />
            </button>
          </div>
        </div>
      )}

      <Card>
        <SectionLabel dark>Shared at scan</SectionLabel>
        <div style={{ marginTop: 10 }}>
          {[["Full name","Sandra Williams"],["Date of birth","07/22/1985"],["Member ID","BCBS-772-441-09"],["Address","5412 N Kedzie Ave, Chicago IL"],["Reason for visit","Sore throat, fever"],["Insurance","BCBS PPO · Active ✓"],["Copay","$40"]].map(([k,v],i,a) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontFamily: font, fontSize: 13, paddingBottom: 9, marginBottom: 9, borderBottom: i < a.length-1 ? `0.5px solid ${T.warmLight}` : "none" }}>
              <span style={{ color: T.warmShadow }}>{k}</span>
              <span style={{ color: v.includes("✓") ? T.green : T.deepPurple, fontWeight: v.includes("✓") ? 600 : 400, textAlign: "right", maxWidth: "55%" }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <HoverRow onClick={() => {}} style={{ background: T.deepPurple, borderRadius: r.lg + 2, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: r.md, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
}
