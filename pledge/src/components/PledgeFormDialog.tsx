import { useState } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type PledgeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PledgeFormData) => Promise<void>;
  submitting: boolean;
  submitError: string | null;
};

const EMPTY: PledgeFormData = { firstName: "", lastName: "", email: "", company: "", role: "" };

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function PledgeFormDialog({ open, onOpenChange, onSubmit, submitting, submitError }: Props) {
  const [values, setValues] = useState<PledgeFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof PledgeFormData, string>>>({});

  const update = (k: keyof PledgeFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((e2) => ({ ...e2, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed: PledgeFormData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      company: values.company.trim(),
      role: values.role.trim(),
    };
    const errs: typeof errors = {};
    if (!trimmed.firstName) errs.firstName = "Required";
    if (!trimmed.lastName) errs.lastName = "Required";
    if (!trimmed.email) errs.email = "Required";
    else if (!isEmail(trimmed.email)) errs.email = "Invalid email";
    if (!trimmed.company) errs.company = "Required";
    if (!trimmed.role) errs.role = "Required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    await onSubmit(trimmed);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 bg-[color:var(--deep-purple)]/40 backdrop-blur-sm z-40" />
        <BaseDialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-lg bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <BaseDialog.Title className="text-lg font-semibold">Sign the pledge</BaseDialog.Title>
            <BaseDialog.Close className="rounded-full p-1.5 hover:bg-muted" aria-label="Close">
              <X className="h-5 w-5" />
            </BaseDialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" error={errors.firstName}>
                <Input value={values.firstName} onChange={update("firstName")} required autoFocus />
              </Field>
              <Field label="Last name" error={errors.lastName}>
                <Input value={values.lastName} onChange={update("lastName")} required />
              </Field>
            </div>
            <Field label="Email" error={errors.email}>
              <Input type="email" value={values.email} onChange={update("email")} required />
            </Field>
            <Field label="Company" error={errors.company}>
              <Input value={values.company} onChange={update("company")} required />
            </Field>
            <Field label="Role" error={errors.role}>
              <Input value={values.role} onChange={update("role")} required />
            </Field>
            {submitError && (
              <p className="text-sm text-destructive" role="alert">{submitError}</p>
            )}
            <div className="pt-2 space-y-3">
              <Button type="submit" disabled={submitting} className="w-full rounded-full py-6 text-base font-semibold">
                {submitting ? "Submitting…" : "Sign the pledge"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Nirvana will review your submission shortly.
              </p>
            </div>
          </form>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
