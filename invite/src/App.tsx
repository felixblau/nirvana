import { useState, useEffect, useRef, Suspense } from "react";
import { GenerativeArtScene } from "@/components/ui/anomalous-matter-hero";
import nirvanaLogo from "/nirvana-logo.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TextGlow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.maskImage = `radial-gradient(circle 80px at ${x}px ${y}px, black 0%, transparent 100%)`;
      glowRef.current.style.webkitMaskImage = `radial-gradient(circle 80px at ${x}px ${y}px, black 0%, transparent 100%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle 80px at -200px -200px, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 80px at -200px -200px, black 0%, transparent 100%)",
          filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5)) drop-shadow(0 0 20px rgba(255,255,255,0.15))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxoHYB-GtNa8aE8gBWPVWqd52yBu5E0epHjReKGT91B6xZ476-L_CzNLXMnwaayPlvs/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Suspense fallback={<div className="w-full h-full bg-background" />}>
        <GenerativeArtScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
        <div
          className="relative max-w-2xl mx-auto text-center"
          style={{ animation: "fadeIn 1s ease-out forwards" }}
        >
          <div className="mb-8">
            <div className="relative inline-block px-4 py-1.5 rounded-full border border-white/10 bg-black/35" style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}>
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
                By Invitation Only
              </span>
            </div>
          </div>

          <TextGlow>
            <div className="mb-4">
              <img
                src={nirvanaLogo}
                alt="Nirvana"
                className="h-5 mx-auto opacity-60"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
              Healthcare AI
              <br />
              <span className="font-normal bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(to right, #d8b4fe, #ddd6fe, #c084fc, #d8b4fe)', backgroundSize: '200% 100%', backgroundRepeat: 'repeat' }}>
                Executive Dinner
              </span>
            </h1>

            <div
              className="mt-10 max-w-lg mx-auto"
              style={{ animation: "fadeInSlow 1.2s ease-out 0.3s both" }}
            >
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Join CFOs, RCM leaders, alongside AI leaders from OpenAI, Anthropic
                and more at this intimate dinner to trade notes and discuss how to
                improve healthcare revenue operations.
              </p>
            </div>

            <div
              className="mt-12 flex flex-col items-center gap-6"
              style={{ animation: "fadeInSlow 1.2s ease-out 0.5s both" }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm font-mono tracking-wider uppercase text-white/60">
                <span>July 23, 2025</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <span>5:00 PM &ndash; 9:00 PM</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <span>New York City</span>
              </div>

              <Button
                onClick={() => setOpen(true)}
                size="lg"
                className="mt-4 relative px-10 py-6 text-sm font-mono tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                RSVP
              </Button>

              <p className="text-xs font-mono text-gray-400 tracking-wider">
                Please RSVP by May 15, 2025
              </p>
            </div>
          </TextGlow>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black/95 border border-white/10 backdrop-blur-xl sm:max-w-md">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-light tracking-tight text-white">
                  Reserve Your Seat
                </DialogTitle>
                <DialogDescription className="text-white/50 text-sm">
                  15 seats only. Confirm your attendance for July 23.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-4 space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs font-mono tracking-wider uppercase text-white/40"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-mono tracking-wider uppercase text-white/40"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 focus:ring-white/10"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 text-sm font-mono tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 rounded-full cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Confirming…" : "Confirm RSVP"}
                </Button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mb-4 text-4xl">&#10003;</div>
              <DialogTitle className="text-xl font-light tracking-tight text-white mb-2">
                You&apos;re Confirmed
              </DialogTitle>
              <p className="text-white/50 text-sm">
                We&apos;ll send details to {email} shortly.
              </p>
              <p className="mt-4 text-gray-400 text-xs font-mono tracking-wider">
                July 23 &middot; 5 PM &ndash; 9 PM &middot; NYC
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
