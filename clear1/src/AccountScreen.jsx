import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";
import { HoverRow, SectionLabel, Card, PillBtn } from "./primitives.jsx";

const menuItems = [
  { label: "Notification settings", icon: "fa-bell" },
  { label: "My MEC locations", icon: "fa-map-pin" },
  { label: "Privacy & data", icon: "fa-lock" },
  { label: "Help & support", icon: "fa-circle-question" },
  { label: "Sign out", icon: "fa-arrow-right-from-bracket", danger: true },
];

export default function AccountScreen({ alerts, onDismiss }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.blueWash, border: `2px solid ${T.navy}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: 18, fontWeight: 600, color: T.navy, flexShrink: 0 }}>SW</div>
        <div>
          <div style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: T.navy }}>Simon Wolf</div>
          <div style={{ fontFamily: font, fontSize: 13, color: T.warmShadow, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="fa-envelope" weight="thin" size={11} />simon.w@email.com
          </div>
        </div>
      </div>

      {alerts.length > 0 ? (
        <div>
          <SectionLabel>Alerts</SectionLabel>
          <div style={{ marginTop: 10, background: T.white, border: `1px solid ${T.divider}`, borderRadius: r.lg + 2, overflow: "hidden" }}>
            {alerts.map((a, i) => (
              <div key={a.id} style={{ padding: "14px 16px", borderBottom: i < alerts.length - 1 ? `0.5px solid ${T.divider}` : "none", display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={a.faIcon} weight="solid" size={13} style={{ color: T.white }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.navy }}>{a.title}</div>
                  <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow, marginTop: 2, lineHeight: 1.5 }}>{a.body}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {a.action === "View details" && <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}><Icon name="fa-circle-info" weight="thin" size={19} style={{ color: T.warmShadow }} /></button>}
                  {a.action === "Update" && <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}><Icon name="fa-rotate" weight="solid" size={19} style={{ color: T.warmShadow }} /></button>}
                  <button onClick={() => onDismiss(a.id, a.title)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.6"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    <Icon name="fa-trash" weight="thin" size={19} style={{ color: T.warmShadow }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: T.greenLight, borderRadius: r.lg, border: "1px solid #b8dec9" }}>
          <Icon name="fa-circle-check" weight="solid" size={14} style={{ color: T.green }} />
          <span style={{ fontFamily: font, fontSize: 13, color: T.green, fontWeight: 500 }}>All clear — no alerts</span>
        </div>
      )}

      <Card>
        <SectionLabel dark>Personal info</SectionLabel>
        <div style={{ marginTop: 10 }}>
          {[{ icon: "fa-cake-candles", k: "Date of birth", v: "07/22/1985" }, { icon: "fa-phone", k: "Phone", v: "(773) 555-0182" }, { icon: "fa-location-dot", k: "Address", v: "5412 N Kedzie Ave, Chicago IL" }].map(({ icon, k, v }, i, a) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: font, fontSize: 13, paddingBottom: 10, marginBottom: 10, borderBottom: i < a.length - 1 ? `0.5px solid ${T.divider}` : "none" }}>
              <span style={{ color: T.warmShadow, display: "flex", alignItems: "center", gap: 7 }}>
                <Icon name={icon} weight="thin" size={12} style={{ color: T.warmShadow, width: 14 }} />{k}
              </span>
              <span style={{ color: T.navy }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel dark>Insurance</SectionLabel>
        <div style={{ marginTop: 10 }}>
          {[{ icon: "fa-id-card", k: "Plan", v: "BCBS PPO Blue Choice" }, { icon: "fa-hashtag", k: "Member ID", v: "BCBS-772-441-09" }, { icon: "fa-circle-check", k: "Status", v: "Active ✓" }].map(({ icon, k, v }, i, a) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: font, fontSize: 13, paddingBottom: 10, marginBottom: 10, borderBottom: i < a.length - 1 ? `0.5px solid ${T.divider}` : "none" }}>
              <span style={{ color: T.warmShadow, display: "flex", alignItems: "center", gap: 7 }}>
                <Icon name={icon} weight="thin" size={12} style={{ color: T.warmShadow, width: 14 }} />{k}
              </span>
              <span style={{ color: v.includes("✓") ? T.green : T.navy, fontWeight: v.includes("✓") ? 600 : 400 }}>{v}</span>
            </div>
          ))}
        </div>
        <PillBtn style={{ marginTop: 6, fontSize: 13 }}>
          <Icon name="fa-camera" weight="thin" size={13} />Update insurance card
        </PillBtn>
      </Card>

      <div style={{ background: T.white, border: `1px solid ${T.divider}`, borderRadius: r.lg + 2, overflow: "hidden" }}>
        {menuItems.map(({ label, icon, danger }, i, arr) => (
          <HoverRow key={label} style={{ padding: "13px 16px", fontFamily: font, fontSize: 14, color: danger ? T.red : T.navy, fontWeight: danger ? 600 : 400, borderBottom: i < arr.length - 1 ? `0.5px solid ${T.divider}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name={icon} weight="thin" size={14} style={{ color: danger ? T.red : T.navy, width: 16 }} />{label}
            </span>
            {!danger && <Icon name="fa-chevron-right" weight="thin" size={11} style={{ color: T.divider }} />}
          </HoverRow>
        ))}
      </div>
    </div>
  );
}
