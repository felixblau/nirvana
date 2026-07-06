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
      className="group w-full flex items-center justify-center gap-2 rounded-lg p-4 border border-[color:var(--lilac-light)] text-left"
      style={{
        backgroundImage: "linear-gradient(to right, var(--lilac-light), #ffffff)",
      }}
    >
      <span className="flex-1 min-w-0 text-[18px] text-[color:var(--deep-purple)]" style={{ lineHeight: "24px" }}>
        <span className="font-bold">{pledges} pledges</span>
        <span> from </span>
        <span className="font-bold">{companies} companies</span>
      </span>
      <span
        className="flex items-center gap-2 flex-shrink-0 text-[18px] whitespace-nowrap"
        style={{ color: "#9073F2", lineHeight: "24px" }}
      >
        <span className="font-semibold" style={{ letterSpacing: "-0.36px" }}>View list</span>
        <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </button>
  );
}
