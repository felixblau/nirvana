import { useState } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLookup: (email: string) => Promise<{ id: string; status: string } | null>;
};

export function LookupSheet({ open, onOpenChange, onLookup }: Props) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true); setNotFound(false); setError(null);
    try {
      const found = await onLookup(email.trim());
      if (found) { onOpenChange(false); setEmail(""); }
      else setNotFound(true);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-sm bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <BaseDialog.Title className="text-base font-semibold">Find your pledge</BaseDialog.Title>
            <BaseDialog.Close className="rounded-full p-1.5 hover:bg-muted" aria-label="Close">
              <X className="h-4 w-4" />
            </BaseDialog.Close>
          </div>
          <form onSubmit={submit} className="px-6 py-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Email you used to pledge</Label>
              <Input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value); setNotFound(false); setError(null); }}
              />
              {notFound && <p className="text-xs text-muted-foreground">No pledge found for that email.</p>}
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button type="submit" disabled={busy} className="w-full rounded-full py-5 font-semibold">
              {busy ? "Looking up…" : "Find pledge"}
            </Button>
          </form>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
