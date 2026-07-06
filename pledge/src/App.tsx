import { PasswordGate } from "@/components/PasswordGate";
import { SiteHeader } from "@/components/SiteHeader";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen">
        <SiteHeader />
        <p className="p-6">Pledge page — unlocked.</p>
      </div>
    </PasswordGate>
  );
}
