import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">Pledge page — unlocked.</main>
        <SiteFooter />
      </div>
    </PasswordGate>
  );
}
