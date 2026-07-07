import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Clock } from "lucide-react";

type Props = {
  firstName: string;
  company: string;
  onRescind: () => Promise<void>;
};

export function PendingCard({ company, onRescind }: Props) {
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
    <>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
          <Clock className="h-[18px] w-[18px] text-[color:var(--warm-taupe,#AD9D92)]" />
        </div>
        <p className="text-base text-[color:var(--deep-purple,#2C1F45)] leading-snug">
          <span className="font-bold">Your pledge is under review</span>
          <span className="font-medium"> – we'll review your submission shortly. </span>
          <button
            onClick={() => setConfirmOpen(true)}
            className="text-base text-[color:var(--vibrant-purple,#9073F2)] underline underline-offset-2 font-medium hover:opacity-70 transition-opacity"
          >
            Rescind
          </button>
        </p>
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
    </>
  );
}
