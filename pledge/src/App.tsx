import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { WhyItMatters } from "@/components/WhyItMatters";
import { LogoWall } from "@/components/LogoWall";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
import { PendingCard } from "@/components/PendingCard";
import { ApprovedCard } from "@/components/ApprovedCard";
import { LookupSheet } from "@/components/LookupSheet";
import { usePledgeState } from "@/hooks/usePledgeState";

const HEADER_HEIGHT = 88;

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
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        >
          <main
            className="lg:col-span-7 lg:overflow-y-auto"
            style={{ maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
          >
            <div className="max-w-2xl mx-auto px-6 lg:px-10 py-16 md:py-20 space-y-24">
              <div className="flex flex-col justify-center" style={{ minHeight: 500 }}>
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
                  <div className="flex items-center gap-6">
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
                      className="text-sm text-[color:var(--deep-purple)] font-medium underline underline-offset-4 hover:opacity-70"
                    >
                      Already pledged?
                    </button>
                  </div>
                )}
              </Hero>
              </div>
              <WhyItMatters />
            </div>
            <SiteFooter />
          </main>

          <aside
            className="lg:col-span-5 lg:overflow-y-auto bg-[color:var(--warm-taupe)]"
            style={{ maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
          >
            <div className="px-6 lg:px-10 py-10 space-y-6">
              <LogoWall pledges={pledges} />
              {state.list === null ? (
                <PledgeCounterPill loading />
              ) : !state.listHidden ? (
                <PledgeCounterPill
                  pledges={pledges.length}
                  companies={companyCount}
                  onOpenList={() => setListOpen(true)}
                />
              ) : null}
            </div>
          </aside>
        </div>

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
