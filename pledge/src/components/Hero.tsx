import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type HeroProps = { children?: ReactNode; onSignClick?: () => void };

export function Hero({ children, onSignClick }: HeroProps) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block rounded-full border border-border bg-card px-4 py-1.5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--vibrant-purple)]">
            The Price Transparency Pledge
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
          Patients deserve to know what care costs — and what they're covered for — before they book.
        </h1>
        <p className="text-lg text-[color:var(--deep-purple)]/70 max-w-2xl mx-auto">
          Sign the pledge and stand with providers committing to price transparency and coverage clarity for every patient.
        </p>
        <div className="pt-4">
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
    </section>
  );
}
