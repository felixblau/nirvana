import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type HeroProps = { children?: ReactNode; onSignClick?: () => void };

export function Hero({ children, onSignClick }: HeroProps) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="inline-block rounded-full border border-[color:var(--warm-tan)] bg-white px-4 py-2">
        <span
          className="uppercase text-[color:var(--deep-purple)]"
          style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25 }}
        >
          The Price Transparency Pledge
        </span>
      </div>
      <h1
        className="font-semibold tracking-tight text-foreground"
        style={{ fontSize: "48px", lineHeight: "58px" }}
      >
        Patients deserve to know what care costs — and what they're covered for — before they book.
      </h1>
      <p className="text-lg text-[color:var(--deep-purple)]/70 max-w-xl">
        Sign the pledge and stand with providers committing to price transparency and coverage clarity for every patient.
      </p>
      <div className="pt-2">
        {children ?? (
          <Button
            size="lg"
            onClick={onSignClick}
            className="rounded-full px-8 py-6 text-base font-semibold"
          >
            Sign the pledge
          </Button>
        )}
      </div>
    </div>
  );
}
