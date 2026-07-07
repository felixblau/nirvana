import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { PublicPledge } from "@/types";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pledges: PublicPledge[];
};

export function PledgeListModal({ open, onOpenChange, pledges }: Props) {
  const sorted = [...pledges].sort((a, b) => a.company.localeCompare(b.company));
  const totalPledges = pledges.length;
  const totalCompanies = new Set(pledges.map((p) => p.company)).size;

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup
          className="fixed left-0 top-0 bottom-0 z-50 w-full bg-white border-r border-[#dcd2c8] flex flex-col shadow-2xl overflow-hidden"
          style={{
            maxWidth: 480,
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
              <p className="text-[#2c1f45] mt-1" style={{ fontSize: 20, lineHeight: 1.25 }}>
                <span className="font-bold">{totalPledges} pledges</span>
                {" from "}
                <span className="font-bold">{totalCompanies} companies</span>
                {" so far"}
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
          <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col divide-y divide-[#dcd2c8]">
            {sorted.length === 0 && (
              <p className="text-[color:var(--warm-taupe)] text-center py-16">No pledges yet.</p>
            )}
            {sorted.map((s, i) => (
              <div key={i} className="flex items-baseline gap-2 min-w-0 whitespace-nowrap py-4">
                <span className="shrink-0 text-[#2c1f45] opacity-75 font-semibold tracking-tight" style={{ fontSize: 18, lineHeight: "24px" }}>
                  {s.company}
                </span>
                <span className="shrink-0 text-[#2c1f45] opacity-75" style={{ fontSize: 18, lineHeight: 1.5 }}>
                  {s.firstName} {s.lastName}
                </span>
                <span className="flex-1 min-w-0 truncate text-right text-[#ad9d92] opacity-75" style={{ fontSize: 14, lineHeight: 1.5 }}>
                  {s.role}
                </span>
              </div>
            ))}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
