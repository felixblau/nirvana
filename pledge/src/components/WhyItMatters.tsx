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
      <header className="space-y-4 max-w-2xl">
        <div className="inline-block rounded-full border border-[color:var(--deep-purple)]/15 bg-card px-4 py-1.5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--deep-purple)]">
            Why this matters
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
          This is commitment to a better patient experience.
        </h2>
        <p className="text-base text-[color:var(--deep-purple)]/70">
          Healthcare should feel like care. Yet millions of patients face surprise bills, coverage confusion, and administrative barriers that push them away from the treatment they need. This pledge is a public commitment to change that.
        </p>
      </header>

      <ul className="space-y-4">
        {STATS.map((s) => (
          <li
            key={s.heading}
            className="bg-card border border-[color:var(--deep-purple)]/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-start md:gap-8"
          >
            <div className="md:w-48 md:flex-shrink-0 text-3xl md:text-4xl font-semibold text-[color:var(--deep-purple)] tracking-tight mb-3 md:mb-0">
              {s.figure}
            </div>
            <div className="space-y-2 md:pt-1">
              <div className="text-base font-semibold text-foreground">{s.heading}</div>
              <p className="text-sm text-[color:var(--deep-purple)]/70 leading-relaxed">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
