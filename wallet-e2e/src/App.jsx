import { useState } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon, { useFontAwesome } from "./icons.jsx";
import HomeScreen from "./HomeScreen.jsx";
import VisitsScreen from "./VisitsScreen.jsx";
import CoverageScreen from "./CoverageScreen.jsx";
import AccountScreen from "./AccountScreen.jsx";
import TriageScreen from "./TriageScreen.jsx";
import Toast from "./Toast.jsx";

const ALL_ALERTS = [
  { id: 1, faIcon: "fa-clock", title: "Deductible in progress", body: "$300 remaining. After that, you pay only coinsurance.", action: "View details", iconBg: T.amber },
  { id: 2, faIcon: "fa-circle-check", title: "Coverage verified", body: "BCBS plan active. Urgent care copay: $40.", action: null, iconBg: T.green },
  { id: 3, faIcon: "fa-stopwatch", title: "Save time at your next visit", body: "Your info is saved. Just show your QR code.", action: null, iconBg: T.vibrantPurple },
  { id: 4, faIcon: "fa-rotate", title: "Insurance may be inactive", body: "Update your insurance before your next visit.", action: "Update", iconBg: T.red },
];

const TABS = [
  { id: "home", label: "Home", fa: "fa-house" },
  { id: "triage", label: "Triage AI", fa: "fa-sparkles" },
  { id: "visits", label: "Visits", fa: "fa-clock-rotate-left" },
  { id: "coverage", label: "Coverage", fa: "fa-shield-halved" },
  { id: "account", label: "Account", fa: "fa-circle-user" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [dismissed, setDismissed] = useState([]);
  const [toast, setToast] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  useFontAwesome();

  const [bookedVisit, setBookedVisit] = useState(null);
  const visibleAlerts = ALL_ALERTS.filter(a => !dismissed.includes(a.id));

  function dismissAlert(id, title) {
    setDismissed(d => [...d, id]);
    setPendingId(id);
    setToast({ id, title });
  }

  function undoDismiss() {
    setDismissed(d => d.filter(x => x !== pendingId));
    setToast(null);
    setPendingId(null);
  }

  const screens = {
    home: <HomeScreen alerts={visibleAlerts} onDismiss={dismissAlert} />,
    triage: <TriageScreen onNavigate={setTab} onBookVisit={setBookedVisit} />,
    visits: <VisitsScreen bookedVisit={bookedVisit} />,
    coverage: <CoverageScreen />,
    account: <AccountScreen alerts={visibleAlerts} onDismiss={dismissAlert} />,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: T.offWhite, minHeight: "100vh" }}>
      <div style={{ width: 375, background: T.white, borderRadius: 40, overflow: "hidden", display: "flex", flexDirection: "column", height: 780, boxShadow: "0 24px 80px rgba(44,31,69,0.16)", position: "relative" }}>

        <img src={`${import.meta.env.BASE_URL}ios-bar.svg`} alt="" style={{ width: 375, height: 45, flexShrink: 0, display: "block" }} />

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {screens[tab]}
        </div>

        {toast && <Toast message={`"${toast.title}" removed`} onUndo={undoDismiss} onDone={() => setToast(null)} />}

        <div style={{ display: "flex", borderTop: `1.5px solid ${T.lilacLight}`, background: T.whitePurple, paddingBottom: 8, flexShrink: 0 }}>
          {TABS.map(t => {
            const isActive = tab === t.id;
            const showBadge = t.id === "account" && visibleAlerts.length > 0 && !isActive;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                onFocus={e => e.currentTarget.style.outline = `2px solid ${T.lilac}`}
                onBlur={e => e.currentTarget.style.outline = "none"}
                style={{ flex: 1, border: "none", background: "none", padding: "10px 0 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: font, fontSize: 9, fontWeight: isActive ? 600 : 400, color: isActive ? T.deepPurple : T.lilac, transition: `color ${motion}`, outline: "none", position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <Icon name={t.fa} weight={isActive ? "solid" : "thin"} size={20} />
                  {showBadge && <div style={{ position: "absolute", top: -2, right: -3, width: 7, height: 7, background: T.red, borderRadius: "50%", border: `1.5px solid ${T.whitePurple}` }} />}
                </div>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
