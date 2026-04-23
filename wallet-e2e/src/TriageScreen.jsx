import { useState, useEffect, useRef } from "react";
import { T, font, r, motion } from "./theme.js";
import Icon from "./icons.jsx";
import { SectionLabel } from "./primitives.jsx";
import TriageBookingSheet from "./TriageBookingSheet.jsx";
import TriagePaymentSheet from "./TriagePaymentSheet.jsx";

const SUGGESTIONS = [
  "I have a sore throat and fever",
  "My knee hurts when I climb stairs",
  "I need a prescription refill",
];

function Typewriter({ text, speed = 12, onDone }) {
  const [count, setCount] = useState(0);
  useEffect(() => { setCount(0); }, [text]);
  useEffect(() => {
    if (count >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setCount(c => c + 1), speed);
    return () => clearTimeout(t);
  }, [count, text, speed]);

  const visible = text.slice(0, count);
  return <>{visible.split('\n').map((line, li) => {
    const parts = line.split(/(\*\*[^*]*\*?\*?)/);
    const rendered = parts.map((part, pi) => {
      const bold = part.match(/^\*\*(.+)\*\*$/);
      if (bold) return <strong key={pi}>{bold[1]}</strong>;
      return part;
    });
    return <span key={li}>{li > 0 && <br />}{rendered}</span>;
  })}</>;
}

function AnimateIn({ children, style }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setTimeout(() => setVisible(true), 30));
  }, []);
  return (
    <div style={{
      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      ...style,
    }}>{children}</div>
  );
}

const DEMO_RESPONSES = {
  default: "I'm sorry to hear that. Based on what you're describing, this could be related to several conditions. **I'd recommend scheduling a visit so a provider can examine you properly.**\n\nWould you like me to find providers near you that accept your insurance?",
  knee: "I'm sorry to hear about your knee pain. Based on what you're describing — pain that worsens with stair climbing — this could be related to iliotibial band syndrome, a lateral meniscus issue, or possible ligament strain.\n\nImaging would be really helpful. **Based on your symptoms, I suggest you consult a radiologist.** Would you like me to find some radiologists you can reach out to?",
  throat: "Sore throat combined with fever can indicate several things — from a viral infection to strep throat. **Given the combination of symptoms, I'd recommend an urgent care visit** so they can run a rapid strep test and check for other causes.\n\nWould you like me to find urgent care providers near you?",
  refill: "I can help with that. **To request a prescription refill, I'll need to connect you with your prescribing provider's office.**\n\nWould you like me to find your provider and check their earliest availability?",
};

const DOCTORS = [
  { name: "Dr. Priya Sharma, MD", specialty: "Radiologist", rating: 4.92, reviews: 187, distance: "2.3 mi", address: "425 E 61st St, New York, NY 10065", initials: "PS" },
  { name: "Dr. Marcus Chen, MD", specialty: "Urgent Care", rating: 4.90, reviews: 243, distance: "3.1 mi", address: "1305 York Ave, New York, NY 10021", initials: "MC" },
  { name: "Dr. Sarah Williams, MD", specialty: "Urgent Care", rating: 4.87, reviews: 156, distance: "4.2 mi", address: "560 First Ave, New York, NY 10016", initials: "SW" },
];

