import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

type LogoEntry = { file: string; square?: true };

// square=true → constrain by width (92px); otherwise constrain by height (24px)
// Aspect ratios computed from natural PNG dimensions; square = ratio < 2.5
const LOGO_MAP: Record<string, LogoEntry> = {
  "optum":                          { file: "optum.png" },             // 273×85 = 3.21
  "amazon":                         { file: "amazon.png" },            // 213×64 = 3.33
  "simplepractice":                 { file: "simple-practice.png", square: true },   // 317×166 = 1.91
  "simple practice":                { file: "simple-practice.png", square: true },
  "transformations care network":   { file: "transformations-care-network.png" },    // 259×64 = 4.05
  "alma":                           { file: "alma.png" },              // 187×64 = 2.92
  "sondermind":                     { file: "sondermind.png" },        // 312×98 = 3.18
  "resmed":                         { file: "resmed.png", square: true },           // 195×142 = 1.37
  "pomelo care":                    { file: "pomelo-care.png" },       // 220×64 = 3.44
  "weightwatchers":                 { file: "weight-watchers.png", square: true },  // 123×64 = 1.92
  "weight watchers":                { file: "weight-watchers.png", square: true },
  "eleanor health":                 { file: "eleanor-health.png" },    // 299×64 = 4.67
  "sol mental health":              { file: "sol-mental-health.png", square: true }, // 227×119 = 1.91
  "midwest express clinic":         { file: "midwest-express-clinic.png" }, // 251×64 = 3.92
  "lifemd":                         { file: "lifemd.png", square: true },           // 243×136 = 1.79
  "osmind":                         { file: "osmind.png" },            // 249×64 = 3.89
  "radiology partners":             { file: "radiology-partners.png" },// 311×39 = 7.97
  "headlight":                      { file: "headlight.png", square: true },        // 248×130 = 1.91
  "clear":                          { file: "clear.png" },             // 273×74 = 3.69
  "octave":                         { file: "octave.png", square: true },           // 229×121 = 1.89
  "headspace":                      { file: "headspace.png" },         // 317×70 = 4.53
  "fastpace health":                { file: "fastpace-health.png" },   // 300×69 = 4.35
  "brave health":                   { file: "brave-health.png" },      // 356×48 = 7.42
  "happier living":                 { file: "happier-living.png" },    // 311×78 = 3.99
  "geode":                          { file: "geode.png" },             // 293×51 = 5.75
  "modern":                         { file: "modern.png" },            // 303×40 = 7.58
  "cerebral":                       { file: "cerebral.png" },          // 322×64 = 5.03
  "grow therapy":                   { file: "grow-therapy.png" },      // 312×64 = 4.88
  "thriveworks":                    { file: "thriveworks.png", square: true },      // 211×117 = 1.80
  "doctronic":                      { file: "doctronic.png", square: true },        // 203×107 = 1.90
  "lifestance":                     { file: "lifestance.png" },        // 273×74 = 3.69
  "lifestance health":              { file: "lifestance.png" },
  "nocd":                           { file: "nocd.png", square: true },             // 242×97 = 2.49
};

function getLogo(company: string): { src: string; square: boolean } | null {
  const key = company.toLowerCase().trim();
  const entry = LOGO_MAP[key];
  return entry ? { src: `${BASE}logos/${entry.file}`, square: !!entry.square } : null;
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pledges: PublicPledge[];
};

export function PledgeListModal({ open, onOpenChange, pledges }: Props) {
  const byCompany = new Map<string, PublicPledge[]>();
  for (const p of pledges) {
    const list = byCompany.get(p.company) ?? [];
    list.push(p);
    byCompany.set(p.company, list);
  }
  const companies = [...byCompany.keys()].sort((a, b) => a.localeCompare(b));
  const totalPledges = pledges.length;
  const totalCompanies = companies.length;

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup
          className="fixed left-0 top-0 bottom-0 z-50 w-full bg-white border-r border-[#dcd2c8] flex flex-col shadow-2xl overflow-hidden"
          style={{
            maxWidth: 440,
            animation: open
              ? "slideInLeft 0.35s cubic-bezier(0.32,0,0.15,1) forwards"
              : "slideOutLeft 0.3s cubic-bezier(0.32,0,0.15,1) forwards",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 shrink-0">
            <div className="flex flex-col">
              <BaseDialog.Title
                className="text-[#2f1d47] font-normal leading-tight"
                style={{ fontSize: 33, lineHeight: 1.25 }}
              >
                Pledges
              </BaseDialog.Title>
              <p className="text-[#2c1f45] opacity-60 mt-1" style={{ fontSize: 16, lineHeight: 1.5 }}>
                {totalPledges} pledges from {totalCompanies} companies
              </p>
            </div>
            <BaseDialog.Close
              className="mt-1 shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#dcd2c8]/50 transition-colors"
              aria-label="Close"
            >
              <X className="h-[18px] w-[18px] text-[color:var(--deep-purple)]" />
            </BaseDialog.Close>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ gap: 24, display: "flex", flexDirection: "column" }}>
            {companies.length === 0 && (
              <p className="text-[color:var(--warm-taupe)] text-center py-16">No pledges yet.</p>
            )}
            {companies.map((company) => {
              const signers = byCompany.get(company)!;
              const logo = getLogo(company);
              return (
                <div key={company} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {logo ? (
                    <img
                      src={logo.src}
                      alt={company}
                      className="object-contain object-left"
                      style={logo.square ? { width: 92, height: "auto" } : { height: 24, width: "auto" }}
                    />
                  ) : (
                    <p className="text-[#2c1f45] font-medium" style={{ fontSize: 20, lineHeight: 1.25 }}>
                      {company}
                    </p>
                  )}
                  {signers.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between"
                      style={{ fontSize: 18, lineHeight: 1.5 }}
                    >
                      <span className="text-[#2c1f45] opacity-75">
                        {s.firstName} {s.lastInitial}.
                      </span>
                      <span className="text-[#ad9d92] opacity-75 text-right ml-4">{s.role}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
