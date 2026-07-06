import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero onSignClick={() => console.log("sign clicked")} />
          <LogoCarousel />
        </main>
        <SiteFooter />
      </div>
    </PasswordGate>
  );
}
