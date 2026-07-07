import { Button } from "@/components/ui/button";

type Props = {
  onSignClick: () => void;
};

export function PledgeRecap({ onSignClick }: Props) {
  return (
    <section
      className="bg-white flex flex-col justify-center"
      style={{ gap: 24, paddingTop: 40, paddingBottom: 40, paddingLeft: 80, paddingRight: 80 }}
    >
      <h2
        className="text-[#2f1d47] font-normal"
        style={{ fontSize: 33, lineHeight: 1.25 }}
      >
        Add your voice to the movement
      </h2>
      <p
        className="text-[color:var(--deep-purple)] opacity-75"
        style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 480 }}
      >
        Price transparency isn't just good policy — it's what patients deserve.
        When providers commit publicly, it builds trust, reduces billing surprises,
        and raises the bar for the entire industry. Your signature matters.
      </p>
      <div>
        <Button
          size="lg"
          onClick={onSignClick}
          className="rounded-full px-8 py-6 text-base font-semibold relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-white/0 hover:before:bg-white/10 before:transition-colors before:pointer-events-none"
        >
          Sign the pledge
        </Button>
      </div>
    </section>
  );
}
