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
import { usePledgeState } from "@/hooks/usePledgeState";

export default function App() {
  const state = usePledgeState();
  const [formOpen, setFormOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const pledges = state.list ?? [];
  const companies = new Set(pledges.map((p) => p.company)).size;

  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
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
              <Button
                size="lg"
                onClick={() => setFormOpen(true)}
                disabled={state.local.kind === "submitting"}
                className="rounded-full px-8 py-6 text-base font-semibold"
              >
                Sign the pledge
              </Button>
            )}
          </Hero>
          <LogoCarousel />
          <PledgeCounterPill
            pledges={pledges.length}
            companies={companies}
            visible={!state.listHidden && pledges.length > 0}
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
      </div>
    </PasswordGate>
  );
}
