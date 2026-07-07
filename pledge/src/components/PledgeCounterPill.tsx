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
    <div className="group w-full flex items-center justify-between rounded-lg p-4 border border-[color:var(--lilac-light)] animate-pledge-pill-gradient">
      <span
        className="text-[18px] text-[color:var(--deep-purple)]"
        style={{ lineHeight: "24px" }}
      >
        <span className="font-bold">{pledges} pledges</span>
        <span> from </span>
        <span className="font-bold">{companies} companies</span>
      </span>
      <button
        onClick={onOpenList}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[color:var(--lilac-light)] transition-colors shrink-0"
        aria-label="View pledge list"
      >
        <ChevronRight className="h-5 w-5 text-[color:var(--vibrant-purple)] group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
