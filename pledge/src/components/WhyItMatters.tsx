const STATS: Array<{ figure: string; heading: string; body: string }> = [
  {
    figure: "20–30%",
    heading: "of coverage data is wrong",
    body:
      "Patient and provider records disagree on member IDs, demographics, or active coverage. The result: surprise bills, denials, and appointments that never should have been booked.",
  },
  {
    figure: "$1B+",
    heading: "in avoidable patient debt",
    body:
      "When patients don't know what care costs — or whether they're covered — they either delay booking or discover the bill after the fact. Neither outcome serves the patient or the practice.",
  },
  {
    figure: "0 patients",
    heading: "should be surprised by a bill",
    body:
      "Price transparency isn't a nice-to-have. It's the foundation of a healthcare relationship that patients can actually trust. Signing this pledge is a public commitment to make that the norm, not the exception.",
  },
];

export function WhyItMatters() {
  return (
    <section className="space-y-10">
      <header className="space-y-3 max-w-2xl">
        <div className="inline-block rounded-full border border-[color:var(--deep-purple)]/15 bg-card px-4 py-1.5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--deep-purple)]">
            Why this matters
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
          Patients deserve to know what they're paying for — before they book.
        </h2>
        <p className="text-base text-[color:var(--deep-purple)]/70">
          Healthcare should feel like care. Yet millions of patients face surprise bills, coverage confusion, and administrative barriers that push them away from the treatment they need. This pledge is a public commitment to change that.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <article
            key={s.heading}
            className="bg-card border border-[color:var(--deep-purple)]/10 rounded-2xl p-6 space-y-3"
          >
            <div className="text-3xl md:text-4xl font-semibold text-[color:var(--deep-purple)] tracking-tight">
              {s.figure}
            </div>
            <div className="text-sm font-semibold text-foreground">{s.heading}</div>
            <p className="text-sm text-[color:var(--deep-purple)]/70 leading-relaxed">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
