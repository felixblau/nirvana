import { useState } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon, { useFontAwesome } from "./icons.jsx";
import HomeScreen from "./HomeScreen.jsx";
import VisitsScreen from "./VisitsScreen.jsx";
import CoverageScreen from "./CoverageScreen.jsx";
import AccountScreen from "./AccountScreen.jsx";
import Toast from "./Toast.jsx";

const ALL_ALERTS = [];

const TABS = [
  { id: "home", label: "Home", fa: "fa-house" },
  { id: "visits", label: "Visits", fa: "fa-clock-rotate-left" },
  { id: "coverage", label: "Coverage", fa: null, customIcon: true },
  { id: "account", label: "Account", fa: "fa-circle-user" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [dismissed, setDismissed] = useState([]);
  const [toast, setToast] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  useFontAwesome();

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
    visits: <VisitsScreen />,
    coverage: <CoverageScreen />,
    account: <AccountScreen alerts={visibleAlerts} onDismiss={dismissAlert} />,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: T.offWhite, minHeight: "100vh" }}>
      <div style={{ width: 375, background: T.white, borderRadius: 40, overflow: "hidden", display: "flex", flexDirection: "column", height: 780, boxShadow: "0 24px 80px rgba(8,18,69,0.14)", position: "relative", border: "6px solid black" }}>

        <div style={{ width: "100%", height: 45, flexShrink: 0, position: "relative", background: T.white }}>
          <img src={`${import.meta.env.BASE_URL}ios-bar.svg`} alt="" style={{ width: "100%", height: 45, display: "block" }} />
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 32, background: "black", borderRadius: 20 }} />
        </div>

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {screens[tab]}
        </div>

        {toast && <Toast message={`"${toast.title}" removed`} onUndo={undoDismiss} onDone={() => setToast(null)} />}

        <div style={{ display: "flex", borderTop: `1px solid ${T.divider}`, background: T.white, paddingBottom: 8, flexShrink: 0 }}>
          {TABS.map(t => {
            const isActive = tab === t.id;
            const showBadge = t.id === "account" && visibleAlerts.length > 0 && !isActive;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                onFocus={e => e.currentTarget.style.outline = `2px solid ${T.navy}`}
                onBlur={e => e.currentTarget.style.outline = "none"}
                style={{ flex: 1, border: "none", background: "none", padding: "10px 0 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: font, fontSize: 9, fontWeight: isActive ? 600 : 400, color: isActive ? T.navy : T.warmShadow, transition: `color ${motion}`, outline: "none", position: "relative" }}>
                <div style={{ position: "relative" }}>
                  {t.customIcon ? (
                    <svg width="20" height="21" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {isActive ? (
                        <path d="M9.8275 0.195312L17.9134 3.32031L18.6556 3.63281L18.6947 4.41406C18.8119 6.36719 18.5384 9.33594 17.2494 12.2656C15.9603 15.1953 13.6947 18.125 9.86657 19.8047L9.35875 20L8.85094 19.8047C5.02282 18.125 2.75719 15.1953 1.46813 12.2656C0.21813 9.33594-0.0943705 6.36719 0.022817 4.41406L0.0618795 3.63281L0.804067 3.32031L8.92907 0.195312L9.35875 0L9.8275 0.195312Z" fill={T.navy} />
                      ) : (
                        <path d="M9.35875 2.03125L1.85875 4.92188C1.81969 6.64062 2.13219 9.10156 3.18688 11.5234C4.28063 14.0625 6.19469 16.5234 9.35875 17.9688C12.5228 16.5234 14.4369 14.0625 15.5306 11.5234C16.5853 9.10156 16.8978 6.64062 16.8588 4.92188L9.35875 2.03125ZM18.6556 3.63281L18.7338 4.41406C18.8119 6.36719 18.5384 9.33594 17.2494 12.2656C15.9994 15.1953 13.6947 18.125 9.86657 19.8047L9.35875 20L8.85094 19.8047C5.02282 18.125 2.75719 15.1953 1.46813 12.2656C0.21813 9.33594-0.0943705 6.36719 0.022817 4.41406L0.0618795 3.63281L0.804067 3.32031L8.92907 0.195312L9.35875 0L9.8275 0.195312L17.9134 3.32031L18.6556 3.63281Z" fill="currentColor" />
                      )}
                    </svg>
                  ) : (
                    <Icon name={t.fa} weight={isActive ? "solid" : "thin"} size={20} />
                  )}
                  {showBadge && <div style={{ position: "absolute", top: -2, right: -3, width: 7, height: 7, background: T.red, borderRadius: "50%", border: `1.5px solid ${T.white}` }} />}
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
