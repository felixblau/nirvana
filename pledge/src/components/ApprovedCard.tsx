import { CheckCircle2 } from "lucide-react";

type Props = {
  firstName: string;
  company: string;
  onViewList: () => void;
};

export function ApprovedCard({ firstName, company, onViewList }: Props) {
  return (
    <div className="max-w-xl mx-auto bg-card border border-[color:var(--green)]/30 rounded-2xl p-8 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[color:var(--green-light)] flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-[color:var(--green)]" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-foreground">Thanks {firstName} — your pledge is live</div>
          <div className="text-xs text-muted-foreground">{company} appears in the public list.</div>
        </div>
      </div>
      <button
        onClick={onViewList}
        className="text-xs text-[color:var(--vibrant-purple)] font-medium underline underline-offset-4"
      >
        View the list →
      </button>
    </div>
  );
}
