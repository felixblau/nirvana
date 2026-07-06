import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "nirvana_pledge_unlocked";
const PASSWORD = "nirvana";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-xl p-8 space-y-6 animate-fade-in"
      >
        <img src="/nirvana-logo.svg" alt="Nirvana" className="h-4 opacity-70" />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">This page is private.</p>
          <Input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            aria-invalid={error}
            aria-describedby={error ? "gate-error" : undefined}
          />
          {error && (
            <p id="gate-error" className="text-xs text-destructive">
              Incorrect password.
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">Enter</Button>
      </form>
    </div>
  );
}
