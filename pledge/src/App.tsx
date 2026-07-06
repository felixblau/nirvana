import { useState } from "react";
import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";
import { PledgeCounterPill } from "@/components/PledgeCounterPill";
import { PledgeListModal } from "@/components/PledgeListModal";
import { PledgeFormDialog } from "@/components/PledgeFormDialog";
import type { PublicPledge } from "@/types";

const MOCK: PublicPledge[] = [
  { company: "Acme Health", firstName: "Jane", lastInitial: "D", role: "CFO" },
  { company: "Acme Health", firstName: "Marcus", lastInitial: "P", role: "COO" },
  { company: "Better Care", firstName: "Mike", lastInitial: "R", role: "VP Revenue" },
  { company: "Clarity Med", firstName: "Sam", lastInitial: "L", role: "CEO" },
];

export default function App() {
  const [listOpen, setListOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero onSignClick={() => setFormOpen(true)} />
          <LogoCarousel />
          <PledgeCounterPill
            pledges={MOCK.length}
            companies={new Set(MOCK.map((p) => p.company)).size}
            visible={true}
            onOpenList={() => setListOpen(true)}
          />
        </main>
        <SiteFooter />
        <PledgeListModal open={listOpen} onOpenChange={setListOpen} pledges={MOCK} />
        <PledgeFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          submitting={false}
          submitError={null}
          onSubmit={async (data) => {
            console.log("submit", data);
            setFormOpen(false);
          }}
        />
      </div>
    </PasswordGate>
  );
}
