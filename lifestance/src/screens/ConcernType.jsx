import { useState } from 'react'
import { Header, Body, Title, StickyFooter, PrimaryButton, OptionCard } from '../ui.jsx'

const CONCERNS = [
  {
    value: 'individual',
    title: 'Individual therapy',
    description: 'Talk one-on-one with a licensed therapist.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M4.5 20c0-4.2 3.4-7.5 7.5-7.5s7.5 3.3 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: 'couples',
    title: 'Couples therapy',
    description: 'Work through relationship dynamics together.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="8.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="15.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M10 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: 'child',
    title: 'Child & teen therapy',
    description: 'Support for ages 6 through 17.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: 'psychiatry',
    title: 'Psychiatry',
    description: 'Medication evaluation and management.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 4h6l-1 5h3l-7 11 1-7H7l2-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function ConcernType({ step, totalSteps, onBack, onNext }) {
  const [selected, setSelected] = useState('individual')
  return (
    <>
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />
      <Body>
        <Title subtitle="You can change this later — we'll match accordingly.">
          What kind of care are you looking for?
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CONCERNS.map((c) => (
            <OptionCard
              key={c.value}
              icon={c.icon}
              title={c.title}
              description={c.description}
              selected={selected === c.value}
              onClick={() => setSelected(c.value)}
            />
          ))}
        </div>
      </Body>
      <StickyFooter>
        <PrimaryButton onClick={() => onNext(selected)}>Continue</PrimaryButton>
      </StickyFooter>
    </>
  )
}
