import { PasswordGate } from "@/components/PasswordGate";

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen">
        {/* Pledge content — coming in later tasks */}
        <p className="p-6">Pledge page — unlocked.</p>
      </div>
    </PasswordGate>
  );
}
