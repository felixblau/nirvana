import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const STEP_MS = 120;

type Props = {
  onSignClick: () => void;
};

export function PledgeRecap({ onSignClick }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stepStyle = (i: number): React.CSSProperties => ({
    opacity: 0,
    ...(visible ? { animation: `fadeIn 0.6s ease-out ${i * STEP_MS}ms forwards` } : null),
  });

  return (
    <section
      ref={rootRef}
      className="bg-white flex flex-col justify-center"
      style={{ gap: 24, paddingTop: 40, paddingBottom: 40, paddingLeft: 80, paddingRight: 80 }}
    >
      <h2
        className="text-[#2f1d47] font-normal"
        style={{ fontSize: 33, lineHeight: 1.25, ...stepStyle(0) }}
      >
        Add your voice to the movement
      </h2>
      <p
        className="text-[color:var(--deep-purple)] opacity-75"
        style={{ fontSize: 18, lineHeight: 1.5, ...stepStyle(1) }}
      >
        Price transparency isn't just good policy — it's what patients deserve.
        When providers commit publicly, it builds trust, reduces billing surprises,
        and raises the bar for the entire industry. Your signature matters.
      </p>
      <div style={stepStyle(2)}>
        <Button
          size="lg"
          onClick={onSignClick}
          className="rounded-full px-8 py-6 text-base font-semibold relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-white/0 hover:before:bg-white/10 before:transition-colors before:pointer-events-none"
        >
          Sign the pledge
        </Button>
      </div>
    </section>
  );
}
