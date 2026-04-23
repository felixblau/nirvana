import { useEffect } from "react";
import X from "./icons-extra.js";

export function useFontAwesome() {
  useEffect(() => {
    if (document.getElementById("fa7-pro")) return;
    const s = document.createElement("script");
    s.id = "fa7-pro"; s.src = "https://kit.fontawesome.com/1f46eb856c.js"; s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }, []);
}

const I = {
  "fa-house":         { t: "M12.7 3.09a1 1 0 0 0-1.4 0L2.3 11.3A1 1 0 0 0 3 13h1v7a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1v-7h1a1 1 0 0 0 .7-1.7z", s: "M11.03 2.59a1.5 1.5 0 0 1 1.94 0l7.5 6.363A1.5 1.5 0 0 1 21 10.097V19.5a1.5 1.5 0 0 1-1.5 1.5H15a1.5 1.5 0 0 1-1.5-1.5v-4.5h-3v4.5A1.5 1.5 0 0 1 9 19.5H4.5A1.5 1.5 0 0 1 3 18V10.097a1.5 1.5 0 0 1 .53-1.144z" },
  "fa-qrcode":        { t: "M3 3h7v7H3V3zm1.5 1.5v4h4v-4h-4zM14 3h7v7h-7V3zm1.5 1.5v4h4v-4h-4zM3 14h7v7H3v-7zm1.5 1.5v4h4v-4h-4zM14 14h2v2h-2v-2zm3 0h2v2h-2v-2zm0 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm0 3h2v2h-2v-2zm3-3h-2v-1h2v1zm0 3h2v2h-2v-2z", s: "M0 0h11v11H0zm2 2v7h7V2zm2 2h3v3H4zM13 0h11v11H13zm2 2v7h7V2zm2 2h3v3h-3zM0 13h11v11H0zm2 2v7h7v-7zm2 2h3v3H4zm9-4h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0 4h2v2h-2zm2 2h2v2h-2zm-6 0h2v2h-2zm2-2h2v2h-2zm2 2h2v2h-2z" },
  "fa-clock-rotate-left": { t: "M12 4V1L8 5l4 4V6a7 7 0 1 1-7 7H3a9 9 0 1 0 9-9zm-1 5v5l4 2.5-.75 1.23L10 15V9h1z", s: "M12 4V1L8 5l4 4V6a7 7 0 1 1-7 7H3a9 9 0 1 0 9-9zm-1 5v5l4 2.5-.75 1.23L10 15V9h1z" },
  "fa-shield-halved": { t: "M12 2l8 3v6c0 5-3.6 9.3-8 10.7C7.6 20.3 4 16 4 11V5l8-3zm0 1.7L5.5 6v5c0 4.1 2.8 7.7 6.5 9.1 3.7-1.4 6.5-5 6.5-9.1V6L12 3.7z", s: "M3.75 3.375c0-.621.504-1.125 1.125-1.125h.375a8.25 8.25 0 0 1 8.25 8.25v.75c0 .621-.504 1.125-1.125 1.125h-7.5A1.125 1.125 0 0 1 3.75 12v-8.625zM3.75 12.75a1.125 1.125 0 0 0-1.125 1.125c0 4.26 3.189 7.77 7.33 8.25H12v-9.375H3.75zm8.25 9.375h2.045c4.141-.48 7.33-3.99 7.33-8.25A1.125 1.125 0 0 0 20.25 12.75H12v9.375z" },
  "fa-circle-user":   { t: "M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm0 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 9c3 0 5.5 1.34 5.5 3s-2.5 3-5.5 3-5.5-1.34-5.5-3 2.5-3 5.5-3z", s: "M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653zm-12.54-1.285A7.49 7.49 0 0 1 12 15a7.49 7.49 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438zM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" },
  "fa-chevron-right": { t: "M9 5l7 7-7 7", s: "M9 5l7 7-7 7" },
  "fa-chevron-down":  { t: "M5 9l7 7 7-7", s: "M5 9l7 7 7-7" },
  "fa-circle-check":  { t: "M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM9 12l2.5 2.5L15.5 9", s: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z" },
  "fa-clock":         { t: "M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 6v6.25l4 2-.75 1.5L11 13.5V6H12z", s: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6z" },
  "fa-plus":          { t: "M12 4v16M4 12h16", s: "M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75z" },
  "fa-rotate":        { s: "M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H3.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918z" },
  "fa-trash":         { t: "M9 3h6l1 2H8L9 3zM4 6h16v1.5H4V6zm2 1.5h12l-1 13H7l-1-13zm3 2v8h1.5v-8H9zm3.5 0v8H14v-8h-1.5z", s: "M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9z" },
};

const STROKE = new Set(["fa-chevron-right","fa-chevron-down","fa-clock","fa-signal","fa-hashtag","fa-cake-candles","fa-bell-slash","fa-person-walking","fa-stethoscope","fa-calendar","fa-wallet"]);

const ALL = { ...I, ...X };

export default function Icon({ name, weight = "solid", size = 16, style: st = {} }) {
  const paths = ALL[name];
  if (!paths) return null;
  const isStroke = STROKE.has(name);
  const d = weight === "solid" ? (paths.s || paths.t) : (paths.t || paths.s);
  const color = st.color || "currentColor";
  const { color: _c, ...rest } = st;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}
      fill={isStroke ? "none" : color} stroke={isStroke ? color : "none"}
      strokeWidth={isStroke ? (weight === "thin" ? 1 : 1.5) : 0}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0, ...rest }}>
      <path d={d} />
    </svg>
  );
}
