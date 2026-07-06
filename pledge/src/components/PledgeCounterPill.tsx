import { ArrowRight } from "lucide-react";

type Props = {
  pledges: number;
  companies: number;
  onOpenList: () => void;
  visible: boolean;
};

export function PledgeCounterPill({ pledges, companies, onOpenList, visible }: Props) {
  if (!visible) return null;
  return (
    <button
      onClick={onOpenList}
      className="group w-full flex items-center justify-between gap-3 bg-card border border-[color:var(--deep-purple)]/15 rounded-2xl px-6 py-4 hover:border-[color:var(--deep-purple)] transition-colors text-left"
    >
      <span className="text-sm md:text-base">
        <span className="font-semibold text-foreground">{pledges} pledges</span>
        <span className="text-muted-foreground"> from </span>
        <span className="font-semibold text-foreground">{companies} companies</span>
      </span>
      <span className="text-sm text-[color:var(--deep-purple)] font-semibold flex items-center gap-1 flex-shrink-0">
        View list <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </button>
  );
}
