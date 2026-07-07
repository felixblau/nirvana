import { useEffect, useRef, useState } from "react";

const CARDS: Array<{ heading: string; body: string }> = [
  {
    heading: "20-30% of coverage data is wrong",
    body:
      "Patient and provider records disagree on member IDs, demographics, or active coverage. The result: surprise bills, denials, and appointments that never should have been booked.",
  },
  {
    heading: "$1B+ in avoidable patient debt",
    body:
      "When patients don't know what care costs — or whether they're covered — they either delay booking or discover the bill after the fact. Neither outcome serves the patient or the practice.",
  },
  {
    heading: "0 patients should be surprised by a bill",
    body:
      "Price transparency isn't a nice-to-have. It's the foundation of a healthcare relationship that patients can actually trust. Signing this pledge is a public commitment to make that the norm, not the exception.",
  },
];

const STEP_MS = 120;

export function WhyItMatters() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stepStyle = (i: number): React.CSSProperties => ({
    opacity: 0,
    ...(visible
      ? { animation: `fadeIn 0.6s ease-out ${i * STEP_MS}ms forwards` }
      : null),
  });

  return (
    <div ref={rootRef} className="flex flex-col items-start gap-6">
      <header className="flex flex-col items-start gap-4 w-full">
        <div
          className="bg-white border border-[color:var(--warm-tan)] rounded-full px-4 py-2"
          style={stepStyle(0)}
        >
          <span
            className="text-[14px] font-semibold text-[color:var(--deep-purple)]"
            style={{ lineHeight: 1.25 }}
          >
            WHY THIS MATTERS
          </span>
        </div>
        <h2
          className="text-[color:var(--deep-purple)] w-full"
          style={{ fontWeight: 500, fontSize: 38, lineHeight: 1.25, ...stepStyle(1) }}
        >
          This is commitment to a better patient{" "}experience.
        </h2>
      </header>

      <div className="w-full" style={stepStyle(2)}>
        <p
          className="text-[color:var(--deep-purple)] w-full opacity-75 text-[18px] sm:text-[18px]"
          style={{ lineHeight: 1.5, fontWeight: 400 }}
        >
          Healthcare should feel like care. Yet millions of patients face surprise bills,
          coverage confusion, and administrative barriers that push them away from the treatment
          they need. This pledge is a public commitment to change{" "}that.
        </p>
      </div>

      {CARDS.map((card, i) => (
        <article
          key={card.heading}
          className="bg-white border border-[color:var(--warm-tan)] rounded-2xl p-6 flex flex-col gap-2 w-full"
          style={stepStyle(3 + i)}
        >
          <div className="text-[color:var(--deep-purple)]" style={{ fontWeight: 500, fontSize: 20, lineHeight: 1.25 }}>{card.heading}</div>
          <p className="text-[color:var(--deep-purple)] opacity-75" style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.5 }}>
            {card.body}
          </p>
        </article>
      ))}
    </div>
  );
}
