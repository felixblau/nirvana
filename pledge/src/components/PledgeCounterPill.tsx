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
    <section className="w-full px-6 py-16">
      <div className="max-w-3xl mx-auto flex justify-center">
        <button
          onClick={onOpenList}
          className="group inline-flex items-center gap-3 bg-card border border-[color:var(--deep-purple)]/15 rounded-full pl-6 pr-4 py-3 hover:border-[color:var(--deep-purple)] transition-colors"
        >
          <span className="text-base">
            <span className="font-semibold text-foreground">{pledges} pledges</span>
            <span className="text-muted-foreground"> from </span>
            <span className="font-semibold text-foreground">{companies} companies</span>
          </span>
          <span className="text-sm text-[color:var(--deep-purple)] font-semibold flex items-center gap-1">
            View list <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
}
