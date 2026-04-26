import { useState } from 'react'
import { Header, Body, Title, StickyFooter, PrimaryButton, OptionCard } from '../ui.jsx'

const PAYERS = [
  { value: 'aetna', title: 'Aetna' },
  { value: 'bcbs', title: 'Blue Cross Blue Shield' },
  { value: 'cigna', title: 'Cigna' },
  { value: 'united', title: 'UnitedHealthcare' },
  { value: 'oxford', title: 'Oxford' },
  { value: 'empire', title: 'Empire BCBS' },
  { value: 'humana', title: 'Humana' },
  { value: 'self-pay', title: "I'll pay out of pocket" },
  { value: 'skip', title: "I don't see my insurance" },
]

export function Insurance({ step, totalSteps, onBack, onNext }) {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const filtered = PAYERS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />
      <Body>
        <Title subtitle="We'll verify your benefits in seconds — no paperwork.">
          Who's your insurance provider?
        </Title>

        <div style={{ position: 'relative', marginBottom: 18 }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--ls-ink-muted)',
            }}
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insurance providers"
            style={{
              width: '100%',
              padding: '14px 16px 14px 42px',
              border: '1px solid var(--ls-border)',
              borderRadius: 'var(--ls-radius)',
              background: 'var(--ls-white)',
              fontSize: 15,
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((p) => (
            <OptionCard
              key={p.value}
              title={p.title}
              selected={selected === p.value}
              onClick={() => {
                setSelected(p.value)
                // auto-advance on payer select to trigger eligibility check
                setTimeout(() => onNext(p.value), 240)
              }}
            />
          ))}
        </div>
      </Body>
      <StickyFooter>
        <PrimaryButton
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
        >
          Continue
        </PrimaryButton>
      </StickyFooter>
    </>
  )
}
