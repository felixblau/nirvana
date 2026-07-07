const BASE = import.meta.env.BASE_URL;

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
        {/* Top grid: logo+social col + 4 link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-10 mb-16">
          <div className="col-span-2 sm:col-span-3 md:col-span-2 flex flex-col" style={{ gap: 24 }}>
            <img
              src={`${BASE}nirvana-color.svg`}
              alt="Nirvana"
              className="h-6 w-auto object-contain object-left"
            />
            <div className="flex gap-2">
              <span className="w-6 h-6 rounded-full bg-[#ae9bea] flex items-center justify-center cursor-default" aria-label="Instagram">
                <img src={`${BASE}icon-instagram.svg`} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
              </span>
              <span className="w-6 h-6 rounded-full bg-[#ae9bea] flex items-center justify-center cursor-default" aria-label="LinkedIn">
                <img src={`${BASE}icon-linkedin.svg`} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
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

        {/* Badges + hiring pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={`${BASE}hipaa-badge.svg`}
              alt="HIPAA Compliant"
              className="h-16 w-auto object-contain"
            />
            <img
              src={`${BASE}aicpa-soc.png`}
              alt="AICPA SOC certified"
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-4 bg-[color:var(--lilac)]/25 rounded-full pl-6 pr-3 py-2 cursor-default">
            <span className="text-sm text-white">Looking to help make mental healthcare more accessible? Join Nirvana team.</span>
            <span className="rounded-full bg-transparent border border-white/30 px-3 py-1 text-xs font-medium text-white">View job openings</span>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-white/60">
          <div>Copyright Meet Nirvana 2026</div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <span className="cursor-default">Cookies Preferences</span>
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
