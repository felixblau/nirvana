import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
import { PendingCard } from "@/components/PendingCard";
import { ApprovedCard } from "@/components/ApprovedCard";
import { LookupSheet } from "@/components/LookupSheet";
import { usePledgeState } from "@/hooks/usePledgeState";

export default function App() {
  const state = usePledgeState();
  const [formOpen, setFormOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [lookupOpen, setLookupOpen] = useState(false);

  const pledges = state.list ?? [];
  const companyCount = new Set(pledges.map((p) => p.company)).size;

  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Hero>
            {state.local.kind === "pending" && (
              <PendingCard
                firstName={state.local.firstName}
                company={state.local.company}
                onRescind={state.rescind}
              />
            )}
            {state.local.kind === "approved" && (
              <ApprovedCard
                firstName={state.local.firstName}
                company={state.local.company}
                onViewList={() => setListOpen(true)}
              />
            )}
            {(state.local.kind === "fresh" || state.local.kind === "submitting") && (
              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setFormOpen(true)}
                  disabled={state.local.kind === "submitting"}
                  className="rounded-full px-8 py-6 text-base font-semibold"
                >
                  Sign the pledge
                </Button>
                <button
                  onClick={() => setLookupOpen(true)}
                  className="text-xs text-[color:var(--deep-purple)] font-medium underline underline-offset-4 hover:opacity-70"
                >
                  Already pledged?
                </button>
              </div>
            )}
          </Hero>
          <LogoCarousel />
          <PledgeCounterPill
            pledges={pledges.length}
            companies={companyCount}
            visible={!state.listHidden && state.list !== null}
            onOpenList={() => setListOpen(true)}
          />
        </main>
        <SiteFooter />

        <PledgeFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          submitting={state.local.kind === "submitting"}
          submitError={state.submitError}
          onSubmit={async (data) => {
            await state.submit(data);
            setFormOpen(false);
          }}
        />
        <PledgeListModal open={listOpen} onOpenChange={setListOpen} pledges={pledges} />
        <LookupSheet
          open={lookupOpen}
          onOpenChange={setLookupOpen}
          onLookup={state.lookupByEmail}
        />
      </div>
    </PasswordGate>
  );
}
