import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { WhyItMatters } from "@/components/WhyItMatters";
import { LogoWall, MobileLogoMarquee } from "@/components/LogoWall";
import { LogoWallVertical } from "@/components/LogoWallVertical";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
import { PendingCard } from "@/components/PendingCard";
import { ApprovedCard } from "@/components/ApprovedCard";
import { LookupSheet } from "@/components/LookupSheet";
import { PledgeRecap } from "@/components/PledgeRecap";
import { usePledgeState } from "@/hooks/usePledgeState";

const HEADER_HEIGHT = 88;

export default function App() {
  const state = usePledgeState();
  const [formOpen, setFormOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [lookupOpen, setLookupOpen] = useState(false);
  const [wallVariant, setWallVariant] = useState<"paginated" | "vertical">(
    () =>
      typeof window !== "undefined" && window.location.hash.includes("wall=v2")
        ? "vertical"
        : "paginated",
  );
  useEffect(() => {
    const onHash = () =>
      setWallVariant(
        window.location.hash.includes("wall=v2") ? "vertical" : "paginated",
      );
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const pledges = state.list ?? [];
  const companyCount = new Set(pledges.map((p) => p.company)).size;

  const CounterOrSkeleton = state.list === null ? (
    <PledgeCounterPill loading />
  ) : !state.listHidden ? (
    <PledgeCounterPill
      pledges={pledges.length}
      companies={companyCount}
      onOpenList={() => setListOpen(true)}
    />
  ) : null;

  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <main>
            {/* Hero section — 40px top/bottom, 80px left/right (24px on mobile), min-h 740, vertically centered */}
            <section
              className="flex flex-col justify-center gap-6 px-6 lg:px-[80px]"
              style={{ minHeight: 740, paddingTop: 40, paddingBottom: 40 }}
            >
              <Hero>
                {state.local.kind === "approved" && (
                  <ApprovedCard
                    firstName={state.local.firstName}
                    company={state.local.company}
                    onViewList={() => setListOpen(true)}
                  />
                )}
                {state.local.kind === "pending" && (
                  <PendingCard
                    firstName={state.local.firstName}
                    company={state.local.company}
                    onRescind={state.rescind}
                  />
                )}
                {(state.local.kind === "fresh" || state.local.kind === "submitting") && (
                  <div className="flex items-center gap-6">
                    <Button
                      size="lg"
                      onClick={() => setFormOpen(true)}
                      disabled={state.local.kind === "submitting"}
                      className="rounded-full px-8 py-6 text-base font-semibold relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-white/0 hover:before:bg-white/10 before:transition-colors before:pointer-events-none"
                    >
                      Sign the pledge
                    </Button>
                    <button
                      onClick={() => setLookupOpen(true)}
                      className="text-base leading-6 text-[color:var(--deep-purple)] font-medium underline underline-offset-4 hover:opacity-70 whitespace-nowrap"
                    >
                      Already pledged?
                    </button>
                  </div>
                )}
              </Hero>
              {CounterOrSkeleton}
            </section>

            {/* Mobile logo marquee — shown only when aside is stacked below (< lg) */}
            <div className="lg:hidden bg-[color:var(--warm-taupe)] py-6 overflow-hidden">
              <MobileLogoMarquee tiles={(state.list ?? []).filter(p => p.logoUrl).reduce<{src:string;label:string}[]>((acc, p) => {
                if (!acc.find(t => t.label === p.company)) acc.push({ src: p.logoUrl!, label: p.company });
                return acc;
              }, [])} />
            </div>

            {/* Why This Matters section — lila-light bg per Figma */}
            <section
              className="bg-[color:var(--lilac-light)] px-6 lg:px-[80px]"
              style={{ paddingTop: 40, paddingBottom: 40 }}
            >
              <WhyItMatters />
            </section>

            <PledgeRecap onSignClick={() => setFormOpen(true)} />
          </main>

          <aside
            className="bg-[color:var(--warm-taupe)] lg:sticky lg:self-start"
            style={{
              top: HEADER_HEIGHT,
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              paddingTop: wallVariant === "vertical" ? 0 : 40,
              paddingBottom: wallVariant === "vertical" ? 0 : 40,
              paddingLeft: 50,
              paddingRight: 50,
            }}
          >
            <div className="h-full flex flex-col justify-center">
              {wallVariant === "vertical" ? (
                <LogoWallVertical pledges={pledges} />
              ) : (
                <LogoWall pledges={pledges} />
              )}
            </div>
          </aside>
        </div>
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
