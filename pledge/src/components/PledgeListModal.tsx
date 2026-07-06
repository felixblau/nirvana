import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { PublicPledge } from "@/types";

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
        <BaseDialog.Popup className="fixed inset-4 md:inset-16 z-50 bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-border">
            <BaseDialog.Title className="text-lg md:text-xl font-semibold">
              <span className="text-foreground">{totalPledges} pledges</span>
              <span className="text-muted-foreground"> from </span>
              <span className="text-foreground">{totalCompanies} companies</span>
            </BaseDialog.Title>
            <BaseDialog.Close className="rounded-full p-2 hover:bg-muted transition-colors" aria-label="Close">
              <X className="h-5 w-5" />
            </BaseDialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-8">
            {companies.length === 0 && (
              <p className="text-muted-foreground text-center py-16">No pledges yet.</p>
            )}
            {companies.map((company) => {
              const signers = byCompany.get(company)!;
              return (
                <div key={company} className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{company}</h3>
                  <ul className="space-y-1">
                    {signers.map((s, i) => (
                      <li key={i} className="text-sm text-[color:var(--lilac)]">
                        {s.firstName} {s.lastInitial}. · {s.role}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
