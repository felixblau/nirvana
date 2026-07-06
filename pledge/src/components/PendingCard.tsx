import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Clock } from "lucide-react";

type Props = {
  firstName: string;
  company: string;
  onRescind: () => Promise<void>;
};

export function PendingCard({ firstName, company, onRescind }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rescinding, setRescinding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doRescind = async () => {
    setRescinding(true); setError(null);
    try { await onRescind(); setConfirmOpen(false); }
    catch { setError("Couldn't rescind. Try again."); }
    finally { setRescinding(false); }
  };

  return (
    <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[color:var(--amber)]/10 flex items-center justify-center">
          <Clock className="h-5 w-5 text-[color:var(--amber)]" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-foreground">Your pledge is under review</div>
          <div className="text-xs text-muted-foreground">Thanks {firstName} — Nirvana will review your submission shortly.</div>
        </div>
      </div>
      <div className="pt-2">
        <button
          onClick={() => setConfirmOpen(true)}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-destructive transition-colors"
        >
          Rescind pledge
        </button>
      </div>

      <BaseDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
          <BaseDialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-sm bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xl">
            <BaseDialog.Title className="text-base font-semibold">Rescind your pledge?</BaseDialog.Title>
            <BaseDialog.Description className="text-sm text-muted-foreground">
              This will remove your pledge for {company}. You can pledge again later.
            </BaseDialog.Description>
            {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="ghost" onClick={() => setConfirmOpen(false)} disabled={rescinding}>Cancel</Button>
              <Button variant="destructive" onClick={doRescind} disabled={rescinding}>
                {rescinding ? "Rescinding…" : "Rescind"}
              </Button>
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </div>
  );
}
