import { useState, useEffect } from "react";
import { T, font, r } from "./theme.js";

export default function Toast({ message, onUndo, onDone }) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const start = Date.now(), duration = 3000;
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 100 - (elapsed / duration) * 100));
      if (elapsed >= duration) { clearInterval(tick); onDone(); }
    }, 50);
    return () => clearInterval(tick);
  }, []);

  return (
    <div style={{ position: "absolute", bottom: 62, left: 16, right: 16, zIndex: 100, animation: "toast-in 0.2s ease" }}>
      <style>{`@keyframes toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ background: T.navy, borderRadius: r.lg, overflow: "hidden", boxShadow: "0 8px 24px rgba(8,18,69,0.28)" }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontFamily: font, fontSize: 13, color: T.white, flex: 1 }}>{message}</span>
          <button onClick={onUndo} style={{ background: "none", border: "none", fontFamily: font, fontSize: 13, fontWeight: 600, color: T.blueWash, cursor: "pointer", padding: 0, flexShrink: 0 }}>Undo</button>
        </div>
        <div style={{ height: 2, background: "rgba(255,255,255,0.15)", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, background: T.blueWash, transition: "width 0.05s linear" }} />
        </div>
      </div>
    </div>
  );
}
