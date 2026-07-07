import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { PublicPledge } from "@/types";

const BASE = import.meta.env.BASE_URL;

const LOGO_MAP: Record<string, string> = {
  "optum": "optum.png",
  "amazon": "amazon.png",
  "simplepractice": "simple-practice.png",
  "simple practice": "simple-practice.png",
  "transformations care network": "transformations-care-network.png",
  "alma": "alma.png",
  "sondermind": "sondermind.png",
  "resmed": "resmed.png",
  "pomelo care": "pomelo-care.png",
  "weightwatchers": "weight-watchers.png",
  "weight watchers": "weight-watchers.png",
  "eleanor health": "eleanor-health.png",
  "sol mental health": "sol-mental-health.png",
  "midwest express clinic": "midwest-express-clinic.png",
  "lifemd": "lifemd.png",
  "osmind": "osmind.png",
  "radiology partners": "radiology-partners.png",
  "headlight": "headlight.png",
  "clear": "clear.png",
  "octave": "octave.png",
  "headspace": "headspace.png",
  "fastpace health": "fastpace-health.png",
  "brave health": "brave-health.png",
  "happier living": "happier-living.png",
  "geode": "geode.png",
  "modern": "modern.png",
  "cerebral": "cerebral.png",
  "grow therapy": "grow-therapy.png",
  "thriveworks": "thriveworks.png",
  "doctronic": "doctronic.png",
  "lifestance": "lifestance.png",
  "nocd": "nocd.png",
};

function getLogoSrc(company: string): string | null {
  const key = company.toLowerCase().trim();
  const file = LOGO_MAP[key];
  return file ? `${BASE}logos/${file}` : null;
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
            <BaseDialog.Title
              className="text-[#2f1d47] font-normal leading-tight"
              style={{ fontSize: 33, lineHeight: 1.25 }}
            >
              {totalPledges} pledges from
              <br />
              {totalCompanies} companies
            </BaseDialog.Title>
            <BaseDialog.Close
              className="mt-1 shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#dcd2c8]/50 transition-colors"
              aria-label="Close"
            >
              <X className="h-[18px] w-[18px] text-[color:var(--deep-purple)]" />
            </BaseDialog.Close>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ gap: 16, display: "flex", flexDirection: "column" }}>
            {companies.length === 0 && (
              <p className="text-[color:var(--warm-taupe)] text-center py-16">No pledges yet.</p>
            )}
            {companies.map((company) => {
              const signers = byCompany.get(company)!;
              const logoSrc = getLogoSrc(company);
              return (
                <div key={company} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={company}
                      className="h-8 w-auto object-contain object-left"
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
