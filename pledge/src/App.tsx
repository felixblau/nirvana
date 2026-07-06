import { useState } from "react";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
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
          <Hero onSignClick={() => setFormOpen(true)} />
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