function DoctorCard({ doc, onBook }) {
  return (
    <div style={{ minWidth: 200, background: T.white, border: `1px solid ${T.warmLight}`, borderRadius: r.lg, padding: 14, display: "flex", flexDirection: "column", gap: 8, scrollSnapAlign: "start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, background: T.lilacLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: T.deepPurple, fontFamily: font, flexShrink: 0 }}>{doc.initials}</div>
        <div>
          <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: T.deepPurple }}>{doc.name}</div>
          <div style={{ fontFamily: font, fontSize: 11, color: T.warmShadow }}>{doc.specialty}</div>
        </div>
      </div>
      <div style={{ fontFamily: font, fontSize: 11, color: T.warmShadow, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: T.amber }}>★</span> <strong style={{ color: T.deepPurple }}>{doc.rating}</strong>
        <span>{doc.reviews} reviews</span>
        <Icon name="fa-location-dot" weight="solid" size={9} style={{ color: T.warmShadow }} />
        <span>{doc.distance}</span>
      </div>
      <div style={{ fontFamily: font, fontSize: 11, color: T.warmShadow }}>{doc.address}</div>
      <button onClick={onBook} style={{ background: T.deepPurple, color: T.white, border: "none", borderRadius: r.pill, padding: "8px 0", fontFamily: font, fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        Book <Icon name="fa-chevron-right" weight="thin" size={10} style={{ color: T.white }} />
      </button>
    </div>
  );
}

function ProcessingOverlay({ step }) {
  const steps = [
    { label: "Matching providers to your insurance", icon: "fa-shield-halved" },
    { label: "Calculating your cost", icon: "fa-hashtag" },
    { label: "Checking availability", icon: "fa-calendar" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(44,31,69,0.35)", zIndex: 10, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: T.white, borderRadius: `${r.lg + 8}px ${r.lg + 8}px 0 0`, width: "100%", padding: "20px 24px 24px" }}>
        <div style={{ width: 36, height: 4, background: T.warmLight, borderRadius: 2, margin: "0 auto 20px" }} />
        {steps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "pending";
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", opacity: state === "pending" ? 0.4 : 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: state === "done" ? T.green : state === "active" ? T.lilacLight : T.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {state === "done" && <Icon name="fa-circle-check" weight="solid" size={14} style={{ color: T.white }} />}
                {state === "active" && <Icon name="fa-sparkles" weight="solid" size={12} style={{ color: T.vibrantPurple }} />}
                {state === "pending" && <Icon name={s.icon} weight="thin" size={12} style={{ color: T.warmShadow }} />}
              </div>
              <span style={{ fontFamily: font, fontSize: 13, color: state === "active" ? T.deepPurple : T.warmShadow, fontWeight: state === "active" ? 600 : 400 }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TriageScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [processing, setProcessing] = useState(null);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [paymentDoctor, setPaymentDoctor] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const scrollBottom = () => {
    setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }), 80);
  };

  useEffect(scrollBottom, [messages, showDoctors, confirmed]);

  function classifyInput(text) {
    const lower = text.toLowerCase();
    if (lower.includes("knee") || lower.includes("stair")) return "knee";
    if (lower.includes("throat") || lower.includes("fever") || lower.includes("sore")) return "throat";
    if (lower.includes("refill") || lower.includes("prescription")) return "refill";
    return "default";
  }

  function sendMessage(text) {
    if (!text.trim() || typing) return;
    const userMsg = text.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setTyping(true);

    const isYes = /^(yes|yeah|sure|please|ok|yep)/i.test(userMsg);

    if (isYes && messages.length > 0 && !showDoctors) {
      setTimeout(() => {
        setProcessing(0);
        setTimeout(() => setProcessing(1), 1500);
        setTimeout(() => setProcessing(2), 3000);
        setTimeout(() => {
          setProcessing(null);
          setTyping(false);
          setMessages(m => [...m, { role: "ai", text: `Here are 3 providers near you that accept your BCBS PPO insurance:` }]);
          setShowDoctors(true);
        }, 4500);
      }, 600);
      return;
    }

    const category = classifyInput(userMsg);
    const response = DEMO_RESPONSES[category];
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: response, typewrite: true }]);
      setTyping(false);
    }, 800);
  }

  function handleBook(doc) {
    setBookingDoctor(doc);
  }

  function handleBookingConfirm() {
    setBookingDoctor(null);
    setPaymentDoctor(bookingDoctor);
  }

  function handlePaymentConfirm() {
    const doc = paymentDoctor;
    setPaymentDoctor(null);
    setConfirmed(true);
    setMessages(m => [...m, { role: "ai", text: `Appointment booked! You're seeing **${doc.name}** on Monday, March 24 at 9:00 AM.\n\nA confirmation has been sent to **sandra.w@email.com**. You can view it in your Visits tab.`, typewrite: true }]);
  }

  const showSuggestions = messages.length === 0;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div style={{ padding: "14px 20px 10px", borderBottom: `1px solid ${T.lilacLight}`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.lilacLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="fa-sparkles" weight="solid" size={14} style={{ color: T.vibrantPurple }} />
        </div>
        <div>
          <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: T.deepPurple }}>Triage AI</div>
          <div style={{ fontFamily: font, fontSize: 11, color: T.warmShadow }}>Describe your symptoms to get started</div>
        </div>
      </div>

      <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
        {showSuggestions && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
            <div style={{ fontFamily: font, fontSize: 12, color: T.warmShadow, textAlign: "center", marginBottom: 4 }}>Try asking about:</div>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)} style={{ background: T.offWhite, border: `1px solid ${T.warmLight}`, borderRadius: r.lg, padding: "12px 16px", fontFamily: font, fontSize: 13, color: T.deepPurple, cursor: "pointer", textAlign: "left", transition: `background ${motion}` }}
                onMouseEnter={e => e.currentTarget.style.background = T.lilacLight}
                onMouseLeave={e => e.currentTarget.style.background = T.offWhite}>
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <AnimateIn key={i} style={msg.role === "user" ? { display: "flex", justifyContent: "flex-end" } : {}}>
            {msg.role === "user" ? (
              <div style={{ background: T.lilacLight, borderRadius: `${r.lg}px ${r.lg}px ${r.sm}px ${r.lg}px`, padding: "10px 14px", maxWidth: "80%", fontFamily: font, fontSize: 14, color: T.deepPurple, lineHeight: 1.5 }}>{msg.text}</div>
            ) : (
              <div style={{ maxWidth: "90%", fontFamily: font, fontSize: 14, color: T.deepPurple, lineHeight: 1.55 }}>
                {msg.typewrite ? <Typewriter text={msg.text} onDone={scrollBottom} /> : msg.text}
              </div>
            )}
          </AnimateIn>
        ))}

        {showDoctors && (
          <AnimateIn>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 4, marginLeft: -4, paddingLeft: 4, WebkitOverflowScrolling: "touch" }}>
              {DOCTORS.map((doc, i) => (
                <DoctorCard key={i} doc={doc} onBook={() => handleBook(doc)} />
              ))}
            </div>
          </AnimateIn>
        )}

        {confirmed && (
          <AnimateIn>
            <div style={{ background: T.greenLight, border: `1px solid #b8dec9`, borderRadius: r.lg, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="fa-circle-check" weight="solid" size={16} style={{ color: T.green }} />
              <span style={{ fontFamily: font, fontSize: 13, color: T.green, fontWeight: 500 }}>Appointment confirmed</span>
            </div>
          </AnimateIn>
        )}

        {typing && !processing && (
          <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: T.lilac, animation: `typing-dot 1s ease-in-out ${i * 0.15}s infinite` }} />
            ))}
            <style>{`@keyframes typing-dot{0%,100%{opacity:0.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}`}</style>
          </div>
        )}

        <div style={{ minHeight: 8, flexShrink: 0 }} />
      </div>

      <div style={{ padding: "8px 12px 12px", borderTop: `1px solid ${T.lilacLight}`, background: T.whitePurple, flexShrink: 0, display: "flex", gap: 8, alignItems: "center" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") sendMessage(input); }}
          placeholder="Describe your symptoms..."
          disabled={typing || confirmed}
          style={{ flex: 1, height: 40, borderRadius: r.pill, border: `1.5px solid ${T.warmLight}`, padding: "0 16px", fontFamily: font, fontSize: 14, color: T.deepPurple, background: T.white, outline: "none" }}
          onFocus={e => e.currentTarget.style.borderColor = T.lilac}
          onBlur={e => e.currentTarget.style.borderColor = T.warmLight}
        />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing || confirmed}
          style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: input.trim() && !typing ? T.deepPurple : T.warmLight, cursor: input.trim() && !typing ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: `background ${motion}` }}>
          <Icon name="fa-paper-plane" weight="solid" size={16} style={{ color: T.white }} />
        </button>
      </div>

      {processing !== null && <ProcessingOverlay step={processing} />}
      {bookingDoctor && <TriageBookingSheet doctor={bookingDoctor} onBook={handleBookingConfirm} onClose={() => setBookingDoctor(null)} />}
      {paymentDoctor && <TriagePaymentSheet doctor={paymentDoctor} onConfirm={handlePaymentConfirm} onClose={() => setPaymentDoctor(null)} />}
    </div>
  );
}
