const COLUMNS: Array<{ heading: string; items: string[] }> = [
  { heading: "Solutions", items: ["Platform overview", "Insurance Discovery", "Cost Estimates", "Enhanced Verification"] },
  { heading: "Who We Serve", items: ["Healthcare Providers", "Digital Health Partners", "EHR Partners"] },
  { heading: "Why Nirvana", items: ["Customer Stories", "Our Technology"] },
  { heading: "Resources", items: ["About Us", "Careers", "Blog", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-[color:var(--deep-purple)] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex gap-3">
              <span className="w-9 h-9 rounded-full bg-[color:var(--lilac)]/20 flex items-center justify-center cursor-default" aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--lilac)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <span className="w-9 h-9 rounded-full bg-[color:var(--lilac)]/20 flex items-center justify-center cursor-default" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--lilac)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </span>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <div className="text-xs font-semibold tracking-wider text-[color:var(--lilac)]">{col.heading.toUpperCase()}</div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-white cursor-default">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between gap-8 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}hipaa-badge.png`}
              alt="HIPAA Compliant"
              className="h-16 w-auto object-contain"
            />
            <img
              src={`${import.meta.env.BASE_URL}footer-compliance-badges.png`}
              alt="AICPA SOC certified"
              className="h-16 w-16 rounded-full object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-4 bg-[color:var(--lilac)]/25 rounded-full pl-6 pr-3 py-2 cursor-default">
            <span className="text-sm text-white">Looking to help make mental healthcare more accessible? Join Nirvana team.</span>
            <span className="rounded-full bg-transparent border border-white/30 px-3 py-1 text-xs font-medium text-white">View job openings</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-white/60">
          <div>Copyright Meet Nirvana 2026</div>
          <div className="flex gap-6">
            <span className="cursor-default">Cookies Preferences</span>
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
