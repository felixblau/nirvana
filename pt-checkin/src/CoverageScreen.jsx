import { T, font, r } from "./theme.js";
import Icon from "./icons.jsx";
import { HoverRow, SectionLabel, Card } from "./primitives.jsx";

function Bar({ met, total, label, color = T.deepPurple }) {
  const pct = Math.round((met / total) * 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.deepPurple }}>{label}</span>
        <span style={{ fontFamily: font, fontSize: 12, color: T.warmShadow }}>${met.toLocaleString()} of ${total.toLocaleString()}</span>
      </div>
      <div style={{ height: 7, background: T.warmLight, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4 }} />
      </div>
      <div style={{ fontFamily: font, fontSize: 11, color: T.warmShadow, marginTop: 4 }}>{pct}% used · ${total - met} remaining</div>
    </div>
  );
}

export default function CoverageScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontFamily: font, fontSize: 22, fontWeight: 600, color: T.deepPurple }}>My coverage</div>

      <div style={{ background: T.deepPurple, borderRadius: r.lg + 2, padding: 18 }}>
        <SectionLabel light>Active plan</SectionLabel>
        <div style={{ fontFamily: font, fontSize: 17, fontWeight: 600, color: T.white, marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="fa-shield-halved" weight="thin" size={15} style={{ color: T.lilac }} />
          BCBS PPO Blue Choice
        </div>
        <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Member ID: BCBS-772-441-09 · Renews Dec 31</div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <span style={{ background: T.green, borderRadius: r.pill, padding: "4px 12px", fontFamily: font, fontSize: 12, fontWeight: 600, color: T.white, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="fa-circle-check" weight="solid" size={10} />Active
          </span>
          <span style={{ background: "rgba(255,255,255,0.12)", borderRadius: r.pill, padding: "4px 12px", fontFamily: font, fontSize: 12, color: T.white }}>Group: GRP-88210</span>
        </div>
      </div>

      <div style={{ background: T.offWhite, borderRadius: r.lg + 2, border: `1px solid ${T.warmLight}`, padding: 16 }}>
        <SectionLabel dark>Coverage snapshot</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          {[
            { label: "Urgent care copay", val: "$40", sub: "per visit", color: T.deepPurple },
            { label: "Plan status", val: "Active", sub: "thru Dec 31", color: T.green },
            { label: "Deductible met", val: "$200", sub: "of $500", color: T.amber },
            { label: "OOP met", val: "$620", sub: "of $3,000", color: T.deepPurple },
          ].map(s => (
            <div key={s.label} style={{ background: T.white, borderRadius: r.lg, border: `1px solid ${T.warmLight}`, padding: "14px 14px 12px" }}>
              <div style={{ fontFamily: font, fontSize: 11, color: T.deepPurple, marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontFamily: font, fontSize: 22, fontWeight: 600, color: s.color, letterSpacing: "-0.01em" }}>{s.val}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: T.warmShadow, marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <SectionLabel dark>Your progress</SectionLabel>
        <Bar met={200} total={500} label="Annual deductible" />
        <Bar met={620} total={3000} label="Out-of-pocket max" color={T.lilac} />
      </Card>

      <div>
        <SectionLabel dark>What you pay at MEC</SectionLabel>
        <div style={{ marginTop: 10, border: `1px solid ${T.warmLight}`, borderRadius: r.lg, overflow: "hidden" }}>
          {[
            ["fa-stethoscope", "Urgent care visit", "$40"],
            ["fa-x-ray", "X-ray", "$40"],
            ["fa-flask", "Lab work", "$40"],
            ["fa-person-running", "School / sports physical", "$40"],
            ["fa-truck-medical", "ER visit", "$350"],
            ["fa-pills", "Generic prescription", "$10"],
          ].map(([icon, svc, cost], i, arr) => (
            <HoverRow key={svc} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: i % 2 ? T.offWhite : T.white, borderBottom: i < arr.length - 1 ? `0.5px solid ${T.warmLight}` : "none", fontFamily: font, fontSize: 13 }}>
              <span style={{ color: T.deepPurple, display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name={icon} weight="thin" size={14} style={{ color: T.lilac, width: 16 }} />{svc}
              </span>
              <span style={{ fontWeight: 600, color: T.deepPurple }}>{cost} copay</span>
            </HoverRow>
          ))}
        </div>
      </div>
    </div>
  );
}
