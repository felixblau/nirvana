import { ChevronRight } from "lucide-react";

type Props =
  | { loading: true }
  | {
      loading?: false;
      pledges: number;
      companies: number;
      onOpenList: () => void;
    };

export function PledgeCounterPill(props: Props) {
  if (props.loading) {
    return (
      <div
        aria-hidden="true"
        className="w-full flex items-center justify-between gap-2 rounded-lg p-4 bg-[color:var(--warm-tan)]"
      >
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 rounded-md animate-shimmer" />
          <div className="h-3 w-1/2 rounded-md animate-shimmer" />
        </div>
      </div>
    );
  }
  const { pledges, companies, onOpenList } = props;
  return (
    <button
      onClick={onOpenList}
      className="group w-full flex items-center justify-between rounded-lg px-4 py-4 border border-[color:var(--lilac-light)] animate-pledge-pill-gradient transition-colors hover:border-[color:var(--deep-purple)]"
      aria-label={`${pledges} pledges from ${companies} companies — view list`}
    >
      <span className="flex-1 text-center text-[18px] text-[color:var(--deep-purple)]" style={{ lineHeight: "24px" }}>
        <span className="font-bold">{pledges} pledges</span>
        <span> from </span>
        <span className="font-bold">{companies} companies</span>
      </span>
      <ChevronRight className="shrink-0 h-5 w-5 text-[color:var(--vibrant-purple)] group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
